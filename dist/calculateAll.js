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
import { printProductivityMap, serializeCSVToObject } from "./lib.js";
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
                return resolve(calculateOne(serializeCSVToObject(fileData.split("\n"))));
            });
        });
    }))).then((results) => {
        const productivityMapArr = results;
        ;
        const totalProductivity = new Map();
        totalProductivity.set("total", 0);
        productivityMapArr.forEach((productivity) => {
            productivity.forEach((value) => {
                var _a;
                totalProductivity.set("total", ((_a = totalProductivity.get("total")) !== null && _a !== void 0 ? _a : 0) + value);
            });
        });
        printProductivityMap(totalProductivity);
        app();
    });
}
