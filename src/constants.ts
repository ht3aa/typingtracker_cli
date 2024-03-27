import chalk from "chalk";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createFolderIfNotExists } from "./lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export const WORKDATADIR = __dirname + "/../workFiles/";

createFolderIfNotExists(WORKDATADIR);

export const EXISTOPTION = {
  name: chalk.bgRed.white.bold("Exit"),
  value: "q",
  short: "You Chose Exit",
};
