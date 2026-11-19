import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      versionCode: 3,
      versionName: "1.0.2", 
      minVersionCode: 1,
      apkUrl: "https://futureschoolsystem.pk/releases/FutureSchoolSystem.apk",
      releaseNotes: "Multi-Child Family Accounts: 1-tap fast account switcher and real-time student profile sync. Manual update checking now available.",
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
