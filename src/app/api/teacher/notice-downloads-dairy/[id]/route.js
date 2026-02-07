import { NextResponse } from "next/server";
import NoticeDownloadsDariy from "@/models/noticeDownloadsDairySchema"
import {connect} from "@/lib/mongodb"
import cloudinary from "@/config/cloudinary";

export async function DELETE(request,{params}) {
    try {
        connect();
        const {id}= await params;
        const deleteNotice=await NoticeDownloadsDariy.findByIdAndDelete(id);
        if(!deleteNotice) return NextResponse.json({success:false,message:"Notice not found"}, {status:404});
        await cloudinary.uploader.destroy(deleteNotice.publicId, {
            resource_type: deleteNotice.resourceType || "image",
        });
        return NextResponse.json({success:true,message:"Notice deleted successfully"});
    } catch (error) {
        console.error("Error deleting notice:", error);
        return NextResponse.json({success:false,message:"error deleting notice"},{status:500})
    }
}