import * as fs from "fs";
import { WORKDATADIR } from "./constants.js";
import { CSVToObjectType } from "./types.js";
import inquirer from "inquirer";

export function addToSum(sums: Array<number>, paths: Array<string>, row: Array<string>) {
  const index = paths.indexOf(row[7]);
  if (sums[index] === undefined) {
    sums[index] = 0;
  }
  sums[index] += Number(row[6]);
}

export function getMinsHsDsWsMsYs(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);
  const years = Math.floor(months / 12);
  return [minutes, hours, days, weeks, months, years];
}

export function serializeCSVToObject(line: string) {
  const splittedLine = line.split(",");

  const obj: CSVToObjectType = {
    year: splittedLine[0],
    month: splittedLine[1],
    day: splittedLine[2],
    hour: splittedLine[3],
    minute: splittedLine[4],
    second: splittedLine[5],
    productivitySeconds: splittedLine[6],
    path: splittedLine[7],
    commitMsg: splittedLine[8],
  };

  return obj;
}

export function serializeCSVsToObjects(lines: Array<string>): Array<CSVToObjectType> {
  const arr: Array<CSVToObjectType> = [];

  for (let i = 0; i < lines.length - 1; i++) {
    arr.push(serializeCSVToObject(lines[i]));
  }

  return arr;
}

export function serializeObjectToCSV(line: CSVToObjectType) {
  return `${line.year},${line.month},${line.day},${line.hour},${line.minute},${line.second},${line.productivitySeconds},${line.path},${line.commitMsg}`;
}

export function serializeObjectsToCSV(arr: Array<CSVToObjectType>) {
  let csv: Array<string> = [];
  arr.forEach((line) => {
    csv.push(serializeObjectToCSV(line));
  });
  return csv;
}

function formatProductivitySeconds(seconds: number) {
  const years = Math.floor(seconds / (60 * 60 * 24 * 7 * 4 * 12));
  seconds = seconds % (60 * 60 * 24 * 7 * 4 * 12);
  const months = Math.floor(seconds / (60 * 60 * 24 * 7 * 4));
  seconds = seconds % (60 * 60 * 24 * 7 * 4);
  const weeks = Math.floor(seconds / (60 * 60 * 24 * 7));
  seconds = seconds % (60 * 60 * 24 * 7);
  const days = Math.floor(seconds / (60 * 60 * 24));
  seconds = seconds % (60 * 60 * 24);
  const hours = Math.floor(seconds / (60 * 60));
  seconds = seconds % (60 * 60);
  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;

  return `
  Years: ${years}
  Months: ${months}
  Weeks: ${weeks}
  Days: ${days}
  Hours: ${hours}
  Minutes: ${minutes}
  Seconds: ${seconds}
`;
}

export function printProductivityMap(productivity: Map<string, number>) {
  productivity.forEach((value, key) => {
    console.log(key, " => ", formatProductivitySeconds(value));
  });
}

export function printTotalProductivityMap(productivityMapArr: Array<Map<string, number>>) {
  const totalProductivity = new Map();
  totalProductivity.set("total", 0);

  productivityMapArr.forEach((productivity) => {
    productivity.forEach((value) => {
      totalProductivity.set("total", (totalProductivity.get("total") ?? 0) + value);
    });
  });

  printProductivityMap(totalProductivity);
}

export function filterLinesFn(lines: Array<string>, index: any, filter: string | Array<string>) {
  if (index === "none") {
    return lines;
  } else if (index === "regex") {
    return lines.filter((line) => {
      if (line.match(filter as string)) {
        return true;
      }
    });
  }

  return lines.filter((line) => line.split(",")[index] === filter);
}

export async function getFilesNameFromDir(dir: string): Promise<Array<string>> {
  return new Promise((resolve) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }
      resolve(files);
    });
  });
}

export async function getAllLinesFromFiles(files: Array<string>): Promise<Array<string>> {
  const lines = await Promise.all(
    files.map((file: string) => {
      return new Promise((resolve) => {
        fs.readFile(WORKDATADIR + file, "utf8", (err, fileData) => {
          if (err) {
            console.error("Error occurred while reading the CSV file:", err);
            return;
          }

          resolve(fileData.trim().split("\n"));
        });
      });
    }),
  );

  return lines.flat() as Array<string>;
}

export async function getLinesFromFile(file: string): Promise<Array<string>> {
  return new Promise((resolve) => {
    fs.readFile(WORKDATADIR + file, "utf8", (err, fileData) => {
      if (err) {
        console.error("Error occurred while reading the CSV file:", err);
        return;
      }

      resolve(fileData.trim().split("\n"));
    });
  });
}

export function sortDataAsc(lines: Array<string>) {
  lines.sort((a, b) => {
    const aArr = a.split(",");
    const bArr = b.split(",");
    const aArrInt = aArr.map((str) => parseInt(str));
    const bArrInt = bArr.map((str) => parseInt(str));

    if (aArrInt[0] < bArrInt[0]) {
      return -1;
    }
    if (aArrInt[0] > bArrInt[0]) {
      return 1;
    }

    if (aArrInt[1] < bArrInt[1]) {
      return -1;
    }
    if (aArrInt[1] > bArrInt[1]) {
      return 1;
    }

    if (aArrInt[2] < bArrInt[2]) {
      return -1;
    }
    if (aArrInt[2] > bArrInt[2]) {
      return 1;
    }

    if (aArrInt[3] < bArrInt[3]) {
      return -1;
    }
    if (aArrInt[3] > bArrInt[3]) {
      return 1;
    }

    if (aArrInt[4] < bArrInt[4]) {
      return -1;
    }
    if (aArrInt[4] > bArrInt[4]) {
      return 1;
    }

    return 0;
  });
}

export async function inquirerInputQustion(msg: string) {
  const answer = await inquirer.prompt({
    type: "input",
    name: "value",
    message: msg,
  });

  return answer.value;
}

export async function printLines(lines: Array<string>) {
  lines.forEach((line: string, index: number) => {
    console.log(`Line ${index}: ${line}`);
  });
}


export function createFolderIfNotExists(folderName: string) {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
}
