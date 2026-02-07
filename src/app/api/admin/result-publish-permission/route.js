import ResultPublishPermission from "@/models/resultPublishPermessionSchema";
import { connect } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connect();
        const { year, testType, stopFeeDefaultersResult } = await req.json();
        if (!year || !testType) {
            return NextResponse.json({ success: false, message: "Year and Test Type are required" }, { status: 400 });
        }
        const existingPermission = await ResultPublishPermission.findOne({ year, testType });
        if (existingPermission) {
            existingPermission.stopFeeDefaultersResult = stopFeeDefaultersResult;
            await existingPermission.save();
            return NextResponse.json({ success: true, message: "Permission updated successfully" });
        }
        const permission = new ResultPublishPermission({ year, testType, stopFeeDefaultersResult });
        await permission.save();
        return NextResponse.json({ success: true, message: "Permission saved successfully" });
    } catch (error) {
        console.error("Error saving permission:", error);
        return NextResponse.json({ success: false, message: "Error saving permission" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connect();
        const permissions = await ResultPublishPermission.find();
        return NextResponse.json({ success: true, permissions });
    } catch (error) {
        console.error("Error fetching permissions:", error);
        return NextResponse.json({ success: false, message: "Error fetching permissions" }, { status: 500 });
    }
}
