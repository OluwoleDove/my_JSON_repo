// server.mjs
import express from 'express';
import read_json_file from './main.mjs';

const app = express();

const json_files = ['wears', 'fruits', 'groceries', 'countries', 'emojis', 'kitchenette', 'states_lga', 'word_play', 'spotify_streams', 'http_methods', 'programming_languages', 'http_staus_codes', 'common_greetings', 'luxury_cars', 'luxury_fashion', 'top_2022_NG_google_seach', 'malls_cinemas_relaxationcenters'];

app.get('/api/:filename', async (req, res) => {
  let { filename } = req.params;

  if (!json_files.includes(filename)) {
    return res.status(404).json({ error: 'File not found' });
  }

  try {
    filename += ".json";

    const json_data = await read_json_file(filename);
    if (json_data === null) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.json(json_data);
  } catch (err) {
    console.error(`Error reading file '${filename}': ${err.message}`);
    res.status(500).json({ error: 'Server error' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is live on http://localhost:${port}`);
});