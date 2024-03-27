import { calculateOne } from "./calulateOne.js";
import filterLines from "./filter.js";
import { WORKDATADIR } from "./constants.js";
import {
  getAllLinesFromFiles,
  getFilesNameFromDir,
  getLinesFromFile,
  printLines,
  printProductivityMap,
  printTotalProductivityMap,
  serializeCSVsToObjects,
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
import { FilterTypesType } from "./types.js";
import { ActionsEnum, FilterTypesEnum } from "./enums.js";

export async function loadCalculateAll() {
  const files = await getFilesNameFromDir(WORKDATADIR);
  const lines = await getAllLinesFromFiles(files);
  const productivity = calculateOne(serializeCSVsToObjects(lines));
  printTotalProductivityMap([productivity]);
  app();
}

export async function loadCalculateOneWith(fileName: string) {
  const lines = await getLinesFromFile(fileName);
  const productivity = calculateOne(serializeCSVsToObjects(lines));
  printProductivityMap(productivity);
  getFilesForAction(ActionsEnum.CalculateOne);
}

export async function loadFilterAllWith(filterType: FilterTypesType, filter: string) {
  const files = await getFilesNameFromDir(WORKDATADIR);
  const lines = await getAllLinesFromFiles(files);

  if (filterType === FilterTypesEnum.None) {
    const productivity = calculateOne(serializeCSVsToObjects(lines));

    sortDataAsc(lines);
    printLines(lines);
    printTotalProductivityMap([productivity]);
    questionsForFilters(ActionsEnum.FilterAll);
  } else {
    const filterdLines = filterLines(lines, filter, filterType);
    const productivity = calculateOne(serializeCSVsToObjects(filterdLines));
    sortDataAsc(filterdLines);
    printLines(filterdLines);
    printTotalProductivityMap([productivity]);
    lastQustionsForFilter(filterType);
  }
}

export async function loadFilterOne(filterType: FilterTypesType, filter: string, fileName: string) {
  const lines = await getLinesFromFile(fileName);

  if (filterType === FilterTypesEnum.None) {
    sortDataAsc(lines);
    printLines(lines);
    questionsForFilters(ActionsEnum.FilterOne, fileName);
  } else {
    const filterdLines = filterLines(lines, filter, filterType);
    const productivity = calculateOne(serializeCSVsToObjects(filterdLines));

    sortDataAsc(filterdLines);
    printLines(filterdLines);
    printTotalProductivityMap([productivity]);
    lastQustionsForFilter(filterType, fileName);
  }
}

export async function loadFilterAllFromToWith(filterType: FilterTypesType, filter: string) {
  const files = await getFilesNameFromDir(WORKDATADIR);
  const lines = await getAllLinesFromFiles(files);

  const filterdLines = filterAllFromTo(lines, filter.split(" "), filterType);
  const productivity = calculateOne(serializeCSVsToObjects(filterdLines));

  sortDataAsc(filterdLines);
  printLines(filterdLines);
  printTotalProductivityMap([productivity]);
  lastQustionsForFilterAllFromTo(filterType);
}
