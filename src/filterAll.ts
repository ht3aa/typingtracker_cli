import { lastQustionsForFilterAll } from "./cli.js";
import filterOne from "./filterOne.js";
import { printTotalProductivityMap } from "./lib.js";

export default function filterAll(filesToWorkOn: Array<string>, filter = "none", type = "none") {
  Promise.all(
    filesToWorkOn.map((file) => {
      return filterOne(file, filter, type);
    }),
  )
    .then((results: any) => {
      console.log("\n\n")
      printTotalProductivityMap(results as Array<Map<string, number>>);
      lastQustionsForFilterAll({ value: type });
    })
    .catch((err) => {
      console.log(err);
    });
}
