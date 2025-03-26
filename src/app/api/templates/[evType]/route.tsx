import { NextResponse } from "next/server";

import { EV_Templates } from "@/app/Constants/DBdata";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ evType: string }> }
) {
  const { evType } = await params;
  const template = EV_Templates.find((ev) => ev.name === evType);
  if (!template) {
    return NextResponse.json({ error: "EV type not found" }, { status: 404 });
  }
  return NextResponse.json(template);
}
