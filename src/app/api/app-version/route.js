import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      versionCode: 5,
      versionName: "1.0.4", 
      minVersionCode: 1,
      apkUrl: "https://futureschoolsystem.pk/releases/FutureSchoolSystem.apk",
      releaseNotes: "Background Push Notifications: Periodic sync when closed & category notification count badges on all cards.",
      forceUpdate: false,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
