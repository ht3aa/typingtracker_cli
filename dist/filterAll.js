import { FilterTypesEnum } from "./enums.js";
export default function filterAll(lines, filter, type) {
    if (type === FilterTypesEnum.None) {
        return lines;
    }
    else if (type === FilterTypesEnum.Regex) {
        return lines.filter((line) => {
            if (line.match(filter)) {
                return true;
            }
        });
    }
    return lines.filter((line) => line.split(",")[type] === filter);
}
