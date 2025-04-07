import React from "react";
import { useFormContext } from "react-hook-form";
import { FormInputs } from "@/app/Types/formSchema";
import Input from "../Input/Input";

const BatteryDegradationForm: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormInputs>();

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
    </div>
  );
};

export default BatteryDegradationForm;
