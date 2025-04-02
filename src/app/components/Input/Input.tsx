import { InputProps } from "@/app/Types/formData";
import React from "react";

/* input component using the props passed from parent component to display data and use them for input functionality and logic */

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  error,
  className,
  children,
  ...props
}) => {
  return (
    <div className="w-full sm:max-w-[200px] min-w-[100px]">
      <div className="relative">
        <label
          htmlFor={id}
          className="block mb-2 font-bold tracking-wide text-gray-700 uppercase text-xxs lg:text-xs"
        >
          {label}
        </label>
        <input
          id={id}
          type={type}
          placeholder="0"
          className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-2 mb-3 leading-tight focus:outline-none focus:bg-white 
            ${
              error
                ? "border-red-500"
                : "border-gray-500 focus:border-green-500"
            } ${className || ""}`}
          {...props}
        />
        {children}
        {type === "range" && (
          <div className="flex justify-between mt-1">
            <span className="text-sm text-gray-600"></span>
            <span className="text-sm text-gray-600"></span>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
