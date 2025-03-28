// formSchema.ts
import { z } from "zod";

/* Types schema for our inputs checking that our inputs are NUMBERS, WHOLE numbers and POSITIVE ,
 also using the OPTIONAL in case a user wants to get specific analytics instead of the whole report as well as skip a few inputs based on needs improving UX*/

export const formSchema = z.object({
  numberOfEvs: z
    .number({ invalid_type_error: "Must be a number" })
    .int({ message: "Must be a whole number" }) // make sure its a whole number
    .min(0, { message: "Must be at least 0" }) // minimun value
    .optional(), // optional parameter

  dailyMileage: z
    .number({ invalid_type_error: "Must be a number" })
    .int({ message: "Must be a whole number" })
    .min(0, { message: "Must be at least 0" })
    .optional(),

  // to some parameters we accept decimal numbers
  batteryCapacity: z
    .number({ invalid_type_error: "Must be a number" })
    .min(0, { message: "Must be at least 0" })
    .optional(),
  electricityTariff: z
    .number({ invalid_type_error: "Must be a number" })
    .min(0, { message: "Must be at least 0" })
    .optional(),

  chargingPower: z
    .number({ invalid_type_error: "Must be a number" })
    .min(0, { message: "Must be at least 0" })
    .optional(),

  efficiency: z
    .number({ invalid_type_error: "Must be a number" })
    .min(0, { message: "Must be at least 0" })
    .optional(),

  evType: z.string().optional(), // Keep as string since it’s not numeric

  annualMileage: z
    .number({ invalid_type_error: "Must be a number" })
    .int({ message: "Must be a whole number" })
    .min(0, { message: "Must be at least 0" })
    .optional(),

  currentMileage: z
    .number({ invalid_type_error: "Must be a number" })
    .int({ message: "Must be a whole number" })
    .min(0, { message: "Must be at least 0" })
    .optional(),

  currentBatteryHealth: z
    .number({ invalid_type_error: "Must be a number" })
    .int({ message: "Must be a whole number" })
    .min(0, { message: "Must be at least 0" })
    .max(100, { message: "Must be at most 100" })
    .optional(),

  degradationRate: z
    .number({ invalid_type_error: "Must be a number" })
    .min(0, { message: "Must be at least 0" })
    .max(100, { message: "Must be at most 100" })
    .optional(),

  years: z
    .number({ invalid_type_error: "Must be a number" })
    .int({ message: "Must be a whole number" })
    .min(0, { message: "Must be at least 0" })
    .optional(),
});

export type FormInputs = z.infer<typeof formSchema>;
