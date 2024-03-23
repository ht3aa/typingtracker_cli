import * as fs from "fs";
import calculateAll from "./calculateAll.js";
import { calculateOne } from "./calulateOne.js";
import filterAll from "./filterAll.js";
import filterOne from "./filterOne.js";
import { WORKFILES } from "./constants.js";
import { filterLinesFn, printProductivityMap, serializeCSVToObject } from "./lib.js";
import { qustionsForCalculateOne } from "./cli.js";
import filterAllFromTo from "./filterAllFromTo.js";

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
    const productivity = calculateOne(serializeCSVToObject(fileData.split("\n")));
    printProductivityMap(productivity);
    qustionsForCalculateOne();
  });
}

export function loadFilterAllWith(filterType: string, filter: string) {
  fs.readdir(WORKFILES, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    filterAll(files, filter, filterType);
  });
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

export function loadFilterAllFromToWith(filterType: string, filter: string) {
  fs.readdir(WORKFILES, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    filterAllFromTo(files, filter.split("*"), filterType);
  });
}
