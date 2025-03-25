// src/app/Types/formData.tsx
export interface EVTemplate {
  name: string;
  efficiency: number;
  batteryCapacity: number;
  tariff: number;
}
export interface FormData {
  numberOfEvs?: number;
  dailyMileage?: number;
  batteryCapacity?: number;
  chargingPower?: number;
  efficiency?: number;
  evType?: string;
  initialEfficiency?: number;
  degradationRate?: number;
  years?: number;
}
