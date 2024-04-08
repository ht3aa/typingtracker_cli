import { Languages } from "./entities/language.entity.js";

export type  ProductivityDataObjectType = {
  id: number;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  seconds: number;
  totalProductivityInSeconds: number;
  totalTimeInVim: number;
  totalTimeSpentThinkingOrSearching: number;
  projectPath: string;
  commitMsg: string;
  languages: Array<Languages>;
};

export type FilterTypesType = keyof ProductivityDataObjectType | "none" | "regex" | "q"; 

export type ProductivityDataCSVObjectType = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  productivitySeconds: number;
  timeSpentInLvim: number;
  timeSpentThinkingOrSearching: number;
  projectPath: string;
  commitMsg: string;
  languagesAndThereProductivity: string
};

export type LanguagesAndThereProductivityType = {
  language: string;
  productivity: number
};

// export type ProductivityType = Map<string, number>;
// export type FilterFnType = (
//   lines: Array<string>,
//   index: any,
//   filter: string | Array<string>,
// ) => Array<string>;
// export type FilterOneReturnType = {
//   filterdLines: Array<string>;
//   productivity: Map<string, number>;
// };
// export type FilterTypesType = 0 | 1 | 2 | 3 | 7 | "none" | "regex" | "q";
// export type FilterIndexType = 0 | 1 | 2 | 3;
