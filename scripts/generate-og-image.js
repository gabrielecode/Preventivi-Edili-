import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const WIDTH = 1200;
const HEIGHT = 630;

// Create RGBA pixel buffer
const pixels = Buffer.alloc(WIDTH * HEIGHT * 4);

function setPixel(x, y, r, g, b, a = 255) {
  if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) return;
  const idx = (y * WIDTH + x) * 4;
  if (a >= 255) {
    pixels[idx] = r;
    pixels[idx + 1] = g;
    pixels[idx + 2] = b;
    pixels[idx + 3] = 255;
  } else {
    const alpha = a / 255;
    const invAlpha = 1 - alpha;
    pixels[idx] = Math.round(r * alpha + pixels[idx] * invAlpha);
    pixels[idx + 1] = Math.round(g * alpha + pixels[idx + 1] * invAlpha);
    pixels[idx + 2] = Math.round(b * alpha + pixels[idx + 2] * invAlpha);
    pixels[idx + 3] = 255;
  }
}

function fillRect(x, y, w, h, r, g, b, a = 255) {
  for (let cy = y; cy < y + h; cy++) {
    for (let cx = x; cx < x + w; cx++) {
      setPixel(cx, cy, r, g, b, a);
    }
  }
}

function drawRoundedRect(x, y, w, h, radius, r, g, b, a = 255) {
  for (let cy = y; cy < y + h; cy++) {
    for (let cx = x; cx < x + w; cx++) {
      const inCornerX = cx < x + radius ? x + radius - cx : cx > x + w - radius ? cx - (x + w - radius) : 0;
      const inCornerY = cy < y + radius ? y + radius - cy : cy > y + h - radius ? cy - (y + h - radius) : 0;
      if (inCornerX > 0 && inCornerY > 0) {
        if (inCornerX * inCornerX + inCornerY * inCornerY > radius * radius) continue;
      }
      setPixel(cx, cy, r, g, b, a);
    }
  }
}

// 1. Draw rich background gradient (Deep slate #080E1A to navy #0F172A with bright blue radial glow)
for (let y = 0; y < HEIGHT; y++) {
  for (let x = 0; x < WIDTH; x++) {
    // Distance from center-top glow (x: 400, y: 180)
    const dx = x - 400;
    const dy = y - 180;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const glow = Math.max(0, 1 - dist / 700);

    // Base dark navy gradient
    const tY = y / HEIGHT;
    let r = Math.round(8 + tY * 12 + glow * 25);
    let g = Math.round(14 + tY * 20 + glow * 55);
    let b = Math.round(28 + tY * 35 + glow * 120);

    // Subtle grid dots every 40px
    if (x % 40 === 0 || y % 40 === 0) {
      if (x % 40 === 0 && y % 40 === 0) {
        r = Math.min(255, r + 24);
        g = Math.min(255, g + 36);
        b = Math.min(255, b + 60);
      }
    }

    setPixel(x, y, r, g, b, 255);
  }
}

// 2. Draw subtle border around entire canvas
for (let x = 0; x < WIDTH; x++) {
  setPixel(x, 0, 59, 130, 246, 120);
  setPixel(x, HEIGHT - 1, 30, 58, 138, 120);
}
for (let y = 0; y < HEIGHT; y++) {
  setPixel(0, y, 59, 130, 246, 120);
  setPixel(WIDTH - 1, y, 30, 58, 138, 120);
}

// 3. Simple bitmap font renderer for titles & labels
const FONT_MAP = {
  'A': [0x70,0x88,0x88,0xF8,0x88,0x88,0x88],
  'B': [0xF0,0x88,0x88,0xF0,0x88,0x88,0xF0],
  'C': [0x78,0x84,0x80,0x80,0x80,0x84,0x78],
  'D': [0xF0,0x88,0x88,0x88,0x88,0x88,0xF0],
  'E': [0xF8,0x80,0x80,0xF0,0x80,0x80,0xF8],
  'F': [0xF8,0x80,0x80,0xF0,0x80,0x80,0x80],
  'G': [0x78,0x84,0x80,0x9C,0x84,0x84,0x78],
  'H': [0x88,0x88,0x88,0xF8,0x88,0x88,0x88],
  'I': [0x70,0x20,0x20,0x20,0x20,0x20,0x70],
  'J': [0x1C,0x08,0x08,0x08,0x88,0x88,0x70],
  'K': [0x88,0x90,0xA0,0xC0,0xA0,0x90,0x88],
  'L': [0x80,0x80,0x80,0x80,0x80,0x80,0xF8],
  'M': [0x88,0xD8,0xA8,0x88,0x88,0x88,0x88],
  'N': [0x88,0xC8,0xA8,0x98,0x88,0x88,0x88],
  'O': [0x70,0x88,0x88,0x88,0x88,0x88,0x70],
  'P': [0xF0,0x88,0x88,0xF0,0x80,0x80,0x80],
  'Q': [0x70,0x88,0x88,0x88,0xA8,0x98,0x74],
  'R': [0xF0,0x88,0x88,0xF0,0xA0,0x90,0x88],
  'S': [0x78,0x84,0x80,0x70,0x08,0x84,0x78],
  'T': [0xF8,0x20,0x20,0x20,0x20,0x20,0x20],
  'U': [0x88,0x88,0x88,0x88,0x88,0x88,0x70],
  'V': [0x88,0x88,0x88,0x88,0x88,0x50,0x20],
  'W': [0x88,0x88,0x88,0xA8,0xA8,0xD8,0x88],
  'X': [0x88,0x88,0x50,0x20,0x50,0x88,0x88],
  'Y': [0x88,0x88,0x50,0x20,0x20,0x20,0x20],
  'Z': [0xF8,0x08,0x10,0x20,0x40,0x80,0xF8],
  '0': [0x70,0x88,0x98,0xA8,0xC8,0x88,0x70],
  '1': [0x20,0x60,0x20,0x20,0x20,0x20,0x70],
  '2': [0x70,0x88,0x08,0x30,0x40,0x80,0xF8],
  '3': [0xF8,0x08,0x10,0x30,0x08,0x88,0x70],
  '4': [0x10,0x30,0x50,0x90,0xF8,0x10,0x10],
  '5': [0xF8,0x80,0xF0,0x08,0x08,0x88,0x70],
  '6': [0x38,0x40,0x80,0xF0,0x88,0x88,0x70],
  '7': [0xF8,0x08,0x10,0x20,0x40,0x40,0x40],
  '8': [0x70,0x88,0x88,0x70,0x88,0x88,0x70],
  '9': [0x70,0x88,0x88,0x78,0x08,0x10,0xE0],
  ' ': [0x00,0x00,0x00,0x00,0x00,0x00,0x00],
  '-': [0x00,0x00,0x00,0x70,0x00,0x00,0x00],
  '&': [0x30,0x48,0x30,0x4C,0x82,0x86,0x7C],
  '/': [0x08,0x10,0x10,0x20,0x20,0x40,0x80],
  '.': [0x00,0x00,0x00,0x00,0x00,0x30,0x30],
  ':': [0x00,0x30,0x30,0x00,0x30,0x30,0x00],
  '%': [0x62,0x64,0x08,0x10,0x20,0x4C,0x8C],
  '+': [0x00,0x20,0x20,0xF8,0x20,0x20,0x00],
  '•': [0x00,0x30,0x78,0x78,0x30,0x00,0x00],
  '€': [0x38,0x44,0xF8,0x40,0xF8,0x44,0x38]
};

function drawChar(char, startX, startY, scale, r, g, b, a = 255) {
  const glyph = FONT_MAP[char.toUpperCase()] || FONT_MAP[' '];
  for (let row = 0; row < 7; row++) {
    const bits = glyph[row];
    for (let col = 0; col < 5; col++) {
      if ((bits >> (7 - col)) & 1) {
        fillRect(startX + col * scale, startY + row * scale, scale, scale, r, g, b, a);
      }
    }
  }
}

function drawText(text, x, y, scale, r, g, b, a = 255) {
  let curX = x;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    drawChar(c, curX, y, scale, r, g, b, a);
    curX += (5 + 1) * scale;
  }
}

// 4. Logo Icon Card (Calculator shape) at (80, 80)
drawRoundedRect(80, 80, 72, 72, 18, 37, 99, 235, 255); // Blue gradient base
drawRoundedRect(84, 84, 64, 64, 14, 59, 130, 246, 255); // Lighter blue

// Calculator screen inside icon
fillRect(98, 96, 36, 12, 238, 242, 255, 255);
// Calculator keys
fillRect(98, 116, 9, 8, 219, 234, 254, 255);
fillRect(111, 116, 9, 8, 219, 234, 254, 255);
fillRect(125, 116, 9, 8, 219, 234, 254, 255);
fillRect(98, 129, 9, 8, 219, 234, 254, 255);
fillRect(111, 129, 9, 8, 239, 68, 68, 255); // Red button
fillRect(125, 129, 9, 8, 34, 197, 94, 255); // Green = button

// Top Kicker Pill
drawRoundedRect(175, 96, 360, 36, 18, 30, 58, 138, 220);
drawText("AI ESTIMATOR • PREVENTIVI 2026", 195, 107, 2, 147, 197, 253);

// Main Title
drawText("PREVENTIVO CASA", 80, 185, 9, 255, 255, 255);
drawText("& FAI DA TE AI", 80, 260, 9, 96, 165, 250);

// Subtitle (large clean letters)
drawText("CONFRONTA FAI DA TE E PROFESSIONISTA", 80, 345, 3, 203, 213, 225);
drawText("CALCOLO MATERIALI, SFRIDO, ATTREZZI E IVA", 80, 375, 3, 148, 163, 184);

// 3 Feature Cards along bottom
// Card 1: Fai da Te vs Ditta
drawRoundedRect(80, 430, 320, 140, 16, 30, 41, 59, 220);
drawRoundedRect(80, 430, 320, 140, 16, 59, 130, 246, 60);
drawText("FAI DA TE VS DITTA", 104, 455, 3, 255, 255, 255);
drawText("RISPARMIO REALE STIMATO", 104, 490, 2, 52, 211, 153);
drawText("ORE LAVORO E FATTIBILITA", 104, 515, 2, 148, 163, 184);
drawText("MATERIALI CON SFRIDO 15%", 104, 535, 2, 148, 163, 184);

// Card 2: 5 Settori & Listini
drawRoundedRect(440, 430, 320, 140, 16, 30, 41, 59, 220);
drawRoundedRect(440, 430, 320, 140, 16, 168, 85, 247, 60);
drawText("5 SETTORI EDILI", 464, 455, 3, 255, 255, 255);
drawText("TINTEGGIATURA E INFISSI", 464, 490, 2, 192, 132, 252);
drawText("PAVIMENTI, IDRAULICA, ELETTR.", 464, 515, 2, 148, 163, 184);
drawText("PREZZARI REGIONALI CON IVA", 464, 535, 2, 148, 163, 184);

// Card 3: Sicurezza & Trasparenza
drawRoundedRect(800, 430, 320, 140, 16, 30, 41, 59, 220);
drawRoundedRect(800, 430, 320, 140, 16, 14, 165, 233, 60);
drawText("100% GRATUITO", 824, 455, 3, 255, 255, 255);
drawText("NESSUNA REGISTRAZIONE", 824, 490, 2, 56, 189, 248);
drawText("NORMATIVE LOCALI IT CH DE FR ES", 824, 515, 2, 148, 163, 184);
drawText("ANALISI FOTO CON IA IN MEMORIA", 824, 535, 2, 148, 163, 184);

// Bottom bar
drawText("HTTPS://SITITICINO.CH/SVILUPPO-APP • PREVENTIVOCASA.APP", 330, 595, 2, 100, 116, 139);

// Encode as standard PNG
function createPngBuffer(width, height, rgbaBuffer) {
  // CRC32 lookup table
  const crcTable = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[i] = c;
  }
  function calcCrc(buf) {
    let crc = 0 ^ (-1);
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
    }
    return (crc ^ (-1)) >>> 0;
  }

  // Filter type 0 for each line
  const rawScanlines = Buffer.alloc(height * (1 + width * 4));
  let srcOffset = 0;
  let dstOffset = 0;
  for (let y = 0; y < height; y++) {
    rawScanlines[dstOffset++] = 0; // Filter None
    rgbaBuffer.copy(rawScanlines, dstOffset, srcOffset, srcOffset + width * 4);
    dstOffset += width * 4;
    srcOffset += width * 4;
  }

  const deflated = zlib.deflateSync(rawScanlines, { level: 9 });

  // PNG Signature: 89 50 4E 47 0D 0A 1A 0A
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth
  ihdrData[9] = 6; // Color type (RGBA)
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace

  const ihdrChunk = Buffer.concat([
    Buffer.from('IHDR'),
    ihdrData
  ]);
  const ihdrCrc = Buffer.alloc(4);
  ihdrCrc.writeUInt32BE(calcCrc(ihdrChunk), 0);

  const ihdrLen = Buffer.alloc(4);
  ihdrLen.writeUInt32BE(13, 0);

  // IDAT
  const idatChunk = Buffer.concat([
    Buffer.from('IDAT'),
    deflated
  ]);
  const idatCrc = Buffer.alloc(4);
  idatCrc.writeUInt32BE(calcCrc(idatChunk), 0);

  const idatLen = Buffer.alloc(4);
  idatLen.writeUInt32BE(deflated.length, 0);

  // IEND
  const iendChunk = Buffer.from('IEND');
  const iendCrc = Buffer.alloc(4);
  iendCrc.writeUInt32BE(calcCrc(iendChunk), 0);

  const iendLen = Buffer.alloc(4);
  iendLen.writeUInt32BE(0, 0);

  return Buffer.concat([
    sig,
    ihdrLen, ihdrChunk, ihdrCrc,
    idatLen, idatChunk, idatCrc,
    iendLen, iendChunk, iendCrc
  ]);
}

const pngBuffer = createPngBuffer(WIDTH, HEIGHT, pixels);
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
const outPath = path.join(publicDir, 'og-image.png');
fs.writeFileSync(outPath, pngBuffer);
console.log(`Successfully generated 1200x630 OG image at ${outPath} (${pngBuffer.length} bytes)`);
