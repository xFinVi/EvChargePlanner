// src/app/api/templates/route.ts
import { NextResponse } from "next/server";
import { EVTemplate } from "@/app/Types/formData"; // Adjusted to .tsx

const templates: EVTemplate[] = [
  { name: "Car", efficiency: 4.5, batteryCapacity: 50, chargingPower: 7.4, tariff: 0.15 },
  { name: "Small Van", efficiency: 3.5, batteryCapacity: 75, chargingPower: 50, tariff: 0.15 },
  { name: "Large Van", efficiency: 2.5, batteryCapacity: 100, chargingPower: 150, tariff: 0.15 },
  { name: "HGV", efficiency: 1.2, batteryCapacity: 250, chargingPower: 350, tariff: 0.15 },
];

export async function GET() {
  return NextResponse.json(templates, { status: 200 });
}