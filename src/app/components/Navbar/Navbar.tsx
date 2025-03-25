"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputs, formSchema } from "@/app/Types/formSchema";
import Input from "../Input/Input";
import BatteryDegradationForm from "../BatteryDegradationForm/BatteryDegradationForm";
import EVSelector from "../EVSelector/EVSelector";

interface NavbarProps {
  onFormChange?: (data: Partial<FormInputs>) => void;
  /*  onFormChange: React.Dispatch<
    React.SetStateAction<{
      numberOfEvs: number;
      dailyMileage: number;
      batteryCapacity: number;
      chargingPower: number;
      efficiency: number;
      initialEfficiency: number;
      degradationRate: number;
      years: number;
    }>
  >; */
}

const Navbar: React.FC<NavbarProps> = ({ onFormChange }) => {
  const [showDegradation, setShowDegradation] = useState(false);

  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfEvs: undefined,
      dailyMileage: undefined,
      batteryCapacity: undefined,
      chargingPower: undefined,
      efficiency: undefined,
      evType: "",
      initialEfficiency: 4.0,
      degradationRate: 0.06,
      years: 10,
    },
    mode: "onChange",
  });

  const {
    register,
    formState: { errors },
    watch,
    reset,
  } = form;
  React.useEffect(() => {
    const subscription = watch((value) => onFormChange?.(value));
    return () => subscription.unsubscribe();
  }, [watch, onFormChange]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 place-items-center sm:grid-cols-3 md:grid-cols-5">
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
      <div className="flex justify-center mt-4">
        <button
          className="px-2.5 py-1.5 text-sm text-gray-700 font-bold rounded-md bg-amber-300 hover:bg-amber-400"
          onClick={() => setShowDegradation(!showDegradation)}
        >
          {showDegradation ? "Hide" : "Show"} Battery Degradation
        </button>
      </div>
      {showDegradation && (
        <BatteryDegradationForm register={register} errors={errors} />
      )}
      <EVSelector form={form} />

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => reset()}
          className="px-2 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Navbar;
