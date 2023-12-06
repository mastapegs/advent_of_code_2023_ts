import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

type ParsedNumber =
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

const allParsedNumbers: ParsedNumber[] = [
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

const parsedNumberToNumber = (parsedNumber: ParsedNumber): number => {
  switch (parsedNumber) {
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
      parsedNumber satisfies never;
      throw new Error("Invalid parsed number");
  }
};

const parseNumbersFromLine = (
  line: string,
  numbers: ParsedNumber[]
): ParsedNumber[] => {
  if (line === "") return numbers;

  let newNumbers = [...numbers];
  let newLine: string | null = null;
  for (let i = 0; i < allParsedNumbers.length; i++) {
    const parsedNumber = allParsedNumbers[i];
    const valueToCheck = line.toLowerCase().slice(0, parsedNumber.length);

    if (valueToCheck !== parsedNumber) continue;

    newNumbers = [...newNumbers, parsedNumber];
    newLine = line.slice(1);
  }
  return parseNumbersFromLine(
    newLine !== null ? newLine : line.slice(1),
    newNumbers
  );
};

const calibrationValueFromLine = (line: string): number => {
  const parsedNumbers = parseNumbersFromLine(line, []);
  if (parsedNumbers.length === 0) return 0;
  if (parsedNumbers.length === 1) {
    const number = parsedNumberToNumber(parsedNumbers[0]);
    return Number(`${number}${number}`);
  }
  const firstNumber = parsedNumberToNumber(parsedNumbers[0]);
  const secondNumber = parsedNumberToNumber(
    parsedNumbers[parsedNumbers.length - 1]
  );
  return Number(`${firstNumber}${secondNumber}`);
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
  let counter = 0;
  let calibrationValueSum = 0;
  for await (const line of rl) {
    counter++;
    const calibrationValue = calibrationValueFromLine(line);
    calibrationValueSum += calibrationValue;
  }

  // 6. Log the sum of all calibration values
  console.log({ calibrationValueSum });
};
