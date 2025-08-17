import { connect } from "@/lib/mongodb";
import bcrypt from "bcrypt";
import Student from "@/models/studentSchema";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";


connect();

export async function POST(request) {
    try {
  console.log("Login API called");
        const body = await request.json();
        if((body.userName==undefined &&body.registrationNo==undefined) || (body.password==undefined && body.contact==undefined) || body.role==undefined){
            return NextResponse.json({status:400,errors:"Please fill all fields"}, { status: 400 });
        }
        if(body.role==="student"){
            const student = await Student.findOne({ registrationNo:body.registrationNo})
            if(!student) {
                return NextResponse.json({status:400,errors:"Please enter Correct registrationNo"}, { status: 400 });
            }
          if ( student.contact1===body.contact){
            const url= 'student'
            return NextResponse.json({status:200,url, message:"Student Logged in Successfully"},{status:200})
          }
          else{
            return NextResponse.json({status:400,errors:"Please enter Correct contact"}, { status: 400 });
          }
        }
        if(body.role==="admin" || body.role==="teacher"){
            const user = await User.findOne({ userName: body.userName,role:body.role })
            console.log(user)
            if (!user) {
                return NextResponse.json({status:400,errors:"Please enter Correct userName and Role"}, { status: 400 });
            }
            const isMatch = await bcrypt.compare(body.password, user.password);
            if (!isMatch) {
                return NextResponse.json({status:400,errors:"Please enter Correct password"}, { status: 400 });
            }
            const url= user.role
            if (user.role !== body.role) {
                return NextResponse.json({status:400,errors:"Please enter Correct role"}, { status: 400 });
            }
            if (user.role === "teacher") {
                return NextResponse.json({status:200,url, message:"Teacher Logged in Successfully"},{status:200})
            }
            return NextResponse.json({status:200,url, message:"Admin Logged in Successfully"},{status:200})
        }
    } catch (error) {
            return NextResponse.json({status:500, message: "Internal Server Error" }, { status: 500 });
    }
}