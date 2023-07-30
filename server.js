const express = require('express');
const { readFile } = require('fs/promises');
const path = require('path');

const app = express();
const jsonFilesFolderPath = path.join(__dirname, 'json_files'); // Absolute path to the folder containing JSON files

// Function to read and parse JSON files from the data folder
async function readJSONFile(filename) {
  try {
    const data = await readFile(path.join(jsonFilesFolderPath, filename));
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading file '${filename}': ${err.message}`);
    return null;
  }
}

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