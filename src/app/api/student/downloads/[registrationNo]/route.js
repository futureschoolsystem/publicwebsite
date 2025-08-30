import Student from "@/models/studentSchema";
import NoticeDownloadDairy from "@/models/noticeDownloadsDairySchema";
import { connect } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const { registrationNo } = context.params; // no need for await here
  await connect();

  const student = await Student.findOne({ registrationNo });
  if (!student) {
    return NextResponse.json({
      success: false,
      message: "Student not found! Login First",
    });
  }
 const downloads = await NoticeDownloadDairy.find({
  className: { $in: [student.className, "All"] },
  campusName: { $in: [student.campusName, "All"] },
  section: { $in: [student.section, "All"] },
  type: "Downloads",
}).sort({ createdAt: -1 });


  return NextResponse.json({ success: true, downloads });
}