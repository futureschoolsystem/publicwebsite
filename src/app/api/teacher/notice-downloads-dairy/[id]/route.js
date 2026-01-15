import { NextResponse } from "next/server";
import NoticeDownloadsDariy from "@/models/noticeDownloadsDairySchema"
import {connect} from "@/lib/mongodb"
import cloudinary from "@/config/cloudinary";
export async function DELETE(request,{params}) {
    try {
        connect();
        const {id}=params;
        const deleteNotice=await NoticeDownloadsDariy.findByIdAndDelete(id);
        if(!deleteNotice) return NextResponse.json({success:false,message:"Notice not found"}, {status:404});
        await cloudinary.uploader.destroy(deleteNotice.link,{ resource_type: "image" });
        
        return NextResponse.json({success:true,message:"Notice deleted successfully"});
    } catch (error) {
        return NextResponse.json({success:false,message:"error deleting notice"},{status:500})
    }
}