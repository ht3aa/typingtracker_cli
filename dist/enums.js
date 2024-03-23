export var FilterTypesEnum;
(function (FilterTypesEnum) {
    FilterTypesEnum[FilterTypesEnum["Year"] = 0] = "Year";
    FilterTypesEnum[FilterTypesEnum["Month"] = 1] = "Month";
    FilterTypesEnum[FilterTypesEnum["Day"] = 2] = "Day";
    FilterTypesEnum[FilterTypesEnum["Hour"] = 3] = "Hour";
    FilterTypesEnum["None"] = "none";
    FilterTypesEnum["Regex"] = "regex";
})(FilterTypesEnum || (FilterTypesEnum = {}));
export var FiltersActionEnum;
(function (FiltersActionEnum) {
    FiltersActionEnum["FilterAll"] = "filterAll";
    FiltersActionEnum["FilterAllFromTo"] = "filterAllFromTo";
})(FiltersActionEnum || (FiltersActionEnum = {}));
export var FromToEnum;
(function (FromToEnum) {
    FromToEnum[FromToEnum["From"] = 0] = "From";
    FromToEnum[FromToEnum["To"] = 1] = "To";
})(FromToEnum || (FromToEnum = {}));
