#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import * as fs from "fs";
import { loadCalculateAll, loadCalculateOneWith, loadFilterAllFromToWith, loadFilterAllWith } from "./loadActions.js";
import { WORKFILES } from "./constants.js";
import { FilterTypesEnum, FiltersActionEnum } from "./enums.js";

console.log(
  chalk.bgBlue.white.bold(" Welcome to Productivity Tracker (Made by www.hasanweb.tech) \n\n"),
);

const exitOption = {
  name: chalk.bgRed.white.bold("Exit"),
  value: "Exit",
  short: "You Chose Exit",
};

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
      ],
    },
  ]);

  if (answer.action === "calculateAll") {
    loadCalculateAll();
  } else if (answer.action === "calculateOne") {
    qustionsForCalculateOne();
  } else if (answer.action === "filterAll") {
    questionsForFilters(FiltersActionEnum.FilterAll);
  } else if (answer.action === "filterOne") {
    // filterOne();
  } else if (answer.action === "filterAllFromTo") {
    questionsForFilters(FiltersActionEnum.FilterAllFromTo);
  } else if (answer.action === "filterOneFromToAndCalculate") {
    // filterOneFromToAndCalculate();
  }

  inquirer.prompt.restoreDefaultPrompts();
}

export function qustionsForCalculateOne() {
  fs.readdir(WORKFILES, async (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "fileName",
        message: "Choose a file",
        choices: [
          ...files.map((file) => ({
            name: file,
            value: file,
            short: "You Chose " + file,
          })),
          exitOption,
        ],
      },
    ]);

    if (answer.fileName === "Exit") {
      app();
    } else {
      loadCalculateOneWith(answer.fileName);
    }
  });
}

export async function questionsForFilters(filterAction: string) {
  const type = await inquirer.prompt([
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
          value: "0",
          short: "You Chose year",
        },
        {
          name: "month",
          value: "1",
          short: "You Chose month",
        },
        {
          name: "day",
          value: "2",
          short: "You Chose day",
        },
        {
          name: "hour",
          value: "3",
          short: "You Chose hour",
        },
        {
          name: "regex",
          value: "regex",
          short: "You Chose regex",
        },
        exitOption,
      ],
    },
  ]);

  if (type.value === "Exit") {
    app();
  } else if (filterAction === "filterAll") {
    lastQustionsForFilterAll(type);
  } else if (filterAction === "filterAllFromTo") {
    lastQustionsForFilterAllFromTo(type);
  }
}

export async function lastQustionsForFilterAll(type: any) {
  let answer = { value: "none" };

  if (type.value === "Exit") {
    app();
  } else if (type.value === "regex") {
    answer = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: `Enter regex value (Note: Add , to the end of the value except for path filters, enter ${chalk.bgRed.white.bold(
          "q",
        )} to exit`,
      },
    ]);
  } else if (type.value === String(FilterTypesEnum.Year)) {
    answer = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: `Enter the year, enter ${chalk.bgRed.white.bold("q")} to exit`,
      },
    ]);
  } else if (type.value === String(FilterTypesEnum.Month)) {
    answer = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: `Enter the mont, enter ${chalk.bgRed.white.bold("q")} to exit`,
      },
    ]);
  } else if (type.value === String(FilterTypesEnum.Day)) {
    answer = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: `Enter the day, enter ${chalk.bgRed.white.bold("q")} to exit`,
      },
    ]);
  } else if (type.value === String(FilterTypesEnum.Hour)) {
    answer = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: `Enter the hour, enter ${chalk.bgRed.white.bold("q")} to exit`,
      },
    ]);
  }

  if (answer.value === "q") {
    questionsForFilters(FiltersActionEnum.FilterAll);
  } else {
    loadFilterAllWith(type.value, answer.value);
  }
}

export async function lastQustionsForFilterAllFromTo(type: any) {
  let answer = { value: "none" };

  if (type.value === "Exit") {
    app();
  } else if (type.value === "regex") {
    answer = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: `Enter regex value From*to (Note: Add , to the end of the value except for path filters, enter ${chalk.bgRed.white.bold(
          "q",
        )} to exit`,
      },
    ]);
  } else if (type.value === String(FilterTypesEnum.Year)) {
    answer = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: `Enter the year From*to, enter ${chalk.bgRed.white.bold("q")} to exit`,
      },
    ]);
  } else if (type.value === String(FilterTypesEnum.Month)) {
    answer = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: `Enter the month From*to, enter ${chalk.bgRed.white.bold("q")} to exit`,
      },
    ]);
  } else if (type.value === String(FilterTypesEnum.Day)) {
    answer = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: `Enter the day From*to, enter ${chalk.bgRed.white.bold("q")} to exit`,
      },
    ]);
  } else if (type.value === String(FilterTypesEnum.Hour)) {
    answer = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: `Enter the hour From*to, enter ${chalk.bgRed.white.bold("q")} to exit`,
      },
    ]);
  }

  if (answer.value === "q") {
    questionsForFilters(FiltersActionEnum.FilterAllFromTo);
  } else {
    loadFilterAllFromToWith(type.value, answer.value);
  }
}

export function qustionsForFilterOne() {}

app();
