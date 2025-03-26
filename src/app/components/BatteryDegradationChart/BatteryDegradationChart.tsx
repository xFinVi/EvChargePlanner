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
  initialEfficiency,
  degradationRate,
  years,
}: BatteryDegradationChartProps) {
  const labels = Array.from({ length: years + 1 }, (_, i) => `Year ${i}`);
  const efficiencyData = labels.map((_, year) => {
    const remainingCapacity = 1 - degradationRate * year;
    return initialEfficiency * Math.max(remainingCapacity, 0);
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Efficiency (miles/kWh)",
        data: efficiencyData,
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
        text: "Battery Degradation Impact on EV Efficiency",
        color: "#fff",
        font: { size: 16 },
      },
    },
    scales: {
      x: { title: { display: true, text: "Years", color: "#333" } },
      y: {
        title: { display: true, text: "Efficiency (miles/kWh)", color: "#333" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-[300px] md:h-[415px] p-4 m-auto rounded-lg shadow-md">
      <Bar data={data} options={options} />
    </div>
  );
}
