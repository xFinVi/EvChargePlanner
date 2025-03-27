// The results component is responsible for generating the results based on the form data.

import { FaCar, FaBatteryFull, FaPlug, FaPoundSign } from "react-icons/fa";
import Data from "../Data/Data";
import {
  calculateDailyUsage,
  calculateChargingTime,
  calculateTotalEnergyDemand,
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

  //using useMemo to memoise our values and only recalculate if any of our dependencies changing this way results are cached improving performance

  const dailyEnergy = useMemo(() => {
    if (!dailyMileage || !efficiency) {
      return 0;
    }
    return calculateDailyUsage(dailyMileage, efficiency);
  }, [dailyMileage, efficiency]); // Calculate daily energy

/* calculate charging time required per vehicle */
  const chargingTime = useMemo(() => {
    if (!batteryCapacity || !chargingPower) {
     return 0;
    }
    return  calculateChargingTime(batteryCapacity, chargingPower);
    
  }, [batteryCapacity, chargingPower]);


  /* calculate total energy required for the whole fleet */
const totalEnergy = useMemo(() => {
  if (!numberOfEvs || !dailyMileage || !efficiency) {
    return 0;
  }
  return calculateTotalEnergyDemand(numberOfEvs, dailyMileage, efficiency);
}, [numberOfEvs, dailyMileage, efficiency]);

  const cost = useMemo(() => {
    return totalEnergy * tariff;
  }, [totalEnergy, tariff]);

  return (
    <div className="grid justify-center w-full grid-cols-1 gap-4 xs:grid-cols-2 sm:flex sm:flex-wrap justify-items-center">
      {/* passing props to data components as well as the value of our calculations to be used for displaying purposes */}
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
