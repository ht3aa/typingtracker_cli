import { CSVToObjectType, ProductivityType } from "./types.js";

export function calculateOne(csvData: Array<CSVToObjectType>) {
  const productivity: ProductivityType = new Map();

  for (let i = 0; i < csvData.length; i++) {
    const { path, productivitySeconds } = csvData[i];
    productivity.set(path, (productivity.get(path) ?? 0) + parseInt(productivitySeconds));
  }

  return productivity;
}
