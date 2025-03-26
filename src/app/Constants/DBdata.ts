import { EVTemplate } from "../Types/formData";

export const EV_TYPES = [
  { name: "Car" },
  { name: "Small Van" },
  { name: "Large Van" },
  { name: "HGV" },
];

export const EV_Templates: EVTemplate[] = [
  { name: "Car", efficiency: 4.5, batteryCapacity: 50 },
  { name: "Small Van", efficiency: 3.5, batteryCapacity: 75 },
  { name: "Large Van", efficiency: 2.5, batteryCapacity: 100 },
  { name: "HGV", efficiency: 1.2, batteryCapacity: 250 },
];
