import { calculateTotals } from "./calulateOne.js";
import filterLines from "./filter.js";
import { WORKDATADIR } from "./constants.js";
import {
  getAllLinesFromFiles,
  getFilesNameFromDir,
  getLinesFromFile,
  printLines,
  printProductivityMap,
  getTotalProductivityMap,
  // serializeCSVsToObjects,
  sortDataAsc,
} from "./lib.js";
import {
  app,
  lastQustionsForFilter,
  lastQustionsForFilterAllFromTo,
  getFilesForAction,
  questionsForFilters,
} from "./cli.js";
import filterAllFromTo from "./filterFromTo.js";
import { ProductivityDataObjectType, FilterTypesType } from "./types.js";
import { ActionsEnum, FilterTypesEnum } from "./enums.js";

export async function loadCalculateAll(data: ProductivityDataObjectType[]) {
  const totals = calculateTotals(data);
  printProductivityMap(getTotalProductivityMap([totals.totalProductivityMap], "total_Productivity"));
  printProductivityMap(getTotalProductivityMap([totals.totalTimeInVimMap], "total_time_in_lvim"));
  printProductivityMap(getTotalProductivityMap([totals.totalTimeSpentThinkingOrSearchingMap], "total_time_spent_thinking_or_searching"));
  printProductivityMap(totals.totalLanguageProductivityMap)
  app(data);
}

export async function loadCalculateOneWith(data: ProductivityDataObjectType[], fileName: string) {
  const totals = calculateTotals(data);
  printProductivityMap(getTotalProductivityMap([totals.totalProductivityMap], "totals"));
  getFilesForAction(data, ActionsEnum.CalculateOne);
}

export async function loadFilterAllWith(
  data: ProductivityDataObjectType[],
  filterType: FilterTypesType,
  filter: string,
) {
  const copyData = data.map((line) => line);

  if (filterType === FilterTypesEnum.None) {
    const totals = calculateTotals(data);

    sortDataAsc(data);
    printLines(data);
  printProductivityMap(getTotalProductivityMap([totals.totalProductivityMap], "total_Productivity"));
  printProductivityMap(getTotalProductivityMap([totals.totalTimeInVimMap], "total_time_in_lvim"));
  printProductivityMap(getTotalProductivityMap([totals.totalTimeSpentThinkingOrSearchingMap], "total_time_spent_thinking_or_searching"));
  printProductivityMap(totals.totalLanguageProductivityMap)
    questionsForFilters(data, ActionsEnum.FilterAll);
  } else {
    const filterdLines = filterLines(data, filter, filterType);
    const totals = calculateTotals(filterdLines);
    sortDataAsc(filterdLines);
    printLines(filterdLines);
  printProductivityMap(getTotalProductivityMap([totals.totalProductivityMap], "total_Productivity"));
  printProductivityMap(getTotalProductivityMap([totals.totalTimeInVimMap], "total_time_in_lvim"));
  printProductivityMap(getTotalProductivityMap([totals.totalTimeSpentThinkingOrSearchingMap], "total_time_spent_thinking_or_searching"));
  printProductivityMap(totals.totalLanguageProductivityMap)
    lastQustionsForFilter(data, filterType);
  }
}

export async function loadFilterOne(
  data: ProductivityDataObjectType[],
  filterType: FilterTypesType,
  filter: string,
  fileName: string,
) {
  const lines = await getLinesFromFile(fileName);

  if (filterType === FilterTypesEnum.None) {
    sortDataAsc(data);
    printLines(data);
    questionsForFilters(data, ActionsEnum.FilterOne, fileName);
  } else {
    const filterdLines = filterLines(data, filter, filterType);
    const totals = calculateTotals(data);

    sortDataAsc(filterdLines);
    printLines(filterdLines);
  printProductivityMap(getTotalProductivityMap([totals.totalProductivityMap], "total_Productivity"));
  printProductivityMap(getTotalProductivityMap([totals.totalTimeInVimMap], "total_time_in_lvim"));
  printProductivityMap(getTotalProductivityMap([totals.totalTimeSpentThinkingOrSearchingMap], "total_time_spent_thinking_or_searching"));
  printProductivityMap(totals.totalLanguageProductivityMap)
    lastQustionsForFilter(data, filterType, fileName);
  }
}

export async function loadFilterAllFromToWith(
  data: ProductivityDataObjectType[],
  filterType: FilterTypesType,
  filter: string,
) {
  const filterdLines = filterAllFromTo(data, filter.split(" "), filterType);
  const totals = calculateTotals(filterdLines);

  sortDataAsc(filterdLines);
  printLines(filterdLines);
  printProductivityMap(getTotalProductivityMap([totals.totalProductivityMap], "total_Productivity"));
  printProductivityMap(getTotalProductivityMap([totals.totalTimeInVimMap], "total_time_in_lvim"));
  printProductivityMap(getTotalProductivityMap([totals.totalTimeSpentThinkingOrSearchingMap], "total_time_spent_thinking_or_searching"));
  printProductivityMap(totals.totalLanguageProductivityMap)
  lastQustionsForFilterAllFromTo(data, filterType);
}
