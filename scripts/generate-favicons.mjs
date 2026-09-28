import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const TEAL = [15, 118, 110, 255];
const CREAM = [240, 253, 250, 255];

function inCircle(x, y, cx, cy, r) {
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= r * r;
}

function inRoundRect(x, y, rx, ry, rw, rh, radius) {
  if (x < rx || x > rx + rw || y < ry || y > ry + rh) return false;
  const ix = Math.max(rx + radius, Math.min(x, rx + rw - radius));
  const iy = Math.max(ry + radius, Math.min(y, ry + rh - radius));
  if (x === ix || y === iy) return true;
  return inCircle(x, y, ix, iy, radius);
}

function sample(px, py, size, opaque) {
  const s = 32 / size;
  const x = px * s;
  const y = py * s;
  if (inCircle(x, y, 16, 16, 3.5)) return TEAL;
  if (inRoundRect(x, y, 12.5, 4, 7, 4, 2)) return CREAM;
  if (inCircle(x, y, 16, 16, 9)) return CREAM;
  if (inCircle(x, y, 16, 16, 14)) return TEAL;
  if (opaque) return TEAL;
  return [0, 0, 0, 0];
}

function raster(size, opaque) {
  const pixels = new Uint8Array(size * size * 4);
  const aa = 4;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;
      for (let oy = 0; oy < aa; oy++) {
        for (let ox = 0; ox < aa; ox++) {
          const c = sample(x + (ox + 0.5) / aa, y + (oy + 0.5) / aa, size, opaque);
          r += c[0];
          g += c[1];
          b += c[2];
          a += c[3];
        }
      }
      const n = aa * aa;
      const i = (y * size + x) * 4;
      pixels[i] = Math.round(r / n);
      pixels[i + 1] = Math.round(g / n);
      pixels[i + 2] = Math.round(b / n);
      pixels[i + 3] = Math.round(a / n);
    }
  }
  return pixels;
}

function crc32(buf) {
  let crc = ~0;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return ~crc >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crcBuf = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcBuf));
  return Buffer.concat([len, typeBuf, data, crc]);
}

function encodePng(size, pixels) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    const row = y * (size * 4 + 1);
    raw[row] = 0;
      Buffer.from(pixels.subarray(y * size * 4, (y + 1) * size * 4)).copy(raw, row + 1);
  }
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function encodeIco(pngs) {
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  const entries = [];
  const images = [];
  let offset = 6 + 16 * count;
  for (const { size, png } of pngs) {
    const entry = Buffer.alloc(16);
    entry[0] = size === 256 ? 0 : size;
    entry[1] = size === 256 ? 0 : size;
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    images.push(png);
    offset += png.length;
  }
  return Buffer.concat([header, ...entries, ...images]);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const png32 = encodePng(32, raster(32, false));
const png16 = encodePng(16, raster(16, false));
const apple = encodePng(180, raster(180, true));
const png192 = encodePng(192, raster(192, true));
const png512 = encodePng(512, raster(512, true));

writeFileSync(join(root, "public/favicon.ico"), encodeIco([
  { size: 16, png: png16 },
  { size: 32, png: png32 },
]));
writeFileSync(join(root, "public/apple-icon.png"), apple);
writeFileSync(join(root, "public/icon-192.png"), png192);
writeFileSync(join(root, "public/icon-512.png"), png512);
console.log("Wrote favicon.ico, apple-icon.png, icon-192.png and icon-512.png in public/");
