"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputs, formSchema } from "@/app/Types/formSchema";
import Input from "../Input/Input";
import BatteryDegradationForm from "../BatteryDegradationForm/BatteryDegradationForm";
import EVSelector from "../EVSelector/EVSelector";

/* Props for the Navbar component, which handles EV form input collection. */
interface NavbarProps {
  // Called whenever the form state changes
  onFormChange?: (data: Partial<FormInputs>) => void;
  // Triggered when the form is reset
  onReset?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onFormChange }) => {
  const [showDegradation, setShowDegradation] = React.useState(false); // toggle for degradation form

  // Set up form with validation schema (Zod)
  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // updates on every change for live tracking and calculations
  });

  const {
    register,
    formState: { errors },
    watch,
    reset,
  } = form;

  // Watch form values and notify parent component on any change
  React.useEffect(() => {
    const subscription = watch((value) => {
      onFormChange?.(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, onFormChange]);

  // Resets the  form  as well as the parent component
  const handleReset = () => {
    reset({
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
          {...register("numberOfEvs")}
          error={errors.numberOfEvs?.message}
        />
        <Input
          label="Daily Mileage"
          id="dailyMileage"
          type="number"
          {...register("dailyMileage")}
          error={errors.dailyMileage?.message}
        />
        <Input
          label="Efficiency (mph/kWh)"
          id="efficiency"
          type="number"
          step="0.1"
          {...register("efficiency")}
          error={errors.efficiency?.message}
        />
        <Input
          label="Battery Capacity (kWh)"
          id="batteryCapacity"
          type="number"
          {...register("batteryCapacity")}
          error={errors.batteryCapacity?.message}
        />
        <Input
          label="Charging Power (kW)"
          id="chargingPower"
          type="number"
          {...register("chargingPower")}
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
        {showDegradation && (
          <BatteryDegradationForm
            register={register}
            watch={watch}
            errors={errors}
          />
        )}
      </div>

      {/* EV selector dropdown with prefilled values */}
      <EVSelector form={form} />

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
