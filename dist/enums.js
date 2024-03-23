export var FilterTypesEnum;
(function (FilterTypesEnum) {
    FilterTypesEnum[FilterTypesEnum["Year"] = 0] = "Year";
    FilterTypesEnum[FilterTypesEnum["Month"] = 1] = "Month";
    FilterTypesEnum[FilterTypesEnum["Day"] = 2] = "Day";
    FilterTypesEnum[FilterTypesEnum["Hour"] = 3] = "Hour";
    FilterTypesEnum[FilterTypesEnum["Minute"] = 4] = "Minute";
    FilterTypesEnum[FilterTypesEnum["Second"] = 5] = "Second";
    FilterTypesEnum[FilterTypesEnum["Regex"] = 6] = "Regex";
    FilterTypesEnum[FilterTypesEnum["Exit"] = 7] = "Exit";
})(FilterTypesEnum || (FilterTypesEnum = {}));
export var FiltersActionEnum;
(function (FiltersActionEnum) {
    FiltersActionEnum["FilterAll"] = "filterAll";
    FiltersActionEnum["FilterAllFromTo"] = "filterAllFromTo";
})(FiltersActionEnum || (FiltersActionEnum = {}));
