import { connect } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Fee from "@/models/feeSchema";
import Student from "@/models/studentSchema";
import OtherFeePayment from "@/models/otherFeeSchema";

export async function GET(request, {params}){
await connect()
const { registrationNo } = params;
try {
const student = await Student.findOne({ registrationNo });
if (!student) {
return NextResponse.json({ message: "Student not found" }, { status: 404 });
}
const feeRecordIds = student.feeRecords;
const feeRecords = await Fee.find({_id:{$in:feeRecordIds}});

const otherChargesIds = student.otherFeeChargesRecords;
const otherCharges = await OtherFeePayment.find({_id:{$in:otherChargesIds}});

return NextResponse.json({student,feeRecords,otherCharges});
} catch (error) {
console.error("Error fetching fee records:", error);
return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
}
}