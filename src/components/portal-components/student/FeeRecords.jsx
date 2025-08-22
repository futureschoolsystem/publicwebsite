"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { FaCalendarAlt, FaPrint } from "react-icons/fa";
import FeeVoucher from "./FeeVoucher";

const FeeRecords = () => {
  const { data: session, status } = useSession();
  const [feeRecords, setFeeRecords] = useState([]);
  const [student, setStudent] = useState(null);
  const [otherCharges, setOtherCharges] = useState([]);
  const [loading, setLoading] = useState(true);
  const photoUrl = student?.photoUrl || "";
  const arrears = feeRecords.reduce(
    (acc, record) =>
      acc + (record.status === "Unpaid" ? record.totalAmount : 0),
    0
  );
  const otherTotal = otherCharges.reduce(
    (acc, charge) => acc + charge.amount,
    0
  );

  useEffect(() => {
    async function fetchFeeData() {
      if (session?.user?.registrationNo) {
        try {
          setLoading(true);
          const res = await axios.get(
            `/api/student/fee-records/${session.user.registrationNo}`
          );
          setFeeRecords(res.data.feeRecords);
          setOtherCharges(res.data.otherCharges);
          setStudent(res.data.student);
        } catch (error) {
          console.error("Fee fetch error:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    if (status === "authenticated") fetchFeeData();
  }, [session, status]);

  // Loading and error states
  if (status === "loading" || loading) {
    return <div className="text-center py-10">Loading fee records...</div>;
  }
  if (!session) {
    return (
      <div className="text-center py-10">
        Please log in to view your fee records.
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <FeeVoucher
          student={student}
          feeRecords={feeRecords}
          otherfeeRecords={otherCharges}
          photoUrl={photoUrl}
          arrears={arrears}
          otherTotal={otherTotal}
        />
      {/* Filter and Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Fee Records
          </h2>
        </div>
        {/* Fee Records Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Month
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Total Amount
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Paid Amount
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Payment Date
                </th>
              </tr>
            </thead>
            <tbody>
              {feeRecords.map((record) => (
                <tr
                  key={record._id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      <span className="font-medium text-gray-800">
                        {record.month}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-gray-800">
                    Rs. {record.totalFee}
                  </td>
                  <td className="py-4 px-4 font-semibold text-green-600">
                    Rs. {record.paidFeeAmount}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        record.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {record.status === "Paid" ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {record.paymentDate
                      ? new Date(record.paymentDate).toLocaleString()
                      : "Not Paid"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl p-2 font-bold text-gray-800 flex items-center gap-2">
            Other Charges
          </h2>
        </div>
        {/* other charges Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Charges Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Total Amount
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Paid Amount
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Payment Date
                </th>
              </tr>
            </thead>
            <tbody>
              {otherCharges.map((record) => (
                <tr
                  key={record._id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {record.feeType}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-gray-800">
                    Rs. {record.amount}
                  </td>
                  <td className="py-4 px-4 font-semibold text-green-600">
                    Rs. {record.amountPaid}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        record.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {record.status === "Paid" ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {record.paymentDate
                      ? new Date(record.paymentDate).toLocaleString()
                      : "Not Paid"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeeRecords;
