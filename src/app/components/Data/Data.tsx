import React from "react";

interface DataProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  unit: string;
  description: string;
  value: number;
}
const toDecimalMark = (num: number): string => num.toLocaleString("en-GB");
const Data: React.FC<DataProps> = ({
  value,
  icon: Icon,
  title,
  unit,
  description,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-md shadow-md">
      <div className="flex flex-col items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
        <Icon className="mr-2 text-purple-400" />
      </div>
      <p className="my-2 text-2xl text-white">
        {value !== undefined ? `${toDecimalMark(value)} ${unit}` : "N/A"}
      </p>
      <p className="mt-1 text-sm text-gray-400">{description}</p>
    </div>
  );
};

export default Data;
