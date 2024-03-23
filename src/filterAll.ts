import { FilterTypesEnum } from "./enums.js";
import { FilterIndexType, FilterTypes } from "./types.js";

export default function filterAll(
  lines: Array<string>,
  filter: string,
  type: FilterTypes,
): Array<string> {
  if (type === FilterTypesEnum.None) {
    return lines;
  } else if (type === FilterTypesEnum.Regex) {
    return lines.filter((line) => {
      if (line.match(filter)) {
        return true;
      }
    });
  }

  return lines.filter((line: string) => line.split(",")[type as FilterIndexType] === filter);
}
