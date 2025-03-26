import { FaCar, FaBatteryFull, FaPlug, FaPoundSign } from "react-icons/fa";
import Data from "../Data/Data";
import {
  calculateDailyUsage,
  calculateChargingTime,
  calculateTotalEnergyDemand,
  isValidNumber,
} from "@/app/utils/utils";
import { ResultsProps } from "@/app/Types/formData";
import { useMemo } from "react";

export default function Results({ formData, tariff = 0.25 }: ResultsProps) {
  const {
    numberOfEvs,
    dailyMileage,
    batteryCapacity,
    chargingPower,
    efficiency,
  } = formData;

  const dailyEnergy = useMemo(() => {
    return isValidNumber(dailyMileage) && isValidNumber(efficiency)
      ? Number(calculateDailyUsage(dailyMileage, efficiency))
      : 0;
  }, [dailyMileage, efficiency]);

  const chargingTime = useMemo(() => {
    return isValidNumber(batteryCapacity) && isValidNumber(chargingPower)
      ? Number(calculateChargingTime(batteryCapacity, chargingPower))
      : 0;
  }, [batteryCapacity, chargingPower]);

  const totalEnergy = useMemo(() => {
    return isValidNumber(numberOfEvs) &&
      isValidNumber(dailyMileage) &&
      isValidNumber(efficiency)
      ? Number(
          calculateTotalEnergyDemand(numberOfEvs, dailyMileage, efficiency)
        )
      : 0;
  }, [numberOfEvs, dailyMileage, efficiency]);

  const cost = useMemo(() => {
    return totalEnergy * tariff;
  }, [totalEnergy, tariff]);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-8 lg:gap-18">
      <Data
        icon={FaCar}
        title="Daily Energy per EV"
        unit="kWh"
        value={dailyEnergy}
        description="Energy per vehicle daily"
      />
      <Data
        icon={FaPlug}
        title="Charging Time"
        unit="h"
        value={chargingTime}
        description="Time to charge one EV"
      />
      <Data
        icon={FaBatteryFull}
        title="Total Energy Demand"
        unit="kWh"
        value={totalEnergy}
        description="Fleet’s daily energy need"
      />
      <Data
        icon={FaPoundSign}
        title="Daily Electricity Cost"
        unit="£"
        value={cost}
        description={`Daily cost at £${tariff}/kWh`}
      />
    </div>
  );
}
