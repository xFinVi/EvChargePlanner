//The Data component is used to display the results of the calculations. It takes the data passed as props and displays them in a styled card.

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
    <div className="flex flex-col  items-center justify-center p-3 sm:p-4 delay-500 bg-red-800 rounded-md shadow-md w-[200px] sm:max-w-[200px] hover:shadow-red-400">
      <div className="flex flex-col items-center justify-start mb-2 sm">
        <h3 className="text-sm font-semibold text-white md:text-md">{title}</h3>
      </div>
      <p className="flex items-center w-full my-0 text-2xl text-white sm:my-2 justify-evenly">
        <Icon className="my-2 mr-2 text-sm text-white sm:text-lg" />
        <span className="text-xl font-semibold text-white">
          {value !== undefined
            ? `${toDecimalMark(Number(value.toFixed(1)))} ${unit}` // using our helperFuntion to ensure the value is in the correct format and we convert it to a number with 1 decimal point
            : "N/A"}
        </span>
      </p>
      <p className="mt-1 text-sm text-gray-200">{description}</p>
    </div>
  );
};

export default Data;
