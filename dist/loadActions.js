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
import calculateAll from "./calculateAll.js";
import { calculateOne } from "./calulateOne.js";
import filterAll from "./filterAll.js";
import filterOne from "./filterOne.js";
import { WORKDATADIR } from "./constants.js";
import { filterLinesFn, getAllLinesFromFiles, getFilesNameFromDir, printProductivityMap, printTotalProductivityMap, serializeCSVsToObjects, } from "./lib.js";
import { lastQustionsForFilterAll, lastQustionsForFilterAllFromTo, qustionsForCalculateOne, } from "./cli.js";
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
export function loadCalculateOneWith(fileName) {
    const fileToWorkOn = WORKDATADIR + fileName;
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
export function loadFilterAllWith(filterType, filter) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield getFilesNameFromDir(WORKDATADIR);
        const lines = yield getAllLinesFromFiles(files);
        const filterdLines = filterAll(lines, filter, filterType);
        const productivity = calculateOne(serializeCSVsToObjects(filterdLines));
        filterdLines.forEach((line, index) => {
            console.log(`Line ${index}: ${line}`);
        });
        printTotalProductivityMap([productivity]);
        lastQustionsForFilterAll(filterType);
    });
}
export function loadFilterOneFile() {
    if ((process.argv[2] !== undefined && process.argv[3] !== undefined, process.argv[4] !== undefined)) {
        const fileToWorkOn = "./" + process.argv[2];
        filterOne(fileToWorkOn, process.argv[3], process.argv[4], filterLinesFn);
    }
    else {
        console.log("Please enter a file name in the current directory, and an optional uniqueBy and filterType \n Example: node filterOne.js <fileToWorkOn, required> <filter, 2020, 12, 17 or none> <filterType, y,m,d,h or none>");
    }
}
export function loadFilterAllFromToWith(filterType, filter) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield getFilesNameFromDir(WORKDATADIR);
        const lines = yield getAllLinesFromFiles(files);
        const filterdLines = filterAllFromTo(lines, filter.split(" "), filterType);
        const productivity = calculateOne(serializeCSVsToObjects(filterdLines));
        filterdLines.forEach((line, index) => {
            console.log(`Line ${index}: ${line}`);
        });
        printTotalProductivityMap([productivity]);
        lastQustionsForFilterAllFromTo(filterType);
    });
}
