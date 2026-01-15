// src/app/api/teacher/notice-downloads-dairy/route.js
import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import NoticeDownloadDairy from "@/models/noticeDownloadsDairySchema";
import cloudinary from "@/config/cloudinary";
// POST: Save Notice
export async function POST(req) {
  try {
    connect();

    const body = await req.formData();
    const { type, heading, date, campusName, className, section } =
      Object.fromEntries(body);
    const image = body.get("image");
    if (
      !type ||
      !heading ||
      !image ||
      !date ||
      !campusName ||
      !className ||
      !section
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const photoUrl = await new Promise((resolve, reject) => {
     const stream = cloudinary.uploader
        .upload_stream(
          {
            folder: "notice_downloads_dairy",
            resource_type: "image",
            use_filename: true,
            unique_filename: true,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        stream.end(buffer);
    });

    const notice = new NoticeDownloadDairy({
      type,
      heading,
      link: photoUrl,
      date,
      campusName,
      className,
      section,
    });
    await notice.save();
    return NextResponse.json({ success: true, notice }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error saving notice", error: error.message },
      { status: 500 }
    );
  }
}

// GET: Fetch All Notices
export async function GET() {
  try {
    connect();
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
