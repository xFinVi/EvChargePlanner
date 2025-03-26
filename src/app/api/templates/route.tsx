// src/app/api/templates/route.ts
import { EV_Templates } from "@/app/Constants/DBdata";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(EV_Templates, { status: 200 });
}
