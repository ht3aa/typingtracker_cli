var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as fs from "fs";
import { printTotalProductivityMap, serializeCSVsToObjects } from "./lib.js";
import { WORKFILES } from "./constants.js";
import { calculateOne } from "./calulateOne.js";
import { app } from "./cli.js";
export default function calculateAll(filesToWorkOn) {
    Promise.all(filesToWorkOn.map((file) => __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            fs.readFile(WORKFILES + file, "utf8", (err, fileData) => {
                if (err) {
                    console.error("Error occurred while reading the CSV file:", err);
                    return;
                }
                return resolve(calculateOne(serializeCSVsToObjects(fileData.split("\n"))));
            });
        });
    }))).then((results) => {
        printTotalProductivityMap(results);
        app();
    });
}
