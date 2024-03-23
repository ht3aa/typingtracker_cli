import * as fs from "fs";
import { WORKFILES } from "./constants.js";
import { CSVToObjectType } from "./types.js";

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

export function serializeCSVsToObjects(lines: Array<string>) {
  const arr: Array<CSVToObjectType> = [];

  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i].split(",");
    arr.push({
      year: line[0],
      month: line[1],
      day: line[2],
      hour: line[3],
      minute: line[4],
      second: line[5],
      productivitySeconds: line[6],
      path: line[7],
      commitMsg: line[8],
    });
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

export async function getAllLinesFromFiles(): Promise<Array<string>> {
  return new Promise((resolve) => {
    fs.readdir(WORKFILES, async (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }

      const lines = await Promise.all(
        files.map((file) => {
          return new Promise((resolve) => {
            fs.readFile(WORKFILES + file, "utf8", (err, fileData) => {
              if (err) {
                console.error("Error occurred while reading the CSV file:", err);
                return;
              }

              resolve(fileData.trim().split("\n"));
            });
          });
        }),
      );
      resolve(lines.flat() as Array<string>);
    });
  });
}
