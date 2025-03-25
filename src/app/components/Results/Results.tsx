"use client";
import React from "react";
import { FaCar, FaBatteryFull, FaPlug, FaPoundSign } from "react-icons/fa";
import Data from "../Data/Data";
import {
  calculateDailyUsage,
  calculateChargingTime,
  calculateTotalEnergyDemand,
} from "@/app/utils/utils";

interface ResultsProps {
  formData: {
    numberOfEvs: number;
    dailyMileage: number;
    batteryCapacity: number;
    chargingPower: number;
    efficiency: number;
  };
  tariff?: number;
}

const Results: React.FC<ResultsProps> = ({ formData, tariff = 0.25 }) => {
  const {
    numberOfEvs,
    dailyMileage,
    batteryCapacity,
    chargingPower,
    efficiency,
  } = formData;

  const isValidNumber = (value: number) => !isNaN(value) && value > 0;

  const dailyEnergy =
    isValidNumber(dailyMileage) && isValidNumber(efficiency)
      ? Number(calculateDailyUsage(dailyMileage, efficiency))
      : 0;

  const chargingTime =
    isValidNumber(batteryCapacity) && isValidNumber(chargingPower)
      ? Number(calculateChargingTime(batteryCapacity, chargingPower))
      : 0;

  const totalEnergy =
    isValidNumber(numberOfEvs) &&
    isValidNumber(dailyMileage) &&
    isValidNumber(efficiency)
      ? Number(
          calculateTotalEnergyDemand(numberOfEvs, dailyMileage, efficiency)
        )
      : 0;

  const dailyCost = totalEnergy * tariff;

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
      <Data
        icon={FaBatteryFull}
        title="Daily Energy per EV"
        unit="kWh"
        value={dailyEnergy}
        description="Energy used per vehicle daily"
      />
      <Data
        icon={FaPlug}
        title="Charging Time"
        unit="h"
        value={chargingTime}
        description="Time to charge one EV"
      />
      <Data
        icon={FaCar}
        title="Total Energy Demand"
        unit="kWh"
        value={totalEnergy}
        description="Fleet’s daily energy need"
      />
      <Data
        icon={FaPoundSign}
        title="Daily Electricity Cost"
        unit="£"
        value={dailyCost}
        description={`Daily cost at £${tariff}/kWh`}
      />
    </div>
  );
};

export default Results;
