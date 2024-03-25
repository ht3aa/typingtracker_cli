export type CSVToObjectType = {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
  productivitySeconds: string;
  path: string;
  commitMsg: string;
};

export type ProductivityType = Map<string, number>;
export type FilterFnType = (
  lines: Array<string>,
  index: any,
  filter: string | Array<string>,
) => Array<string>;
export type FilterOneReturnType = {
  filterdLines: Array<string>;
  productivity: Map<string, number>;
};
export type FilterTypesType = 0 | 1 | 2 | 3 | 7 | "none" | "regex" | "q";
export type FilterIndexType = 0 | 1 | 2 | 3;
