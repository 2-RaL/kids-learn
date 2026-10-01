const fs = require('fs');

const content = fs.readFileSync('src/data/learningModulesData.ts', 'utf8');
const regex = /\{\s*"id":\s*"([^"]+)",\s*"slug":\s*"([^"]+)"/g;
let m;
const modules = [];
while ((m = regex.exec(content)) !== null) {
  modules.push({ id: m[1], slug: m[2], index: m.index });
}

console.log(`Found ${modules.length} modules:`);
for (let i = 0; i < modules.length; i++) {
  const start = modules[i].index;
  const end = (i + 1 < modules.length) ? modules[i + 1].index : content.length;
  const chunk = content.slice(start, end);
  const actTypes = (chunk.match(/"type":\s*"(select|match|sequence|sentence|command|audio-identify|tracing|flashcard)"/g) || []).length;
  const lessons = (chunk.match(/"conceptTitleAz":/g) || []).length;
  console.log(`${(i + 1).toString().padStart(2)}. [${modules[i].id.padEnd(22)}] Activities: ${actTypes}, Lessons: ${lessons}`);
}
