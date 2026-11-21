// src/app/api/teacher/notice-downloads-dairy/route.js
import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import NoticeDownloadDairy from "@/models/noticeDownloadsDairySchema";
import cloudinary from "@/config/cloudinary";
import { sendPushNotification } from "@/lib/pushNotification";
// POST: Save Notice

export async function POST(req) {
  try {
    await connect();
    const body = await req.json();

    const { type, heading, link,publicId, date, campusName, className, section } = body;

    if (!type || !heading || !link || !publicId || !date || !campusName || !className || !section) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const notice = new NoticeDownloadDairy({
      type,
      heading,
      link,
      publicId,
      date,
      campusName,
      className,
      section,
    });

    await notice.save();

    // Trigger instant push notification to parents' phones outside the app (even when closed)
    try {
      const typeLabels = {
        Notices: "School Notice",
        DailyDairy: "Daily Diary",
        Downloads: "Downloads",
        Lectures: "Online Lecture",
        DateSheet: "Exam Date Sheet",
        TimeTable: "Class Timetable",
        Syllabus: "Course Syllabus",
      };
      const cleanTitle = typeLabels[type] || "School Alert";
      // Clean heading only: do not append Class or Section into mobile popup message
      const cleanBody = heading;

      await sendPushNotification({
        title: cleanTitle,
        body: cleanBody,
        topic: "notices",
        data: {
          id: notice._id ? notice._id.toString() : "",
          type: type,
          heading: heading,
          category: type === "Notices" ? "notice" : (type === "DailyDairy" ? "diary" : (type === "DateSheet" ? "result" : (type === "Downloads" ? "download" : "notice"))),
        },
      });
    } catch (pushErr) {
      console.error("Push notification failed to send:", pushErr);
    }

    return NextResponse.json(
      { success: true, notice },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Error saving notice" },
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
