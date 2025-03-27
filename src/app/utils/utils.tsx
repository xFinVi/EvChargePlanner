export const calculateDailyUsage = (
  dailyMileage: number,
  efficiency: number
): number => dailyMileage / efficiency;

export const calculateChargingTime = (
  batteryCapacity: number,
  chargingPower: number
): number => batteryCapacity / chargingPower;

export const calculateTotalEnergyDemand = (
  numberOfEvs: number,
  dailyMileage: number,
  efficiency: number
): number => numberOfEvs * calculateDailyUsage(dailyMileage, efficiency);

export const toDecimalMark = (num: number): string =>
  num.toLocaleString("en-GB");



//   Daily Energy Consumption per EV – how would you calculate this?
// • Charging Time Required per Vehicle – how would you calculate this?
// • Total Energy Demand for the Fleet – how would you calculate this?

// Consider how battery degradation affects long-term efficiency.
// • Introduce a cost estimation feature based on electricity tariffs.
// • Handle edge cases such as different efficiency rates or partial charging scenarios.
