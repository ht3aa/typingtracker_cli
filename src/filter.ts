import { FilterTypesEnum } from "./enums.js";
import { serializeObjectToCSV } from "./lib.js";
import {  FilterTypesType, ProductivityDataObjectType } from "./types.js";

export default function filterLines(
  lines: Array<ProductivityDataObjectType>,
  filter: string,
  type: FilterTypesType,
): Array<ProductivityDataObjectType> {
  if (type === FilterTypesEnum.Regex) {
    return lines.filter((line) => {
      if (serializeObjectToCSV(line).match(filter)) {
        return true;
      }
    });
  } else if (type === FilterTypesEnum.ProjectPath) {
    return lines.filter((line) => line[type].match(filter));
  }

  return lines.filter((line) => line[type as keyof ProductivityDataObjectType] === +filter);
}
