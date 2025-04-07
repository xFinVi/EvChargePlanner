"use client";
import React from "react";
import { useFormContext } from "react-hook-form";

import { FormInputs } from "@/app/Types/formSchema";
import Input from "../Input/Input";
import BatteryDegradationForm from "../BatteryDegradationForm/BatteryDegradationForm";
import EVSelector from "../EVSelector/EVSelector";
import { FORM_DEFAULTS } from "@/app/Types/formData";

const Navbar = () => {
  const [showDegradation, setShowDegradation] = React.useState(false); // toggle for degradation form

  // Set up form with validation schema (Zod)

  const {
    register,
    formState: { errors },

    reset,
  } = useFormContext<FormInputs>();

  const handleReset = () => {
    reset(FORM_DEFAULTS);
  };

  return (
    <div
      className="flex flex-col items-center justify-center p-4"
      id="battery-degradation-btn"
    >
      {/* Main form inputs */}
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 max-w-[1150px]">
        <Input
          label="Number of EVs"
          id="numberOfEvs"
          type="number"
          {...register("numberOfEvs", { valueAsNumber: true })}
          error={errors.numberOfEvs?.message}
        />
        <Input
          label="Daily Mileage"
          id="dailyMileage"
          type="number"
          {...register("dailyMileage", { valueAsNumber: true })}
          error={errors.dailyMileage?.message}
        />
        <Input
          label="Efficiency (mph/kWh)"
          id="efficiency"
          type="number"
          step="0.1"
          {...register("efficiency", { valueAsNumber: true })}
          error={errors.efficiency?.message}
        />
        <Input
          label="Battery Capacity (kWh)"
          id="batteryCapacity"
          type="number"
          {...register("batteryCapacity", { valueAsNumber: true })}
          error={errors.batteryCapacity?.message}
        />
        <Input
          label="Charging Power (kW)"
          id="chargingPower"
          type="number"
          {...register("chargingPower", { valueAsNumber: true })}
          error={errors.chargingPower?.message}
        />
      </div>
      {/* END of form inputs  */}

      {/* Button to toggle battery degradation section */}
      <div className="flex justify-center mt-4">
        <button
          className={`px-2.5 py-1.5 text-sm font-bold rounded-md 
          transition-transform duration-150 ease-in-out 
          ${
            showDegradation
              ? "bg-amber-300 hover:bg-amber-400 text-gray-800 hover:scale-105 active:scale-105"
              : "bg-[#4BC0C0] hover:bg-[#82d9d9] text-white hover:scale-105 active:scale-105"
          }`}
          onClick={() => setShowDegradation(!showDegradation)}
        >
          {showDegradation ? "Hide" : "Show"} Battery Degradation
        </button>
      </div>

      {/* Info text shown when degradation is hidden */}
      <div
        className={`transition-opacity duration-300 ${
          !showDegradation ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <p className="mt-4 text-sm font-medium text-center text-gray-400">
          For more detailed insights, please add your Battery Degradation data.
        </p>
      </div>

      {/* Conditionally rendered battery degradation form */}
      <div
        className={`transition-opacity duration-300 ${
          showDegradation ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {showDegradation && <BatteryDegradationForm />}
      </div>

      {/* EV selector dropdown with prefilled values */}
      <EVSelector />

      {/* Reset button to clear all fields */}
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={handleReset}
          className="px-2 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Navbar;
