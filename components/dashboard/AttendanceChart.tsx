"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const attendanceData = [
  { day: "Mon", present: 32, absent: 8 },
  { day: "Tue", present: 35, absent: 5 },
  { day: "Wed", present: 30, absent: 10 },
  { day: "Thu", present: 37, absent: 3 },
  { day: "Fri", present: 34, absent: 6 },
];

export default function AttendanceChart() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Attendance Overview
        </h2>

        <p className="text-sm text-gray-500">
          Weekly attendance statistics
        </p>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="present"
              name="Present"
              fill="#2563eb"
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="absent"
              name="Absent"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}