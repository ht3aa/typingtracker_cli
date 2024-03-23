import * as fs from "fs";
import calculateAll from "./calculateAll.js";
import { calculateOne } from "./calulateOne.js";
import filterAll from "./filterAll.js";
import filterOne from "./filterOne.js";
import { WORKFILES } from "./constants.js";
import {
  filterLinesFn,
  getAllLinesFromFiles,
  printProductivityMap,
  printTotalProductivityMap,
  serializeCSVsToObjects,
  serializeObjectsToCSV,
} from "./lib.js";
import {
  lastQustionsForFilterAll,
  lastQustionsForFilterAllFromTo,
  qustionsForCalculateOne,
} from "./cli.js";
import filterAllFromTo from "./filterAllFromTo.js";
import { CSVToObjectType, FilterTypes } from "./types.js";

export function loadCalculateAll() {
  fs.readdir("./workFiles/", (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    calculateAll(files);
  });
}

export function loadCalculateOneWith(fileName: string) {
  const fileToWorkOn = WORKFILES + fileName;

  fs.readFile(fileToWorkOn, "utf8", (err, fileData) => {
    if (err) {
      console.error("Error occurred while reading the CSV file:", err);
      return;
    }
    const productivity = calculateOne(serializeCSVsToObjects(fileData.split("\n")));
    printProductivityMap(productivity);
    qustionsForCalculateOne();
  });
}

export async function loadFilterAllWith(filterType: FilterTypes, filter: string) {
  const lines = await getAllLinesFromFiles();
  const filterdLines = filterAll(lines, filter, filterType);
  const productivity = calculateOne(serializeCSVsToObjects(filterdLines));

  filterdLines.forEach((line: string, index: number) => {
    console.log(`Line ${index}: ${line}`);
  });

  printTotalProductivityMap([productivity]);

  lastQustionsForFilterAll({ value: filterType });
}

export function loadFilterOneFile() {
  if (
    (process.argv[2] !== undefined && process.argv[3] !== undefined, process.argv[4] !== undefined)
  ) {
    const fileToWorkOn = "./" + process.argv[2];
    filterOne(fileToWorkOn, process.argv[3], process.argv[4], filterLinesFn);
  } else {
    console.log(
      "Please enter a file name in the current directory, and an optional uniqueBy and filterType \n Example: node filterOne.js <fileToWorkOn, required> <filter, 2020, 12, 17 or none> <filterType, y,m,d,h or none>",
    );
  }
}

export async function loadFilterAllFromToWith(filterType: FilterTypes, filter: string) {
  const lines = await getAllLinesFromFiles();

  const filterdLines = filterAllFromTo(lines, filter.split("*"), filterType);
  const productivity = calculateOne(serializeCSVsToObjects(filterdLines));

  filterdLines.forEach((line: string, index: number) => {
    console.log(`Line ${index}: ${line}`);
  });

  printTotalProductivityMap([productivity]);

  lastQustionsForFilterAllFromTo({ value: filterType });
}
