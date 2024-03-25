import { FilterTypesEnum, FromToEnum } from "./enums.js";
import { FilterIndexType, FilterTypesType } from "./types.js";

export default function filterAllFromTo(
  lines: Array<string>,
  filter: Array<string>,
  type: FilterTypesType,
) {
  if (type === FilterTypesEnum.None) {
    return lines;
  } else if (type === FilterTypesEnum.Regex) {
    const splittedFromFilter = filter[FromToEnum.From].split(",");
    const splittedToFilter = filter[FromToEnum.To].split(",");

    return lines.filter((line: string) => {
      const splittedLine = line.split(",");

      return (
        splittedFromFilter.every((value, index) => {
          return parseInt(splittedLine[index]) >= parseInt(value);
        }) &&
        splittedToFilter.every((value, index) => {
          return parseInt(splittedLine[index]) <= parseInt(value);
        })
      );
    });
  }

  return lines.filter((line: string) => {
    const splittedLine = line.split(",");
    return (
      parseInt(splittedLine[type as FilterIndexType]) >= parseInt(filter[FromToEnum.From]) &&
      parseInt(splittedLine[type as FilterIndexType]) <= parseInt(filter[FromToEnum.To])
    );
  });
}
