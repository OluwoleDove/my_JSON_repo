import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const json_files_path = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'json_dir'
);

async function read_json_file(file_name) {
  try {
    const data = await readFile(path.join(json_files_path, file_name));
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading file '${file_name}': ${err.message}`);
    return null;
  }
}

export default read_json_file;