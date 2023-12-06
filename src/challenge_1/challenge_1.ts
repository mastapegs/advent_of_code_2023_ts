import fs from "fs";
import readline from "readline";

export const challenge_1 = async () => {
  const fileStream = fs.createReadStream("./sample_data.txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    console.log(`Line from file: ${line}`);
  }
};
