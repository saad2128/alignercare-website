import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { GoogleGenAI, Modality } from "@google/genai";

const DEFAULT_MODEL = "gemini-2.0-flash-preview-image-generation";
const DEFAULT_PROMPTS_FILE = "image-prompts/services.json";
const DEFAULT_OUTPUT_DIR = "public/images/services";
const DEFAULT_MAX_RETRIES = 3;

const ANGLES = [
  { key: "front", promptSuffix: "front angle, centered composition" },
  { key: "three-quarter", promptSuffix: "45-degree three-quarter angle view" },
  { key: "side", promptSuffix: "side profile angle view" },
];

function ensureEnv() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing. Add it to your environment before running this script.");
  }
}

async function loadEnvFile(relativePath) {
  const fullPath = path.resolve(relativePath);
  if (!(await fileExists(fullPath))) {
    return;
  }

  const raw = await readFile(fullPath, "utf8");
  const lines = raw.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();

    if (!key) {
      continue;
    }

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

async function loadEnvFiles() {
  // Local overrides first, then fallback to .env for defaults.
  await loadEnvFile(".env.local");
  await loadEnvFile(".env");
}

async function fileExists(targetPath) {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadPrompts(promptsFile) {
  const absolutePath = path.resolve(promptsFile);
  const raw = await readFile(absolutePath, "utf8");
  const items = JSON.parse(raw);

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error(`Prompt file is invalid or empty: ${absolutePath}`);
  }

  return items;
}

function buildPrompt(basePrompt, anglePrompt, title) {
  return [
    `Service visual: ${title}.`,
    basePrompt,
    `Camera perspective: ${anglePrompt}.`,
    "No text, no watermark, no logo, no patient identifiable data.",
    "High quality commercial healthcare visual style.",
  ].join(" ");
}

function extractImagePart(response) {
  const parts = response?.candidates?.[0]?.content?.parts ?? [];
  return parts.find((part) => part?.inlineData?.data);
}

async function generateImage(ai, prompt, model) {
  const response = await ai.models.generateContent({
    model,
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });

  const imagePart = extractImagePart(response);
  if (!imagePart?.inlineData?.data) {
    throw new Error("No image data returned from Gemini API.");
  }

  const mimeType = imagePart.inlineData.mimeType ?? "image/png";
  const extension = mimeType.includes("jpeg") || mimeType.includes("jpg") ? "jpg" : "png";

  return {
    buffer: Buffer.from(imagePart.inlineData.data, "base64"),
    mimeType,
    extension,
  };
}

async function run() {
  await loadEnvFiles();
  ensureEnv();

  const model = process.env.GEMINI_IMAGE_MODEL ?? DEFAULT_MODEL;
  const promptsFile = process.env.PROMPTS_FILE ?? DEFAULT_PROMPTS_FILE;
  const outputDir = process.env.OUTPUT_DIR ?? DEFAULT_OUTPUT_DIR;
  const maxRetries = Number(process.env.MAX_RETRIES ?? String(DEFAULT_MAX_RETRIES));

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const promptItems = await loadPrompts(promptsFile);
  const generatedManifest = [];

  for (const item of promptItems) {
    const serviceDir = path.resolve(outputDir, item.slug);
    await mkdir(serviceDir, { recursive: true });

    for (const angle of ANGLES) {
      const filenameBase = `${item.slug}-${angle.key}`;
      const existingPng = path.join(serviceDir, `${filenameBase}.png`);
      const existingJpg = path.join(serviceDir, `${filenameBase}.jpg`);

      if ((await fileExists(existingPng)) || (await fileExists(existingJpg))) {
        console.log(`[skip] ${filenameBase}: file already exists`);
        generatedManifest.push({
          slug: item.slug,
          title: item.title,
          angle: angle.key,
          status: "skipped_existing",
        });
        continue;
      }

      let attempt = 0;
      let success = false;

      while (!success && attempt < maxRetries) {
        attempt += 1;
        try {
          const prompt = buildPrompt(item.basePrompt, angle.promptSuffix, item.title);
          const image = await generateImage(ai, prompt, model);
          const imagePath = path.join(serviceDir, `${filenameBase}.${image.extension}`);
          await writeFile(imagePath, image.buffer);

          console.log(`[ok] ${filenameBase}: generated on attempt ${attempt}`);
          generatedManifest.push({
            slug: item.slug,
            title: item.title,
            angle: angle.key,
            status: "generated",
            output: path.relative(path.resolve("."), imagePath).replaceAll("\\", "/"),
            mimeType: image.mimeType,
          });
          success = true;
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unknown error";
          console.error(`[retry ${attempt}/${maxRetries}] ${filenameBase}: ${message}`);

          if (attempt >= maxRetries) {
            generatedManifest.push({
              slug: item.slug,
              title: item.title,
              angle: angle.key,
              status: "failed",
              error: message,
            });
          } else {
            await sleep(1500 * attempt);
          }
        }
      }
    }
  }

  const manifestPath = path.resolve("public/images/manifest.json");
  await mkdir(path.dirname(manifestPath), { recursive: true });
  await writeFile(manifestPath, JSON.stringify(generatedManifest, null, 2), "utf8");

  console.log(`\nDone. Manifest written to ${manifestPath}`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
