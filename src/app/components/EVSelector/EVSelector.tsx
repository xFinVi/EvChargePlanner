"use client";
import React, { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormInputs } from "@/app/Types/formSchema";
import { EVTemplate } from "@/app/Types/formData";
import { EV_TYPES } from "@/app/Constants/DBdata";

interface EVSelectorProps {
  form: UseFormReturn<FormInputs>;
}

const EVSelector: React.FC<EVSelectorProps> = ({ form }) => {
  const [templates, setTemplates] = useState<EVTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, watch, setValue } = form;
  const evType = watch("evType");
  useEffect(() => {
    if (evType && !templates.find((t) => t.name === evType)) {
      setLoading(true);
      const fetchTemplate = async () => {
        try {
          const res = await fetch(`/api/templates/${evType}`);
          if (!res.ok) setError(`Failed to fetch ${evType} data`);
          const data: EVTemplate = await res.json();
          setTemplates((prev) => [...prev, data]);
          setValue("efficiency", data.efficiency);
          setValue("batteryCapacity", data.batteryCapacity);
        } catch (err) {
          setError(`Failed to load ${evType} details, ${err}`);
        } finally {
          setLoading(false);
        }
      };
      fetchTemplate();
    } else if (evType) {
      // Use the already loaded template if it's available
      const existingTemplate = templates.find((t) => t.name === evType);
      if (existingTemplate) {
        setValue("efficiency", existingTemplate.efficiency.toString());
        setValue(
          "batteryCapacity",
          existingTemplate.batteryCapacity.toString()
        );
      }
    }
  }, [evType, templates, setValue]);

  return (
    <div className="max-w-[185px] mx-auto mt-8 inline-block relative">
      {/* <label htmlFor="evType" className="text-gray-500">
        EV Type (Optional)
      </label> */}
      <select
        id="evType"
        className="block w-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
        {...register("evType")}
        disabled={loading}
      >
        <option value="">Select</option>
        {EV_TYPES.map((ev) => (
          <option key={ev.name} value={ev.name}>
            {ev.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
        <svg
          className="w-4 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>

      {loading && <p className="mt-2 text-gray-500">Loading details...</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default EVSelector;
