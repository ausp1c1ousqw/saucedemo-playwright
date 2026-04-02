import path from "path";
import fs from "fs";

export function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  return path.resolve(dirPath);
}
