"use client";
import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Results from "./components/Results/Results";
import BatteryDegradationChart from "./components/Graph/GraphData";

const Home: React.FC = () => {
  const [formData, setFormData] = useState({
    numberOfEvs: 0,
    dailyMileage: 0,
    batteryCapacity: 0,
    chargingPower: 0,
    efficiency: 0,
    initialEfficiency: 4.0,
    degradationRate: 0.06,
    years: 10,
  });
  return (
    <div className="min-h-screen p-6 bg-white">
      <div className="my-8 text-2xl font-bold text-center text-gray-600">
        <h1>EV Charge Planning Tool</h1>
      </div>
      <div className="max-w-[1150px] mx-auto  ">
        <Navbar
          onFormChange={(data) => {
            setFormData((prev) => ({ ...prev, ...data }));
          }}
        />
        <div className="flex flex-col gap-3 mt-10 md:flex-row">
          <div className="flex-1">
            <Results formData={formData} />
          </div>
          <div className="flex-1">
            <BatteryDegradationChart
              initialEfficiency={formData.initialEfficiency}
              degradationRate={formData.degradationRate}
              years={formData.years}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
