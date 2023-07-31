// server.mjs
import express from 'express';
import readJSONFile from './fruits.mjs';

const app = express();

// API endpoint to get the JSON file content
app.get('/api/myjson', async (req, res) => {
  const filename = 'fruits.json';

  try {
    const jsonData = await readJSONFile(filename);
    if (jsonData === null) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.json(jsonData);
  } catch (err) {
    console.error(`Error reading file '${filename}': ${err.message}`);
    res.status(500).json({ error: 'Server error' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});