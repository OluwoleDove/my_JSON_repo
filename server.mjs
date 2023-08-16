import express from 'express';
import read_json_file from './main.mjs';

const app = express();

const json_files = [
  "animals",
  "car_brands",
  "celebrations",
  "common_greetings",
  "colors",
  "countries",
  "emojis",
  "fruits",
  "groceries",
  "http_methods",
  "http_staus_codes",
  "kitchenette",
  "luxury_cars",
  "luxury_fashion",
  "malls_cinemas_relaxationcenters",
  "phone_brands",
  "programming_languages",
  "sports",
  "spotify_streams",
  "states_lga",
  "top_2022_NG_google_seach",
  "wears",
  "word_play"
];


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