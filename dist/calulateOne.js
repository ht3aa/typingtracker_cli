export function calculateTotals(productivityDataObj) {
    const totalProductivityMap = new Map();
    const totalTimeInVimMap = new Map();
    const totalTimeSpentThinkingOrSearchingMap = new Map();
    const totalLanguageProductivityMap = new Map();
    for (let i = 0; i < productivityDataObj.length; i++) {
        const { projectPath, totalProductivityInSeconds, totalTimeInVim, totalTimeSpentThinkingOrSearching, languages } = productivityDataObj[i];
        totalProductivityMap.set(projectPath, (totalProductivityMap.get(projectPath) ?? 0) + totalProductivityInSeconds);
        totalTimeInVimMap.set(projectPath, (totalTimeInVimMap.get(projectPath) ?? 0) + totalTimeInVim);
        totalTimeSpentThinkingOrSearchingMap.set(projectPath, (totalTimeSpentThinkingOrSearchingMap.get(projectPath) ?? 0) + totalTimeSpentThinkingOrSearching);
        for (let j = 0; j < languages.length; j++) {
            const { language, productivityInSeconds } = languages[j];
            totalLanguageProductivityMap.set(`${language}`, (totalLanguageProductivityMap.get(`${language}|${projectPath}`) ?? 0) + productivityInSeconds);
        }
    }
    return {
        totalProductivityMap,
        totalTimeInVimMap,
        totalTimeSpentThinkingOrSearchingMap,
        totalLanguageProductivityMap
    };
}
