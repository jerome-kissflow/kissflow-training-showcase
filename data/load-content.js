const fs = require('fs');
const path = require('path');

const SECTION_ORDER = [
  'platform-overview',
  'getting-started',
  'processes-workflows',
  'forms-expressions',
  'dataforms',
  'apps-portals',
  'boards',
  'integrations',
  'analytics-reports',
  'governance',
  'developer-hub',
  'academy',
];

const sectionsDir = path.join(__dirname, 'sections');

const brand = require('./brand.json');

function loadTrainingContent() {
  const sections = SECTION_ORDER.map((id) => {
    const filePath = path.join(sectionsDir, `${id}.json`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing section file: ${id}.json`);
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  });

  return {
    meta: {
      title: 'Kissflow Training Showcase',
      logo: brand.logo,
      favicon: brand.favicon,
      brand,
    },
    sections,
  };
}

module.exports = { loadTrainingContent, SECTION_ORDER };
