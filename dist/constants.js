import chalk from "chalk";
import { checkFolderIfExists } from "./lib.js";
export const WORKDATADIR = "/tmp/typingtracker/workFiles/";
checkFolderIfExists(WORKDATADIR);
export const EXISTOPTION = {
    name: chalk.bgRed.white.bold("Exit"),
    value: "q",
    short: "You Chose Exit",
};
