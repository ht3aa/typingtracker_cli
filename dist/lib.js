export function addToSum(sums, paths, row) {
    const index = paths.indexOf(row[7]);
    if (sums[index] === undefined) {
        sums[index] = 0;
    }
    sums[index] += Number(row[6]);
}
export function getMinsHsDsWsMsYs(seconds) {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);
    return [minutes, hours, days, weeks, months, years];
}
export function serializeCSVToObject(lines) {
    const arr = [];
    for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i].split(",");
        arr.push({
            year: line[0],
            month: line[1],
            day: line[2],
            hour: line[3],
            minute: line[4],
            second: line[5],
            productivitySeconds: line[6],
            path: line[7],
            commitMsg: line[8],
        });
    }
    return arr;
}
function formatProductivitySeconds(seconds) {
    const years = Math.floor(seconds / (60 * 60 * 24 * 7 * 4 * 12));
    seconds = seconds % (60 * 60 * 24 * 7 * 4 * 12);
    const months = Math.floor(seconds / (60 * 60 * 24 * 7 * 4));
    seconds = seconds % (60 * 60 * 24 * 7 * 4);
    const weeks = Math.floor(seconds / (60 * 60 * 24 * 7));
    seconds = seconds % (60 * 60 * 24 * 7);
    const days = Math.floor(seconds / (60 * 60 * 24));
    seconds = seconds % (60 * 60 * 24);
    const hours = Math.floor(seconds / (60 * 60));
    seconds = seconds % (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `
  Years: ${years}
  Months: ${months}
  Weeks: ${weeks}
  Days: ${days}
  Hours: ${hours}
  Minutes: ${minutes}
  Seconds: ${seconds}
`;
}
export function printProductivityMap(productivity) {
    productivity.forEach((value, key) => {
        console.log(key, " => ", formatProductivitySeconds(value));
    });
}
export function printTotalProductivityMap(productivityMapArr) {
    const totalProductivity = new Map();
    totalProductivity.set("total", 0);
    productivityMapArr.forEach((productivity) => {
        productivity.forEach((value) => {
            var _a;
            totalProductivity.set("total", ((_a = totalProductivity.get("total")) !== null && _a !== void 0 ? _a : 0) + value);
        });
    });
    printProductivityMap(totalProductivity);
}
