// src/app/components/BatteryDegradationTable/BatteryDegradationTable.tsx
"use client";
import { useMemo } from "react";

import { toDecimalMark } from "@/app/utils/utils";
import { NumericFormData } from "@/app/Types/formData";
import BatteryMaintenanceTips from "@/app/EVTips/EVTips";

interface BatteryDegradationTableProps {
  formData: NumericFormData;
}

export default function BatteryDegradationTable({
  formData,
}: BatteryDegradationTableProps) {
  // extracting the data from the form to complete our calculations
  const batteryCapacity = formData.batteryCapacity || 0;
  const currentBatteryHealth = formData.currentBatteryHealth || 100;
  const degradationRate = formData.degradationRate || 0;
  const efficiency = formData.efficiency || 0;
  const annualMileage = formData.annualMileage || 0;
  const currentMileage = formData.currentMileage || 0;
  const years = formData.years || 0;

 //  checking if all required data is present and valid
// Using useMemo to recompute only when dependencies change, to avoid re-renders and optimise performance
const isDataComplete = useMemo(() => {
  return (
    batteryCapacity > 0 &&
    degradationRate > 0 &&
    efficiency > 0 &&
    annualMileage > 0 &&
    currentMileage >= 0 && // Allow 0 for currentMileage in case we have a new vehicle
    years > 0 &&
    currentBatteryHealth > 0
  );
}, [
  batteryCapacity,
  degradationRate,
  efficiency,
  annualMileage,
  currentMileage,
  years,
  currentBatteryHealth,
]);


// useMemo memoizes the result of the function, re calculating it only when one of the dependencies changes.
//  This prevents unnecessary recalculations
//  The dependencies array includes all variables that we are watching .
// - If any of these dependencies change, useMemo will recompute our variable, otherwise, it returns the cached value.

  const degradationData = useMemo(() => {
    if (!isDataComplete) return [];

    const initialCapacity = batteryCapacity * (currentBatteryHealth / 100);
    const replacementThreshold = batteryCapacity * 0.7; // 70% of battery threshold capacity to replace
    const replacementMileageThreshold = 150_000;
 // create an array of all degrdation data for each year
    return Array.from({ length: years + 1 }, (_, year) => {
      const remainingCapacity =
        initialCapacity * Math.pow(1 - (degradationRate / 100), year); // calculates the input of the user as a percentage so if the user adds 2 its considered a 2%
      const healthPercentage = (remainingCapacity / batteryCapacity) * 100; // we take the remaining capacity and divided with the full battery capacity the user gave us and then we multiply by 100 to get the %
      const estimatedRange = remainingCapacity * efficiency;  // remaining battery capacity at that time times the efficiency gives us the range of the battery in miles
      const totalMileage = currentMileage + annualMileage * year; //calculates the total mileage for each year
      const needsReplacement =
        remainingCapacity < replacementThreshold ||
        totalMileage > replacementMileageThreshold; // a conditional to give the user an estimation based on the mileage or the battery health if the battery needs replacement

      return {
        year,
        remainingCapacity: remainingCapacity.toFixed(2), //formating the results
        healthPercentage: Number(healthPercentage.toFixed(1)),
        estimatedRange: Number(estimatedRange.toFixed(0)),
        totalMileage: toDecimalMark(totalMileage),
        needsReplacement,
      };
    });
  }, [
    batteryCapacity,
    currentBatteryHealth,
    degradationRate,
    efficiency,
    annualMileage,
    currentMileage,
    years,
    isDataComplete,
  ]);

  // Show the table only when data is complete
  if (!isDataComplete || degradationData.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-bold text-center text-gray-700">
          Battery Degradation Estimate
        </h2>
        <p className="mt-4 text-center text-gray-500">
          Please enter all required fields to see the degradation estimate.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-[800px] mx-auto ">
      <h2 className="p-6 text-2xl font-bold text-center text-gray-600 rounded-sm">
        Battery Degradation Estimate{" "}
      </h2>
      {/* Checking if we have a degrdation rate and displaying that in our table what the calculations are based on */}
      {formData.degradationRate && (
        <p className="text-center text-gray-500">
          {" "}
          An estimate based on a {formData.degradationRate}%
          battery degradation rate per year.
        </p>
      )}
      <table className="w-full mt-4 text-xs bg-gray-50 sm:text-sm">
        <thead>
          <tr className="text-gray-600 border-0 ">
            <th className="p-1 sm:p-2 ">Year</th>
            <th className="p-1 sm:p-2 ">Remaining Capacity (kWh)</th>
            <th className="p-1 sm:p-2 ">Battery Health (%)</th>
            <th className="p-1 sm:p-2 ">Estimated Range (miles)</th>
            <th className="p-1 sm:p-2 ">Total Mileage (miles)</th>
            <th className="p-1 sm:p-2 ">Replace?</th>
          </tr>
        </thead>
        <tbody>
          {degradationData.map((row) => {
            // converting the string to a number and 'removing' special characters to make comparison
            const mileageNumber = Number(row.totalMileage.replace(/,/g, ""));
  //  conditional classes to display numbers in differnt colors
            const healthColor =
              row.healthPercentage >= 80
                ? "text-green-600"
                : row.healthPercentage >= 65
                ? "text-yellow-600"
                : "text-red-600";
               
            const mileageColor =
              mileageNumber < 80000
                ? "text-green-600"
                : mileageNumber < 140000
                ? "text-yellow-600"
                : "text-red-600";
            const replaceColor = row.needsReplacement
              ? "text-red-600"
              : "text-green-600";

            const estimatedRangeColor =
              row.estimatedRange >= formData.dailyMileage
                ? "text-green-600"
                : row.estimatedRange <= formData.dailyMileage 
                ? "text-yellow-600"
                : "text-red-600";

            return (

              /* MAPPING THROGUH ARA DATA AND DISPLAYING THEM IN A TABLE FORMAT */
              <tr
                key={row.year}
                className="text-center text-gray-700 border-gray-400"
              >
                <td className="p-1 border border-gray-400 sm:p-2 ">
                  {row.year}
                </td>
                <td
                  className={`p-1 sm:p-2 border border-gray-400 ${healthColor}`}
                >
                  {row.remainingCapacity}
                </td>
                <td
                  className={`p-1 sm:p-2 border border-gray-400 ${healthColor}`}
                >
                  {row.healthPercentage}
                </td>
                <td
                  className={`border-gray-400 p2 border ${estimatedRangeColor}`}
                >
                  {row.estimatedRange}
                </td>
                <td
                  className={`p-1 sm:p-2 border border-gray-400 ${mileageColor}`}
                >
                  {row.totalMileage}
                </td>
                <td
                  className={`p-1 sm:p-2 border border-gray-400 ${replaceColor}`}
                >
                  {row.needsReplacement ? "Yes" : "No"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {degradationData.length > 0 && <BatteryMaintenanceTips />}
    </div>
  );
}
