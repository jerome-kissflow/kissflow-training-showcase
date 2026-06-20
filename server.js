const express = require('express');
const path = require('path');
const { loadTrainingContent } = require('./data/load-content');

const app = express();
const PORT = process.env.PORT || 3000;

const trainingContent = loadTrainingContent();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/data/content.json', (_req, res) => {
  res.json(trainingContent);
});

app.get('/api/content', (_req, res) => {
  res.json(trainingContent);
});

app.get('/api/sections', (_req, res) => {
  res.json(
    trainingContent.sections.map(({ id, title, icon, color, slides }) => ({
      id,
      title,
      icon,
      color,
      slideCount: slides.length,
    }))
  );
});

app.get('/api/sections/:sectionId', (req, res) => {
  const section = trainingContent.sections.find((s) => s.id === req.params.sectionId);
  if (!section) return res.status(404).json({ error: 'Section not found' });
  res.json(section);
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  const totalSlides = trainingContent.sections.reduce((n, s) => n + s.slides.length, 0);
  console.log(`Kissflow Training Showcase running at http://localhost:${PORT}`);
  console.log(`${trainingContent.sections.length} sections, ${totalSlides} slides`);
});
