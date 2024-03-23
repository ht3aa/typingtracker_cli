import { lastQustionsForFilterAll } from "./cli.js";
import filterOne from "./filterOne.js";
import { filterLinesFn, printTotalProductivityMap } from "./lib.js";
export default function filterAll(filesToWorkOn, filter = "none", type = "none") {
    Promise.all(filesToWorkOn.map((file) => {
        return filterOne(file, filter, type, filterLinesFn);
    }))
        .then((results) => {
        console.log("\n\n");
        const productivities = results.map((result) => result.productivity);
        const lines = results.map((result) => result.filterdLines);
        lines.sort().flat().forEach((line, index) => console.log(`Line ${index}: ${line}`));
        printTotalProductivityMap(productivities);
        lastQustionsForFilterAll({ value: type });
    })
        .catch((err) => {
        console.log(err);
    });
}
