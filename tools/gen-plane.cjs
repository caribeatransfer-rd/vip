const fs = require("fs");
const zlib = require("zlib");

// Avión estilo referencia: fuselaje blanco/gris, cola y puntas rojas, vista 3/4
const W = 220, H = 150;
const buf = Buffer.alloc(W * H * 4, 0);

function setPx(x, y, r, g, b, a) {
  x = Math.round(x); y = Math.round(y);
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 4;
  const pa = a / 255, qa = buf[i + 3] / 255;
  const out = pa + qa * (1 - pa);
  if (out <= 0) return;
  buf[i] = Math.round((r * pa + buf[i] * qa * (1 - pa)) / out);
  buf[i + 1] = Math.round((g * pa + buf[i + 1] * qa * (1 - pa)) / out);
  buf[i + 2] = Math.round((b * pa + buf[i + 2] * qa * (1 - pa)) / out);
  buf[i + 3] = Math.round(out * 255);
}
function ellipse(cx, cy, rx, ry, r, g, b, a) {
  for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++)
    for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
      const dx = (x - cx) / rx, dy = (y - cy) / ry;
      if (dx * dx + dy * dy <= 1) setPx(x, y, r, g, b, a);
    }
}
function inPoly(x, y, p) {
  let c = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
    const xi = p[i][0], yi = p[i][1], xj = p[j][0], yj = p[j][1];
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) c = !c;
  }
  return c;
}
function poly(p, r, g, b, a) {
  const xs = p.map(q => q[0]), ys = p.map(q => q[1]);
  for (let y = Math.floor(Math.min(...ys)); y <= Math.ceil(Math.max(...ys)); y++)
    for (let x = Math.floor(Math.min(...xs)); x <= Math.ceil(Math.max(...xs)); x++)
      if (inPoly(x + .5, y + .5, p)) setPx(x, y, r, g, b, a);
}
function shade(x1, y1, x2, y2, cTop, cBot) {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
  for (let y = Math.min(y1, y2) - 40; y <= Math.max(y1, y2) + 40; y++)
    for (let x = Math.min(x1, x2) - 40; x <= Math.max(x1, x2) + 40; x++) {
      const t = ((x - x1) * dx + (y - y1) * dy) / (len * len);
      if (t < 0 || t > 1) continue;
      const px = x1 + dx * t, py = y1 + dy * t;
      if (Math.hypot(x - px, y - py) > 16) continue;
      const k = Math.max(0, Math.min(1, (y - 40) / 70));
      const r = cTop[0] + (cBot[0] - cTop[0]) * k;
      const g = cTop[1] + (cBot[1] - cTop[1]) * k;
      const b = cTop[2] + (cBot[2] - cTop[2]) * k;
      setPx(x, y, r, g, b, 255);
    }
}

const RED = [235, 64, 40, 255], RED_D = [190, 40, 26, 255];
const WHITE = [245, 247, 250, 255], GREY = [176, 188, 199, 255], GREY_D = [120, 134, 149, 255];
const GLASS = [30, 58, 80, 255];

// Sombra
ellipse(112, 132, 66, 10, 15, 76, 92, 46);
// Cola vertical roja (izquierda)
poly([[18, 62], [52, 52], [58, 78], [26, 92]], ...RED);
poly([[18, 62], [52, 52], [50, 58], [20, 68]], ...RED_D);
// Estabilizador trasero pequeño
poly([[30, 88], [66, 80], [60, 92], [28, 98]], ...RED);
// Fuselaje: banda blanca con degradado gris
shade(30, 74, 190, 52, WHITE, GREY);
ellipse(190, 52, 16, 13, ...WHITE);
ellipse(192, 54, 12, 10, 235, 242, 246, 255);
// Nariz roja
poly([[188, 40], [206, 48], [202, 60], [186, 60]], ...RED);
ellipse(203, 52, 6, 8, ...RED);
// Cabina
poly([[168, 42], [184, 38], [182, 46], [166, 49]], ...GLASS);
poly([[158, 44], [166, 42], [164, 49], [157, 50]], ...GLASS);
// Ventanillas
for (let i = 0; i < 6; i++) ellipse(96 + i * 11, 58 - i * 0.7, 4.2, 4.6, 52, 78, 100, 255);
for (let i = 0; i < 6; i++) ellipse(96 + i * 11, 58 - i * 0.7, 2.4, 2.6, 220, 232, 240, 255);
// Ala principal (abajo, en perspectiva)
poly([[96, 74], [132, 66], [108, 118], [78, 116]], 232, 236, 241, 255);
poly([[96, 74], [132, 66], [126, 76], [92, 83]], 214, 222, 231, 255);
poly([[78, 116], [108, 118], [104, 124], [76, 122]], ...RED); // punta roja
// Ala superior pequeña
poly([[104, 50], [136, 42], [128, 54], [100, 60]], 225, 231, 237, 255);
poly([[128, 42], [136, 42], [128, 54], [122, 54]], ...RED_D);
// Brillo fuselaje
poly([[34, 68], [186, 46], [186, 49], [34, 71]], 255, 255, 255, 90);

function crc32(b) {
  let t = crc32.t;
  if (!t) { t = crc32.t = new Int32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c; } }
  let c = 0xffffffff;
  for (let i = 0; i < b.length; i++) c = t[(c ^ b[i]) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const cr = Buffer.alloc(4); cr.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, cr]);
}
const raw = Buffer.alloc((W * 4 + 1) * H);
for (let y = 0; y < H; y++) { raw[y * (W * 4 + 1)] = 0; buf.copy(raw, y * (W * 4 + 1) + 1, y * W * 4, (y + 1) * W * 4); }
const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4); ihdr[8] = 8; ihdr[9] = 6;
const png = Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]);
fs.writeFileSync("assets/img/plane.png", png);
console.log("OK plane.png", png.length, "bytes", W + "x" + H);

