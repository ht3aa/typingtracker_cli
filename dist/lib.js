import * as fs from "fs";
import { WORKDATADIR } from "./constants.js";
import inquirer from "inquirer";
import chalk from "chalk";
import { productivityDataSource } from "./typeorm.config.js";
import { Productivity } from "./entities/productivity.entity.js";
import { Languages } from "./entities/language.entity.js";
import { FilterTypesEnum } from "./enums.js";
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
export function serializeCSVToObject(line, dim) {
    const splittedLine = line.split(dim);
    const obj = {
        year: +splittedLine[0] || 0,
        month: +splittedLine[1] || 0,
        day: +splittedLine[2] || 0,
        hour: +splittedLine[3] || 0,
        minute: +splittedLine[4] || 0,
        second: +splittedLine[5] || 0,
        productivitySeconds: +splittedLine[6] || 0,
        timeSpentInLvim: +splittedLine[7] || 0,
        timeSpentThinkingOrSearching: +splittedLine[8] || 0,
        projectPath: splittedLine[9] || "",
        commitMsg: splittedLine[10] || "",
        languagesAndThereProductivity: splittedLine[11] || "",
    };
    return obj;
}
export function serializeCSVsToObjects(lines, dim) {
    const arr = [];
    for (let i = 0; i < lines.length; i++) {
        arr.push(serializeCSVToObject(lines[i], dim));
    }
    return arr;
}
export function serializeObjectToCSV(line) {
    return `${line.year},${line.month},${line.day},${line.hour},${line.minute},${line.seconds},${line.totalTimeInVim},${line.totalTimeSpentThinkingOrSearching},${line.totalProductivityInSeconds},${line.projectPath},${line.commitMsg},${line.languages
        .map((lang) => lang.language + "=" + lang.productivityInSeconds)
        .join("|")}`;
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
    return `${years}/${months}/${days}  ${hours}:${minutes}:${seconds}`;
}
export function printProductivityMap(productivity) {
    productivity.forEach((value, key) => {
        console.log(key, " => ", formatProductivitySeconds(value));
    });
}
export function getTotalProductivityMap(productivityMapArr, key) {
    const totalProductivity = new Map();
    productivityMapArr.forEach((productivity) => {
        productivity.forEach((value) => {
            totalProductivity.set(key, (totalProductivity.get(key) ?? 0) + value);
        });
    });
    return totalProductivity;
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
export async function getProductivityData() {
    if (!productivityDataSource.isInitialized) {
        await productivityDataSource.initialize();
    }
    const data = (await productivityDataSource.getRepository("productivity").find({
        relations: ["languages"],
    }));
    return data;
}
export function serializeLanguagesDataToObjects(line, dim) {
    const splittedLine = line.split(dim);
    return splittedLine.map((element) => {
        const [language, productivity] = element.split("=");
        const obj = {
            language: language,
            productivity: +productivity,
        };
        return obj;
    });
}
export async function getFilesNameFromDir(dir, except) {
    return new Promise((resolve) => {
        fs.readdir(dir, (err, files) => {
            if (err) {
                console.error("Error reading directory:", err);
                return;
            }
            if (except.length > 0) {
                files = files.filter((file) => !except.includes(file));
            }
            resolve(files);
        });
    });
}
export async function getAllLinesFromFiles(files) {
    const lines = await Promise.all(files.map((file) => {
        return new Promise((resolve) => {
            fs.readFile(WORKDATADIR + file, "utf8", (err, fileData) => {
                if (err) {
                    console.error("Error occurred while reading the CSV file:", err);
                    return;
                }
                resolve(fileData == "" ? [] : fileData.trim().split("\n"));
            });
        });
    }));
    return lines.flat();
}
export async function getLinesFromFile(file) {
    return new Promise((resolve) => {
        fs.readFile(WORKDATADIR + file, "utf8", (err, fileData) => {
            if (err) {
                console.error("Error occurred while reading the CSV file:", err);
                return;
            }
            resolve(fileData.trim().split("\n"));
        });
    });
}
export function sortDataAsc(lines) {
    lines.sort((a, b) => {
        if (a.year < b.year) {
            return -1;
        }
        if (a.year > b.year) {
            return 1;
        }
        if (a.month < b.month) {
            return -1;
        }
        if (a.month > b.month) {
            return 1;
        }
        if (a.day < b.day) {
            return -1;
        }
        if (a.day > b.day) {
            return 1;
        }
        if (a.hour < b.hour) {
            return -1;
        }
        if (a.hour > b.hour) {
            return 1;
        }
        if (a.minute < b.minute) {
            return -1;
        }
        if (a.minute > b.minute) {
            return 1;
        }
        return 0;
    });
}
export async function inquirerInputQustion(msg) {
    const answer = await inquirer.prompt({
        type: "input",
        name: "value",
        message: msg,
    });
    return answer.value;
}
export async function printLines(lines) {
    lines.forEach((line, index) => {
        console.log(`Line ${index}: ${serializeObjectToCSV(line)}`);
    });
}
export function checkFolderIfExists(folderName) {
    if (!fs.existsSync(folderName)) {
        console.log(chalk.bgRed.white.bold(`Folder ${folderName} does not exists. follow README.md of this repository https://github.com/ht3aa/typingtracker_cli`));
    }
}
async function emptyFiles(files) {
    files.forEach(async (file) => {
        fs.writeFileSync(WORKDATADIR + file, "");
    });
}
async function insertLinesToDB(lines) {
    lines.forEach(async (line) => {
        const newProductivityRow = new Productivity();
        newProductivityRow.year = line.year;
        newProductivityRow.month = line.month;
        newProductivityRow.day = line.day;
        newProductivityRow.hour = line.hour;
        newProductivityRow.minute = line.minute;
        newProductivityRow.seconds = line.second;
        newProductivityRow.totalProductivityInSeconds = line.productivitySeconds;
        newProductivityRow.totalTimeInVim = line.timeSpentInLvim;
        newProductivityRow.totalTimeSpentThinkingOrSearching = line.timeSpentThinkingOrSearching;
        newProductivityRow.projectPath = line.projectPath;
        newProductivityRow.commitMsg = line.commitMsg;
        await productivityDataSource.getRepository("productivity").save(newProductivityRow);
        serializeLanguagesDataToObjects(line.languagesAndThereProductivity, "$%#").forEach(async (line) => {
            if (!line.language || !line.productivity)
                return;
            const newLanguagesRow = new Languages();
            newLanguagesRow.language = line.language;
            newLanguagesRow.productivityInSeconds = line.productivity;
            newLanguagesRow.productivity = newProductivityRow;
            await productivityDataSource.getRepository("languages").save(newLanguagesRow);
        });
    });
}
export async function updateDb() {
    if (!productivityDataSource.isInitialized) {
        await productivityDataSource.initialize();
    }
    const files = await getFilesNameFromDir(WORKDATADIR, ["lvim.csv"]);
    const lines = serializeCSVsToObjects(await getAllLinesFromFiles(files), ",");
    if (lines.length > 0) {
        await insertLinesToDB(lines);
        emptyFiles(files);
    }
}
export function getFilterTypeInquirerString(filterType, msgs) {
    if (filterType === FilterTypesEnum.Regex) {
        return msgs.regex;
    }
    else if (filterType === FilterTypesEnum.Year) {
        return msgs.year;
    }
    else if (filterType === FilterTypesEnum.Month) {
        return msgs.month;
    }
    else if (filterType === FilterTypesEnum.Day) {
        return msgs.day;
    }
    else if (filterType === FilterTypesEnum.Hour) {
        return msgs.hour;
    }
    else if (msgs.projectPath && filterType === FilterTypesEnum.ProjectPath) {
        return msgs.projectPath;
    }
    return "";
}
