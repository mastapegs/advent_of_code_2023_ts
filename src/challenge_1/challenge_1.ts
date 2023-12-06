import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

function isCharacterANumber(char: string) {
  return !isNaN(+char);
}

const calibrationValueFromLine = (line: string): number => {
  let calibrationValueString = "";
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const charIsANumber = isCharacterANumber(char);
    if (!charIsANumber) continue;

    console.debug({ char, isCharacterANumber: charIsANumber });
    calibrationValueString = `${calibrationValueString}${char}`;
    console.debug({ calibrationValueString });
    break;
  }
  for (let i = line.length - 1; i >= 0; i--) {
    const char = line[i];
    const charIsANumber = isCharacterANumber(char);
    if (!charIsANumber) continue;

    console.debug({ char, isCharacterANumber: charIsANumber });
    calibrationValueString = `${calibrationValueString}${char}`;
    break;
  }
  console.debug({ calibrationValueString });
  return Number(calibrationValueString);
};

export const challenge_1 = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const pathName = path.join(__dirname, "../../data/sample_data.txt");

  const fileStream = fs.createReadStream(pathName);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let sum = 0;
  for await (const line of rl) {
    sum += calibrationValueFromLine(line);
  }

  console.log({ sum });
};
