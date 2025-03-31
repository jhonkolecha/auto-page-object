import * as fs from 'fs';
import * as path from 'path';

export function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function writeToFile(filePath: string, content: string) {
  fs.writeFileSync(filePath, content);
}
