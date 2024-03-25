#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from "chalk";
import inquirer from "inquirer";
import { loadCalculateAll, loadCalculateOneWith, loadFilterAllFromToWith, loadFilterAllWith, } from "./loadActions.js";
import { WORKDATADIR, EXISTOPTION } from "./constants.js";
import { ActionsEnum, FilterTypesEnum } from "./enums.js";
import { getFilesNameFromDir, inquirerInputQustion } from "./lib.js";
console.log(chalk.bgBlue.white.bold(" Welcome to Productivity Tracker (Made by www.hasanweb.tech) \n\n"));
export function app() {
    return __awaiter(this, void 0, void 0, function* () {
        const answer = yield inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: "Choose an Action?",
                choices: [
                    {
                        name: "calculate all",
                        value: "calculateAll",
                        short: "You Chose calculate all",
                    },
                    {
                        name: "calculate one",
                        value: "calculateOne",
                        short: "You Chose calculate one",
                    },
                    {
                        name: "filter all",
                        value: "filterAll",
                        short: "You Chose filter all",
                    },
                    {
                        name: "filter one",
                        value: "FilterOne",
                        short: "You Chose filter one",
                    },
                    {
                        name: "filter all from to",
                        value: "filterAllFromTo",
                        short: "You Chose filter all from to",
                    },
                    EXISTOPTION,
                ],
            },
        ]);
        if (answer.action === ActionsEnum.CalculateAll) {
            loadCalculateAll();
        }
        else if (answer.action === ActionsEnum.CalculateOne) {
            qustionsForCalculateOne();
        }
        else if (answer.action === ActionsEnum.FilterAll) {
            questionsForFilters(ActionsEnum.FilterAll);
        }
        else if (answer.action === ActionsEnum.FilterOne) {
            // filterOne();
        }
        else if (answer.action === ActionsEnum.FilterAllFromTo) {
            questionsForFilters(ActionsEnum.FilterAllFromTo);
        }
    });
}
export function qustionsForCalculateOne() {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield getFilesNameFromDir(WORKDATADIR);
        const answer = yield inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: "Choose an Action",
                choices: [
                    ...files.map((file) => ({
                        name: file,
                        value: file,
                        short: "You Chose " + file,
                    })),
                    EXISTOPTION,
                ],
            },
        ]);
        if (answer.action === ActionsEnum.Exit) {
            app();
        }
        else {
            loadCalculateOneWith(answer.action);
        }
    });
}
export function questionsForFilters(filterAction) {
    return __awaiter(this, void 0, void 0, function* () {
        const answer = yield inquirer.prompt([
            {
                type: "list",
                name: "value",
                message: "Choose a filter type",
                choices: [
                    {
                        name: "none",
                        value: "none",
                        short: "You Chose none",
                    },
                    {
                        name: "year",
                        value: 0,
                        short: "You Chose year",
                    },
                    {
                        name: "month",
                        value: 1,
                        short: "You Chose month",
                    },
                    {
                        name: "day",
                        value: 2,
                        short: "You Chose day",
                    },
                    {
                        name: "hour",
                        value: 3,
                        short: "You Chose hour",
                    },
                    {
                        name: "regex",
                        value: "regex",
                        short: "You Chose regex",
                    },
                    {
                        name: "project name",
                        value: 7,
                        short: "You Chose project name",
                    },
                    EXISTOPTION,
                ],
            },
        ]);
        if (answer.value === ActionsEnum.Exit) {
            app();
        }
        else if (filterAction === ActionsEnum.FilterAll) {
            lastQustionsForFilterAll(answer.value);
        }
        else if (filterAction === ActionsEnum.FilterAllFromTo) {
            lastQustionsForFilterAllFromTo(answer.value);
        }
    });
}
export function lastQustionsForFilterAll(filterType) {
    return __awaiter(this, void 0, void 0, function* () {
        let value;
        if (filterType === FilterTypesEnum.Regex) {
            value = yield inquirerInputQustion(`Enter regex value (Note: Add , to the end of the value except for path filters, enter ${chalk.bgRed.white.bold("q")} to exit`);
        }
        else if (filterType === FilterTypesEnum.Year) {
            value = yield inquirerInputQustion(`Enter the year, enter ${chalk.bgRed.white.bold("q")} to exit`);
        }
        else if (filterType === FilterTypesEnum.Month) {
            value = yield inquirerInputQustion(`Enter the mont, enter ${chalk.bgRed.white.bold("q")} to exit`);
        }
        else if (filterType === FilterTypesEnum.Day) {
            value = yield inquirerInputQustion(`Enter the day, enter ${chalk.bgRed.white.bold("q")} to exit`);
        }
        else if (filterType === FilterTypesEnum.Hour) {
            value = yield inquirerInputQustion(`Enter the hour, enter ${chalk.bgRed.white.bold("q")} to exit`);
        }
        else if (filterType === FilterTypesEnum.ProjectName) {
            value = yield inquirerInputQustion(`Enter the project name, enter ${chalk.bgRed.white.bold("q")} to exit`);
        }
        if (value === "q") {
            questionsForFilters(ActionsEnum.FilterAll);
        }
        else {
            loadFilterAllWith(filterType, value);
        }
    });
}
export function lastQustionsForFilterAllFromTo(filterType) {
    return __awaiter(this, void 0, void 0, function* () {
        let value;
        if (filterType === FilterTypesEnum.Regex) {
            value = yield inquirerInputQustion(`Enter regex value From to (Note: Add , to the end of the value except for path filters, enter ${chalk.bgRed.white.bold("q")} to exit`);
        }
        else if (filterType === FilterTypesEnum.Year) {
            value = yield inquirerInputQustion(`Enter the year From to, enter ${chalk.bgRed.white.bold("q")} to exit`);
        }
        else if (filterType === FilterTypesEnum.Month) {
            value = yield inquirerInputQustion(`Enter the month From to, enter ${chalk.bgRed.white.bold("q")} to exit`);
        }
        else if (filterType === FilterTypesEnum.Day) {
            value = yield inquirerInputQustion(`Enter the day From to, enter ${chalk.bgRed.white.bold("q")} to exit`);
        }
        else if (filterType === FilterTypesEnum.Hour) {
            value = yield inquirerInputQustion(`Enter the hour From to, enter ${chalk.bgRed.white.bold("q")} to exit`);
        }
        if (value === "q") {
            questionsForFilters(ActionsEnum.FilterAllFromTo);
        }
        else {
            loadFilterAllFromToWith(filterType, value);
        }
    });
}
app();
