import fs from 'fs';
import path from 'path';

export function saveFile(fileName: string, content: string): string {
  const directory = path.resolve(__dirname, '../generated');
  
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  const filePath = path.resolve(directory, fileName);
  fs.writeFileSync(filePath, content);
  return filePath;
}

export function saveFileBuffer(fileName: string, fileBuffer: Buffer): string {
  const directory = path.resolve(__dirname, '../generated');
  
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  const filePath = path.resolve(directory, fileName);
  fs.writeFileSync(filePath, fileBuffer);
  return filePath;
}
