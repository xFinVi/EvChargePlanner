// The results component is responsible for generating the results based on the form data.

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

// We pass the data from our form inputs and a default value for the electricity tariff
export default function Results({ formData, tariff = 0.25 }: ResultsProps) {
  const {
    numberOfEvs,
    dailyMileage,
    batteryCapacity,
    chargingPower,
    efficiency,
  } = formData;
  // we extract the values passed from the form data and complete our calculations

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
    <div className="grid justify-center w-full grid-cols-1 gap-4 xs:grid-cols-2 sm:flex sm:flex-wrap justify-items-center">
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
