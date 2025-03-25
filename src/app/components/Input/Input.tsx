import React from "react";

interface InputProps {
  label: string;
  id: string;
  type: string;
  error?: string;
  [key: string]: unknown;
}

const Input: React.FC<InputProps> = ({ label, id, type, error, ...props }) => (
  <div className="w-full mx-auto max-w-xs sm:max-w-[200px] min-w-[100px]">
    <div className="relative">
      <input
        id={id}
        type={type}
        {...props}
        className={`w-full min-h-[40px] px-4 py-3 text-sm transition bg-transparent border rounded-md shadow-sm text-slate-700 border-slate-200 focus:outline-none focus:border-slate-400 hover:border-slate-300 ${
          error ? "border-red-500" : ""
        }`}
      />
      <label
        htmlFor={id}
        className="absolute cursor-text w-full bg-white px-1 left-2.5 -top-3.5 sm:-top-2 text-slate-400 text-xs"
      >
        {label}
      </label>
    </div>
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

export default Input;
