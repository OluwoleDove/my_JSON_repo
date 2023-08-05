// server.mjs
import express from 'express';
import read_json_file from './main.mjs';

const app = express();

// List of JSON files you want to serve as different endpoints
const json_files = ['wears', 'fruits', 'groceries', 'countries', 'emojis', 'kitchenette', 'states_lga', 'word_play', 'spotify_streams', 'http_methods', 'programming_languages', 'http_staus_codes', 'common_greetings', 'top_2022_NG_google_seach', 'malls_cinemas_relaxationcenters'];

app.get('/api/:filename', async (req, res) => {
  // Get the 'filename' parameter from the request URL
  let { filename } = req.params;

  // Check if the requested filename exists in the list of allowed JSON files
  if (!json_files.includes(filename)) {
    return res.status(404).json({ error: 'File not found' });
  }

  try {
    // Append '.json' extension to the filename
    filename += ".json";

    // Read the JSON file and send the data as the response
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
  console.log(`Server is running on http://localhost:${port}`);
});