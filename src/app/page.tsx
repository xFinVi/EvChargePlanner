"use client";
import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Results from "./components/Results/Results";
import Footer from "./components/Footer/Footer";
import BatteryDegradationTable from "./components/BatteryTable/BatteryTable";
import dynamic from "next/dynamic";

// Dynamically load the chart component
const DynamicDegradationBatteryChart = dynamic(
  () => import("./components/DegradationBatteryChart/DegradationBatteryChart"),
  {
    ssr: false,
    // Optional: provide a fallback UI while loading the chart
    loading: () => <p>Loading Chart...</p>,
  }
);

const Home: React.FC = () => {
  /* Initializing form data  */
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

  // Defined a condition to check if the necessary data is present
  // For example, you might want to check if batteryCapacity is greater than 0
  const shouldDisplayChart = formData.batteryCapacity > 0;

  return (
    <div className="min-h-screen">
      <div className="p-8 mb-8 text-2xl font-bold text-center text-white bg-red-900">
        <h1>EV Charge Planning Tool</h1>
      </div>
      <div className="mx-auto">
        {/* Navbar that contains the inputs components to collect necessary data for our app
         */}
        <Navbar
          onFormChange={(data) => setFormData((prev) => ({ ...prev, ...data }))}
        />
        <div className="w-full mx-auto flex flex-col gap-3 mt-10 max-w-[1250px] px-6">
          <div className="flex-1">
            <Results formData={formData} />
          </div>

          {/* Displaying dynamically the Battery degradation chart */}
          {shouldDisplayChart && (
            <div className="flex-1 my-10 w-full md:w-[650px] mx-auto md:h-[415px]">
              <DynamicDegradationBatteryChart
                efficiency={formData.efficiency}
                degradationRate={formData.degradationRate}
                years={formData.years}
              />
            </div>
          )}

          {/* Battery degradation table is being render after the user has filled in the degradation form */}
          <BatteryDegradationTable formData={formData} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
