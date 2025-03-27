// formSchema.ts
import { z } from "zod";

export const formSchema = z.object({
  numberOfEvs: z
    .string()
    .refine((val) => val === "" || Number.isInteger(Number(val)), {
      message: "Must be a whole number",
    })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "Must be at least 0",
    }),

  dailyMileage: z
    .string()
    .refine((val) => val === "" || Number.isInteger(Number(val)), {
      message: "Must be a whole number",
    })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "Must be at least 0",
    }),

  batteryCapacity: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Must be a number",
    })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "Must be at least 0",
    }),

  chargingPower: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Must be a number",
    })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "Must be at least 0",
    }),

  efficiency: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Must be a number",
    })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "Must be at least 0",
    }),

  evType: z.string(),

  annualMileage: z
    .string()
    .refine((val) => val === "" || Number.isInteger(Number(val)), {
      message: "Must be a whole number",
    })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "Must be at least 0",
    }),

  currentMileage: z
    .string()
    .refine((val) => val === "" || Number.isInteger(Number(val)), {
      message: "Must be a whole number",
    })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "Must be at least 0",
    }),

  currentBatteryHealth: z
    .string()
    .refine((val) => val === "" || Number.isInteger(Number(val)), {
      message: "Must be a whole number",
    })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "Must be at least 0",
    })
    .refine((val) => val === "" || Number(val) <= 100, {
      message: "Must be at most 100",
    }),

  degradationRate: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Must be a number",
    })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "Must be at least 0",
    })
    .refine((val) => val === "" || Number(val) <= 100, {
      message: "Must be at most 100",
    }),

  years: z
    .string()
    .refine((val) => val === "" || Number.isInteger(Number(val)), {
      message: "Must be a whole number",
    })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "Must be at least 0",
    }),
});

export type FormInputs = z.infer<typeof formSchema>;
