import DailyLoginCount from "@/models/dailyLoginCountsSchema";
import { connect } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connect();

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  const selectedDate = new Date(date);
  selectedDate.setHours(0, 0, 0, 0);

  const record = await DailyLoginCount.findOne({ date: selectedDate });

  return NextResponse.json({
    success: true,
    loginStudents: record?.loginStudents || [],
  });
}