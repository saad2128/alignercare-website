import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUTPUT_DIR = path.resolve("public/images/aligner-journey");
const WIDTH = 3072;
const HEIGHT = 2048;
const MODEL = "flux";
const MAX_RETRIES = 6;

const prompts = [
  {
    name: "clinical-assessment-alt",
    prompt:
      "Photorealistic orthodontic clinical assessment scene, dentist reviewing intraoral scan on monitor with patient records on desk, clean clinic room, natural indoor lighting, focused composition, no crowd, no text",
  },
  {
    name: "digital-treatment-planning-alt",
    prompt:
      "Photorealistic digital treatment planning workstation with one laptop and one external monitor showing tooth movement stages, sticky notes and stylus, realistic office lighting, focused composition, no crowd, no text",
  },
  {
    name: "fabrication-delivery-alt",
    prompt:
      "Photorealistic dental lab fabrication and delivery preparation scene with aligner trays in sterile packaging near labeling station, one technician hand with gloves, uncluttered background, focused composition, no crowd, no text",
  },
  {
    name: "monitoring-retention-alt",
    prompt:
      "Photorealistic orthodontic monitoring and retention appointment scene, clear aligner and retainer case on tray with progress chart on tablet, clean clinic setting, shallow depth of field, focused composition, no crowd, no text",
  },
];

async function generateImage(prompt, seed) {
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=${MODEL}&width=${WIDTH}&height=${HEIGHT}&seed=${seed}&nologo=true&enhance=true`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function run() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const baseSeed = Date.now();

  for (let i = 0; i < prompts.length; i += 1) {
    const item = prompts[i];
    const seed = baseSeed + i * 131;
    let success = false;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
      try {
        const imageBuffer = await generateImage(item.prompt, seed + attempt);
        const outputPath = path.join(OUTPUT_DIR, `${item.name}.jpeg`);
        await writeFile(outputPath, imageBuffer);
        console.log(`[ok] ${item.name}`);
        success = true;
        break;
      } catch (error) {
        console.error(`[retry ${attempt}/${MAX_RETRIES}] ${item.name} ${error instanceof Error ? error.message : "Unknown error"}`);
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
      }
    }

    if (!success) {
      throw new Error(`Failed generating ${item.name}`);
    }
  }

  console.log("Done. Generated 4 additional journey images.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
