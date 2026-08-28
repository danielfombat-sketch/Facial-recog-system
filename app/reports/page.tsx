"use client";

import { useMemo, useState } from "react";

import ReportFilters from "../components/reports/reportfilters";
import ReportSummary from "../components/reports/reportsummary";
import ReportTable, {
  ReportRecord,
} from "../components/reports/reporttable";

const sampleRecords: ReportRecord[] = [
  {
    id: 1,
    name: "John Doe",
    employeeId: "EMP001",
    date: "2026-08-25",
    time: "08:15",
    status: "Present",
  },
  {
    id: 2,
    name: "Jane Smith",
    employeeId: "EMP002",
    date: "2026-08-25",
    time: "08:20",
    status: "Present",
  },
  {
    id: 3,
    name: "Alex Brown",
    employeeId: "EMP003",
    date: "2026-08-25",
    time: "09:04",
    status: "Late",
  },
  {
    id: 4,
    name: "Mary Johnson",
    employeeId: "EMP004",
    date: "2026-08-25",
    time: "00:00",
    status: "Absent",
  },
];

export default function ReportsPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("All");

  const filteredRecords = useMemo(() => {
    return sampleRecords.filter((record) => {
      const matchesStartDate =
        startDate === "" || record.date >= startDate;

      const matchesEndDate =
        endDate === "" || record.date <= endDate;

      const matchesStatus =
        status === "All" || record.status === status;

      return (
        matchesStartDate &&
        matchesEndDate &&
        matchesStatus
      );
    });
  }, [startDate, endDate, status]);

  const total = filteredRecords.length;

  const present = filteredRecords.filter(
    (record) => record.status === "Present"
  ).length;

  const late = filteredRecords.filter(
    (record) => record.status === "Late"
  ).length;

  const absent = filteredRecords.filter(
    (record) => record.status === "Absent"
  ).length;

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setStatus("All");
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Attendance Reports
          </h1>
          <p>View and monitor attendance record.</p>

          <p className="mt-2 text-gray-500">
            View, filter and analyze attendance records.
          </p>
        </div>

        {/* Filters */}
        <ReportFilters
          startDate={startDate}
          endDate={endDate}
          status={status}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onStatusChange={setStatus}
          onClear={clearFilters}
        />

        {/* Summary */}
        <div className="mt-6">
          <ReportSummary
            total={total}
            present={present}
            late={late}
            absent={absent}
          />
        </div>

        {/* Table */}
        <div className="mt-6">
          <ReportTable records={filteredRecords} />
        </div>
      </div>
    </main>
  );
}