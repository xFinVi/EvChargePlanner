import { NextResponse } from "next/server";
import { EVTemplate } from "@/app/Types/formData";

const TEMPLATES: Record<string, EVTemplate> = {
  Car: {
    name: "Car",
    efficiency: 4.5,
    batteryCapacity: 50,

    tariff: 0.15,
  },
  "Small Van": {
    name: "Small Van",
    efficiency: 3.5,
    batteryCapacity: 75,

    tariff: 0.15,
  },
  "Large Van": {
    name: "Large Van",
    efficiency: 2.5,
    batteryCapacity: 100,

    tariff: 0.15,
  },
  HGV: {
    name: "HGV",
    efficiency: 1.2,
    batteryCapacity: 250,

    tariff: 0.15,
  },
};

export async function GET(
  request: Request,
  { params }: { params: { evType: string } }
) {
  const evType = params.evType;
  const template = TEMPLATES[evType];
  if (!template) {
    return NextResponse.json({ error: "EV type not found" }, { status: 404 });
  }
  return NextResponse.json(template);
}
