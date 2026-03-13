import DateSheetPublishPermission from "@/models/dateSheetPublishPermissionSchema";
import DateSheet from "@/models/dateSheetSchema";
import Student from "@/models/studentSchema";
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

  const permissions = await DateSheetPublishPermission.find();

  if (permissions.length === 0) {
    return NextResponse.json({
      success: false,
      message: "No DateSheet Available",
    });
  }

  const DateSheets = await Promise.all(
    permissions.map((p) =>
      DateSheet.findOne({
        year: p.year,
        testType: p.testType,
        dateSheetType: p.dateSheetType,
      })
    )
  );

  // remove null values
  const validDateSheets = DateSheets.filter(Boolean);

  // filter papers for student's class
  const filteredDateSheets = validDateSheets.map((ds) => ({
    ...ds._doc,
    schedule: ds.schedule.map((day) => ({
      ...day._doc,
      papers: day.papers.filter(
        (paper) => paper.className === student.className
      ),
    })),
  }));

  return NextResponse.json({
    success: true,
    DateSheets: filteredDateSheets,
  });
}