export function useStats(discrepancyData) {
    const totalPhysical = discrepancyData.reduce((acc, item) => acc + item.physical, 0);
    const totalSystem = discrepancyData.reduce((acc, item) => acc + item.system, 0);
    const totalDifference = totalPhysical - totalSystem;
    const differencePercent = ((totalDifference / totalSystem) * 100).toFixed(2);

    return {
        totalPhysical,
        totalSystem,
        totalDifference,
        differencePercent
    };
}