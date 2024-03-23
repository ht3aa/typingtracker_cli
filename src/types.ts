export type CSVToObjectType = Array<{
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
  productivitySeconds: string;
  path: string;
  commitMsg: string;
}>;

export type ProductivityType = Map<string, number>;
export type FilterFnType = (lines: Array<string>, index: any, filter: string | Array<string>) => Array<string>;
export type FilterOneReturnType ={ filterdLines: Array<string>; productivity: Map<string, number> }
