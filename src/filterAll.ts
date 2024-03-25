import { FilterTypesEnum } from "./enums.js";
import { FilterIndexType, FilterTypesType } from "./types.js";

export default function filterLines(
  lines: Array<string>,
  filter: string,
  type: FilterTypesType,
): Array<string> {
  if (type === FilterTypesEnum.None) {
    return lines;
  } else if (type === FilterTypesEnum.Regex) {
    return lines.filter((line) => {
      if (line.match(filter)) {
        return true;
      }
    });
  } else if (type === FilterTypesEnum.ProjectName) {
    return lines.filter((line: string) =>
      line.split(",")[type as FilterIndexType].includes(filter),
    );
  }

  return lines.filter((line: string) => line.split(",")[type as FilterIndexType] === filter);
}
