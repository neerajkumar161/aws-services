import fs from 'node:fs';
import { promisify } from 'node:util';

export const readFilePromise = promisify(fs.readFile);
export const writeFilePromise = promisify(fs.writeFile);

// don't write file if already exists
export const createFile = async () => {
  try {
    await readFilePromise('/tmp/db.json');
    console.log('File already exists');
  } catch (error) {
    await writeFilePromise('/tmp/db.json', JSON.stringify([]));
    console.log('The file has been saved!');
  }
};
