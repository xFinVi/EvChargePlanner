"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormInputs } from "@/app/Types/formSchema";
import Input from "../Input/Input";
import BatteryDegradationForm from "../BatteryDegradationForm/BatteryDegradationForm";
import EVSelector from "../EVSelector/EVSelector";
import { RESET_VALUES } from "@/app/Types/formData";

/**
 * Navbar component for collecting EV form inputs and managing form state.
 * Renders main inputs and toggles BatteryDegradationForm visibility.
 */
const Navbar = () => {
  // State to toggle visibility of BatteryDegradationForm
  const [showDegradation, setShowDegradation] = React.useState(false);
  // State to show success message after reset
  const [resetSuccess, setResetSuccess] = React.useState(false);

  // Access form context from FormProvider set up in Home
  const {
    register,
    formState: { errors },
    watch,
    reset,
  } = useFormContext<FormInputs>();

  // Watch all form fields to check current values
  const formValues = watch();
  // Check if any numeric field is greater than 0
  const hasValuesGreaterThanZero = Object.values(formValues).some(
    (value) => typeof value === "number" && !isNaN(value) && value > 0
  );
  /**
   * Reset all form fields to their default values (undefined) and hide degradation form.
   * This ensures a clean slate for the user.
   */
  const handleReset = () => {
    reset(RESET_VALUES); // Reset to undefined values
    setShowDegradation(false); // Hide BatteryDegradationForm for better UX
    setResetSuccess(true); // Show success message
    // Hide message after 2 seconds
    setTimeout(() => setResetSuccess(false), 2000);
  };
  return (
    <div
      className="flex flex-col items-center justify-center p-4"
      id="battery-degradation-btn"
    >
      {/* Main form inputs for EV data */}
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

      {/* Button to toggle BatteryDegradationForm visibility */}
      <div className="flex justify-center mt-4">
        <button
          className={`px-2.5 py-1.5 text-sm font-bold rounded-md 
            transition-transform duration-150 ease-in-out 
            ${
              showDegradation
                ? "bg-amber-300 hover:bg-amber-400 text-gray-800 hover:scale-105 active:scale-105"
                : "bg-[#992626] hover:bg-red-700 text-white shadow-lg hover:scale-105 active:scale-105"
            }`}
          onClick={() => setShowDegradation(!showDegradation)}
        >
          {showDegradation ? "Hide" : "Show"} Battery Degradation
        </button>
      </div>

      {/* Prompt when degradation form is hidden */}
      <div
        className={`transition-opacity duration-300 ${
          !showDegradation ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <p className="mt-4 text-sm font-medium text-center text-gray-400">
          For more detailed insights, please add your Battery Degradation data.
        </p>
      </div>

      {/* Conditionally render BatteryDegradationForm */}
      <div
        className={`transition-opacity duration-300 ${
          showDegradation ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {showDegradation && <BatteryDegradationForm />}
      </div>

      {/* EV type selector */}
      <EVSelector />

      {/* Reset button to clear all form fields */}
      <div className="mt-4 text-center">
        {hasValuesGreaterThanZero && (
          <button
            type="button"
            onClick={handleReset}
            className="px-2 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
          >
            Clear All
          </button>
        )}

        {resetSuccess && (
          <p className="mt-2 text-sm text-green-600 animate-fade-in-out">
            Form successfully reset!
          </p>
        )}
      </div>
    </div>
  );
};

export default Navbar;
