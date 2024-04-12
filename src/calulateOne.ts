import { ProductivityDataObjectType } from "./types.js";

export function calculateTotals(productivityDataObj: Array<ProductivityDataObjectType>) {
  const totalProductivityMap  = new Map<string, number>();
  const totalTimeInVimMap = new Map<string, number>();
  const totalTimeSpentThinkingOrSearchingMap = new Map<string, number>();
  const totalLanguageProductivityMap = new Map<string, number>();

  for (let i = 0; i < productivityDataObj.length; i++) {
    const { projectPath, totalProductivityInSeconds, totalTimeInVim, totalTimeSpentThinkingOrSearching, languages } = productivityDataObj[i];

    totalProductivityMap.set(projectPath, (totalProductivityMap.get(projectPath) ?? 0) + totalProductivityInSeconds);
    totalTimeInVimMap.set(projectPath, (totalTimeInVimMap.get(projectPath) ?? 0) + totalTimeInVim);
    totalTimeSpentThinkingOrSearchingMap.set(projectPath, (totalTimeSpentThinkingOrSearchingMap.get(projectPath) ?? 0) + totalTimeSpentThinkingOrSearching);
    for (let j = 0; j < languages.length; j++) {
      const { language, productivityInSeconds } = languages[j];
      totalLanguageProductivityMap.set(`${language}`, (totalLanguageProductivityMap.get(`${language}`) ?? 0) + productivityInSeconds);
    }
  }

  return {
    totalProductivityMap,
    totalTimeInVimMap,
    totalTimeSpentThinkingOrSearchingMap,
    totalLanguageProductivityMap
  };
}


