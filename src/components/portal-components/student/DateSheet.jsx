"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Calendar, BookOpen, AlertCircle } from "lucide-react";

export default function StudentDateSheet() {
  const [dateSheets, setDateSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const { data: session, status } = useSession();
  const printRef = useRef();

  useEffect(() => {
    async function fetchDateSheet() {
      if (status !== "authenticated") return;

      try {
        const res = await fetch(
          `/api/student/date-sheet/${session.user.registrationNo}`
        );
        const data = await res.json();
        if (data.success && Array.isArray(data.DateSheets)) {
          setDateSheets(data.DateSheets);
        } else {
          setDateSheets([]);
        }
      } catch (error) {
        console.error("Error fetching DateSheet:", error);
        setDateSheets([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDateSheet();
  }, [status, session]);

  const downloadPDF = async () => {
  setDownloading(true);

  try {
    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF();

    let yPosition = 20;

    dateSheets.forEach((ds) => {
      // Title
      doc.setFontSize(18);
      doc.text("Exam Date Sheet", 14, yPosition);

      yPosition += 8;

      doc.setFontSize(12);
      doc.text(`Test Type: ${ds.testType}`, 14, yPosition);
      yPosition += 6;

      doc.text(`Date Sheet Type: ${ds.dateSheetType}`, 14, yPosition);
      yPosition += 6;

      doc.text(`Year: ${ds.year}`, 14, yPosition);

      yPosition += 10;

      const tableRows = [];

      ds.schedule.forEach((day) => {
        day.papers.forEach((paper) => {
          tableRows.push([
            new Date(day.date).toLocaleDateString(),
            day.day,
            paper.subjectName,
            paper.className,
          ]);
        });
      });

      autoTable(doc, {
        startY: yPosition,
        head: [["Date", "Day", "Subject", "Class"]],
        body: tableRows,
        theme: "grid",
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
        },
      });

      yPosition = doc.lastAutoTable.finalY + 15;
    });

    doc.save(`DateSheet_${new Date().getFullYear()}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }

  setDownloading(false);
};


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 flex flex-col items-center gap-4">
            <div className="animate-spin">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <p className="text-muted-foreground">Loading your exam date sheet...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!dateSheets.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-dashed">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <AlertCircle className="w-12 h-12 text-muted-foreground" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">No Date Sheet Available</h3>
                <p className="text-sm text-muted-foreground">
                  Your exam schedule will appear here once it's published.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-10 md:py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-1 bg-primary rounded-full" />
            <h1 className="text-4xl font-bold text-foreground">Exam Date Sheet</h1>
          </div>
        </div>

        {/* Download Button */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Button
            onClick={downloadPDF}
            disabled={downloading}
            className="sm:w-auto gap-2 bg-primary hover:bg-primary/90"
          >
            <Download className="w-4 h-4" />
            {downloading ? "Generating PDF..." : "Download as PDF"}
          </Button>
          
        </div>

        {/* Main Content - Hidden for print but visible in DOM for PDF */}
        <div ref={printRef} className="space-y-6">
          {dateSheets.map((ds) => (
            <Card key={ds._id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
              {/* Card Header */}
              <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl text-primary flex items-center gap-2">
                      <BookOpen className="w-6 h-6" />
                      {ds.testType}
                    </CardTitle>
                    <CardDescription className="mt-1 text-base">
                      <span className="font-semibold text-foreground">{ds.dateSheetType}</span>
                      {" "} • {" "}
                      <span className="text-muted-foreground">Year {ds.year}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              {/* Card Content */}
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {ds.schedule.map((day, dayIndex) => (
                    <div key={day.date} className="border-l-4 border-primary/30 pl-4 py-2">
                      {/* Date Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-3">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-foreground">
                            {new Date(day.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </h4>
                          <p className="text-sm text-muted-foreground">{day.day}</p>
                        </div>
                      </div>

                      {/* Subjects List */}
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 space-y-2">
                        {day.papers.map((paper, idx) => (
                          <div
                            key={paper._id}
                            className="flex items-start gap-4 pb-2 last:pb-0"
                          >
                            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/20 dark:bg-primary/30 flex-shrink-0 mt-0.5">
                              <span className="text-xs font-semibold text-primary">
                                {idx + 1}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-foreground">
                                {paper.subjectName}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Class: {paper.className}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
          <p className="text-sm text-blue-900 dark:text-blue-100 flex items-start gap-2">
            <span className="text-base mt-0.5">ℹ️</span>
            <span>
              <strong>Important:</strong> Please save or download this date sheet.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
