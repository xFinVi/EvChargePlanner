import React from "react";

import Input from "../Input/Input";
import { BatteryDegradationFormProps } from "@/app/Types/formData";

const BatteryDegradationForm: React.FC<BatteryDegradationFormProps> = ({
  register,
  errors,
}) => (
  <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-3 max-w-[650px] mx-auto">
    <Input
      label="Initial Efficiency (miles/kWh)"
      id="initialEfficiency"
      type="number"
      step="0.1"
      min="0"
      {...register("initialEfficiency", { valueAsNumber: true })}
      error={errors.initialEfficiency?.message}
    />
    <Input
      label="Degradation Rate (e.g., 0.06 = 6%)"
      id="degradationRate"
      type="number"
      step="0.01"
      min="0"
      max="1"
      {...register("degradationRate", { valueAsNumber: true })}
      error={errors.degradationRate?.message}
    />
    <Input
      label="Years"
      id="years"
      type="number"
      step="1"
      min="1"
      {...register("years", { valueAsNumber: true })}
      error={errors.years?.message}
    />
  </div>
);

export default BatteryDegradationForm;
