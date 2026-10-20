const fs = require("fs");
const b = fs.readFileSync("assets/img/plane.png");
console.log("sig", Array.from(b.slice(0, 8)));
console.log("W", b.readUInt32BE(16), "H", b.readUInt32BE(20));
console.log("bytes", b.length);
