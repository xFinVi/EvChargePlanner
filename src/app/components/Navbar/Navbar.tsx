"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputs, formSchema } from "@/app/Types/formSchema";
import { NumericFormData } from "@/app/Types/formData"; // Import NumericFormData
import Input from "../Input/Input";
import BatteryDegradationForm from "../BatteryDegradationForm/BatteryDegradationForm";
import EVSelector from "../EVSelector/EVSelector";

interface NavbarProps {
  onFormChange?: (data: NumericFormData) => void; // Expect numbers
}

const Navbar: React.FC<NavbarProps> = ({ onFormChange }) => {
  const [showDegradation, setShowDegradation] = React.useState(false);

  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfEvs: "",
      dailyMileage: "",
      batteryCapacity: "",
      chargingPower: "",
      efficiency: "",
      evType: "",
      annualMileage: "",
      currentMileage: "",
      degradationRate: "0.02",
      currentBatteryHealth: "100",
      years: "10",
    },
    mode: "onChange",
  });

  const {
    register,
    formState: { errors },
    watch,
    reset,
  } = form;

  const formValues = watch();

  React.useEffect(() => {
    const subscription = watch((value) => {
      const numericValues: NumericFormData = {
        numberOfEvs: value.numberOfEvs === "" ? 0 : Number(value.numberOfEvs),
        dailyMileage:
          value.dailyMileage === "" ? 0 : Number(value.dailyMileage),
        batteryCapacity:
          value.batteryCapacity === "" ? 0 : Number(value.batteryCapacity),
        chargingPower:
          value.chargingPower === "" ? 0 : Number(value.chargingPower),
        efficiency: value.efficiency === "" ? 0 : Number(value.efficiency),
        evType: value.evType || "",
        annualMileage:
          value.annualMileage === "" ? 0 : Number(value.annualMileage),
        currentMileage:
          value.currentMileage === "" ? 0 : Number(value.currentMileage),
        currentBatteryHealth:
          value.currentBatteryHealth === undefined
            ? 0
            : Number(value.currentBatteryHealth),
        degradationRate:
          value.degradationRate === "" ? 0 : Number(value.degradationRate),
        years: value.years === "" ? 0 : Number(value.years),
      };
      onFormChange?.(numericValues); // Pass converted numbers
    });
    return () => subscription.unsubscribe();
  }, [watch, onFormChange]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 max-w-[1150px]">
        <Input
          label="Number of EVs"
          id="numberOfEvs"
          type="number"
          value={formValues.numberOfEvs}
          {...register("numberOfEvs")}
          error={errors.numberOfEvs?.message}
        />
        <Input
          label="Daily Mileage"
          id="dailyMileage"
          type="number"
          value={formValues.dailyMileage}
          {...register("dailyMileage")}
          error={errors.dailyMileage?.message}
        />
        <Input
          label="Efficiency (mph/kWh)"
          id="efficiency"
          type="number"
          step="0.1"
          value={formValues.efficiency}
          {...register("efficiency")}
          error={errors.efficiency?.message}
        />
        <Input
          label="Battery Capacity (kWh)"
          id="batteryCapacity"
          type="number"
          value={formValues.batteryCapacity}
          {...register("batteryCapacity")}
          error={errors.batteryCapacity?.message}
        />
        <Input
          label="Charging Power (kW)"
          id="chargingPower"
          type="number"
          value={formValues.chargingPower}
          {...register("chargingPower")}
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
              numberOfEvs: "",
              dailyMileage: "",
              batteryCapacity: "",
              chargingPower: "",
              efficiency: "",
              evType: "",
              currentBatteryHealth: "",
              currentMileage: "",
              annualMileage: "",
              degradationRate: "",
              years: "",
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
