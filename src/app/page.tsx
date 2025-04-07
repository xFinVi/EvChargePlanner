"use client";

import Navbar from "./components/Navbar/Navbar";
import Results from "./components/Results/Results";
import Footer from "./components/Footer/Footer";
import BatteryDegradationTable from "./components/BatteryTable/BatteryTable";
import dynamic from "next/dynamic";
import { FORM_DEFAULTS, NumericFormData } from "./Types/formData";
import { FormProvider, useForm } from "react-hook-form";
import { FormInputs, formSchema } from "./Types/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";

// Dynamically load the chart component
const DynamicDegradationBatteryChart = dynamic(
  () => import("./components/DegradationBatteryChart/DegradationBatteryChart"),
  {
    ssr: false,
    // fallback UI while loading the chart
    loading: () => <p>Loading Chart...</p>,
  }
);

const Home: React.FC = () => {
  // we initialize the form with validation schema and default values
  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema), // Zod ensures type-safe validation
    defaultValues: FORM_DEFAULTS, // Default values for the form
    mode: "onChange", //updating state on every change in real time
  });

  // Watch all form fields to get the latest values and updates in real time
  const { watch } = form;
  const formData = watch();

  // Defined a condition to check if the necessary data are defined
  // before displaying the chart. This condition can be customized .

  const shouldDisplayChart =
    (formData.batteryCapacity ?? 0) > 0 &&
    (formData.efficiency ?? 0) > 0 &&
    (formData.degradationRate ?? 0) > 0;

  //    form data for the Results component with fallback values.
  //   Ensuring all required fields are numbers replacing undefined with 0 if not defined.
  const filledFormData = {
    numberOfEvs: formData.numberOfEvs ?? 0,
    dailyMileage: formData.dailyMileage ?? 0,
    batteryCapacity: formData.batteryCapacity ?? 0,
    chargingPower: formData.chargingPower ?? 0,
    efficiency: formData.efficiency ?? 0,
    electricityTariff: formData.electricityTariff ?? 0,
  };

  //   data for BatteryDegradationTable with fallback values.
  //   to match NumericFormData type, to ensure no undefined fields reach the table.

  const filledBatteryFormData: NumericFormData = {
    numberOfEvs: formData.numberOfEvs ?? 0,
    dailyMileage: formData.dailyMileage ?? 0,
    batteryCapacity: formData.batteryCapacity ?? 0,
    chargingPower: formData.chargingPower ?? 0,
    efficiency: formData.efficiency ?? 0,
    annualMileage: formData.annualMileage ?? 0,
    currentMileage: formData.currentMileage ?? 0,
    currentBatteryHealth: formData.currentBatteryHealth ?? 100, // Assume full health if unset
    evType: formData.evType ?? "", // Empty string for optional EV type
    degradationRate: formData.degradationRate ?? 2, // Typical degradation rate
    years: formData.years ?? 10, // Default projection period
    electricityTariff: formData.electricityTariff ?? 0.25, // Average UK tariff
  };

  return (
    // Provide form context to all child components via FormProvider
    <FormProvider {...form}>
      <div className="min-h-screen">
        <div className="p-8 mb-8 text-2xl font-bold text-center text-white bg-red-900">
          <h1>EV Charge Planning Tool</h1>
        </div>
        <div className="mx-auto">
          {/* Navbar that contains the inputs components to collect necessary data for our app
           */}
          <Navbar />
          <div className="w-full mx-auto flex flex-col gap-3 mt-10 max-w-[1250px] px-6">
            <div className="flex-1">
              <Results formData={filledFormData} />
            </div>

            {/* Displaying dynamically the Battery degradation chart */}
            {shouldDisplayChart && (
              <div className="flex-1 my-10 w-full md:w-[650px] mx-auto md:h-[415px]">
                <DynamicDegradationBatteryChart
                  efficiency={formData.efficiency ?? 0}
                  degradationRate={formData.degradationRate ?? 2}
                  years={formData.years ?? 10}
                />
              </div>
            )}

            {/* Battery degradation table is being render after the user has filled in the degradation form */}
            <BatteryDegradationTable formData={filledBatteryFormData} />
          </div>
        </div>
        <Footer />
      </div>
    </FormProvider>
  );
};

export default Home;
