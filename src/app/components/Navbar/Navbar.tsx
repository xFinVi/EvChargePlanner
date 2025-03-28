"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputs, formSchema } from "@/app/Types/formSchema";
import Input from "../Input/Input";
import BatteryDegradationForm from "../BatteryDegradationForm/BatteryDegradationForm";
import EVSelector from "../EVSelector/EVSelector";

interface NavbarProps {
  onFormChange?: (data: Partial<FormInputs>) => void;
  onReset?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onFormChange, onReset }) => {
  const [showDegradation, setShowDegradation] = React.useState(false);

  const defaultValues: FormInputs = {
    numberOfEvs: 0,
    dailyMileage: 0,
    batteryCapacity: 0,
    chargingPower: 0,
    efficiency: 0,
    evType: "",
    annualMileage: 0,
    currentMileage: 0,
    degradationRate: 2,
    currentBatteryHealth: 100,
    years: 10,
    electricityTariff: 0, // Match Home's initial value
  };

  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  const {
    register,
    formState: { errors },
    watch,
    reset,
  } = form;

  React.useEffect(() => {
    const subscription = watch((value) => {
      onFormChange?.(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, onFormChange]);

  // Handle reset
  const handleReset = () => {
    reset(defaultValues); // Reset form state in Navbar
    onReset?.(); // Reset Home's state
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
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
      <div className="flex justify-center mt-4">
        <button
          className={`px-2.5 py-1.5 text-sm font-bold rounded-md ${
            showDegradation
              ? "bg-amber-300 hover:bg-amber-400 text-gray-800"
              : "bg-green-700 hover:bg-gray-700 text-white"
          }`}
          onClick={() => setShowDegradation(!showDegradation)}
        >
          {showDegradation ? "Hide" : "Show"} Battery Degradation
        </button>
      </div>
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
      <EVSelector form={form} />
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={handleReset} // Use synchronized reset handler
          className="px-2 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Navbar;
