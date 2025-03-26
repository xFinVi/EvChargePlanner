import { z } from "zod";

export const formSchema = z.object({
  numberOfEvs: z.number().min(0, "Must be 0 or greater"),
  dailyMileage: z.number().min(0, "Must be 0 or greater"),
  batteryCapacity: z.number().min(0, "Must be 0 or greater"),
  chargingPower: z.number().min(0, "Must be 0 or greater"),
  efficiency: z.number().min(0, "Must be 0 or greater"),
  annualMileage: z.number().min(0, "Must be 0 or greater"),
  currentMileage: z.number().min(0, "Must be 0 or greater"),
  evType: z.string().optional(),
  initialEfficiency: z.number().min(0, "Must be 0 or greater"),
  degradationRate: z.number().min(0, "Must be 0 or greater"),
  years: z.number().min(1, "Must be 1 or greater"),
  tariff: z.number().min(0, "Must be 0 or greater").optional(),
  currentBatteryHealth: z.number().min(0).max(100).default(100),
});

export type FormInputs = z.infer<typeof formSchema>;
