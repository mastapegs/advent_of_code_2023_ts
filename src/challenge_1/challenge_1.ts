import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

type Digit =
  | "1"
  | "one"
  | "2"
  | "two"
  | "3"
  | "three"
  | "4"
  | "four"
  | "5"
  | "five"
  | "6"
  | "six"
  | "7"
  | "seven"
  | "8"
  | "eight"
  | "9"
  | "nine";

const allDigits: Digit[] = [
  "1",
  "one",
  "2",
  "two",
  "3",
  "three",
  "4",
  "four",
  "5",
  "five",
  "6",
  "six",
  "7",
  "seven",
  "8",
  "eight",
  "9",
  "nine",
];

const digitToNumber = (digit: Digit): number => {
  switch (digit) {
    case "1":
    case "one":
      return 1;
    case "2":
    case "two":
      return 2;
    case "3":
    case "three":
      return 3;
    case "4":
    case "four":
      return 4;
    case "5":
    case "five":
      return 5;
    case "6":
    case "six":
      return 6;
    case "7":
    case "seven":
      return 7;
    case "8":
    case "eight":
      return 8;
    case "9":
    case "nine":
      return 9;
    default:
      digit satisfies never;
      throw new Error("Invalid digit");
  }
};

const parseDigitsFromLine = (line: string, numbers: Digit[]): Digit[] => {
  if (line === "") return numbers;

  let newNumbers = [...numbers];
  let newLine: string | null = null;
  for (let i = 0; i < allDigits.length; i++) {
    const parsedNumber = allDigits[i];
    const valueToCheck = line.toLowerCase().slice(0, parsedNumber.length);

    if (valueToCheck !== parsedNumber) continue;

    newNumbers = [...newNumbers, parsedNumber];
    newLine = line.slice(1);
  }
  return parseDigitsFromLine(
    newLine !== null ? newLine : line.slice(1),
    newNumbers
  );
};

const calibrationValueFromLine = (line: string): number => {
  // 4. For each line, turn that line into an array of valid "digits", removing the bad characters
  const parsedDigits = parseDigitsFromLine(line, []);

  // 5. Just in case the list of digits is empty, return calibration value of 0
  if (parsedDigits.length === 0) return 0;

  // 6. If the list of digits is only 1 digit long, return the calibration value of that digit repeated twice
  if (parsedDigits.length === 1) {
    const number = digitToNumber(parsedDigits[0]);
    return Number(`${number}${number}`);
  }

  // 7. Otherwise, return the calibration value of the first and last digit
  const firstNumber = digitToNumber(parsedDigits[0]);
  const secondNumber = digitToNumber(parsedDigits[parsedDigits.length - 1]);
  return Number(`${firstNumber}${secondNumber}`);
};

export const challenge_1 = async () => {
  // 1. Grab the path to the data file
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const pathName = path.join(__dirname, "../../data/challenge_1_data.txt");

  // 2. Prepare to Read the file line by line
  const fileStream = fs.createReadStream(pathName);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  // 3. Read the file line by line, grabbing the calibration value from each line and adding it to the sum
  let calibrationValueSum = 0;
  for await (const line of rl) {
    const calibrationValue = calibrationValueFromLine(line);
    calibrationValueSum += calibrationValue;
  }

  // 8. Log the sum of all calibration values
  console.log({ calibrationValueSum });
};
