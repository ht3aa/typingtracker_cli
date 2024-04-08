import chalk from "chalk";
import { checkFolderIfExists } from "./lib.js";
export const WORKDATADIR = "/mnt/hasanweb/programming/workFiles/";
checkFolderIfExists(WORKDATADIR);
export const EXISTOPTION = {
    name: chalk.bgRed.white.bold("Go Back"),
    value: "q",
    short: "You Chose Exit",
};
