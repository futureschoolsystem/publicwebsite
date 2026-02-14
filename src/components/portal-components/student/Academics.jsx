import React from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios';
const Academics = () => {
  const {data:session,status} = useSession();
  const [ testType, setTestType ] = React.useState("");
  const handleChange = async (e) => {
    if(session?.user?.registrationNo){
      try{
    e.preventDefault();
    const selectedTestType = e.target.value;
    console.log("Selected Test Type:", selectedTestType, session.user.registrationNo);
    const response= await axios.get('/api/student/academics',
      {params: {
        registrationNo: session.user.registrationNo,
        testType: selectedTestType
      }}
    )
    if(response.data.success===false){
      alert(response.data.message);
      return;
    }
    if(selectedTestType === "Second Term"){
      console.log("Received data for second term:", response.data.result);
      printResultCardsForSecondTerm(response.data.result);
    }
    else {
      printResultCards(response.data.result);
    }
  }catch(error){
    console.error("Error fetching academic records:", error);
  }
}
  }

function printResultCardsForSecondTerm(data) {
  const printWindow = window.open("", "", "width=1000,height=700");

  let htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Student Result Cards</title>
      <!-- Tailwind CSS CDN -->
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        @media print {
          .page-break {
            page-break-after: always;
          }
        }

        .watermark {
          position: relative;
        }

        .watermark-img {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          opacity: 0.1;
          transform: translate(-50%, -50%);
          z-index: 0;
        }

        .watermark .content {
          position: relative;
          z-index: 1; /* text stays on top */
        }
      </style>
    </head>
    <body class="font-sans p-[2px] bg-white">
  `;

  for (const studentResult of data) {
    const testResults = Array.isArray(studentResult.record?.testResults)
      ? studentResult.record.testResults
      : [];

    const firstTermTestResults = Array.isArray(studentResult.firstTermRecord?.testResults)
      ? studentResult.firstTermRecord.testResults
      : [];
    
    let firstTermTotalMarks=0;
    let firstTermObtainedMarks=0;
    let secondTermTotalMarks=0;
    let secondTermObtainedMarks=0;
    let deviderForTotalPercentage=1;
    if(firstTermTestResults.length > 0 && testResults.length > 0){
      deviderForTotalPercentage=2;
    }
let percentage1=0;
let percentage2=0;
    htmlContent += `
      <div class="page-break watermark">
        <img src="logo.png" class="watermark-img"/>
        <div class="min-h-[94vh] border border-black">
          <div class="p-2">
            <!-- Header -->
            <div class="flex justify-between items-center mb-0">
              <img src="/futureschoollogo.png" alt="logo" class="w-25 h-20" />
              <img src="${studentResult?.student?.photo || "/profile.jpg"}" alt="student-pic" class="w-25 h-20 object-cover rounded border" />
            </div>
 
            <div class="text-center mb-1">
              <p class="text-2xl font-serif font-bold">RESULT CARD</p>
            </div>

            <div class="text-center text-lg font-serif font-semibold mb-1">
              ${studentResult?.record?.testType?.toUpperCase() || ""} (Annual)
              ${studentResult?.record?.year - 1} -
              ${Number(studentResult?.record?.year)}
            </div>

            <!-- Student Info -->
            <table class="w-full border border-black text-sm mb-2">
              <tr class="border">
                <td class="border border-black px-2 py-1"><b>Admission ID</b>: ${studentResult?.student?.registrationNo || ""}</td>
                <td class="border border-black px-2 py-1"><b>Campus</b>: ${studentResult?.student?.campusName || ""}</td>
              </tr>
              <tr>
                <td class="border border-black px-2 py-1"><b>Student's Name</b>: ${studentResult?.student?.name || ""}</td>
                <td class="border border-black px-2 py-1"><b>Father's Name</b>: ${studentResult?.student?.fatherName || ""}</td>
              </tr>
              <tr>
                <td class="border border-black px-2 py-1"><b>Class</b>: ${studentResult?.student?.className || ""}</td>
                <td class="border border-black px-2 py-1"><b>Section</b>: ${studentResult?.student?.section || ""}</td>
              </tr>
            </table>

            <!-- Academic Performance -->
            <h3 class="text-md font-semibold font-serif  mb-2 text-center">ACADEMIC PERFORMANCE</h3>
            <div class="grid grid-cols-2 gap-2">
<div>
            <div class="text-sm text-center font-serif font-semibold">First Term</div>
            <table class="w-full border border-black text-sm mb-2">
              <thead>
                <tr>
                  <th class="border text-left border-black px-2 py-1">Subjects</th>
                  <th class="border border-black px-2 py-1">Total Marks</th>
                  <th class="border border-black px-2 py-1">Obtained Marks</th>
                </tr>
              </thead>
              <tbody>
               ${firstTermTestResults
  .map((sub, index) => {
    const marks =
      sub.marks_obtained === "A" || sub.marks_obtained === "a"
        ? 0
        : Number(sub.marks_obtained) || 0;
    const total = Number(sub.totalMarks) || 0;
    const obtained = isNaN(Number(sub.marks_obtained))
      ? 0
      : Number(sub.marks_obtained);

    firstTermTotalMarks += total;
    firstTermObtainedMarks += obtained;

    percentage1 = firstTermTotalMarks
      ? (firstTermObtainedMarks / firstTermTotalMarks) * 100
      : 0;

    //  SUBJECT FALLBACK LOGIC
    const subject =
      sub.subject ||
      secondTermTestResults?.[index]?.subject ||
      "";

    return `
      <tr>
        <td class="border border-black px-2 py-1">${subject}</td>
        <td class="border text-center border-black px-2 py-1">${sub.totalMarks}</td>
        <td class="border text-center border-black px-2 py-1">
          ${isNaN(Number(sub.marks_obtained)) ? sub.marks_obtained : marks.toFixed(2)}
        </td>
      </tr>
    `;
  })
  .join("")}
                
              </tbody>
            </table>
            </div>

            <div>
            <div class="text-sm text-center font-serif font-semibold">Second Term </div>
            <table class="w-full border border-black text-sm mb-2">
              <thead>
                <tr>
                  <th class="border border-black px-2 py-1">Subjects</th>
                  <th class="border border-black px-2 py-1">Total Marks</th>
                  <th class="border border-black px-2 py-1">Obtained Marks</th>
                </tr>
              </thead>
              <tbody>
                ${testResults
                  .map((sub) => {
                    const marks =
                      sub.marks_obtained === "A" || sub.marks_obtained === "a"
                        ? 0
                        : Number(sub.marks_obtained) || 0;
                    secondTermTotalMarks += Number(sub.totalMarks) || 0;
                    secondTermObtainedMarks += isNaN(Number(sub.marks_obtained))
                      ? 0
                      : Number(sub.marks_obtained);
                      percentage2= secondTermTotalMarks ? (secondTermObtainedMarks/secondTermTotalMarks)*100 :0;
                    return `
                      <tr>
                        <td class="border text-center border-black px-2 py-1">${sub.subject}</td>
                        <td class="border text-center border-black px-2 py-1">${sub.totalMarks}</td>
                        <td class="border text-center border-black px-2 py-1">${isNaN(Number(sub.marks_obtained)) ? sub.marks_obtained : marks.toFixed(2)}</td>
                        
                      </tr>
                    `;
                  })
                  .join("")}
                
              </tbody>
            </table>
            </div>
            </div>
            <!-- Totals Marks Summary -->
            <h3 class="text-md font-semibold font-serif mt-4 mb-2 text-center">Cumulative Summary</h3>
             <table class="w-full border border-black text-sm mb-2">
              <tr class="border">
                <td class="border border-black px-2 py-1"></td>
                <td class="border text-center border-black px-2 py-1"><b>Total Marks</b></td>
                <td class="border text-center border-black px-2 py-1"><b>Obtained Marks</b></td>
                <td class="border text-center border-black px-2 py-1"><b>Percentage</b></td>
                <td class="border text-center border-black px-2 py-1"><b>Grade</b></td>
                <td class="border text-center border-black px-2 py-1"><b>Position</b></td>
                </tr>
              <tr>
                <td class="border  border-black px-2 py-1"><b>First Term</b></td>
                <td class="border text-center border-black px-2 py-1">${firstTermTotalMarks}</td>
                <td class="border text-center border-black px-2 py-1">${firstTermObtainedMarks}</td>
              <td class="border text-center border-black px-2 py-1">${(percentage1).toFixed(2)}</td>
              <td class="border text-center border-black px-2 py-1">${
                    percentage1 >= 90
                      ? "A+"
                      : percentage1 >= 80
                        ? "A"
                        : percentage1 >= 70
                          ? "B"
                          : percentage1 >= 60
                            ? "C"
                            : percentage1 >= 50
                              ? "D"
                              : percentage1 >= 40
                                ? "E"
                                : "F"
                  }</td>
                  <td class="border text-center border-black px-2 py-1"></td>
                </tr>
              <tr>
                <td class="border  border-black px-2 py-1"><b>Second Term</b></td>
                <td class="border text-center border-black px-2 py-1"><b>${secondTermTotalMarks}</b></td>
                <td class="border text-center border-black px-2 py-1"><b>${secondTermObtainedMarks}</b></td>
                <td class="border text-center border-black px-2 py-1">${percentage2.toFixed(2)}</td>
                <td class="border text-center border-black px-2 py-1">${
                    percentage2 >= 90
                      ? "A+"
                      : percentage2 >= 80
                        ? "A"
                        : percentage2 >= 70
                          ? "B"
                          : percentage2 >= 60
                            ? "C"
                            : percentage2 >= 50
                              ? "D"
                              : percentage2 >= 40
                                ? "E"
                                : "F"
                  }
                <td class="border text-center border-black px-2 py-1"></td>
              </tr>
              <tr>
                <td class="border border-black px-2 py-1"><b>Grand Total</b></td>
                <td class="border text-center border-black px-2 py-1"><b>${firstTermTotalMarks+secondTermTotalMarks}</b></td>
                <td class="border text-center border-black px-2 py-1"><b>${firstTermObtainedMarks+secondTermObtainedMarks}</b></td>
                 <td class="border text-center border-black px-2 py-1"><b>${(deviderForTotalPercentage > 0 ? ((percentage1 + percentage2) / deviderForTotalPercentage).toFixed(2) : 0)}</b></td>
                 <td class="border text-center border-black px-2 py-1">${
                    (deviderForTotalPercentage > 0 ? ((percentage1 + percentage2) / deviderForTotalPercentage) : 0) >= 90
                      ? "A+"
                      : (deviderForTotalPercentage > 0 ? ((percentage1 + percentage2) / deviderForTotalPercentage) : 0) >= 80
                        ? "A"
                        : (deviderForTotalPercentage > 0 ? ((percentage1 + percentage2) / deviderForTotalPercentage) : 0) >= 70
                          ? "B"
                          : (deviderForTotalPercentage > 0 ? ((percentage1 + percentage2) / deviderForTotalPercentage) : 0) >= 60
                            ? "C"
                            : (deviderForTotalPercentage > 0 ? ((percentage1 + percentage2) / deviderForTotalPercentage) : 0) >= 50
                              ? "D"
                              : (deviderForTotalPercentage > 0 ? ((percentage1 + percentage2) / deviderForTotalPercentage) : 0) >= 40
                                ? "E"
                                : "F"
                  }
                <td class="border text-center border-black px-2 py-1"><b></b></td>
                </tr>
            </table>
            

          </div>
        </div>
      </div>
    `;
  }
  htmlContent += `
    <script>
      window.onload = function() {
        setTimeout(() => window.print(), 500);
      };
    <\/script>
    </body>
  </html>
  `;
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}

function printResultCards(data) {
  const printWindow = window.open("", "", "width=1000,height=700");

  let htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Student Result Cards</title>
      <!-- Tailwind CSS CDN -->
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        @media print {
          .page-break {
            page-break-after: always;
          }
        }

        .watermark {
          position: relative;
        }

        .watermark-img {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          opacity: 0.1;
          transform: translate(-50%, -50%);
          z-index: 0;
        }

        .watermark .content {
          position: relative;
          z-index: 1; /* text stays on top */
        }
      </style>
    </head>
    <body class="font-sans p-[2px] bg-white">
  `;

  for (const studentResult of data) {
    const testResults = Array.isArray(studentResult.record?.testResults)
      ? studentResult.record.testResults
      : [];

    const totalMarks = testResults.reduce(
      (sum, s) => sum + (Number(s.totalMarks) || 0),
      0
    );

    const obtainedMarks = testResults.reduce(
      (sum, s) =>
        sum +
        (s.marks_obtained === "A" || s.marks_obtained === "a"
          ? 0
          : Number(s.marks_obtained) || 0),
      0
    );

    const percentage = totalMarks
      ? ((obtainedMarks / totalMarks) * 100).toFixed(2)
      : 0;

    htmlContent += `
      <div class="page-break watermark">
        <img src="logo.png" class="watermark-img"/>
        <div class="min-h-[94vh] border border-black">
          <div class="p-3">
            <!-- Header -->
            <div class="flex justify-between items-center mb-2">
              <img src="/futureschoollogo.png" alt="logo" class="w-25 h-20" />
              <img src="${studentResult?.student?.photo || "/profile.jpg"}" alt="student-pic" class="w-25 h-20 object-cover rounded border" />
            </div>
 
            <div class="text-center mb-2">
              <p class="text-2xl font-serif font-bold">RESULT CARD</p>
            </div>

            <div class="text-center text-lg font-serif font-semibold mb-2">
              ${studentResult?.record?.testType?.toUpperCase() || ""}
              ${studentResult?.record?.year} -
              ${Number(studentResult?.record?.year) + 1}
            </div>

            <!-- Student Info -->
            <table class="w-full border border-black text-sm mb-2">
              <tr class="border">
                <td class="border border-black px-2 py-1"><b>Admission ID</b>: ${studentResult?.student?.registrationNo || ""}</td>
                <td class="border border-black px-2 py-1"><b>Campus</b>: ${studentResult?.student?.campusName || ""}</td>
              </tr>
              <tr>
                <td class="border border-black px-2 py-1"><b>Student's Name</b>: ${studentResult?.student?.name || ""}</td>
                <td class="border border-black px-2 py-1"><b>Father's Name</b>: ${studentResult?.student?.fatherName || ""}</td>
              </tr>
              <tr>
                <td class="border border-black px-2 py-1"><b>Class</b>: ${studentResult?.student?.className || ""}</td>
                <td class="border border-black px-2 py-1"><b>Section</b>: ${studentResult?.student?.section || ""}</td>
              </tr>
              
            </table>

            <!-- Academic Performance -->
            <h3 class="text-md font-semibold font-serif mt-6 mb-2 text-center">ACADEMIC PERFORMANCE</h3>
            <table class="w-full border border-black text-sm mb-6">
              <thead>
                <tr>
                  <th class="border text-left border-black px-2 py-1">Subjects</th>
                  <th class="border border-black px-2 py-1">Total Marks</th>
                  <th class="border border-black px-2 py-1">Obtained Marks</th>
                  <th class="border border-black px-2 py-1">Percentage</th>
                  <th class="border border-black px-2 py-1">Grade</th>
                  <th class="border border-black px-2 py-1">Remarks</th>
                </tr>
              </thead>
              <tbody>
                ${testResults
                  .map((sub) => {
                    const marks =
                      sub.marks_obtained === "A" || sub.marks_obtained === "a"
                        ? 0
                        : Number(sub.marks_obtained) || 0;
                    const percent = sub.totalMarks
                      ? ((marks / sub.totalMarks) * 100).toFixed(2)
                      : 0;

                    let grade =
                      percent >= 90
                        ? "A+"
                        : percent >= 80
                          ? "A"
                          : percent >= 70
                            ? "B"
                            : percent >= 60
                              ? "C"
                              : percent >= 50
                                ? "D"
                                : percent >= 40
                                  ? "E"
                                  : "F";

                    let remark =
                      percent >= 90
                        ? "Outstanding"
                        : percent >= 80
                          ? "Excellent"
                          : percent >= 70
                            ? "Very Good"
                            : percent >= 60
                              ? "Good"
                              : percent >= 50
                                ? "Fair"
                                : percent >= 40
                                  ? "Weak"
                                  : "Re-appear";

                    return `
                      <tr>
                        <td class="border border-black px-2 py-1">${sub.subject}</td>
                        <td class="border text-center border-black px-2 py-1">${sub.totalMarks}</td>
                        <td class="border text-center border-black px-2 py-1">${isNaN(Number(sub.marks_obtained)) ? sub.marks_obtained : marks.toFixed(2)}</td>
                        <td class="border text-center border-black px-2 py-1">${percent}%</td>
                        <td class="border text-center border-black px-2 py-1">${grade}</td>
                        <td class="border text-center border-black px-2 py-1">${remark}</td>
                      </tr>
                    `;
                  })
                  .join("")}
                <tr class="font-bold">
                  <td class="border border-black px-2 py-1">Total</td>
                  <td class="border text-center border-black px-2 py-1">${totalMarks}</td>
                  <td class="border text-center border-black px-2 py-1">${obtainedMarks.toFixed(2)}</td>
                  <td class="border text-center border-black px-2 py-1">${percentage}%</td>
                  <td class="border text-center border-black px-2 py-1">${
                    percentage >= 90
                      ? "A+"
                      : percentage >= 80
                        ? "A"
                        : percentage >= 70
                          ? "B"
                          : percentage >= 60
                            ? "C"
                            : percentage >= 50
                              ? "D"
                              : percentage >= 40
                                ? "E"
                                : "F"
                  }</td>
                  <td class="border text-center border-black px-2 py-1">${
                    percentage >= 90
                      ? "Outstanding"
                      : percentage >= 80
                        ? "Excellent"
                        : percentage >= 70
                          ? "Very Good"
                          : percentage >= 60
                            ? "Good"
                            : percentage >= 50
                              ? "Fair"
                              : percentage >= 40
                                ? "Weak"
                                : "Re-appear"
                  }</td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    `;
  }

  htmlContent += `
    <script>
      window.onload = function() {
        setTimeout(() => window.print(), 500);
      };
    <\/script>
    </body>
  </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}

  return (
   <div className="bg-white rounded-lg shadow-sm border p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Academic Records</h2>
     {/* Test Type Selection */}
        <div className="space-y-2">
          <label htmlFor="testType" className="block text-sm font-semibold text-gray-700">
            <i className="fas fa-clipboard-check mr-2 text-orange-600"></i>Test Type
          </label>
          <select value={testType} onChange={(e)=> {
            setTestType(e.target.value)
            handleChange(e)
          } 
          } id="testType" name="testType" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required>
            <option value="" disabled >Select Test Type</option>
            <option value="First Assessment">1st Assessment</option>
            <option value="Second Assessment">2nd Assessment</option>
            <option value="Third Assessment">3rd Assessment</option>
            <option value="Fourth Assessment">4th Assessment</option>
            <option value="Fifth Assessment">5th Assessment</option>
            <option value="First Term">1st Term</option>
            <option value="Second Term">2nd Term</option>
          </select>
        </div>
  </div>
  )
}

export default Academics
