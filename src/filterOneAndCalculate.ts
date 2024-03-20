import * as fs from "fs";
import { calculateOne } from "./calulateOne.js";

function getFilterdLines(lines: Array<string>, index: any, filter: string) {
  return lines.filter((line) => {
    if (line.split(",")[index] === filter) {
      return true;
    }
  });
}

export default async function filterOneAndCalculate(fileToWorkOn: string, filter = "none", type = "none") {
  fs.readFile(fileToWorkOn, "utf8", (err, fileData) => {
    if (err) {
      console.error("Error occurred while reading the CSV file:", err);
      return;
    }

    const lines = fileData.trim().split("\n");
    let filteredLines: Array<string> = [];
    if (filter === "none") {
      lines.forEach((line) => {
        console.log(line);
      });
    } else if (type === "y") {
      filteredLines = getFilterdLines(lines, 0, filter);
    } else if (type === "m") {
      filteredLines = getFilterdLines(lines, 1, filter);
    } else if (type === "d") {
      filteredLines = getFilterdLines(lines, 2, filter);
    } else if (type === "h") {
      filteredLines = getFilterdLines(lines, 3, filter);
    } else {
      filteredLines = getFilterdLines(lines, 4, filter);
    }

    // calculateOne(filteredLines.join("\n"));
  });
}

