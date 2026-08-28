// export type AttendanceRecord = {
//   id: number;
//   name: string;
//   employeeId: string;
//   date: string;
//   time: string;
//   status: "Present" | "Late" | "Absent";
// };

// type AttendanceTableProps = {
//   records: AttendanceRecord[];
// };

// export default function AttendanceTable({
//   records,
// }: AttendanceTableProps) {
//   return (
//     <section className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
//       <div className="border-b border-slate-200 p-5">
//         <h2 className="text-xl font-semibold text-slate-900">
//           Attendance Records
//         </h2>

//         <p className="mt-1 text-sm text-slate-500">
//           View recorded attendance.
//         </p>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-left">
//           <thead className="bg-slate-50 text-sm text-slate-500">
//             <tr>
//               <th className="px-6 py-4 font-medium">Name</th>
//               <th className="px-6 py-4 font-medium">Employee ID</th>
//               <th className="px-6 py-4 font-medium">Date</th>
//               <th className="px-6 py-4 font-medium">Time</th>
//               <th className="px-6 py-4 font-medium">Status</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-slate-200">
//             {records.map((record) => (
//               <tr key={record.id} className="hover:bg-slate-50">
//                 <td className="px-6 py-4 font-medium text-slate-900">
//                   {record.name}
//                 </td>

//                 <td className="px-6 py-4 text-slate-500">
//                   {record.employeeId}
//                 </td>

//                 <td className="px-6 py-4 text-slate-500">
//                   {record.date}
//                 </td>

//                 <td className="px-6 py-4 text-slate-500">
//                   {record.time}
//                 </td>

//                 <td className="px-6 py-4">
//                   <span
//                     className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                       record.status === "Present"
//                         ? "bg-green-100 text-green-700"
//                         : record.status === "Late"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {record.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}

//             {records.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={5}
//                   className="px-6 py-10 text-center text-slate-500"
//                 >
//                   No attendance records found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// }

"use client";

import { useMemo, useState } from "react";

export type AttendanceRecord = {
  id: number;
  name: string;
  employeeId: string;
  date: string;
  time: string;
  status: "Present" | "Late" | "Absent";
};

type AttendanceTableProps = {
  records: AttendanceRecord[];
};

export default function AttendanceTable({
  records,
}: AttendanceTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        record.name.toLowerCase().includes(searchValue) ||
        record.employeeId.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        record.status === statusFilter;

      const matchesDate =
        dateFilter === "" ||
        record.date === dateFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [records, search, statusFilter, dateFilter]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setDateFilter("");
  };

  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Attendance Records
        </h2>

        <p className="mt-1 text-gray-500">
          Search and filter attendance records.
        </p>
      </div>

      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* Search */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Search
          </label>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name or employee ID"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Status
          </label>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="All">All</option>
            <option value="Present">Present</option>
            <option value="Late">Late</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Date
          </label>

          <input
            type="text"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            placeholder="e.g. 8/25/2026"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Clear */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={clearFilters}
            className="w-full rounded-lg bg-gray-100 px-4 py-3 font-medium text-gray-700 hover:bg-gray-200"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Result count */}
      <div className="mt-6 text-sm text-gray-500">
        Showing{" "}
        <span className="font-semibold text-gray-900">
          {filteredRecords.length}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900">
          {records.length}
        </span>{" "}
        records
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Name
              </th>

              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Employee ID
              </th>

              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Date
              </th>

              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Time
              </th>

              <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-gray-100"
                >
                  <td className="px-4 py-4 font-medium text-gray-900">
                    {record.name}
                  </td>

                  <td className="px-4 py-4 text-gray-600">
                    {record.employeeId}
                  </td>

                  <td className="px-4 py-4 text-gray-600">
                    {record.date}
                  </td>

                  <td className="px-4 py-4 text-gray-600">
                    {record.time}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        record.status === "Present"
                          ? "bg-green-100 text-green-700"
                          : record.status === "Late"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-gray-500"
                >
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}