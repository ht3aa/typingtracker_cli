import * as fs from "fs";
import { WORKFILES } from "./constants.js";
import { calculateOne } from "./calulateOne.js";
import { serializeCSVToObject } from "./lib.js";
function filterLines(lines, index, filter) {
    if (index === "none") {
        return lines;
    }
    else if (index === "regex") {
        return lines.filter((line) => {
            if (line.match(filter)) {
                return;
            }
        });
    }
    return lines.filter((line) => line.split(",")[index] === filter);
}
function printFilterdLines(lines, index, filter) {
    filterLines(lines, index, filter).forEach((line, i) => {
        console.log(`Line ${i}: ${line}`);
    });
}
export default function filterOne(fileToWorkOn, filter = "none", type = "none") {
    return new Promise((resolve) => {
        fs.readFile(WORKFILES + fileToWorkOn, "utf8", (err, fileData) => {
            if (err) {
                console.error("Error occurred while reading the CSV file:", err);
                return;
            }
            const lines = fileData.trim().split("\n");
            if (filter === "none") {
                printFilterdLines(lines, "none", filter);
            }
            else {
                printFilterdLines(lines, type, filter);
            }
            const productivity = calculateOne(serializeCSVToObject(filterLines(lines, type, filter)));
            resolve(productivity);
        });
    });
}
