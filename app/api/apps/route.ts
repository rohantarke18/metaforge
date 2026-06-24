import { NextRequest, NextResponse } from "next/server";
import {
  createApp,
  getApps,
  updateApp,
  deleteApp,
} from "@/lib/crud/app";

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

export async function PUT(req: NextRequest) {
  const body = await req.json();

  const { id, ...rest } = body;

  const validated = AppSchema.parse(rest);

  const app = await updateApp(id, validated);

  return NextResponse.json(app);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Missing ID" },
      { status: 400 }
    );
  }

  await deleteApp(id);

  return NextResponse.json({
    success: true,
  });
}