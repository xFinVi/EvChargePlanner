import React from "react";

import Input from "../Input/Input";
import { BatteryDegradationFormProps } from "@/app/Types/formData";

const BatteryDegradationForm: React.FC<BatteryDegradationFormProps> = ({
  register,
  errors,
}) => (
  <div className="grid grid-cols-3  gap-4 mt-8 sm:grid-cols-4 max-w-[650px] mx-auto w-full">
    <Input
      label=" Rate (%)"
      id="degradationRate"
      type="number"
      step="1"
      min="0"
      placeholder="Degradation Rate"
      max="100"
      {...register("degradationRate")}
      error={errors.degradationRate?.message}
    />
    <Input
      label="Years"
      id="years"
      type="number"
      step="1"
      min="1"
      placeholder="Add Years"
      {...register("years")}
      error={errors.years?.message}
    />
    <Input
      id="currentBatteryHealth"
      label="Battery Health (%)"
      type="number"
      {...register("currentBatteryHealth")}
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
      {...register("currentMileage")}
      min="0"
      error={errors.currentMileage?.message}
    />
    <Input
      id="annualMileage"
      label="Annual Mileage "
      placeholder="Projected mileage"
      type="number"
      {...register("annualMileage")}
      min="0"
      error={errors.annualMileage?.message}
    />
  </div>
);

export default BatteryDegradationForm;
