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
import { getFilesNameFromDir, inquirerInputQustion } from "./lib.js";
import { FilterTypesType } from "./types.js";

console.log(
  chalk.bgBlue.white.bold(" Welcome to Productivity Tracker (Made by www.hasanweb.tech) \n\n"),
);

export async function app() {
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
    loadCalculateAll();
  } else if (answer.action === ActionsEnum.CalculateOne) {
    getFilesForAction(ActionsEnum.CalculateOne);
  } else if (answer.action === ActionsEnum.FilterAll) {
    questionsForFilters(ActionsEnum.FilterAll);
  } else if (answer.action === ActionsEnum.FilterOne) {
    getFilesForAction(ActionsEnum.FilterOne);
  } else if (answer.action === ActionsEnum.FilterAllFromTo) {
    questionsForFilters(ActionsEnum.FilterAllFromTo);
  }
}

export async function getFilesForAction(action: string) {
  const files = await getFilesNameFromDir(WORKDATADIR);

  const answer = await inquirer.prompt([
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
  } else if (action === ActionsEnum.CalculateOne) {
    loadCalculateOneWith(answer.action);
  } else if (action === ActionsEnum.FilterOne) {
    questionsForFilters(ActionsEnum.FilterOne, answer.action);
  }
}

export async function questionsForFilters(filterAction: string, fileName?: string) {
  const answer = await inquirer.prompt([
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
  } else if (filterAction === ActionsEnum.FilterAll) {
    lastQustionsForFilter(answer.value);
  } else if (filterAction === ActionsEnum.FilterAllFromTo) {
    lastQustionsForFilterAllFromTo(answer.value);
  } else if (filterAction === ActionsEnum.FilterOne && fileName) {
    lastQustionsForFilter(answer.value, fileName);
  }
}

export async function lastQustionsForFilter(filterType: FilterTypesType, fileName?: string) {
  let value;

  if (filterType === FilterTypesEnum.Regex) {
    value = await inquirerInputQustion(
      `Enter regex value (Note: Add , to the end of the value except for path filters, enter ${chalk.bgRed.white.bold(
        "q",
      )} to exit`,
    );
  } else if (filterType === FilterTypesEnum.Year) {
    value = await inquirerInputQustion(
      `Enter the year, enter ${chalk.bgRed.white.bold("q")} to exit`,
    );
  } else if (filterType === FilterTypesEnum.Month) {
    value = await inquirerInputQustion(
      `Enter the mont, enter ${chalk.bgRed.white.bold("q")} to exit`,
    );
  } else if (filterType === FilterTypesEnum.Day) {
    value = await inquirerInputQustion(
      `Enter the day, enter ${chalk.bgRed.white.bold("q")} to exit`,
    );
  } else if (filterType === FilterTypesEnum.Hour) {
    value = await inquirerInputQustion(
      `Enter the hour, enter ${chalk.bgRed.white.bold("q")} to exit`,
    );
  } else if (filterType === FilterTypesEnum.ProjectName) {
    value = await inquirerInputQustion(
      `Enter the project name, enter ${chalk.bgRed.white.bold("q")} to exit`,
    );
  }

  if (value === ActionsEnum.Exit) {
    questionsForFilters(ActionsEnum.FilterAll);
  } else if (fileName) {
    loadFilterOne(filterType, value, fileName);
  } else {
    loadFilterAllWith(filterType, value);
  }
}

export async function lastQustionsForFilterAllFromTo(filterType: FilterTypesType) {
  let value;

  if (filterType === FilterTypesEnum.Regex) {
    value = await inquirerInputQustion(
      `Enter regex value From to (Note: Add , to the end of the value except for path filters, enter ${chalk.bgRed.white.bold(
        "q",
      )} to exit`,
    );
  } else if (filterType === FilterTypesEnum.Year) {
    value = await inquirerInputQustion(
      `Enter the year From to, enter ${chalk.bgRed.white.bold("q")} to exit`,
    );
  } else if (filterType === FilterTypesEnum.Month) {
    value = await inquirerInputQustion(
      `Enter the month From to, enter ${chalk.bgRed.white.bold("q")} to exit`,
    );
  } else if (filterType === FilterTypesEnum.Day) {
    value = await inquirerInputQustion(
      `Enter the day From to, enter ${chalk.bgRed.white.bold("q")} to exit`,
    );
  } else if (filterType === FilterTypesEnum.Hour) {
    value = await inquirerInputQustion(
      `Enter the hour From to, enter ${chalk.bgRed.white.bold("q")} to exit`,
    );
  }

  if (value === ActionsEnum.Exit) {
    questionsForFilters(ActionsEnum.FilterAllFromTo);
  } else {
    loadFilterAllFromToWith(filterType, value);
  }
}

app();
