import { DataProps } from "@/app/Types/formData";
import { toDecimalMark } from "@/app/utils/utils";
import React from "react";

const Data: React.FC<DataProps> = ({
  value,
  icon: Icon,
  title,
  unit,
  description,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 delay-500 rounded-md shadow-md hover:shadow-green-200">
      <div className="flex flex-col items-center justify-start flex-1 mb-2 sm">
        <h3 className="text-sm font-semibold text-gray-700 md:text-md">
          {title}
        </h3>
      </div>
      <p className="flex items-center w-full my-2 text-2xl text-gray-600 justify-evenly">
        <Icon className="my-2 mr-2 text-sm text-red-800 sm:text-lg" />
        <span className="text-xl font-semibold text-gray-700">
          {value !== undefined ? `${toDecimalMark(value)} ${unit}` : "N/A"}
        </span>
      </p>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default Data;
