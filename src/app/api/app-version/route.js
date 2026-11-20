import { NextResponse } from "next/server";
//comment: This API route provides the current version information of the application, including version code, version name, minimum required version code, APK download URL, release notes, and whether a force update is required. It also handles CORS preflight requests with the OPTIONS method.
export async function GET() {
  return NextResponse.json(
    {
      success: true,
      versionCode: 8,
      versionName: "1.0.7",
      minVersionCode: 1,
      apkUrl: "https://futureschoolsystem.pk/releases/FutureSchoolSystem.apk",
      releaseNotes: "Dedicated App Updates Quick Action Card & Instant Google Firebase Cloud Messaging.",
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
