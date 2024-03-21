import { lastQustionsForFilterAll } from "./cli.js";
import filterOne from "./filterOne.js";
import { printTotalProductivityMap } from "./lib.js";
export default function filterAll(filesToWorkOn, filter = "none", type = "none") {
    Promise.all(filesToWorkOn.map((file) => {
        return filterOne(file, filter, type);
    }))
        .then((results) => {
        console.log("\n\n");
        printTotalProductivityMap(results);
        lastQustionsForFilterAll({ value: type });
    })
        .catch((err) => {
        console.log(err);
    });
}
