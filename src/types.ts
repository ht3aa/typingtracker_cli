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
