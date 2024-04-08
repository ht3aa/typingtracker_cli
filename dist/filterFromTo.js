import { FilterTypesEnum, FromToEnum } from "./enums.js";
import { serializeObjectToCSV } from "./lib.js";
export default function filterAllFromTo(lines, filter, type) {
    if (type === FilterTypesEnum.None) {
        return lines;
    }
    else if (type === FilterTypesEnum.Regex) {
        const splittedFromFilter = filter[FromToEnum.From].split(",");
        const splittedToFilter = filter[FromToEnum.To].split(",");
        return lines.filter((line) => {
            const splittedLine = serializeObjectToCSV(line).split(",");
            return (splittedFromFilter.every((value, index) => {
                // here we excpect the user to enter a regex in pattern year,month,day,hour..... so index can works fine
                return parseInt(splittedLine[index]) >= parseInt(value);
            }) &&
                splittedToFilter.every((value, index) => {
                    return parseInt(splittedLine[index]) <= parseInt(value);
                }));
        });
    }
    return lines.filter((line) => {
        return (line[type] >= parseInt(filter[FromToEnum.From]) &&
            line[type] <= parseInt(filter[FromToEnum.To]));
    });
}
