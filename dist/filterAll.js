import { FilterTypesEnum } from "./enums.js";
export default function filterLines(lines, filter, type) {
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
    else if (type === FilterTypesEnum.ProjectName) {
        return lines.filter((line) => line.split(",")[type].includes(filter));
    }
    return lines.filter((line) => line.split(",")[type] === filter);
}
