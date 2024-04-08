export var FilterTypesEnum;
(function (FilterTypesEnum) {
    FilterTypesEnum["Year"] = "year";
    FilterTypesEnum["Month"] = "month";
    FilterTypesEnum["Day"] = "day";
    FilterTypesEnum["Hour"] = "hour";
    FilterTypesEnum["ProjectPath"] = "projectPath";
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
    ActionsEnum["CalculateOne"] = "calculateTotals";
    ActionsEnum["FilterAll"] = "filterAll";
    ActionsEnum["FilterOne"] = "filterOne";
    ActionsEnum["FilterAllFromTo"] = "filterAllFromTo";
    ActionsEnum["Exit"] = "q";
})(ActionsEnum || (ActionsEnum = {}));
