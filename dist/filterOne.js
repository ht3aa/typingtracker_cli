import * as fs from "fs";
import { WORKFILES } from "./constants.js";
function filterLines(lines, index, filter) {
    if (index === "none") {
        return lines;
    }
    else if (index === "regex") {
        return lines.filter((line) => {
            if (line.match(filter)) {
                return true;
            }
        });
    }
    return lines.filter((line) => line.split(",")[index] === filter);
}
function printFilterdLines(lines, index, filter, filterFn) {
    // filterLines(lines, index, filter).forEach((line, i) => {
    //   console.log(`Line ${i}: ${line}`);
    // });
    filterFn(lines, index, filter).forEach((line, i) => {
        console.log(`Line ${i}: ${line}`);
    });
}
export default function filterOne(fileToWorkOn, filter, type = "none", filterFn) {
    return new Promise((resolve) => {
        fs.readFile(WORKFILES + fileToWorkOn, "utf8", (err, fileData) => {
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
