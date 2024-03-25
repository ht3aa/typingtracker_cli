import * as fs from "fs";
import { printTotalProductivityMap, serializeCSVsToObjects } from "./lib.js";
import { WORKDATADIR } from "./constants.js";
import { calculateOne } from "./calulateOne.js";
import { app } from "./cli.js";

export default function calculateAll(filesToWorkOn: Array<string>) {
  Promise.all(
    filesToWorkOn.map(async (file) => {
      return new Promise((resolve) => {
        fs.readFile(WORKDATADIR + file, "utf8", (err, fileData) => {
          if (err) {
            console.error("Error occurred while reading the CSV file:", err);
            return;
          }
          return resolve(calculateOne(serializeCSVsToObjects(fileData.split("\n"))));
        });
      });
    }),
  ).then((results: any) => {
    printTotalProductivityMap(results);
    app();
  });
}
