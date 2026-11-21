import DateSheetPublishPermission from "@/models/dateSheetPublishPermissionSchema";
import DateSheet from "@/models/dateSheetSchema";
import NoticeDownloadDairy from "@/models/noticeDownloadsDairySchema";
import Student from "@/models/studentSchema";
import { connect } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const { registrationNo } = await context.params;

  await connect();

  const student = await Student.findOne({ registrationNo });

  if (!student) {
    return NextResponse.json({
      success: false,
      message: "Student not found! Login First",
    });
  }

  // 1. Fetch teacher-uploaded DateSheets from NoticeDownloadDairy
  const uploadedDateSheets = await NoticeDownloadDairy.find({
    className: { $in: [student.className, "All"] },
    campusName: { $in: [student.campusName, "All"] },
    section: { $in: [student.section, "All"] },
    type: "DateSheet",
  }).sort({ createdAt: -1 });

  // 2. Fetch structured table DateSheets if permission granted
  let filteredDateSheets = [];
  try {
    const permissions = await DateSheetPublishPermission.find();

    if (permissions.length > 0) {
      const DateSheets = await Promise.all(
        permissions.map((p) => {
          let query = {};
          if (p.year && p.testType) {
            query = {
              year: p.year,
              testType: p.testType,
            };
            if (p.dateSheetType) {
              query.dateSheetType = p.dateSheetType;
            }
          }
          return DateSheet.findOne(query);
        })
      );

      const validDateSheets = DateSheets.filter(Boolean);

      filteredDateSheets = validDateSheets.map((ds) => ({
        ...ds._doc,
        schedule: ds.schedule.map((day) => ({
          ...day._doc,
          papers: day.papers.filter(
            (paper) => paper.className === student.className
          ),
        })),
      }));
    }
  } catch (err) {
    console.error("Error fetching structured date sheets:", err);
  }

  if (filteredDateSheets.length === 0 && uploadedDateSheets.length === 0) {
    return NextResponse.json({
      success: false,
      message: "No DateSheet Available",
      DateSheets: [],
      uploadedDateSheets: [],
    });
  }

  return NextResponse.json({
    success: true,
    DateSheets: filteredDateSheets,
    uploadedDateSheets: uploadedDateSheets,
  });
}
