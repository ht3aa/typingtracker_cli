import * as fs from "fs";
import calculateAll from "./calculateAll.js";
import { calculateOne } from "./calulateOne.js";
import filterAll from "./filterAll.js";
import filterOne from "./filterOne.js";
import filterOneAndCalculate from "./filterOneAndCalculate.js";
import filterOneFromToAndCalculate from "./filterOneFromToAndCalculate.js";
import { WORKFILES } from "./constants.js";
import { printProductivityMap, serializeCSVToObject } from "./lib.js";
import { qustionsForCalculateOne } from "./cli.js";
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
export function loadFilterAllWith(filterType, filter) {
    fs.readdir(WORKFILES, (err, files) => {
        if (err) {
            console.error("Error reading directory:", err);
            return;
        }
        filterAll(files, filter, filterType);
    });
}
export function loadFilterOneFile() {
    if ((process.argv[2] !== undefined && process.argv[3] !== undefined, process.argv[4] !== undefined)) {
        const fileToWorkOn = "./" + process.argv[2];
        filterOne(fileToWorkOn, process.argv[3], process.argv[4]);
    }
    else {
        console.log("Please enter a file name in the current directory, and an optional uniqueBy and filterType \n Example: node filterOne.js <fileToWorkOn, required> <filter, 2020, 12, 17 or none> <filterType, y,m,d,h or none>");
    }
}
export function loadFilterOneAndCalculate() {
    if ((process.argv[2] !== undefined && process.argv[3] !== undefined, process.argv[4] !== undefined)) {
        const fileToWorkOn = WORKFILES + process.argv[2];
        filterOneAndCalculate(fileToWorkOn, process.argv[3], process.argv[4]);
    }
    else {
        console.log("Please enter a file name in the current directory, and an optional uniqueBy and filterType \n Example: node getYMDHourOne.js <fileToWorkOn, required> <filter, 2020, 12, 17 or none> <filterType, y,m,d,h or none>");
    }
}
export function loadFilterOneFromToAndCalculate() {
    if ((process.argv[2] !== undefined && process.argv[3] !== undefined, process.argv[4] !== undefined)) {
        const fileToWorkOn = WORKFILES + process.argv[2];
        filterOneFromToAndCalculate(fileToWorkOn, process.argv[3], process.argv[4]);
    }
    else {
        console.log("Please enter a file name in the current directory, and an optional uniqueBy and filterType \n Example: node getYMDHourOne.js <fileToWorkOn, required> <filterType, y,m,d,h or none> <From index, number> <To index, number>");
    }
}
