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
import { WORKDATADIR } from "./constants.js";
import inquirer from "inquirer";
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
export function serializeCSVToObject(line) {
    const splittedLine = line.split(",");
    const obj = {
        year: splittedLine[0],
        month: splittedLine[1],
        day: splittedLine[2],
        hour: splittedLine[3],
        minute: splittedLine[4],
        second: splittedLine[5],
        productivitySeconds: splittedLine[6],
        path: splittedLine[7],
        commitMsg: splittedLine[8],
    };
    return obj;
}
export function serializeCSVsToObjects(lines) {
    const arr = [];
    for (let i = 0; i < lines.length - 1; i++) {
        arr.push(serializeCSVToObject(lines[i]));
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
export function getFilesNameFromDir(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            fs.readdir(dir, (err, files) => {
                if (err) {
                    console.error("Error reading directory:", err);
                    return;
                }
                resolve(files);
            });
        });
    });
}
export function getAllLinesFromFiles(files) {
    return __awaiter(this, void 0, void 0, function* () {
        const lines = yield Promise.all(files.map((file) => {
            return new Promise((resolve) => {
                fs.readFile(WORKDATADIR + file, "utf8", (err, fileData) => {
                    if (err) {
                        console.error("Error occurred while reading the CSV file:", err);
                        return;
                    }
                    resolve(fileData.trim().split("\n"));
                });
            });
        }));
        return lines.flat();
    });
}
export function getLinesFromFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            fs.readFile(WORKDATADIR + file, "utf8", (err, fileData) => {
                if (err) {
                    console.error("Error occurred while reading the CSV file:", err);
                    return;
                }
                resolve(fileData.trim().split("\n"));
            });
        });
    });
}
export function sortDataAsc(lines) {
    lines.sort((a, b) => {
        const aArr = a.split(",");
        const bArr = b.split(",");
        const aArrInt = aArr.map((str) => parseInt(str));
        const bArrInt = bArr.map((str) => parseInt(str));
        if (aArrInt[0] < bArrInt[0]) {
            return -1;
        }
        if (aArrInt[0] > bArrInt[0]) {
            return 1;
        }
        if (aArrInt[1] < bArrInt[1]) {
            return -1;
        }
        if (aArrInt[1] > bArrInt[1]) {
            return 1;
        }
        if (aArrInt[2] < bArrInt[2]) {
            return -1;
        }
        if (aArrInt[2] > bArrInt[2]) {
            return 1;
        }
        if (aArrInt[3] < bArrInt[3]) {
            return -1;
        }
        if (aArrInt[3] > bArrInt[3]) {
            return 1;
        }
        if (aArrInt[4] < bArrInt[4]) {
            return -1;
        }
        if (aArrInt[4] > bArrInt[4]) {
            return 1;
        }
        return 0;
    });
}
export function inquirerInputQustion(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        const answer = yield inquirer.prompt({
            type: "input",
            name: "value",
            message: msg,
        });
        return answer.value;
    });
}
export function printLines(lines) {
    return __awaiter(this, void 0, void 0, function* () {
        lines.forEach((line, index) => {
            console.log(`Line ${index}: ${line}`);
        });
    });
}
export function createFolderIfNotExists(folderName) {
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
    }
}
