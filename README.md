# Align Care Website

Production-ready Next.js marketing website for aligner and dental lab services.

## Website Quick View

- **Home (`/`)**
  - Hero section with brand value proposition and call-to-action buttons
  - Trust highlights and company stats
  - Services preview cards
  - Clinical gallery preview
  - Contact CTA strip

- **Services (`/services`)**
  - Detailed service blocks for:
    - Clear Aligner Treatments
    - Precision Crowns and Bridges
    - Digital Smile Design
    - Comprehensive Dental Lab Services
  - Large image gallery per service (main image + clickable thumbnails)
  - Benefits, process steps, and expected outcomes

- **Aligners (`/aligners`)**
  - Aligner basics and aligners vs braces explanation
  - Suitability, limitations, and care guidance
  - Treatment Journey with image-supported steps:
    - Clinical Assessment
    - Digital Treatment Planning
    - Fabrication and Delivery
    - Monitoring and Retention
  - FAQ section

- **About (`/about`)**
  - Mission, experience, technology, and commitment sections
  - Supporting visuals for lab and digital workflows

- **Contact (`/contact`)**
  - Static contact details:
    - Phones: `03004949488`, `03219454412`
    - Address: `5 Fane Road, near State Bank, Mall Road, Lahore`
    - Email: `Khurrammm4949@gmail.com`
    - Business hours

- **Privacy (`/privacy-policy`)**
  - Basic privacy and data-handling statement

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build checks

```bash
npm run lint
npm run build
```

## Image generation (Prompt-based HD)

1. Edit prompts in `image-prompts/services.json`.
2. Generate all service images:

```bash
npm run generate:images:prompt
```

The script generates 5 variants per service:

- `front`
- `three-quarter`
- `side`
- `closeup`
- `workflow`

Output:
- image files under `public/images/services/<service-slug>/`
- manifest at `public/images/manifest.json`

Optional controls:

```bash
# Generate only one service slug
TARGET_SLUG=clear-aligners npm run generate:images:prompt

# Override generation resolution
PROMPT_IMAGE_WIDTH=3072 PROMPT_IMAGE_HEIGHT=2048 npm run generate:images:prompt
```

## Content sources

- Brand and page content: `src/content/site-content.ts`
- App routes: `src/app/*`
- Shared components: `src/components/*`
