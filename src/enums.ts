export enum FilterTypesEnum {
  Year = 0,
  Month,
  Day,
  Hour,
  ProjectName = 7,
  None = "none",
  Regex = "regex",
}

export enum FromToEnum {
  From = 0,
  To,
}

export enum ActionsEnum {
  CalculateAll = "calculateAll",
  CalculateOne = "calculateOne",
  FilterAll = "filterAll",
  FilterOne = "filterOne",
  FilterAllFromTo = "filterAllFromTo",
  Exit = "q",
}
