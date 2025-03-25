"use client";
import React, { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormInputs } from "@/app/Types/formSchema";
import { EVTemplate } from "@/app/Types/formData";

interface EVSelectorProps {
  form: UseFormReturn<FormInputs>;
}

const EV_TYPES = [
  { name: "Car" },
  { name: "Small Van" },
  { name: "Large Van" },
  { name: "HGV" },
];

const EVSelector: React.FC<EVSelectorProps> = ({ form }) => {
  const [templates, setTemplates] = useState<EVTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, watch, setValue } = form;
  const evType = watch("evType");

  useEffect(() => {
    if (evType) {
      const existingTemplate = templates.find((t) => t.name === evType);
      if (!existingTemplate) {
        const fetchTemplate = async () => {
          setLoading(true);
          try {
            const res = await fetch(`/api/templates/${evType}`);
            if (!res.ok) throw new Error(`Failed to fetch ${evType} data`);
            const data: EVTemplate = await res.json();
            setTemplates((prev) => [...prev, data]);
            setValue("efficiency", data.efficiency);
            setValue("batteryCapacity", data.batteryCapacity);
            setValue("initialEfficiency", data.efficiency);
          } catch (err) {
            setError(`Failed to load ${evType} details`);
          } finally {
            setLoading(false);
          }
        };
        fetchTemplate();
      } else {
        setValue("efficiency", existingTemplate.efficiency);
        setValue("batteryCapacity", existingTemplate.batteryCapacity);

        setValue("initialEfficiency", existingTemplate.efficiency);
      }
    }
  }, [evType, templates, setValue]);

  return (
    <div className="w-1/4 mx-auto mt-8">
      <label htmlFor="evType" className="text-gray-500">
        EV Type (Optional)
      </label>
      <select
        id="evType"
        className="block w-full p-3 mt-1 text-white bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      {loading && <p className="mt-2 text-gray-500">Loading details...</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default EVSelector;
