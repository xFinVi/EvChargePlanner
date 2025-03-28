import { NextResponse } from "next/server";

import { EV_Templates } from "@/app/Constants/DBdata";

/* handling a specific evType "name" to fetch the required only data instead of the whole object , awaiting the params based on what the user chooses to fetch and then we find that name from our Object and sending that specific row of data to our front end */
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
