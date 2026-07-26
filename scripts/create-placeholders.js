const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "public", "img");
fs.mkdirSync(dir, { recursive: true });

const files = ["hero", "intro", "story-1", "story-2", "story-3", "coaching", "philosophy", "contact"];
const colors = [
  ["#0d9488", "#c9a227"],
  ["#14b8a6", "#1a1a1a"],
  ["#c9a227", "#0d9488"],
  ["#1a1a1a", "#14b8a6"],
  ["#0d9488", "#faf9f7"],
  ["#14b8a6", "#c9a227"],
  ["#c9a227", "#14b8a6"],
  ["#0a0a0b", "#0d9488"],
];

files.forEach((name, i) => {
  const [c1, c2] = colors[i % colors.length];
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#g)"/>
  <text x="600" y="400" dominant-baseline="middle" text-anchor="middle" fill="white" fill-opacity="0.35" font-family="Arial,sans-serif" font-size="48">${name}</text>
</svg>`;
  fs.writeFileSync(path.join(dir, `${name}.svg`), svg);
});

console.log(`Created ${files.length} placeholders in public/img/`);
