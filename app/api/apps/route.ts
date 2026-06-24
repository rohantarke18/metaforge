import { NextRequest, NextResponse } from "next/server";
import { createApp, getApps } from "@/lib/crud/app";
import { AppSchema } from "@/lib/validator/appSchema";

export async function GET() {
  const apps = await getApps();
  return NextResponse.json(apps);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validated = AppSchema.parse(body);

  const app = await createApp(validated);

  return NextResponse.json(app);
}