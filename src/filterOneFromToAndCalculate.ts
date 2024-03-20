
import * as fs from "fs";
import { calculateOne } from "./calulateOne.js";

function getFilterdLines(lines: Array<string>, from: any, to: any) {
  return lines.filter((line, i) => i >= from && i <= to);
}

export default async function filterOneFromToAndCalculate(fileToWorkOn: string, from = "none", to = "none") {
  fs.readFile(fileToWorkOn, "utf8", (err, fileData) => {
    if (err) {
      console.error("Error occurred while reading the CSV file:", err);
      return;
    }

    const lines = fileData.trim().split("\n");
    let filteredLines = getFilterdLines(lines, from, to);

    // calculateOne(filteredLines.join("\n"), "filterOneFromToAndCalculate");
  });
}

