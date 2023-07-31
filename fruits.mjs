// fruits.mjs
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const jsonFilesFolderPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'json_dir'
);

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

export default readJSONFile;