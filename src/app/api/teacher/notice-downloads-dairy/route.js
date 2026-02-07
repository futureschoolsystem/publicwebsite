// src/app/api/teacher/notice-downloads-dairy/route.js
import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import NoticeDownloadDairy from "@/models/noticeDownloadsDairySchema";
import cloudinary from "@/config/cloudinary";
// POST: Save Notice

export async function POST(req) {
  try {
    await connect();

    const body = await req.formData();
    const { type, heading, date, campusName, className, section } =
      Object.fromEntries(body);

    const file = body.get("image"); // can be pdf or image

    if (!type || !heading || !file || !date || !campusName || !className || !section) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 🔥 Get original filename and extension
    const originalFilename = file.name;
    const fileExtension = originalFilename.split('.').pop().toLowerCase();

    // 🔥 Detect file type
    const isPDF = file.type === "application/pdf" || fileExtension === "pdf";
    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");

    // Determine resource type
    // PDFs and docs go as "raw" — images and videos use their own types
    let resourceType = "raw"; // Default for PDFs, docx, xlsx, etc.
    if (isVideo) resourceType = "video";
    if (isImage) resourceType = "image";

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadOptions = {
        folder: "notice_downloads_dairy",
        resource_type: resourceType,
        public_id: `${Date.now()}_${originalFilename.replace(/\.[^/.]+$/, "")}`, // Use original name without extension
        use_filename: false, // Don't use Cloudinary's filename logic
        unique_filename: false, // Use our custom public_id
        access_mode: "public",
        type: "upload", // Explicitly set upload type
      };

      // 🔥 Force original format for ALL resource types
      uploadOptions.format = fileExtension;

      const stream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.end(buffer);
    });

    // 🔥 Store original filename and extension
    const notice = new NoticeDownloadDairy({
      type,
      heading,
      link: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      resourceType: uploadResult.resource_type,
      format: uploadResult.format || fileExtension,
      originalFilename: originalFilename,
      date,
      campusName,
      className,
      section,
    });

    await notice.save();

    return NextResponse.json({ success: true, notice }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Error saving notice", error: error.message },
      { status: 500 }
    );
  }
}

// GET: Fetch All Notices
export async function GET() {
  try {
    await connect();
    const notices = await NoticeDownloadDairy.find().sort({ date: -1 });
    return NextResponse.json({ success: true, notices });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching notices",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
