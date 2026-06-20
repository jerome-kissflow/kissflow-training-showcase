const fs = require('fs');
const path = require('path');
const { loadTrainingContent } = require('../data/load-content');

const outDir = path.join(__dirname, '../public/data');
fs.mkdirSync(outDir, { recursive: true });

const content = loadTrainingContent();
const outFile = path.join(outDir, 'content.json');

fs.writeFileSync(outFile, JSON.stringify(content, null, 2));
console.log(`Built ${outFile} (${content.sections.length} sections)`);
