import {connect} from "@/lib/mongodb";
import ResultPublishPermission from "@/models/resultPublishPermessionSchema";
import { NextResponse } from "next/server";

export async function DELETE(request,{params}) {
    try {
        await connect();
        const {id}=await params;
        const deletePermission=await ResultPublishPermission.findByIdAndDelete(id);
        if(!deletePermission) return NextResponse.json({success:false,message:"Permission not found"}, {status:404});
        return NextResponse.json({success:true,message:"Permission deleted successfully"});
    } catch (error) {
        console.error("Error deleting permission:", error);
        return NextResponse.json({success:false,message:"Error deleting permission"},{status:500})
    }
}