export enum FilterTypesEnum {
  Year = "year",
  Month = "month",
  Day = "day",
  Hour = "hour",
  ProjectPath = "projectPath",
  None = "none",
  Regex = "regex",
}

export enum FromToEnum {
  From = 0,
  To,
}

export enum ActionsEnum {
  CalculateAll = "calculateAll",
  CalculateOne = "calculateTotals",
  FilterAll = "filterAll",
  FilterOne = "filterOne",
  FilterAllFromTo = "filterAllFromTo",
  Exit = "q",
}
