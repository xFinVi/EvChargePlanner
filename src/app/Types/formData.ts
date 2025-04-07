import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { FormInputs } from "./formSchema";

// template for EV-specific data fetched from an API
export interface EVTemplate {
  name: string;
  efficiency: number;
  batteryCapacity: number;
}

export const FORM_DEFAULTS: FormInputs = {
  numberOfEvs: undefined,
  dailyMileage: undefined,
  batteryCapacity: undefined,
  chargingPower: undefined,
  efficiency: undefined,
  annualMileage: undefined,
  currentMileage: undefined,
  currentBatteryHealth: undefined, // Can start empty; user can input a value
  evType: "", // Empty string for select inputs
  degradationRate: undefined,
  years: undefined,
  electricityTariff: 0.25,
};
export const RESET_VALUES: FormInputs = {
  numberOfEvs: 0,
  dailyMileage: 0,
  batteryCapacity: 0,
  chargingPower: 0,
  efficiency: 0,
  annualMileage: 0,
  currentMileage: 0,
  currentBatteryHealth: 0, // Can start empty; user can input a value
  evType: "", // Empty string for select inputs
  degradationRate: 0,
  years: 0,
  electricityTariff: 0,
};

//  nubmers form data used for calculations .
export interface NumericFormData {
  numberOfEvs: number;
  dailyMileage: number;
  batteryCapacity: number;
  chargingPower: number;
  efficiency: number; //  efficiency in miles .
  evType: string; // selected EV type as name (e.g., "car" / "van" etc)
  degradationRate: number;
  years: number;
  currentMileage: number;
  currentBatteryHealth: number;
  annualMileage: number;
  electricityTariff: number;
}

// Props for  Data component,  to display  metrics in the Results section.
export interface DataProps {
  icon: React.ComponentType<{ className?: string }>; // Icon component (like FaCar), accepts className for styling.
  title: string; // Title of the data container ( "Daily Energy per EV").
  unit: string; // measurement units mph , kwh etc..
  description: string;
  value: number; //  value of the calculated result for the container.
}

// Props for the Degradation Chart component, defining the data for the graph.
export interface BatteryDegradationChartProps {
  efficiency: number;
  degradationRate: number;
  years: number;
}

// Props for the Results component, which displays calculated EV fleet metrics.
export interface ResultsProps {
  // form data of numbers we require in the result component to calculate.
  formData: {
    numberOfEvs: number;
    dailyMileage: number;
    batteryCapacity: number;
    chargingPower: number;
    efficiency: number;
    electricityTariff: number;
  };
}

// Props for the Degradation Form component, connecting it with the react-hook-form for input handling.
export interface BatteryDegradationFormProps {
  register: UseFormRegister<FormInputs>; // Registers form inputs for validation and state .
  errors: FieldErrors<FormInputs>;
  watch: UseFormWatch<FormInputs>;
}

// props for the reusable Input component.
export interface InputProps {
  label: string; // Text label   ("Daily Mileage").
  id: string; // Unique id for the input, used for the "for" attribute to be linked with the labels.
  type: string; //  input type ( "number", "text"), to control inputs behaviours .
  error?: string;
  children?: React.ReactNode; // Optional error message .
  [key: string]: unknown; // Allows additional  attributes or react-hook-form props .
}
