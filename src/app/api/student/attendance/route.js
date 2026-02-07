import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import StudentMonthlyAttendance from "@/models/StudentMonthlyAttendence";

export async function GET(req) {
  try {
    await connect();

    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");
    const month = searchParams.get("month"); // YYYY-MM

    if (!studentId || !month) {
      return NextResponse.json(
        { success: false, message: "studentId and month are required" },
        { status: 400 }
      );
    }

    const attendanceRecord = await StudentMonthlyAttendance.findOne({
      studentId,
      month,
    }).lean();
    

    if (!attendanceRecord) {
      return NextResponse.json(
        { success: true, attendance: null },
        { status: 200 }
      );
    }

    const days = attendanceRecord.days || [];

    // 🔥 Detect current month
    const today = new Date();
    const currentMonth = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}`;

    let filteredDays = days;

    //  If current month → only show till today
    if (month === currentMonth) {
      const todayDate = today.getDate(); // 1–31
      filteredDays = days.slice(0, todayDate);
    }

    return NextResponse.json(
      {
        success: true,
        attendance: {
          month,
          days: filteredDays,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching attendance" },
      { status: 500 }
    );
  }
}