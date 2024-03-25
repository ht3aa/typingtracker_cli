import * as fs from "fs";
import { WORKDATADIR } from "./constants.js";
import { calculateOne } from "./calulateOne.js";
import { serializeCSVsToObjects } from "./lib.js";
import { FilterFnType } from "./types.js";

function filterLines(lines: Array<string>, index: any, filter: string) {
  if (index === "none") {
    return lines;
  } else if (index === "regex") {
    return lines.filter((line) => {
      if (line.match(filter)) {
        return true;
      }
    });
  }

  return lines.filter((line) => line.split(",")[index] === filter);
}

function printFilterdLines(
  lines: Array<string>,
  index: any,
  filter: string | Array<string>,
  filterFn: FilterFnType,
) {
  // filterLines(lines, index, filter).forEach((line, i) => {
  //   console.log(`Line ${i}: ${line}`);
  // });

  filterFn(lines, index, filter).forEach((line, i) => {
    console.log(`Line ${i}: ${line}`);
  });
}

export default function filterOne(
  fileToWorkOn: string,
  filter: string | Array<string>,
  type = "none",
  filterFn: FilterFnType,
): Promise<{ lines: Array<string>; productivity: Map<string, number> }> {
  return new Promise((resolve) => {
    fs.readFile(WORKDATADIR + fileToWorkOn, "utf8", (err, fileData) => {
      if (err) {
        console.error("Error occurred while reading the CSV file:", err);
        return;
      }

      const lines = fileData.trim().split("\n");
      // if (filter === "none") {
      //   printFilterdLines(lines, "none", filter, filterFn);
      // } else {
      //   printFilterdLines(lines, type, filter, filterFn);
      // }

      // const productivity = calculateOne(serializeCSVToObject(filterdLines));

      // resolve({filterdLines, productivity});
    });
  });
}
