import * as fs from "fs";
import { WORKFILES } from "./constants.js";

function printFilterdLines(lines: Array<string>, index: any, filter: string) {
  if (index === "none") {
    lines.forEach((line) => {
      console.log(line);
    });

    return;
  } else if (index === "regex") {
    lines.forEach((line, i) => {
      if (line.match(filter)) {
        console.log("Line: " + i + " : " + line);
      }
    });

    return;
  }

  lines.forEach((line: string, i: number) => {
    if (line.split(",")[index] === filter) {
      console.log("Line: " + i + " : " + line);
    }
  });
}

export default function filterOne(fileToWorkOn: string, filter = "none", type = "none") {
  fs.readFile(WORKFILES + fileToWorkOn, "utf8", (err, fileData) => {
    if (err) {
      console.error("Error occurred while reading the CSV file:", err);
      return;
    }

    const lines = fileData.trim().split("\n");
    if (filter === "none") {
      printFilterdLines(lines, "none", filter);
    } else if (type === "regex") {
      printFilterdLines(lines, "regex", filter);
    } else if (type === "y") {
      printFilterdLines(lines, 0, filter);
    } else if (type === "m") {
      printFilterdLines(lines, 1, filter);
    } else if (type === "d") {
      printFilterdLines(lines, 2, filter);
    } else if (type === "h") {
      printFilterdLines(lines, 3, filter);
    } else {
      printFilterdLines(lines, 4, filter);
    }
  });
}

