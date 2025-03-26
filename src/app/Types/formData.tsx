import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInputs } from "./formSchema";

export interface EVTemplate {
  name: string;
  efficiency: number;
  batteryCapacity: number;
}
export interface FormData {
  numberOfEvs?: number;
  dailyMileage?: number;
  batteryCapacity?: number;
  chargingPower?: number;
  efficiency?: number;
  evType?: string;
  initialEfficiency?: number;
  degradationRate?: number;
  years?: number;
}

export interface DataProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  unit: string;
  description: string;
  value: number;
}

export interface BatteryDegradationChartProps {
  initialEfficiency: number;
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
