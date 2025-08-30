// src/app/api/teacher/notice-downloads-dairy/route.js
import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import NoticeDownloadDairy from "@/models/noticeDownloadsDairySchema";  
// POST: Save Notice
export async function POST(req) {
  try {
     connect(); 

    const body = await req.json();
    const { type, heading, link, date, campusName, className, section } = body;

    if (!type || !heading || !link || !date || !campusName || !className || !section) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }
    console.log(body);
    const notice = new NoticeDownloadDairy({
      type,
      heading,
      link,
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
      { success: false, message: "Error fetching notices", error: error.message },
      { status: 500 }
    );
  }
}