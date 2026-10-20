const fs = require("fs");
const vm = require("vm");
const ROOT = "C:/Users/janto/Documents/deepseek-harness/default-workspace/web-traslados";
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(ROOT + "/assets/js/config.js", "utf8"), sandbox);
const C = sandbox.window.CONFIG;
console.log("places:", C.places.length, "| zones:", C.zones.length);
const bad = C.places.filter((p) => !C.zones.some((z) => z.id === p.zone));
console.log("zona invalida:", bad.length ? bad.map((p) => p.label).join(" | ") : "ninguno");
const seen = new Set(); const dupes = [];
C.places.forEach((p) => { const k = p.label.toLowerCase(); if (seen.has(k)) dupes.push(p.label); seen.add(k); });
console.log("duplicados:", dupes.length ? dupes.join(" | ") : "ninguno");
["miches", "higuey", "sanpedro", "bocaChica"].forEach((z) => {
  console.log(z, "=>", C.places.filter((p) => p.zone === z).map((p) => p.label).join(" / "));
});
