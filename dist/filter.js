import { FilterTypesEnum } from "./enums.js";
import { serializeObjectToCSV } from "./lib.js";
export default function filterLines(lines, filter, type) {
    if (type === FilterTypesEnum.Regex) {
        return lines.filter((line) => {
            if (serializeObjectToCSV(line).match(filter)) {
                return true;
            }
        });
    }
    else if (type === FilterTypesEnum.ProjectPath) {
        return lines.filter((line) => line[type].match(filter));
    }
    return lines.filter((line) => line[type] === +filter);
}
