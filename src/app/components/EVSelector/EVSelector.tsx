"use client";
import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormInputs } from "@/app/Types/formSchema";
import { EVTemplate } from "@/app/Types/formData";
import { EV_TYPES } from "@/app/Constants/DBdata";

const EVSelector: React.FC = () => {
  const [templates, setTemplates] = useState<EVTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Destructure form methods
  const { register, watch, setValue } = useFormContext<FormInputs>();

  // Watch the 'evType' to see which EV type is selected
  const evType = watch("evType");

  useEffect(() => {
    //  if 'evType' is selected and the template for this EV type isn't already loaded
    if (evType && !templates.find((t) => t.name === evType)) {
      setLoading(true); //  loading  to true

      //fetch the template data for the EV type
      const fetchTemplate = async () => {
        try {
          // API call to fetch the template data for the backend
          const res = await fetch(`/api/templates/${evType}`);
          if (!res.ok) setError(`Failed to fetch ${evType} data`);

          // parse JSON response into an EVTemplate
          const data: EVTemplate = await res.json();

          // Add the fetched template to the templates array and update state
          setTemplates((prev) => [...prev, data]);

          // Populate the form with the fetched data (efficiency and battery capacity)
          setValue("efficiency", Number(data.efficiency));
          setValue("batteryCapacity", Number(data.batteryCapacity));
        } catch (err) {
          setError(`Failed to load ${evType} details, ${err}`);
        } finally {
          setLoading(false); // Set loading to false after  fetch
        }
      };

      fetchTemplate(); // Call fetchTemplate
    } else if (evType) {
      // If the EV type is already in the templates array, use it to populate the form
      const existingTemplate = templates.find((t) => t.name === evType);
      if (existingTemplate) {
        setValue("efficiency", Number(existingTemplate.efficiency));
        setValue("batteryCapacity", Number(existingTemplate.batteryCapacity));
      }
    }
  }, [evType, templates, setValue]); // Dependency array: rerun the effect when 'evType' or 'templates' change

  return (
    <div className="max-w-[185px] mx-auto mt-8 inline-block relative">
      <label htmlFor="evType" className="text-gray-500">
        EV Type (Optional)
      </label>
      <select
        id="evType"
        className="block w-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded shadow hover:border-gray-500 focus:outline-none focus:shadow-outline"
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
