import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const PROMPTS_FILE = "image-prompts/services.json";
const OUTPUT_DIR = "public/images/services";
const MANIFEST_PATH = "public/images/manifest.json";
const MODEL = "flux";
const MAX_RETRIES = 6;
const TARGET_SLUG = process.env.TARGET_SLUG?.trim();
const IMAGE_WIDTH = Number(process.env.PROMPT_IMAGE_WIDTH ?? "3072");
const IMAGE_HEIGHT = Number(process.env.PROMPT_IMAGE_HEIGHT ?? "2048");

const ANGLES = [
  { key: "front", defaultPrompt: "front angle, centered composition" },
  { key: "three-quarter", defaultPrompt: "45-degree three-quarter angle view" },
  { key: "side", defaultPrompt: "side profile angle view" },
  { key: "closeup", defaultPrompt: "macro close-up angle with shallow depth of field" },
  { key: "workflow", defaultPrompt: "wider workflow angle showing surrounding professional context" },
];

function buildPrompt(basePrompt, title, anglePrompt, variationPrompt) {
  return [
    `Service visual: ${title}.`,
    basePrompt,
    `Camera perspective: ${anglePrompt}.`,
    `Scene variation: ${variationPrompt}.`,
    "Photorealistic real-world healthcare photography with natural indoor lighting.",
    "Documentary-style office and clinic realism, authentic imperfect framing, not a 3D render.",
    "Create a distinct composition from other angles in this same service set.",
    "Shot on full-frame DSLR look, realistic skin tones, natural shadows, high dynamic range.",
    "Clinically accurate dental anatomy and instruments, no cartoon styling.",
    "No text, no watermark, no logo, no labels, no distortion, no extra fingers.",
    "Premium clean medical environment, trust-focused brand aesthetic.",
  ].join(" ");
}

async function loadPromptItems() {
  const raw = await readFile(path.resolve(PROMPTS_FILE), "utf8");
  const items = JSON.parse(raw);
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Prompt file is empty or invalid.");
  }
  return items;
}

async function generateImageBuffer(prompt, seed) {
  const encodedPrompt = encodeURIComponent(prompt);
  const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?model=${MODEL}&width=${IMAGE_WIDTH}&height=${IMAGE_HEIGHT}&seed=${seed}&nologo=true&enhance=true`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Image provider returned ${response.status}`);
  }

  const imageArrayBuffer = await response.arrayBuffer();
  return Buffer.from(imageArrayBuffer);
}

async function generateWithRetry(prompt, seed) {
  let lastError = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      return await generateImageBuffer(prompt, seed + attempt);
    } catch (error) {
      lastError = error;
      console.error(`[retry ${attempt}/${MAX_RETRIES}] ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  throw lastError ?? new Error("Image generation failed after retries.");
}

async function run() {
  const allPromptItems = await loadPromptItems();
  const promptItems = TARGET_SLUG
    ? allPromptItems.filter((item) => item.slug === TARGET_SLUG)
    : allPromptItems;

  if (promptItems.length === 0) {
    throw new Error(`No prompt item matched TARGET_SLUG="${TARGET_SLUG}".`);
  }
  const manifest = [];
  const baseSeed = Date.now();
  let seedOffset = 0;

  for (const item of promptItems) {
    const serviceDir = path.resolve(OUTPUT_DIR, item.slug);
    await mkdir(serviceDir, { recursive: true });

    for (let index = 0; index < ANGLES.length; index += 1) {
      const angle = ANGLES[index];
      const seed = baseSeed + seedOffset;
      seedOffset += 379;
      const variationPrompt = item.angleVariations?.[angle.key] ?? angle.defaultPrompt;
      const prompt = buildPrompt(item.basePrompt, item.title, angle.defaultPrompt, variationPrompt);
      const fileName = `${item.slug}-${angle.key}.jpeg`;
      const outputPath = path.join(serviceDir, fileName);

      console.log(`[generate] ${item.slug} - ${angle.key}`);

      try {
        const imageBuffer = await generateWithRetry(prompt, seed);
        await writeFile(outputPath, imageBuffer);

        manifest.push({
          slug: item.slug,
          title: item.title,
          angle: angle.key,
          prompt,
          provider: "pollinations.ai",
          model: MODEL,
          seed,
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT,
          output: path.relative(path.resolve("."), outputPath).replaceAll("\\", "/"),
          status: "generated",
        });
      } catch (error) {
        manifest.push({
          slug: item.slug,
          title: item.title,
          angle: angle.key,
          prompt,
          provider: "pollinations.ai",
          model: MODEL,
          seed,
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT,
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }
  }

  await mkdir(path.dirname(path.resolve(MANIFEST_PATH)), { recursive: true });
  await writeFile(path.resolve(MANIFEST_PATH), JSON.stringify(manifest, null, 2), "utf8");

  console.log(`Done. Generated ${manifest.length} images.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
