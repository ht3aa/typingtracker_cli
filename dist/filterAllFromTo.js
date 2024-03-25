import { FilterTypesEnum, FromToEnum } from "./enums.js";
import { sortData } from "./lib.js";
export default function filterAllFromTo(lines, filter, type) {
    if (type === FilterTypesEnum.None) {
        return lines;
    }
    else if (type === FilterTypesEnum.Regex) {
        sortData(lines);
        const splittedFromFilter = filter[FromToEnum.From].split(",");
        const splittedToFilter = filter[FromToEnum.To].split(",");
        return lines.filter((line) => {
            const splittedLine = line.split(",");
            return (splittedFromFilter.every((value, index) => {
                return parseInt(splittedLine[index]) >= parseInt(value);
            }) &&
                splittedToFilter.every((value, index) => {
                    return parseInt(splittedLine[index]) <= parseInt(value);
                }));
        });
    }
    return lines.filter((line) => {
        const splittedLine = line.split(",");
        return (parseInt(splittedLine[type]) >= parseInt(filter[FromToEnum.From]) &&
            parseInt(splittedLine[type]) <= parseInt(filter[FromToEnum.To]));
    });
}
