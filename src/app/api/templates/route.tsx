import { EV_Templates } from "@/app/Constants/DBdata";
import { NextResponse } from "next/server";

/* Our backend handling the get route for /api/templates , we are simply sending a JSON object of ev templates */
export async function GET() {
  return NextResponse.json(EV_Templates, { status: 200 });
}
