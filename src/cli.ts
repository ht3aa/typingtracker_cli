#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import {
  loadCalculateAll,
  loadCalculateOneWith,
  loadFilterAllFromToWith,
  loadFilterAllWith,
  loadFilterOne,
} from "./loadActions.js";
import { WORKDATADIR, EXISTOPTION } from "./constants.js";
import { ActionsEnum, FilterTypesEnum } from "./enums.js";
import {
  getFilesNameFromDir,
  getFilterTypeInquirerString,
  getProductivityData,
  inquirerInputQustion,
  updateDb,
} from "./lib.js";
import { ProductivityDataObjectType, FilterTypesType } from "./types.js";

console.log(chalk.bgBlue.white.bold(" Welcome to Typing Tracker (Made by www.hasanweb.tech) \n\n"));

export async function app(data: ProductivityDataObjectType[]) {
  const answer = await inquirer.prompt([
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
          value: "calculateTotals",
          short: "You Chose calculate one",
        },
        {
          name: "filter all",
          value: "filterAll",
          short: "You Chose filter all",
        },
        {
          name: "filter one",
          value: "filterOne",
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
    loadCalculateAll(data);
  } else if (answer.action === ActionsEnum.CalculateOne) {
    getFilesForAction(data, ActionsEnum.CalculateOne);
  } else if (answer.action === ActionsEnum.FilterAll) {
    questionsForFilters(data, ActionsEnum.FilterAll);
  } else if (answer.action === ActionsEnum.FilterOne) {
    getFilesForAction(data, ActionsEnum.FilterOne);
  } else if (answer.action === ActionsEnum.FilterAllFromTo) {
    questionsForFilters(data, ActionsEnum.FilterAllFromTo);
  }
}

export async function getFilesForAction(data: ProductivityDataObjectType[], action: string) {
  const files = await getFilesNameFromDir(WORKDATADIR, ["lvim.csv"]);

  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Choose a File",
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
    app(data);
  } else if (action === ActionsEnum.CalculateOne) {
    loadCalculateOneWith(data, answer.action);
  } else if (action === ActionsEnum.FilterOne) {
    questionsForFilters(data, ActionsEnum.FilterOne, answer.action);
  }
}

export async function questionsForFilters(
  data: ProductivityDataObjectType[],
  filterAction: string,
  fileName?: string,
) {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "value",
      message: "Choose a filter type",
      choices: [
        {
          name: "none",
          value: FilterTypesEnum.None,
          short: "You Chose none",
        },
        {
          name: "year",
          value: FilterTypesEnum.Year,
          short: "You Chose year",
        },
        {
          name: "month",
          value: FilterTypesEnum.Month,
          short: "You Chose month",
        },
        {
          name: "day",
          value: FilterTypesEnum.Day,
          short: "You Chose day",
        },
        {
          name: "hour",
          value: FilterTypesEnum.Hour,
          short: "You Chose hour",
        },
        {
          name: "regex",
          value: FilterTypesEnum.Regex,
          short: "You Chose regex",
        },
        {
          name: "project",
          value: FilterTypesEnum.ProjectPath,
          short: "You Chose project",
        },
        EXISTOPTION,
      ],
    },
  ]);

  if (answer.value === ActionsEnum.Exit) {
    app(data);
  } else if (filterAction === ActionsEnum.FilterAll) {
    lastQustionsForFilter(data, answer.value);
  } else if (filterAction === ActionsEnum.FilterAllFromTo) {
    lastQustionsForFilterAllFromTo(data, answer.value);
  } else if (filterAction === ActionsEnum.FilterOne && fileName) {
    lastQustionsForFilter(data, answer.value, fileName);
  }
}

export async function lastQustionsForFilter(
  data: ProductivityDataObjectType[],
  filterType: FilterTypesType,
  fileName?: string,
) {
  const qustionStr = getFilterTypeInquirerString(filterType, {
    regex: `Enter date value (example: 2022,1,1), enter ${chalk.bgRed.white.bold("q")} to exit:`,
    year: `Enter the year (example: 2024), enter ${chalk.bgRed.white.bold("q")} to exit:`,
    month: `Enter the month (example: 1), enter ${chalk.bgRed.white.bold("q")} to exit:`,
    day: `Enter the day (example: 1), enter ${chalk.bgRed.white.bold("q")} to exit:`,
    hour: `Enter the hour (example: 1), enter ${chalk.bgRed.white.bold("q")} to exit:`,
    projectPath: `Enter the project name (example: twanis/backend), enter ${chalk.bgRed.white.bold(
      "q",
    )} to exit: `,
  });

  if (!qustionStr) {
    loadFilterAllWith(data, filterType, "none");
  } else {
    let value = await inquirerInputQustion(qustionStr);
    if (value === ActionsEnum.Exit) {
      questionsForFilters(data, ActionsEnum.FilterAll);
    } else if (fileName) {
      loadFilterOne(data, filterType, value, fileName);
    } else {
      loadFilterAllWith(data, filterType, value);
    }
  }
}

export async function lastQustionsForFilterAllFromTo(
  data: ProductivityDataObjectType[],
  filterType: FilterTypesType,
) {
  const qustionStr = getFilterTypeInquirerString(filterType, {
    regex: `Enter date value From to (example: 2022,1,1 2022,1,20), enter ${chalk.bgRed.white.bold(
      "q",
    )} to exit:`,

    year: `Enter the year From to (example: 2022 2024), enter ${chalk.bgRed.white.bold(
      "q",
    )} to exit:`,
    month: `Enter the month From to (example: 1 2), enter ${chalk.bgRed.white.bold("q")} to exit:`,
    day: `Enter the day From to (example: 1 2), enter ${chalk.bgRed.white.bold("q")} to exit:`,
    hour: `Enter the hour From to (example: 1 2), enter ${chalk.bgRed.white.bold("q")} to exit:`,
  });

  if (!qustionStr) {
    loadFilterAllWith(data, filterType, "none");
  } else {
    const value = await inquirerInputQustion(qustionStr);
    if (value === ActionsEnum.Exit) {
      questionsForFilters(data, ActionsEnum.FilterAllFromTo);
    } else {
      loadFilterAllFromToWith(data, filterType, value);
    }
  }
}

async function loadData() {
  await updateDb();
  const data = await getProductivityData();
  app(data);
}

loadData();
