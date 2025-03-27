// formData.ts
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInputs } from "./formSchema";

export interface EVTemplate {
  name: string;
  efficiency: string; // Keep as number—used for predefined EV data
  batteryCapacity: string;
}

// FormData matches FormInputs (strings)
export type FormData = FormInputs;

// Numeric version for calculations
export interface NumericFormData {
  numberOfEvs: number;
  dailyMileage: number;
  batteryCapacity: number;
  chargingPower: number;
  efficiency: number;
  evType: string; 
  degradationRate: number;
  years: number;
  currentMileage: number;
  currentBatteryHealth: number;
  annualMileage: number;
}

export interface DataProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  unit: string;
  description: string;
  value: number;
}

export interface BatteryDegradationChartProps {
  efficiency: number;
  degradationRate: number;
  years: number;
}

export interface ResultsProps {
  formData: {
    numberOfEvs: number;
    dailyMileage: number;
    batteryCapacity: number;
    chargingPower: number;
    efficiency: number;
  };
  tariff?: number;
}

export interface BatteryDegradationFormProps {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
}
