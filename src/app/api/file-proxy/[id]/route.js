import { connect } from "@/lib/mongodb";
import NoticeDownloadDairy from "@/models/noticeDownloadsDairySchema";
import cloudinary from "@/config/cloudinary";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connect();
    const { id } = await params;

    const record = await NoticeDownloadDairy.findById(id);
    if (!record) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Generate authenticated download URL using Cloudinary API credentials
    const downloadUrl = cloudinary.utils.private_download_url(
      record.publicId,
      record.format || "pdf",
      { resource_type: record.resourceType || "raw" }
    );

    // Fetch the file from Cloudinary server-side (no CORS/auth issues)
    const response = await fetch(downloadUrl);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch file from storage" },
        { status: 500 }
      );
    }

    const buffer = await response.arrayBuffer();
    const contentType =
      response.headers.get("content-type") || "application/octet-stream";

    // Check if user wants to view inline or download
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action") || "download";
    const filename = record.originalFilename || `file.${record.format || "pdf"}`;

    const disposition =
      action === "view"
        ? `inline; filename="${filename}"`
        : `attachment; filename="${filename}"`;

    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": disposition,
        "Content-Length": buffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("File proxy error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
