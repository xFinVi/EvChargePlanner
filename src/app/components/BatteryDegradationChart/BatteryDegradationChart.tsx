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

export default function BatteryDegradationChart({
  efficiency,
  degradationRate,
  years,
}: BatteryDegradationChartProps) {
  // Generate x-axis labels (years)
  const labels = Array.from({ length: years + 1 }, (_, i) => `Year ${i}`);

  // Calculate y-axis data (efficiency over time)
  const efficiencyData = labels.map((_, year) => {
    const remainingCapacity = Math.max(1 - degradationRate * year, 0); // degradationRate is 0.02, not 2
    return efficiency * remainingCapacity;
  });

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
