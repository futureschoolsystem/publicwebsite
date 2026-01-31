import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import Student from "@/models/studentSchema";
import StudentMarks from "@/models/testschema";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const registrationNo = searchParams.get("registrationNo");
  const testType = searchParams.get("testType");

  if (!registrationNo || !testType) {
    return NextResponse.json({
      success: false,
      message: "Registration number and test type are required.",
    });
  }

  await connect();

  // Find the student
  const student = await Student.findOne({ registrationNo });
  if (!student) {
    return NextResponse.json({
      success: false,
      message: "Student not found! Login first.",
    });
  }

  // Determine the year
  const currentYear = new Date().getFullYear();
  const year = testType === "Second Term" ? currentYear : currentYear - 1;

  // Fetch the requested academic record
  const record = await StudentMarks.findOne({
    student_id: student._id.toString(),
    testType,
    year,
  });

  if (!record) {
    console.log("No academic records found.");
    return NextResponse.json({
      success: false,
      message: "No academic records found for the specified test type and year.",
    });
  }

  // Fetch first term record if the requested record is Second Term
  let firstTermRecord = null;
  if (testType === "Second Term") {
    firstTermRecord = await StudentMarks.findOne({
      student_id: student._id.toString(),
      testType: "First Term",
      year: year - 1,
    });
  }

  // Prepare the response
  const result = [
    {
      student: {
        id: student._id,
        name: student.name,
        registrationNo: student.registrationNo,
        fatherName: student.fatherName,
        className: student.className,
        section: student.section,
        campusName: student.campusName,
        photo: student.photo,
      },
      record,
      firstTermRecord,
    },
  ];

  return NextResponse.json({ success: true, result });
}