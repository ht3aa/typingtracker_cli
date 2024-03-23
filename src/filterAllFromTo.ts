import { lastQustionsForFilterAllFromTo } from "./cli.js";
import filterOne from "./filterOne.js";
import { printTotalProductivityMap } from "./lib.js";

export default function filterAllFromTo(
  filesToWorkOn: Array<string>,
  filter: Array<string>,
  type = "none",
) {
  Promise.all(
    filesToWorkOn.map((file) => {
      return filterOne(
        file,
        filter,
        type,
        (lines: Array<string>, index: any, filter: string | Array<string>) => {
          if (index === "none") {
            return lines;
          } else if (index === "regex") {
            // return lines.filter((line) => {
            //   if (line.match(filter as string)) {
            //     return true;
            //   }
            // });
            const sortedLines = lines.sort((a,b) => {
              const aArr = a.split(",");
              const bArr = b.split(",");
              return parseInt(aArr[0]) - parseInt(bArr[0]) && parseInt(aArr[1]) - parseInt(bArr[1]);
            });
            return sortedLines;
            // for (let i = 0; i < lines.length; i++) {
            //   const from = filter[0].split(",");
            //   const to = filter[1].split(",");
            //   const lineArr = lines[i].split(",");

            //   return lineArr.filter((field) => {
            //     const fieldInt = parseInt(field);
            //     if (
            //       from.some((el) => parseInt(el) >= fieldInt) &&
            //       to.some((el) => parseInt(el) <= fieldInt)
            //     ) {
            //       return true;
            //     }
            //   });
            // }
          }

          return lines.filter((line) => {
            const from = parseInt(filter[0]);
            const to = parseInt(filter[1]);
            const lineArr = line.split(",");

            const fieldInt = parseInt(lineArr[index]);
            if (fieldInt >= from && fieldInt <= to) {
              return true;
            }
          });
        },
      );
    }),
  )
    .then((results: any) => {
      console.log("\n\n");
      printTotalProductivityMap(results as Array<Map<string, number>>);
      lastQustionsForFilterAllFromTo({ value: type });
    })
    .catch((err) => {
      console.log(err);
    });
}
