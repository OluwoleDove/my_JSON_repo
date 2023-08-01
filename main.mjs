// main.mjs
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the full path to the 'json_dir' directory
const json_files_path = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'json_dir'
);

// Function to read and parse JSON files from the data folder
async function read_json_file(file_name) {
  try {
    // Read the contents of the JSON file and parse it as JSON data
    const data = await readFile(path.join(json_files_path, file_name));
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading file '${file_name}': ${err.message}`);
    return null;
  }
}

// Export the 'read_json_file' function to make it accessible from other modules
export default read_json_file;