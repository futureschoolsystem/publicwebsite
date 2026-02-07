import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import Student from "@/models/studentSchema";
import StudentMarks from "@/models/testschema";
import ResultPublishPermission from "@/models/resultPublishPermessionSchema";
import Fee from "@/models/feeSchema";
import OtherFeePayment from "@/models/otherFeeSchema";


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
  let year= new Date().getFullYear().toString();
  if(testType !== "Second Term") {
    year= (new Date().getFullYear() - 1).toString();
  }

  const permission = await ResultPublishPermission.findOne({ year, testType });
  if (!permission) {
    return NextResponse.json({
      success: false,
      message: "Results are not published yet.",
    });
  }
  // Find the student
  const student = await Student.findOne({ registrationNo });
  if (!student) {
    return NextResponse.json({
      success: false,
      message: "Student not found! Login first.",
    });
  }

if (permission.stopFeeDefaultersResult) {
  // Fetch the student with populated fee records
  const studentWithFees = await Student.findById(student._id)
    .populate("feeRecords") // Populate Fee documents
    .populate("otherFeeChargesRecords"); // Populate OtherFeePayment documents

  // Check if any Fee records are unpaid
  const hasUnpaidFeeRecords = studentWithFees.feeRecords.some(
    (fee) => fee.status === "Unpaid"
  );

  // Check if any Other Fee records are unpaid
  const hasUnpaidOtherFees = studentWithFees.otherFeeChargesRecords.some(
    (otherFee) => otherFee.status === "Unpaid"
  );

  if (hasUnpaidFeeRecords || hasUnpaidOtherFees) {
    return NextResponse.json({
      success: false,
      message:
        "Results are not available due to unpaid fees. Please clear your dues to access the results.",
    });
  }
}
  
  // Fetch the requested academic record
  const record = await StudentMarks.findOne({
    student_id: student._id.toString(),
    testType,
    year,
  });

  if (!record) {
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