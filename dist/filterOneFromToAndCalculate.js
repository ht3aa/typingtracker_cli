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
function getFilterdLines(lines, from, to) {
    return lines.filter((line, i) => i >= from && i <= to);
}
export default function filterOneFromToAndCalculate(fileToWorkOn_1) {
    return __awaiter(this, arguments, void 0, function* (fileToWorkOn, from = "none", to = "none") {
        fs.readFile(fileToWorkOn, "utf8", (err, fileData) => {
            if (err) {
                console.error("Error occurred while reading the CSV file:", err);
                return;
            }
            const lines = fileData.trim().split("\n");
            let filteredLines = getFilterdLines(lines, from, to);
            // calculateOne(filteredLines.join("\n"), "filterOneFromToAndCalculate");
        });
    });
}
