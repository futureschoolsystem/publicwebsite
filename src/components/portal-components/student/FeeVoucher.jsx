"use client";
import React from "react";

export default function FeeVoucher({ student, feeRecords, otherfeeRecords, photoUrl, arrears, otherTotal }) {
  
  function generateSingleVoucher(student, feeRecords, otherfeeRecords, photoUrl, type, arrears, otherTotal) {
    let num = 1;
    return `
      <html>
        <head>
          <title>Fee Voucher</title>
          <link href="/output.css" rel="stylesheet" />
        </head>
        <body>
          <div>
            <div class="rounded-lg border border-black bg-white p-2 shadow-lg">
              <!-- Header Section -->
              <div class="flex justify-between">
                <div class="mr-4">
                  <img src="/voucher/voucherlogo.jpg" class="object-contain" alt="BSS Logo">
                </div> 
                <div class="ml-4">
                  <img src="${photoUrl}" class="object-contain" width="100" height="100" onerror="this.src='/profile.jpg'">
                </div>
              </div>
              <!-- Bank Information -->
              <div class="my-1 text-xs border border-black py-2">
                <div class="flex flex-row">
                  <img src="/voucher/khyberbank.jpg" class="w-5 h-5 mx-2">
                  <p class="text-xxs">The Bank of Khyber A/C # 000478-00</p>
                </div>
                <div class="flex flex-row">
                  <img src="/voucher/alfallahbank.jpg" class="w-5 h-5 mx-2">
                  <p class="text-xxs">Bank Alfalah (Ltd.) A/C # 0069-1007969927</p>
                </div>
              </div>
              <!-- Voucher Info -->
              <div class="grid grid-cols-2">
                <div class="py-1">Std Id: <strong>${student.registrationNo || ""}</strong></div>
                <div class="py-1">Campus: <strong>${student.campusName || ""}</strong></div>
              </div>
              <!-- Student Info -->
              <div class="flex flex-col">
                <div class="py-1">Name: <strong>${student.name || ""}</strong></div>
                <div class="py-1">F.Name: <strong>${student.fatherName || ""}</strong></div>
                <div class="grid grid-cols-2"> 
                  <div class="py-1">Class: <strong>${student.className || ""}</strong></div>
                  <div>Section: <strong>${student.section || ""}</strong></div> 
                </div>
              </div>
              <hr class="my-1 border-t border-black" />
              <!-- Fee Details Table -->
              <div class="my-1 space-y-2">
                <h2 class="text-center text-sm font-bold">Fee Voucher For The Month Of ${feeRecords.at(-1)?.month}</h2>
                <div class="flex flex-row justify-between border-b border-black border-t py-0.5 text-sm">
                  <div class="flex-1 text-left">Issue Date: <strong>${new Date(`${feeRecords.at(-1)?.month} 1, ${feeRecords.at(-1)?.year}`).toLocaleDateString()}</strong></div> 
                  <div class="flex-1 text-right">Due Date:<strong> ${new Date(`${feeRecords.at(-1)?.month} 10, ${feeRecords.at(-1)?.year}`).toLocaleDateString()}</strong></div>
                </div>

                <h2 class="text-center text-sm font-bold">${type}</h2>

                <table class="w-full border border-black text-xs">
                  <thead>
                    <tr class="bg-gray-200">
                      <th class="border border-black px-1 py-0.5 text-center">Sr#</th>
                      <th class="border border-black px-1 py-0.5 text-left">Description</th>
                      <th class="border border-black px-1 py-0.5 text-center">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border border-black px-1 py-0.5 text-center">${num++}</td>
                      <td class="border border-black px-1 py-0.5">Monthly Fee</td>
                      <td class="border border-black px-1 py-0.5 text-center">${arrears >= student.monthlyFee ? student.monthlyFee : arrears}</td>
                    </tr>
                    <tr>
                      <td class="border border-black px-1 py-0.5 text-center">${num++}</td>
                      <td class="border border-black px-1 py-0.5">Red Crescent Society Fund</td>
                      <td class="border border-black px-1 py-0.5 text-center">10</td>
                    </tr>
                    ${
                      arrears - feeRecords.at(-1).totalFee > 0
                        ? `<tr>
                            <td class="border border-black px-1 py-0.5 text-center">${num++}</td>
                            <td class="border border-black px-1 py-0.5">Arrears</td>
                            <td class="border border-black px-1 py-0.5 text-center">${arrears - feeRecords.at(-1).totalFee}</td>
                          </tr>`
                        : ""
                    }
                    ${otherfeeRecords
                      .map(
                        (record) => `
                          <tr>
                            <td class="border border-black px-1 py-0.5 text-center">${num++}</td>
                            <td class="border border-black px-1 py-0.5">${record.feeType || ""}</td>
                            <td class="border border-black px-1 py-0.5 text-center">${record.amount || ""}</td>
                          </tr>
                        `
                      )
                      .join("")}
                  </tbody>
                </table>
                <div class="mt-1 text-center">
                  <p><strong>Total Amount:</strong> ${arrears + 10 + otherTotal || 0}</p>
                  <p><strong>Amount After Due Date:</strong>${(arrears + 10 + 100) + otherTotal}</p>
                </div>
              </div>

              <hr class="my-1 border-t border-black" />

              <!-- Fee History Table -->
              <div class="my-1">
                <h2 class="text-center font-semibold">Student Fee History (Last 6 Months)</h2>
                <table class="w-full border border-black text-xs">
                  <thead>
                    <tr class="bg-gray-200">
                      <th class="border border-black px-1 py-0.5">Sr#</th>
                      <th class="border border-black px-1 py-0.5">Month</th>
                      <th class="border border-black px-1 py-0.5">Date</th>
                      <th class="border border-black px-1 py-0.5">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                  ${feeRecords
                    .slice(0, -1)
                    .slice(-6)
                    .map(
                      (record, idx) => `
                        <tr>
                          <td class="border border-black px-1 py-0.5 text-center">${idx + 1}</td>
                          <td class="border border-black px-1 py-0.5">${record.month || ""}</td>
                          <td class="border border-black px-1 py-0.5 text-center">
                            ${record.paymentDate ? new Date(record.paymentDate).toLocaleDateString() : "-"}
                          </td>
                          <td class="border border-black px-1 py-0.5 text-center">${record.paidFeeAmount || record.status || "Not Paid"}</td>
                        </tr>
                      `
                    )
                    .join("")}
                  </tbody>
                </table>
              </div>
            </div>
            <div class="fixed bottom-1 mt-5 space-x-2 text-xxs"> 
              <div class="flex">
                <div>Cashier ____________</div>
                <div>Officer ____________</div>
                <div>Stamp ____________</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  const handlePrint = () => {
    const voucherHTML = `
      <div class="break-after-page flex gap-x-1 text-xs py-1">
        ${generateSingleVoucher(student, feeRecords, otherfeeRecords, photoUrl, "Bank Copy", arrears, otherTotal)}
        ${generateSingleVoucher(student, feeRecords, otherfeeRecords, photoUrl, "School Copy", arrears, otherTotal)}
        ${generateSingleVoucher(student, feeRecords, otherfeeRecords, photoUrl, "Student Copy", arrears, otherTotal)}
      </div>
    `;
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(voucherHTML);
    printWindow.document.close();

    printWindow.onload = function () {
      printWindow.print();
      printWindow.close();
    };
  };

  return (
    <button
      onClick={handlePrint}
      className="text-lg font-semibold flex justify-center items-end bg-blue-600 hover:bg-blue-800 text-white p-4 rounded-lg"
    >
      Print Fee Voucher
    </button>
  );
}
