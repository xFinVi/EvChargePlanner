// src/app/components/BatteryDegradationTable/BatteryDegradationTable.tsx
"use client";
import { FormInputs } from "@/app/Types/formSchema";
import { toDecimalMark } from "@/app/utils/utils";

interface BatteryDegradationTableProps {
  formData: FormInputs;
}

export default function BatteryDegradationTable({
  formData,
}: BatteryDegradationTableProps) {
  const {
    batteryCapacity,
    currentBatteryHealth = 100,
    degradationRate,
    efficiency,
    annualMileage,
    currentMileage,
    years,
  } = formData;

  const initialCapacity = batteryCapacity * (currentBatteryHealth / 100);
  const replacementThreshold = batteryCapacity * 0.65; // 65% of original
  const replacementMileageThreshold = 100_000 as number;

  const degradationData = Array.from({ length: years + 1 }, (_, year) => {
    const remainingCapacity =
      initialCapacity * Math.pow(1 - degradationRate, year);
    const healthPercentage = (remainingCapacity / batteryCapacity) * 100;
    const estimatedRange = remainingCapacity * efficiency;
    const chargeCycles = annualMileage / (efficiency * initialCapacity);
    const totalMileage = currentMileage + annualMileage * year;
    const needsReplacement =
      remainingCapacity < replacementThreshold ||
      totalMileage > replacementMileageThreshold;
    console.log("Mileage:", totalMileage, "Type:", typeof totalMileage);

    return {
      year,
      remainingCapacity: remainingCapacity.toFixed(2),
      healthPercentage: Number(healthPercentage.toFixed(1)),
      needsReplacement,
      estimatedRange: estimatedRange.toFixed(0),
      chargeCycles: Number(chargeCycles.toFixed(0)),
      totalMileage: toDecimalMark(totalMileage),
    };
  });

  return (
    <div className="mt-8 max-w-[950px] mx-auto ">
      <h2 className="text-xl font-bold text-center text-gray-700">
        Battery Degradation Estimate
      </h2>
      <table className="w-full mt-4 font-bold bg-gray-200 ">
        <thead>
          <tr className="bg-gray-400">
            <th className="p-2 border">Year</th>
            <th className="p-2 border">Remaining Capacity (kWh)</th>
            <th className="p-2 border">Battery Health (%)</th>
            <th className="p-2 border">Estimated Range (miles)</th>
            <th className="p-2 border">Charge Cycles</th>
            <th className="p-2 border">Total Mileage (miles)</th>
            <th className="p-2 border">Replace?</th>
          </tr>
        </thead>
        <tbody>
          {degradationData.map((row) => {
            const mileage = Number(row.totalMileage.replace(/,/g, "")); //
            const mileageClass =
              mileage < 80000
                ? " `p-2 border border-gray-400 text-green-600"
                : mileage < 100000
                ? "border border-gray-400 text-yellow-600"
                : "border border-gray-400 text-red-600";
            return (
              <tr key={row.year} className="text-center text-gray-700">
                <td className="p-2 border">{row.year}</td>
                <td
                  className={`p-2 border ${
                    row.healthPercentage >= 80
                      ? "text-green-600"
                      : row.healthPercentage >= 65
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {row.remainingCapacity}
                </td>
                <td
                  className={`p-2 border border-gray-500 ${
                    row.healthPercentage >= 80
                      ? "text-green-600"
                      : row.healthPercentage >= 70
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {row.healthPercentage || 0}
                </td>
                <td className="p-2 border">{row.estimatedRange}</td>
                <td className="p-2 border">{row.chargeCycles || 0}</td>
                <td className={mileageClass}>{row.totalMileage}</td>

                <td
                  className={`p-2 border  border-gray-500 ${
                    row.needsReplacement ? "text-red-600" : "text-green-600"
                  }`}
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
