const fs = require("fs");
const zlib = require("zlib");
const W = 240, H = 160;
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
const WHITE = [245, 247, 250, 255], GREY = [210, 216, 223, 255], DARK = [25, 30, 38, 255], GLASS = [30, 45, 60, 255], SILVER = [200, 205, 212, 255];
// sombra
ellipse(120, 130, 80, 11, 11, 43, 51, 40);
// ruedas (4)
ellipse(62, 108, 20, 20, ...DARK); ellipse(62, 108, 12, 12, ...SILVER); ellipse(62, 108, 5, 5, ...DARK);
ellipse(178, 108, 20, 20, ...DARK); ellipse(178, 108, 12, 12, ...SILVER); ellipse(178, 108, 5, 5, ...DARK);
// radios simples
for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; [[62,108],[178,108]].forEach(([cx,cy]) => { for (let r=2;r<11;r++) setPx(cx+Math.cos(a)*r, cy+Math.sin(a)*r, 90,95,105,255); }); }
// carroceria blanca vista lateral 3/4
poly([[28, 95], [40, 70], [90, 60], [150, 58], [200, 68], [212, 85], [210, 100], [30, 105]], ...WHITE);
poly([[28, 95], [40, 70], [90, 60], [150, 58], [200, 68], [212, 85], [210, 88], [30, 98]], ...GREY);
// techo + parabrisas + ventanas
poly([[88, 62], [140, 60], [165, 70], [95, 72]], ...GLASS);
poly([[95, 74], [130, 73], [128, 90], [92, 90]], ...GLASS);
poly([[132, 73], [160, 72], [170, 84], [132, 88]], ...GLASS);
// puerta detalle
poly([[92, 92], [128, 91], [126, 103], [94, 103]], 40, 45, 55, 255);
// aleron trasero
poly([[28, 70], [48, 66], [50, 74], [30, 78]], ...DARK);
// faro delantero + trasero
ellipse(208, 90, 5, 7, 255, 240, 180, 255);
ellipse(30, 92, 3, 6, 220, 60, 50, 255);
// brillo
poly([[40, 72], [200, 62], [200, 65], [40, 75]], 255, 255, 255, 90);
function crc32(b) { let t = crc32.t; if (!t) { t = crc32.t = new Int32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c; } } let c = 0xffffffff; for (let i = 0; i < b.length; i++) c = t[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function chunk(type, data) { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type, "ascii"), data]); const cr = Buffer.alloc(4); cr.writeUInt32BE(crc32(td)); return Buffer.concat([len, td, cr]); }
const raw = Buffer.alloc((W * 4 + 1) * H);
for (let y = 0; y < H; y++) { raw[y * (W * 4 + 1)] = 0; buf.copy(raw, y * (W * 4 + 1) + 1, y * W * 4, (y + 1) * W * 4); }
const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4); ihdr[8] = 8; ihdr[9] = 6;
const png = Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]);
fs.writeFileSync("assets/img/car.png", png);
console.log("OK car.png", png.length, "bytes", W + "x" + H);
