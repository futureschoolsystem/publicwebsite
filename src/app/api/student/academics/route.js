import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import Student from "@/models/studentSchema";
import StudentMarks from "@/models/testschema";
import ResultPublishPermission from "@/models/resultPublishPermessionSchema";
import Fee from "@/models/feeSchema";
import OtherFeePayment from "@/models/otherFeeSchema";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const registrationNo = searchParams.get("registrationNo");
    const testType = searchParams.get("testType");
    const yearParam = searchParams.get("year");

    if (!registrationNo || !testType) {
      return NextResponse.json({
        success: false,
        message: "Registration number and test type are required.",
      });
    }

    await connect();

    // Default to current year if year is not provided
    const year = yearParam ? yearParam.trim() : new Date().getFullYear().toString();

    // Check if result publish permission exists for this year and testType
    const permission = await ResultPublishPermission.findOne({
      year: String(year),
      testType: testType,
    });

    if (!permission) {
      return NextResponse.json({
        success: false,
        message: `Results for ${testType} (${year}) are not published yet.`,
      });
    }

    // Find the student
    const student = await Student.findOne({ registrationNo });
    if (!student) {
      return NextResponse.json({
        success: false,
        message: "Student not found! Please login again.",
      });
    }

    // If stopFeeDefaultersResult is active, verify fees
    if (permission.stopFeeDefaultersResult) {
      const studentWithFees = await Student.findById(student._id)
        .populate("feeRecords")
        .populate("otherFeeChargesRecords");

      const hasUnpaidFeeRecords = studentWithFees?.feeRecords?.some(
        (fee) => fee.status === "Unpaid"
      );

      const hasUnpaidOtherFees = studentWithFees?.otherFeeChargesRecords?.some(
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
      year: Number(year),
    });

    if (!record) {
      return NextResponse.json({
        success: false,
        message: `No academic records found for ${testType} in year ${year}.`,
      });
    }

    // For Second Term (Annual), also fetch First Term record if available
    let firstTermRecord = null;
    if (testType === "Second Term") {
      firstTermRecord = await StudentMarks.findOne({
        student_id: student._id.toString(),
        testType: "First Term",
        year: Number(year),
      });

      // Fallback to year - 1 if not recorded in the same year
      if (!firstTermRecord) {
        firstTermRecord = await StudentMarks.findOne({
          student_id: student._id.toString(),
          testType: "First Term",
          year: Number(year) - 1,
        });
      }
    }

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
  } catch (error) {
    console.error("Error in academics API:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching academic records." },
      { status: 500 }
    );
  }
}
