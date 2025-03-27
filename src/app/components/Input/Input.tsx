import React from "react";

interface InputProps {
  label: string;
  id: string;
  type: string;
  error?: string;
  [key: string]: unknown; // To allow for any other props
}

const Input: React.FC<InputProps> = ({ label, id, type, error, ...props }) => {
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
            }`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
