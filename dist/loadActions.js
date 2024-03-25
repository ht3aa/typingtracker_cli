var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { calculateOne } from "./calulateOne.js";
import filterLines from "./filterAll.js";
import { WORKDATADIR } from "./constants.js";
import { getAllLinesFromFiles, getFilesNameFromDir, getLinesFromFile, printLines, printProductivityMap, printTotalProductivityMap, serializeCSVsToObjects, sortDataAsc, } from "./lib.js";
import { app, lastQustionsForFilter, lastQustionsForFilterAllFromTo, getFilesForAction, questionsForFilters, } from "./cli.js";
import filterAllFromTo from "./filterAllFromTo.js";
import { ActionsEnum, FilterTypesEnum } from "./enums.js";
export function loadCalculateAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield getFilesNameFromDir(WORKDATADIR);
        const lines = yield getAllLinesFromFiles(files);
        const productivity = calculateOne(serializeCSVsToObjects(lines));
        printTotalProductivityMap([productivity]);
        app();
    });
}
export function loadCalculateOneWith(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const lines = yield getLinesFromFile(fileName);
        const productivity = calculateOne(serializeCSVsToObjects(lines));
        printProductivityMap(productivity);
        getFilesForAction(ActionsEnum.CalculateOne);
    });
}
export function loadFilterAllWith(filterType, filter) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield getFilesNameFromDir(WORKDATADIR);
        const lines = yield getAllLinesFromFiles(files);
        const filterdLines = filterLines(lines, filter, filterType);
        const productivity = calculateOne(serializeCSVsToObjects(filterdLines));
        sortDataAsc(filterdLines);
        printLines(filterdLines);
        printTotalProductivityMap([productivity]);
        if (filterType === FilterTypesEnum.None) {
            questionsForFilters(ActionsEnum.FilterAll);
        }
        else {
            lastQustionsForFilter(filterType);
        }
    });
}
export function loadFilterOne(filterType, filter, fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const lines = yield getLinesFromFile(fileName);
        const filterdLines = filterLines(lines, filter, filterType);
        printLines(filterdLines);
        if (filterType === FilterTypesEnum.None) {
            questionsForFilters(ActionsEnum.FilterOne, fileName);
        }
        else {
            lastQustionsForFilter(filterType, fileName);
        }
    });
}
export function loadFilterAllFromToWith(filterType, filter) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield getFilesNameFromDir(WORKDATADIR);
        const lines = yield getAllLinesFromFiles(files);
        const filterdLines = filterAllFromTo(lines, filter.split(" "), filterType);
        const productivity = calculateOne(serializeCSVsToObjects(filterdLines));
        sortDataAsc(filterdLines);
        printLines(filterdLines);
        printTotalProductivityMap([productivity]);
        lastQustionsForFilterAllFromTo(filterType);
    });
}
