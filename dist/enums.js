export var FilterTypesEnum;
(function (FilterTypesEnum) {
    FilterTypesEnum[FilterTypesEnum["Year"] = 0] = "Year";
    FilterTypesEnum[FilterTypesEnum["Month"] = 1] = "Month";
    FilterTypesEnum[FilterTypesEnum["Day"] = 2] = "Day";
    FilterTypesEnum[FilterTypesEnum["Hour"] = 3] = "Hour";
    FilterTypesEnum[FilterTypesEnum["ProjectName"] = 7] = "ProjectName";
    FilterTypesEnum["None"] = "none";
    FilterTypesEnum["Regex"] = "regex";
})(FilterTypesEnum || (FilterTypesEnum = {}));
export var FromToEnum;
(function (FromToEnum) {
    FromToEnum[FromToEnum["From"] = 0] = "From";
    FromToEnum[FromToEnum["To"] = 1] = "To";
})(FromToEnum || (FromToEnum = {}));
export var ActionsEnum;
(function (ActionsEnum) {
    ActionsEnum["CalculateAll"] = "calculateAll";
    ActionsEnum["CalculateOne"] = "calculateOne";
    ActionsEnum["FilterAll"] = "filterAll";
    ActionsEnum["FilterOne"] = "filterOne";
    ActionsEnum["FilterAllFromTo"] = "filterAllFromTo";
    ActionsEnum["Exit"] = "q";
})(ActionsEnum || (ActionsEnum = {}));
