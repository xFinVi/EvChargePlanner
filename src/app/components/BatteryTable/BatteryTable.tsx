// src/app/components/BatteryDegradationTable/BatteryDegradationTable.tsx
"use client";
import { useMemo } from "react";
import { FormInputs } from "@/app/Types/formSchema";
import { toDecimalMark } from "@/app/utils/utils";

interface BatteryDegradationTableProps {
  formData: FormInputs;
}

export default function BatteryDegradationTable({
  formData,
}: BatteryDegradationTableProps) {
  // extracting the data from the form and converting them to numbers to complete our calculations
  const batteryCapacity = Number(formData.batteryCapacity) || 0;
  const currentBatteryHealth = Number(formData.currentBatteryHealth) || 100;
  const degradationRate = Number(formData.degradationRate) || 0;
  const efficiency = Number(formData.efficiency) || 0;
  const annualMileage = Number(formData.annualMileage) || 0;
  const currentMileage = Number(formData.currentMileage) || 0;
  const years = Number(formData.years) || 0;

  // Validation function to check if all required data is present and valid
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
    currentBatteryHealth,
    degradationRate,
    efficiency,
    annualMileage,
    currentMileage,
    years,
  ]);

  const degradationData = useMemo(() => {
    if (!isDataComplete) {
      return [];
    }

    const initialCapacity = batteryCapacity * (currentBatteryHealth / 100);
    const replacementThreshold = batteryCapacity * 0.7; // 70% of battery threshold capacity to replace
    const replacementMileageThreshold = 100_000;

    return Array.from({ length: years + 1 }, (_, year) => {
      const remainingCapacity =
        initialCapacity * Math.pow(1 - degradationRate, year);
      const healthPercentage = (remainingCapacity / batteryCapacity) * 100;
      const estimatedRange = remainingCapacity * efficiency;
      const totalMileage = currentMileage + annualMileage * year;
      const needsReplacement =
        remainingCapacity < replacementThreshold ||
        totalMileage > replacementMileageThreshold;

      return {
        year,
        remainingCapacity: remainingCapacity.toFixed(2),
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
          An estimate based on a {Number(formData.degradationRate) * 100}%
          degradation rate per year.
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
            // converting the string to a number without special characters to make comparison
            const mileageNumber = Number(row.totalMileage.replace(/,/g, ""));

            const healthColor =
              row.healthPercentage >= 80
                ? "text-green-600"
                : row.healthPercentage >= 65
                ? "text-yellow-600"
                : "text-red-600";
            const mileageColor =
              mileageNumber < 80000
                ? "text-green-600"
                : mileageNumber < 100000
                ? "text-yellow-600"
                : "text-red-600";
            const replaceColor = row.needsReplacement
              ? "text-red-600"
              : "text-green-600";

            const estimatedRangeColor =
              row.estimatedRange >= 200
                ? "text-green-600"
                : row.estimatedRange >= 150
                ? "text-yellow-600"
                : "text-red-600";

            return (
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
    </div>
  );
}
