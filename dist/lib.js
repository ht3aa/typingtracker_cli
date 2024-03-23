var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as fs from "fs";
import { WORKFILES } from "./constants.js";
export function addToSum(sums, paths, row) {
    const index = paths.indexOf(row[7]);
    if (sums[index] === undefined) {
        sums[index] = 0;
    }
    sums[index] += Number(row[6]);
}
export function getMinsHsDsWsMsYs(seconds) {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);
    return [minutes, hours, days, weeks, months, years];
}
export function serializeCSVsToObjects(lines) {
    const arr = [];
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
export function serializeObjectToCSV(line) {
    return `${line.year},${line.month},${line.day},${line.hour},${line.minute},${line.second},${line.productivitySeconds},${line.path},${line.commitMsg}`;
}
export function serializeObjectsToCSV(arr) {
    let csv = [];
    arr.forEach((line) => {
        csv.push(serializeObjectToCSV(line));
    });
    return csv;
}
function formatProductivitySeconds(seconds) {
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
export function printProductivityMap(productivity) {
    productivity.forEach((value, key) => {
        console.log(key, " => ", formatProductivitySeconds(value));
    });
}
export function printTotalProductivityMap(productivityMapArr) {
    const totalProductivity = new Map();
    totalProductivity.set("total", 0);
    productivityMapArr.forEach((productivity) => {
        productivity.forEach((value) => {
            var _a;
            totalProductivity.set("total", ((_a = totalProductivity.get("total")) !== null && _a !== void 0 ? _a : 0) + value);
        });
    });
    printProductivityMap(totalProductivity);
}
export function filterLinesFn(lines, index, filter) {
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
export function getAllLinesFromFiles() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            fs.readdir(WORKFILES, (err, files) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.error("Error reading directory:", err);
                    return;
                }
                const lines = yield Promise.all(files.map((file) => {
                    return new Promise((resolve) => {
                        fs.readFile(WORKFILES + file, "utf8", (err, fileData) => {
                            if (err) {
                                console.error("Error occurred while reading the CSV file:", err);
                                return;
                            }
                            resolve(fileData.trim().split("\n"));
                        });
                    });
                }));
                resolve(lines.flat());
            }));
        });
    });
}
