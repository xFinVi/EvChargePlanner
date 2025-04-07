import React from "react";
import { useFormContext } from "react-hook-form";
import { FormInputs } from "@/app/Types/formSchema";
import Input from "../Input/Input";

const BatteryDegradationForm: React.FC = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormInputs>();
  const tariffValue = watch("electricityTariff");

  return (
    <div className="grid grid-cols-3 gap-4 mt-8 sm:grid-cols-4 max-w-[650px] mx-auto w-full">
      <Input
        label="Rate (%)"
        id="degradationRate"
        type="number"
        step="1"
        min="0"
        placeholder="Degradation Rate"
        max="100"
        {...register("degradationRate", { valueAsNumber: true })}
        error={errors.degradationRate?.message}
      />
      <Input
        label="Years"
        id="years"
        type="number"
        step="1"
        min="1"
        placeholder="Add Years"
        {...register("years", { valueAsNumber: true })}
        error={errors.years?.message}
      />
      <Input
        id="currentBatteryHealth"
        label="Battery Health (%)"
        type="number"
        {...register("currentBatteryHealth", { valueAsNumber: true })}
        min="0"
        placeholder="current %"
        max="100"
        error={errors.currentBatteryHealth?.message}
      />
      <Input
        id="currentMileage"
        label="Current Mileage"
        type="number"
        placeholder="Current mileage"
        {...register("currentMileage", { valueAsNumber: true })}
        min="0"
        error={errors.currentMileage?.message}
      />
      <Input
        id="annualMileage"
        label="Annual Mileage"
        placeholder="Projected mileage"
        type="number"
        {...register("annualMileage", { valueAsNumber: true })}
        min="0"
        error={errors.annualMileage?.message}
      />
      <Input
        id="electricityTariff"
        label="Electricity Tariff"
        placeholder="Enter tariff (e.g., 0.15)"
        type="range"
        min="0"
        max="2"
        step="0.01"
        className="w-full h-4 p-4 bg-gray-100 rounded-lg cursor-pointer dark:bg-gray-100 appearance-none
        [&::-webkit-slider-runnable-track]:bg-yellow-500 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:h-2
        [&::-moz-range-track]:bg-green-500 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:h-2
        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
        [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-mt-1
        [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-blue-500
        [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none
        focus:outline-none"
        {...register("electricityTariff", {
          valueAsNumber: true,
          min: { value: 0, message: "Tariff cannot be negative" },
          max: { value: 2, message: "Tariff cannot exceed 2" },
        })}
        error={errors.electricityTariff?.message}
      >
        <p className="text-gray-700">Current tariff: {tariffValue ?? "0"}</p>
      </Input>
    </div>
  );
};

export default BatteryDegradationForm;
