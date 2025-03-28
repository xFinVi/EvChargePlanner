// formData.ts
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInputs } from "./formSchema";

// template for EV-specific data fetched from an API
export interface EVTemplate {
  name: string;
  efficiency: number;
  batteryCapacity: number;
}

// Alias for the  form inputs , matching the number-based schema from formSchema.ts.
export type FormData = FormInputs;

//  nubmers form data used for calculations .
export interface NumericFormData {
  numberOfEvs: number; // number of electric vehicles.
  dailyMileage: number; // Daily distance traveled.
  batteryCapacity: number; // total battery capacity .
  chargingPower: number; // power of the charger .
  efficiency: number; //  efficiency in miles .
  evType: string; // selected EV type as name (e.g., "car" / "van" etc)
  degradationRate: number; //  battery degradation
  years: number; //  period in years for battery degradation estimate.
  currentMileage: number; // Current miles per vehicle.
  currentBatteryHealth: number; // current battery health as a percentage 0 to 100.
  annualMileage: number; // projected annual distance .
}

// Props for  Data component,  to display  metrics in the Results section.
export interface DataProps {
  icon: React.ComponentType<{ className?: string }>; // Icon component (like FaCar), accepts className for styling.
  title: string; // Title of the data container ( "Daily Energy per EV").
  unit: string; // measurement units mph , $ , kwh etc..
  description: string; //  description of the data container.
  value: number; //  value of the calculated result for the container.
}

// Props for the Degradation Chart component, defining the data for the graph.
export interface BatteryDegradationChartProps {
  efficiency: number; //  efficiency in miles per kWh,  for degradation caclulations.
  degradationRate: number; //  degradation rate
  years: number; // Number of years for degradation metrics.
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
  };
  tariff?: number; // electricity tariff
}

// Props for the Degradation Form component, connecting it with the react-hook-form for input handling.
export interface BatteryDegradationFormProps {
  register: UseFormRegister<FormInputs>; // Registers form inputs for validation and state .
  errors: FieldErrors<FormInputs>; // Validation errors  by field name.
}

// props for the reusable Input component.
export interface InputProps {
  label: string; // Text label   ("Daily Mileage").
  id: string; // Unique id for the input, used for the "for" attribute to be linked with the labels.
  type: string; //  input type ( "number", "text"), to control inputs behaviours .
  error?: string; // Optional error message .
  [key: string]: unknown; // Allows additional  attributes or react-hook-form props .
}
