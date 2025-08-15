import { connect } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Student from "@/models/studentSchema";

export async function GET(request, context) {
    await connect();
    const params = await context.params;
    const { registrationNo } = params;
    const student = await Student.findOne({ registrationNo });
    if (!student) {
        return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }
    return NextResponse.json(student);
}