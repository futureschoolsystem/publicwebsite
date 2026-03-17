import DateSheetPublishPermission from "@/models/dateSheetPublishPermissionSchema";
import { connect } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connect();
        const { year, testType, dateSheetType } = await req.json();
        const query = {};
        if(year)
        {
            query.year = year;
        }
        if(testType)
        {
            query.testType = testType;
        }
            if(dateSheetType)
        {
            query.dateSheetType = dateSheetType;
        }
        if (!year || !testType ) {
            return NextResponse.json({ success: false, message: "Year and Test Type are required" }, { status: 400 });
        }
        const existingPermission = await DateSheetPublishPermission.findOne(query);
        if (existingPermission) {
            return NextResponse.json({ success: true, message: "Permission already exists" });
        }
        const permission = new DateSheetPublishPermission(query);
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
        const permissions = await DateSheetPublishPermission.find();
        return NextResponse.json({ success: true, permissions });
    } catch (error) {
        console.error("Error fetching permissions:", error);
        return NextResponse.json({ success: false, message: "Error fetching permissions" }, { status: 500 });
    }
}
