import Student from "@/models/studentSchema";
import NoticeDownloadDairy from "@/models/noticeDownloadsDairySchema";
import { connect } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const { registrationNo } =await context.params; 
  await connect();

  const student = await Student.findOne({ registrationNo });
  if (!student) {
    return NextResponse.json({
      success: false,
      message: "Student not found! Login First",
    });
  }
 const notices = await NoticeDownloadDairy.find({
  className: { $in: [student.className, "All"] },
  campusName: { $in: [student.campusName, "All"] },
  section: { $in: [student.section, "All"] },
  type: "Notices",
});
  return NextResponse.json({ success: true, notices });
}