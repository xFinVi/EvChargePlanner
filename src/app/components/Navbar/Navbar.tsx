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
}

const Navbar: React.FC<NavbarProps> = ({ onFormChange }) => {
  const [showDegradation, setShowDegradation] = React.useState(false);

  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfEvs: undefined, //defaultValues as undefined to allow empty inputs for UX purposes
      dailyMileage: undefined,
      batteryCapacity: undefined,
      chargingPower: undefined,
      efficiency: undefined,
      evType: "",
      annualMileage: undefined,
      currentMileage: undefined,
      degradationRate: 2,
      currentBatteryHealth: 100,
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

  // Watch is listening for changes in the form inputs in real time  and call onFormChange when values changes so it can updated {as an object}
  React.useEffect(() => {
    const subscription = watch((value) => {
      onFormChange?.(value); // call formChange parent function with latest form data  to update the state
    });

    return () => subscription.unsubscribe(); // clean the effect on unmount
  }, [watch, onFormChange]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 max-w-[1150px]">
        {/* passing props to input as well as using the props from react-hook-form to handleChangeEvents , we also convert the value to number as html inputs give you strings */}
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
          <BatteryDegradationForm register={register} errors={errors} />
        )}
      </div>
      <EVSelector form={form} />
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() =>
            reset({
              numberOfEvs: undefined, //defaultValues as undefined to allow empty inputs for UX purposes
              dailyMileage: undefined,
              batteryCapacity: undefined,
              chargingPower: undefined,
              efficiency: undefined,
              evType: undefined,
              annualMileage: undefined,
              currentMileage: undefined,
              degradationRate: undefined,
              currentBatteryHealth: undefined,
              years: undefined,
            })
          }
          className="px-2 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Navbar;
