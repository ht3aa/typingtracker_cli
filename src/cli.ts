#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import * as fs from "fs";
import { loadCalculateAll, loadCalculateOneWith, loadFilterAllWith } from "./loadActions.js";
import { WORKFILES } from "./constants.js";

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
          name: "filter one and calculate",
          value: "filterOneAndCalculate",
          short: "You Chose filter one and calculate",
        },
        {
          name: "filter one from to and calculate",
          value: "filterOneFromToAndCalculate",
          short: "You Chose filter one from to and calculate",
        },
      ],
    },
  ]);

  if (answer.action === "calculateAll") {
    loadCalculateAll();
  } else if (answer.action === "calculateOne") {
    qustionsForCalculateOne();
  } else if (answer.action === "filterAll") {
    qustionsForFilterAll();
  } else if (answer.action === "filterOne") {
    // filterOne();
  } else if (answer.action === "filterOneAndCalculate") {
    // filterOneAndCalculate();
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

    const filesToWorkOn = files.filter(
      (file) => !file.endsWith(".js") && file !== ".git" && !file.endsWith(".txt"),
    );

    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "fileName",
        message: "Choose a file",
        choices: [
          ...filesToWorkOn.map((file) => ({
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

export async function qustionsForFilterAll() {
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
          value: "y",
          short: "You Chose year",
        },
        {
          name: "month",
          value: "m",
          short: "You Chose month",
        },
        {
          name: "day",
          value: "d",
          short: "You Chose day",
        },
        {
          name: "hour",
          value: "h",
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
  } else {
    lastQustionsForFilterAll(type);
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
  } else if (type.value === "y") {
    answer = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: `Enter the yea, enter ${chalk.bgRed.white.bold("q")} to exit`,
      },
    ]);
  } else if (type.value === "m") {
    answer = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: `Enter the mont, enter ${chalk.bgRed.white.bold("q")} to exit`,
      },
    ]);
  } else if (type.value === "d") {
    answer = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: `Enter the day, enter ${chalk.bgRed.white.bold("q")} to exit`,
      },
    ]);
  } else if (type.value === "h") {
    answer = await inquirer.prompt([
      {
        type: "input",
        name: "value",
        message: `Enter the hour, enter ${chalk.bgRed.white.bold("q")} to exit`,
      },
    ]);
  }

  if (answer.value === "q") {
    qustionsForFilterAll();
  } else {
    loadFilterAllWith(type.value, answer.value);
  }
}



export function qustionsForFilterOne() {

}

app();
