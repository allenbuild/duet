import sharp from 'sharp';

const [inputPath, outputPath] = process.argv.slice(2);

if (!inputPath || !outputPath) {
  throw new Error('Usage: node scripts/build-hand-cursor.mjs INPUT OUTPUT');
}

const { data, info } = await sharp(inputPath)
  .trim({ background: '#ffffff', threshold: 12 })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const pixelCount = width * height;
const exterior = new Uint8Array(pixelCount);
const queue = new Int32Array(pixelCount);
let queueHead = 0;
let queueTail = 0;

const isExteriorWhite = (pixelIndex) => {
  const offset = pixelIndex * channels;
  return (
    data[offset + 3] > 0 &&
    data[offset] >= 170 &&
    data[offset + 1] >= 170 &&
    data[offset + 2] >= 170
  );
};

const enqueue = (pixelIndex) => {
  if (exterior[pixelIndex] || !isExteriorWhite(pixelIndex)) return;
  exterior[pixelIndex] = 1;
  queue[queueTail] = pixelIndex;
  queueTail += 1;
};

for (let x = 0; x < width; x += 1) {
  enqueue(x);
  enqueue((height - 1) * width + x);
}

for (let y = 0; y < height; y += 1) {
  enqueue(y * width);
  enqueue(y * width + width - 1);
}

while (queueHead < queueTail) {
  const pixelIndex = queue[queueHead];
  queueHead += 1;
  const x = pixelIndex % width;
  const y = Math.floor(pixelIndex / width);

  if (x > 0) enqueue(pixelIndex - 1);
  if (x + 1 < width) enqueue(pixelIndex + 1);
  if (y > 0) enqueue(pixelIndex - width);
  if (y + 1 < height) enqueue(pixelIndex + width);
}

for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex += 1) {
  const offset = pixelIndex * channels;

  if (exterior[pixelIndex] || data[offset + 3] === 0) {
    data[offset + 3] = 0;
    continue;
  }

  const luminance = (data[offset] + data[offset + 1] + data[offset + 2]) / 3;
  const tone = luminance >= 170 ? 255 : 0;
  data[offset] = tone;
  data[offset + 1] = tone;
  data[offset + 2] = tone;
  data[offset + 3] = 255;
}

const transparent = { r: 255, g: 255, b: 255, alpha: 0 };
const isolatedHand = await sharp(data, { raw: { width, height, channels } }).png().toBuffer();

await sharp(isolatedHand)
  .rotate(-25, { background: transparent })
  .trim({ background: transparent, threshold: 2 })
  .resize({ width: 22, height: 22, fit: 'contain', background: transparent })
  .png()
  .toFile(outputPath);
