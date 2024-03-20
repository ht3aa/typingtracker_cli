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
function getFilterdLines(lines, index, filter) {
    return lines.filter((line) => {
        if (line.split(",")[index] === filter) {
            return true;
        }
    });
}
export default function filterOneAndCalculate(fileToWorkOn_1) {
    return __awaiter(this, arguments, void 0, function* (fileToWorkOn, filter = "none", type = "none") {
        fs.readFile(fileToWorkOn, "utf8", (err, fileData) => {
            if (err) {
                console.error("Error occurred while reading the CSV file:", err);
                return;
            }
            const lines = fileData.trim().split("\n");
            let filteredLines = [];
            if (filter === "none") {
                lines.forEach((line) => {
                    console.log(line);
                });
            }
            else if (type === "y") {
                filteredLines = getFilterdLines(lines, 0, filter);
            }
            else if (type === "m") {
                filteredLines = getFilterdLines(lines, 1, filter);
            }
            else if (type === "d") {
                filteredLines = getFilterdLines(lines, 2, filter);
            }
            else if (type === "h") {
                filteredLines = getFilterdLines(lines, 3, filter);
            }
            else {
                filteredLines = getFilterdLines(lines, 4, filter);
            }
            // calculateOne(filteredLines.join("\n"));
        });
    });
}
