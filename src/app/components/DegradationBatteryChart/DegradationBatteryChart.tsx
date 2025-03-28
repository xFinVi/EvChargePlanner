"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { BatteryDegradationChartProps } from "@/app/Types/formData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DegradationBatteryChart({
  efficiency,
  degradationRate,
  years,
}: BatteryDegradationChartProps) {
  // Generate x-axis labels (years)
  // Generate x-axis labels for chart ('Year 0', 'Year 1', ...)
  const labels = Array.from(
    { length: years + 1 }, // Define array length as years + 1 to include Year 0 through Year N
    (_, i) => `Year ${i}` // Map each index 'i' to a string label like 'Year 0'
  );
  /* Array.from method creates an array from an object like array with a 'length' property in this case.
    The first argument (_) is unused (undefined), so we use '_' as a placeholder.
      The second argument (i) is the index, used to build the year labels. */
  const efficiencyData = labels.map((_, year) => {
    const remainingCapacity = Math.max(1 - (degradationRate / 100) * year, 0);
    return efficiency * remainingCapacity;
  }); //formula to calculate the remaining battery efficiency for each year

  const data = {
    labels, // X-axis: Years
    datasets: [
      {
        label: "Efficiency (miles/kWh)", // Legend label
        data: efficiencyData, // Y-axis data
        backgroundColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  /* Configurable options for the chart */
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
         text: "Battery Degradation Impact on Efficiency",
        color: "#333",
        font: { size: 16 },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Years", // X-axis label
          color: "#333",
        },
      },
      y: {
        title: {
          display: true,
          text: "Efficiency (miles/kWh)", // Y-axis label
          color: "#333",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full flex flex-1 h-[300px] md:h-[415px] rounded-lg shadow-md">
      <Bar data={data} options={options} />
    </div>
  );
}
