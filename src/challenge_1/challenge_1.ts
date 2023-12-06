import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

function isCharacterANumber(char: string) {
  return !isNaN(+char);
}

const calibrationValueFromLine = (line: string): number => {
  let calibrationValueString = "";

  // 4. For each line find the first and last number
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const charIsANumber = isCharacterANumber(char);
    if (!charIsANumber) continue;
    calibrationValueString = `${calibrationValueString}${char}`;
    break;
  }
  for (let i = line.length - 1; i >= 0; i--) {
    const char = line[i];
    const charIsANumber = isCharacterANumber(char);
    if (!charIsANumber) continue;
    calibrationValueString = `${calibrationValueString}${char}`;
    break;
  }

  // 5. Return the calibration value
  return Number(calibrationValueString);
};

export const challenge_1 = async () => {
  // 1. Grab file containing lines with calibration values
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const pathName = path.join(__dirname, "../../data/challenge_1_data.txt");

  // 2. Prepare to read from file, line by line
  const fileStream = fs.createReadStream(pathName);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  // 3. Read each line, and extract the calibration value, and add it to sum
  let calibrationValueSum = 0;
  for await (const line of rl) {
    calibrationValueSum += calibrationValueFromLine(line);
  }

  // 6. Log the sum of all calibration values
  console.log({ calibrationValueSum });
};
