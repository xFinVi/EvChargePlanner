import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BatteryDegradationChartProps {
  initialEfficiency: number;
  degradationRate: number;
  years: number;
}

const BatteryDegradationChart: React.FC<BatteryDegradationChartProps> = ({
  initialEfficiency,
  degradationRate,
  years,
}) => {
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
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `${context.dataset.label}: ${context.parsed.y.toFixed(
              2
            )} miles/kWh`,
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Years", color: "#fff" },
        ticks: { color: "#fff" },
      },
      y: {
        title: { display: true, text: "Efficiency (miles/kWh)", color: "#fff" },
        ticks: { color: "#fff" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-[300px] md:h-[415px] p-4 m-auto bg-gray-900 rounded-lg shadow-md">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BatteryDegradationChart;
