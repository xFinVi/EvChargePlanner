"use client";
import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Results from "./components/Results/Results";

import Footer from "./components/Footer/Footer";
import BatteryDegradationTable from "./components/BatteryTable/BatteryTable";
import DegradationBatteryChart from "./components/DegradationBatteryChart/DegradationBatteryChart";

const Home: React.FC = () => {
  const [formData, setFormData] = useState({
    numberOfEvs: 0,
    dailyMileage: 0,
    batteryCapacity: 0,
    chargingPower: 0,
    efficiency: 0,
    annualMileage: 0,
    currentMileage: 0,
    currentBatteryHealth: 100,
    evType: "",
    degradationRate: 2,
    years: 10,
    electricityTariff: 0.25,
  });

  return (
    <div className="min-h-screen ">
      <div className="p-8 mb-8 text-2xl font-bold text-center text-white bg-red-900">
        <h1>EV Charge Planning Tool</h1>
      </div>
      <div className="mx-auto">
        {/* render  navbar component which handles user inputs and updates the fomrData  */}
        <Navbar
          onFormChange={(data) => {
            setFormData((prev) => ({ ...prev, ...data }));
          }}
        />
        <div className="w-full mx-auto flex flex-col gap-3 mt-10  max-w-[1250px] px-6">
          <div className="flex-1">
            {/* Results component which renders the results data and displays key calculations based on user inputs*/}
            <Results formData={formData} />
          </div>
          <div className="flex-1 my-10 w-full md:w-[650] mx-auto md:h-[415px]">
            {/* Battery degradation chart  */}
            <DegradationBatteryChart
              efficiency={formData.efficiency}
              degradationRate={formData.degradationRate}
              years={formData.years}
            />
          </div>
          {/* Battery degradation table - displays numerical breakdown of EV wear for each year*/}
          <BatteryDegradationTable formData={formData} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
