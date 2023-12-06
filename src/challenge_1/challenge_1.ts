import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

export const challenge_1 = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const pathName = path.join(__dirname, "../../data/sample_data.txt");
  console.log({ pathName });

  const fileStream = fs.createReadStream(pathName);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    console.log(`Line from file: ${line}`);
  }
};
