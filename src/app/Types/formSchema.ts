// formSchema.ts
import { z } from "zod";

/* Types schema for our inputs checking that our inputs are NUMBERS, WHOLE numbers and POSITIVE ,
 also using the OPTIONAL in case a user wants to get specific analytics instead of the whole report as well as skip a few inputs based on needs improving UX*/

export const formSchema = z.object({
  numberOfEvs: z.preprocess(
    (a) => (a === "" ? undefined : Number(a)),
    z
      .number({ invalid_type_error: "Must be a number" }) // make sure its a whole number
      .int({ message: "Must be a whole number" }) // minimun value
      .min(0, { message: "Must be at least 0" })
      .optional()
  ),
  dailyMileage: z.preprocess(
    (a) => (a === "" ? undefined : Number(a)),
    z
      .number({ invalid_type_error: "Must be a number" })
      .int({ message: "Must be a whole number" })
      .min(0, { message: "Must be at least 0" })
      .optional()
  ),
  batteryCapacity: z.preprocess(
    // to some parameters we accept decimal numbers
    (a) => (a === "" ? undefined : Number(a)),
    z
      .number({ invalid_type_error: "Must be a number" })
      .min(0, { message: "Must be at least 0" })
      .optional()
  ),
  electricityTariff: z.preprocess(
    (a) => (a === "" ? undefined : Number(a)),
    z
      .number({ invalid_type_error: "Must be a number" })
      .min(0, { message: "Must be at least 0" })
      .max(2, { message: "Must be at most 2" })
      .optional()
  ),
  chargingPower: z.preprocess(
    (a) => (a === "" ? undefined : Number(a)),
    z
      .number({ invalid_type_error: "Must be a number" })
      .min(0, { message: "Must be at least 0" })
      .optional()
  ),
  efficiency: z.preprocess(
    (a) => (a === "" ? undefined : Number(a)),
    z
      .number({ invalid_type_error: "Must be a number" })
      .min(0, { message: "Must be at least 0" })
      .optional()
  ),
  evType: z.string().optional(), // Keep as string since it’s not numeric
  annualMileage: z.preprocess(
    (a) => (a === "" ? undefined : Number(a)),
    z
      .number({ invalid_type_error: "Must be a number" })
      .int({ message: "Must be a whole number" })
      .min(0, { message: "Must be at least 0" })
      .optional()
  ),
  currentMileage: z.preprocess(
    (a) => (a === "" ? undefined : Number(a)),
    z
      .number({ invalid_type_error: "Must be a number" })
      .int({ message: "Must be a whole number" })
      .min(0, { message: "Must be at least 0" })
      .optional()
  ),
  currentBatteryHealth: z.preprocess(
    (a) => (a === "" ? undefined : Number(a)),
    z
      .number({ invalid_type_error: "Must be a number" })
      .int({ message: "Must be a whole number" })
      .min(0, { message: "Must be at least 0" })
      .max(100, { message: "Must be at most 100" })
      .optional()
  ),
  degradationRate: z.preprocess(
    (a) => (a === "" ? undefined : Number(a)),
    z
      .number({ invalid_type_error: "Must be a number" })
      .min(0, { message: "Must be at least 0" })
      .max(100, { message: "Must be at most 100" })
      .optional()
  ),
  years: z.preprocess(
    (a) => (a === "" ? undefined : Number(a)),
    z
      .number({ invalid_type_error: "Must be a number" })
      .int({ message: "Must be a whole number" })
      .min(0, { message: "Must be at least 0" })
      .optional()
  ),
});

export type FormInputs = z.infer<typeof formSchema>;
