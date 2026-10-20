const fs = require("fs");
const zlib = require("zlib");
// Playa RD generada: cielo, mar turquesa, arena, palmeras y sol (fondo local, sin internet)
const W = 800, H = 450;
const buf = Buffer.alloc(W * H * 4, 0);
function setPx(x, y, r, g, b, a) {
  x = Math.round(x); y = Math.round(y);
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 4;
  buf[i] = r; buf[i + 1] = g; buf[i + 2] = b; buf[i + 3] = a === undefined ? 255 : a;
}
function rect(x0, y0, x1, y1, c) { for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) setPx(x, y, ...c); }
function ellipse(cx, cy, rx, ry, c) {
  for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++)
    for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
      const dx = (x - cx) / rx, dy = (y - cy) / ry;
      if (dx * dx + dy * dy <= 1) setPx(x, y, ...c);
    }
}
// cielo degradado
for (let y = 0; y < 200; y++) {
  const k = y / 200;
  const r = Math.round(125 + (200 - 125) * k), g = Math.round(210 + (235 - 210) * k), b = Math.round(235 + (250 - 235) * k);
  rect(0, y, W, y + 1, [r, g, b]);
}
// sol + nubes
ellipse(640, 70, 34, 34, [255, 214, 120]); ellipse(640, 70, 26, 26, [255, 228, 150]);
ellipse(160, 70, 60, 18, [255, 255, 255]); ellipse(210, 62, 44, 15, [255, 255, 255]); ellipse(560, 120, 52, 15, [245, 250, 255]);
// mar turquesa con olas
for (let y = 200; y < 310; y++) {
  const k = (y - 200) / 110;
  rect(0, y, W, y + 1, [Math.round(20 + 30 * k), Math.round(165 - 20 * k), Math.round(170 - 15 * k)]);
}
for (let x = 0; x < W; x += 46) ellipse(x + ((x / 46) % 2) * 12, 252 + (x % 3) * 8, 26, 4, [255, 255, 255]);
// arena
for (let y = 310; y < H; y++) {
  const k = (y - 310) / (H - 310);
  rect(0, y, W, y + 1, [Math.round(244 - 8 * k), Math.round(228 - 10 * k), Math.round(200 - 12 * k)]);
}
// orilla espuma
for (let x = 0; x < W; x++) { const y = 310 + Math.round(Math.sin(x / 40) * 4); ellipse(x, y, 8, 3, [255, 255, 255]); }
// palmeras
function palm(cx, base) {
  for (let y = base - 120; y < base; y++) { const w = 5 - (base - y) / 60; for (let x = -w; x <= w; x++) setPx(cx + x + (base - y) * 0.08, y, 120, 84, 55); }
  const topY = base - 120, topX = cx + 10;
  for (let f = 0; f < 6; f++) {
    const a = -Math.PI / 6 + f * Math.PI / 6.5;
    for (let r = 8; r < 62; r++) {
      const x = topX + Math.cos(a) * r, y = topY + Math.sin(a) * r * 0.45 - r * 0.12;
      ellipse(x, y, 5, 3, [34, 120, 70]);
    }
  }
  ellipse(topX - 6, topY + 8, 7, 7, [110, 72, 40]); ellipse(topX + 6, topY + 8, 7, 7, [110, 72, 40]);
}
palm(120, 360); palm(690, 370); palm(420, 400);
function crc32(b) { let t = crc32.t; if (!t) { t = crc32.t = new Int32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c; } } let c = 0xffffffff; for (let i = 0; i < b.length; i++) c = t[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function chunk(type, data) { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type, "ascii"), data]); const cr = Buffer.alloc(4); cr.writeUInt32BE(crc32(td)); return Buffer.concat([len, td, cr]); }
const raw = Buffer.alloc((W * 4 + 1) * H);
for (let y = 0; y < H; y++) { raw[y * (W * 4 + 1)] = 0; buf.copy(raw, y * (W * 4 + 1) + 1, y * W * 4, (y + 1) * W * 4); }
const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4); ihdr[8] = 8; ihdr[9] = 6;
const png = Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]);
fs.writeFileSync("assets/img/punta-cana.png", png);
console.log("OK punta-cana.png", png.length, "bytes", W + "x" + H);
