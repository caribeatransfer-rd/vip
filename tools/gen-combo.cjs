const fs = require("fs");
const zlib = require("zlib");

const W = 800, H = 600; // 4:3 medida del hero
const buf = Buffer.alloc(W * H * 4, 0);

function setPx(x, y, r, g, b, a) {
  x = Math.round(x); y = Math.round(y);
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 4;
  if (a === undefined || a >= 255) { buf[i] = r; buf[i + 1] = g; buf[i + 2] = b; buf[i + 3] = 255; return; }
  const pa = a / 255, qa = buf[i + 3] / 255;
  const out = pa + qa * (1 - pa);
  if (out <= 0) return;
  buf[i] = Math.round((r * pa + buf[i] * qa * (1 - pa)) / out);
  buf[i + 1] = Math.round((g * pa + buf[i + 1] * qa * (1 - pa)) / out);
  buf[i + 2] = Math.round((b * pa + buf[i + 2] * qa * (1 - pa)) / out);
  buf[i + 3] = Math.round(out * 255);
}
function rect(x0, y0, x1, y1, c) { for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) setPx(x, y, c[0], c[1], c[2]); }
function ellipse(cx, cy, rx, ry, c, a) {
  for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++)
    for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
      const dx = (x - cx) / rx, dy = (y - cy) / ry;
      if (dx * dx + dy * dy <= 1) setPx(x, y, c[0], c[1], c[2], a);
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

// ============ FONDO: playa aérea estilo la foto ============
for (let y = 0; y < 240; y++) { // mar profundo arriba
  const k = y / 240;
  rect(0, y, W, y + 1, [Math.round(5 + 25 * k), Math.round(95 + 60 * k), Math.round(175 - 10 * k)]);
}
for (let y = 240; y < 400; y++) { // agua turquesa
  const k = (y - 240) / 160;
  rect(0, y, W, y + 1, [Math.round(30 + 60 * k), Math.round(180 + 30 * k), Math.round(185 + 30 * k)]);
}
for (let y = 400; y < H; y++) { // arena blanca
  const k = (y - 400) / (H - 400);
  rect(0, y, W, y + 1, [Math.round(248 - 6 * k), Math.round(240 - 8 * k), Math.round(224 - 12 * k)]);
}
// barcos y motas de arena
ellipse(240, 90, 16, 4, [255, 255, 255]); ellipse(520, 130, 12, 3, [255, 255, 255]); ellipse(360, 60, 10, 3, [255, 255, 255]);
for (let i = 0; i < 400; i++) { const x = (i * 137) % W, y = 405 + ((i * 61) % (H - 405)); setPx(x, y, 232, 220, 200, 255); }
// línea de espuma
for (let x = 0; x < W; x++) { const y = 400 + Math.round(Math.sin(x / 34) * 5); ellipse(x, y, 9, 3, [255, 255, 255], 230); }
// palmeras inferiores
function palm(cx, base) {
  for (let y = base - 130; y < base; y++) { const w = 6 - (base - y) / 50; for (let x = -w; x <= w; x++) setPx(cx + x + (base - y) * 0.07, y, 118, 84, 56); }
  const ty = base - 130, tx = cx + 9;
  for (let f = 0; f < 7; f++) {
    const a = -Math.PI / 7 + f * Math.PI / 8;
    for (let r = 10; r < 78; r++) ellipse(tx + Math.cos(a) * r, ty + Math.sin(a) * r * 0.5 - r * 0.1, 5, 3, [32, 118, 68]);
  }
}
palm(70, 560); palm(190, 590); palm(330, 575);

// ============ MAPA RD con bandera (superpuesto, esquina superior derecha) ============
// Contorno aproximado de la RD
const MAP = [[0.06,0.42],[0.13,0.30],[0.22,0.24],[0.34,0.22],[0.45,0.26],[0.55,0.22],[0.66,0.26],[0.74,0.20],[0.84,0.24],[0.92,0.34],[0.97,0.46],[0.93,0.58],[0.86,0.64],[0.80,0.74],[0.72,0.72],[0.66,0.62],[0.56,0.60],[0.48,0.66],[0.40,0.74],[0.32,0.80],[0.24,0.78],[0.20,0.66],[0.14,0.60],[0.08,0.52]];
const MX = 470, MY = 60, MW = 290, MH = 230;
const toXY = (p) => [MX + p[0] * MW, MY + p[1] * MH];
const mp = MAP.map(toXY);

// sombra + borde blanco
ellipse(MX + MW / 2, MY + MH + 10, MW / 2, 12, [0, 0, 0], 60);
for (let y = MY - 12; y < MY + MH + 14; y++)
  for (let x = MX - 12; x < MX + MW + 14; x++)
    if (inPoly(x, y, mp)) setPx(x, y, 255, 255, 255);

// bandera dentro del contorno (cruz blanca: sup-izq azul, sup-der rojo, inf-izq rojo, inf-der azul)
const cx0 = MX + MW / 2, cy0 = MY + MH / 2;
const BLUE = [10, 45, 120], RED = [206, 17, 45], WHITE = [255, 255, 255];
for (let y = MY - 5; y < MY + MH + 8; y++)
  for (let x = MX - 5; x < MX + MW + 8; x++) {
    if (!inPoly(x, y, mp)) continue;
    const left = x < cx0, top = y < cy0;
    let c;
    if (Math.abs(x - cx0) < 14 || Math.abs(y - cy0) < 14) c = WHITE;          // cruz
    else if (top) c = left ? BLUE : RED;
    else c = left ? RED : BLUE;
    setPx(x, y, c[0], c[1], c[2]);
  }
// escudo central
ellipse(cx0, cy0, 16, 20, [240, 240, 240]); ellipse(cx0, cy0, 13, 17, [35, 90, 55]);
ellipse(cx0, cy0 - 4, 6, 5, [210, 40, 60]); ellipse(cx0, cy0 + 6, 8, 4, [255, 255, 255]);

function crc32(b) { let t = crc32.t; if (!t) { t = crc32.t = new Int32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c; } } let c = 0xffffffff; for (let i = 0; i < b.length; i++) c = t[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function chunk(type, data) { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type, "ascii"), data]); const cr = Buffer.alloc(4); cr.writeUInt32BE(crc32(td)); return Buffer.concat([len, td, cr]); }
const raw = Buffer.alloc((W * 4 + 1) * H);
for (let y = 0; y < H; y++) { raw[y * (W * 4 + 1)] = 0; buf.copy(raw, y * (W * 4 + 1) + 1, y * W * 4, (y + 1) * W * 4); }
const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4); ihdr[8] = 8; ihdr[9] = 6;
const png = Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]);
fs.writeFileSync("assets/img/rd-combo.png", png);
console.log("OK rd-combo.png", png.length, "bytes", W + "x" + H);
