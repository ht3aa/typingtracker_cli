export function calculateOne(csvData) {
    var _a;
    const productivity = new Map();
    for (let i = 0; i < csvData.length; i++) {
        const { path, productivitySeconds } = csvData[i];
        productivity.set(path, ((_a = productivity.get(path)) !== null && _a !== void 0 ? _a : 0) + parseInt(productivitySeconds));
    }
    return productivity;
}
