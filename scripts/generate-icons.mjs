import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputSvg = path.join(process.cwd(), "public/favicon.svg");
const outputDir = path.join(process.cwd(), "public");

const sizes = [
  { name: "favicon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
  { name: "og-image.png", width: 1200, height: 630 },
];

async function generateIcons() {
  if (!fs.existsSync(inputSvg)) {
    console.error(`Input file not found: ${inputSvg}`);
    process.exit(1);
  }

  const svgBuffer = fs.readFileSync(inputSvg);

  for (const { name, size, width, height } of sizes) {
    const outputPath = path.join(outputDir, name);
    try {
      await sharp(svgBuffer)
        .resize(width || size, height || size, { fit: "contain", background: "#09090b" })
        .png()
        .toFile(outputPath);
      console.log(`Generated: ${name}`);
    } catch (err) {
      console.error(`Error generating ${name}:`, err);
    }
  }

  // Also create a quick .ico fallback from the 32x32 version (just rename the buffer for simple cases)
  try {
    await sharp(svgBuffer)
      .resize(32, 32)
      .toFormat("png")
      .toFile(path.join(outputDir, "favicon.ico"));
    console.log(`Generated: favicon.ico`);
  } catch (err) {
    console.error(`Error generating favicon.ico:`, err);
  }
}

generateIcons();
