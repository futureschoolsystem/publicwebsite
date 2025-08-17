'use client'
import React, { useEffect } from 'react'
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaIdCard, FaGraduationCap, FaEdit, FaWhatsapp } from "react-icons/fa"
import { useSession } from 'next-auth/react';
import axios from 'axios';

const PersonalInformation = () => {
  const { data: session, status } = useSession();
  const [personalInfo, setPersonalInfo] = React.useState(null);

  useEffect(() => {
    async function fetchData() {
      if (session?.user?.registrationNo) {
        try {
          const personalInfo = await axios.get(`/api/student/personal-info/${session.user.registrationNo}`);
          setPersonalInfo(personalInfo.data);                                       
        } catch (error) {
         console.log(error)
        }
      }
    }
    fetchData();
  }, [session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>Please log in to view your information.</p>;
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            {personalInfo?.photo ? (
              <img
                src={personalInfo.photo}
                alt="Student Photo"
                className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-blue-200"
              />
            ) : (
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                <FaUser />
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{personalInfo?.name}</h1>
            <p className="text-lg text-blue-600 font-medium mb-1">Registration No: {personalInfo?.registrationNo}</p>
            <p className="text-gray-600">Class: {personalInfo?.className} {personalInfo?.section && `(${personalInfo.section})`}</p>
            <p className="text-gray-600">Campus: {personalInfo?.campusName}</p>
            <p className="text-gray-600">Roll No: {personalInfo?.rollno}</p>
            <p className="text-gray-600">Status: {personalInfo?.status}</p>
          </div>
        </div>
      </div>

      {/* Personal Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaIdCard className="text-blue-500" />
            Basic Information
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Name</span>
              <span className="text-gray-800 font-semibold">{personalInfo?.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Student CNIC</span>
              <span className="text-gray-800 font-semibold">{personalInfo?.studentCnic}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Father's Name</span>
              <span className="text-gray-800 font-semibold">{personalInfo?.fatherName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Father CNIC</span>
              <span className="text-gray-800 font-semibold">{personalInfo?.fatherCnic}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Date of Birth</span>
              <span className="text-gray-800 font-semibold">{personalInfo?.dateOfBirth?.slice(0,10)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Gender</span>
              <span className="text-gray-800 font-semibold">{personalInfo?.gender}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Blood Group</span>
              <span className="text-gray-800 font-semibold">{personalInfo?.bloodGroup}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">Religion</span>
              <span className="text-gray-800 font-semibold">{personalInfo?.religion}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">Address</span>
              <span className="text-gray-800 font-semibold">{personalInfo?.address}</span>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaGraduationCap className="text-green-500" />
            Academic Information
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Registration No</span>
              <span className="text-gray-800 font-semibold">{personalInfo?.registrationNo}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Date of Admission</span>
              <span className="text-gray-800 font-semibold">{personalInfo?.dateOfAdmission?.slice(0,10)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Class</span>
              <span className="text-gray-800 font-semibold">{personalInfo?.className}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Section</span>
              <span className="text-gray-800 font-semibold">{personalInfo?.section}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Roll Number</span>
              <span className="text-gray-800 font-semibold">{personalInfo?.rollno}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">Academic Year</span>
              <span className="text-gray-800 font-semibold">{personalInfo?.academicYear || "2025-2026"}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">Campus</span>
              <span className="text-gray-800 font-semibold">{personalInfo?.campusName}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600 font-medium">Status</span>
              <span className="text-gray-800 font-semibold">{personalInfo?.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaPhone className="text-purple-500" />
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaPhone className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Contact 1</p>
                <p className="font-semibold text-gray-800">{personalInfo?.contact1}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaPhone className="text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Contact 2</p>
                <p className="font-semibold text-gray-800">{personalInfo?.contact2}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaWhatsapp className="text-green-500" />
              <div>
                <p className="text-sm text-gray-600">WhatsApp</p>
                <p className="font-semibold text-gray-800">{personalInfo?.whatsapp}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FaMapMarkerAlt className="text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-semibold text-gray-800">{personalInfo?.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 rounded-xl border border-red-200 p-6">
        <h3 className="text-xl font-semibold text-red-800 mb-4">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-red-600 mb-1">Contact Person</p>
            <p className="font-semibold text-red-800">{personalInfo?.fatherName} (Father)</p>
          </div>
          <div>
            <p className="text-sm text-red-600 mb-1">Emergency Number</p>
            <p className="font-semibold text-red-800">{personalInfo?.contact1}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PersonalInformation;
