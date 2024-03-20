import { lastQustionsForFilterAll } from "./cli.js";
import filterOne from "./filterOne.js";
export default function filterAll(filesToWorkOn, filter = "none", type = "none") {
    Promise.all(filesToWorkOn.map((file) => {
        filterOne(file, filter, type);
    }))
        .then(() => {
        console.log("\n\n");
        lastQustionsForFilterAll({ value: type });
    })
        .catch((err) => {
        console.log(err);
    });
}
