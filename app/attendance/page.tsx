// "use client";

// export default function AttendancePage() {
//   return (
//     <main className="min-h-screen bg-slate-50 p-6 md:p-10">
//       <div className="mx-auto max-w-7xl">
//         {/* Page Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-900">
//             Attendance
//           </h1>

//           <p className="mt-2 text-slate-500">
//             Scan a face or manually record attendance.
//           </p>
//         </div>

//         {/* Attendance Content */}
//         <div className="grid gap-6 lg:grid-cols-2">
          
//           {/* Face Scanning Section */}
//           <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
//             <h2 className="text-xl font-semibold text-slate-900">
//               Attendance Scanner
//             </h2>

//             <p className="mt-1 text-sm text-slate-500">
//               Use facial recognition to record attendance.
//             </p>

//             {/* Scanner Placeholder */}
//             <div className="mt-6 flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-100">
//               <div className="text-center">
//                 <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 text-4xl">
//                   👤
//                 </div>

//                 <p className="font-medium text-slate-700">
//                   Camera Scanner
//                 </p>

//                 <p className="mt-1 text-sm text-slate-500">
//                   Face recognition will appear here.
//                 </p>
//               </div>
//             </div>

//             <button
//               className="mt-5 w-full rounded-lg bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
//             >
//               Start Face Scan
//             </button>
//           </section>

//           {/* Manual Attendance Section */}
//           <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
//             <h2 className="text-xl font-semibold text-slate-900">
//               Manual Attendance
//             </h2>

//             <p className="mt-1 text-sm text-slate-500">
//               Record attendance manually when face scanning is unavailable.
//             </p>

//             <form className="mt-6 space-y-4">
//               <div>
//                 <label
//                   htmlFor="employeeName"
//                   className="mb-2 block text-sm font-medium text-slate-700"
//                 >
//                   Employee / Intern Name
//                 </label>

//                 <input
//                   id="employeeName"
//                   type="text"
//                   placeholder="Enter name"
//                   className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-600"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="employeeId"
//                   className="mb-2 block text-sm font-medium text-slate-700"
//                 >
//                   Employee ID
//                 </label>

//                 <input
//                   id="employeeId"
//                   type="text"
//                   placeholder="Enter employee ID"
//                   className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-600"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full rounded-lg bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
//               >
//                 Record Attendance
//               </button>
//             </form>
//           </section>
//         </div>

//         {/* Attendance Result */}
//         <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
//           <h2 className="text-xl font-semibold text-slate-900">
//             Attendance Result
//           </h2>

//           <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
//             <p className="text-slate-500">
//               No attendance scan has been completed yet.
//             </p>

//             <p className="mt-2 text-sm text-slate-400">
//               The attendance result will appear here after a successful scan
//               or manual entry.
//             </p>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

// "use client";

// import { useState } from "react";
// import ManualAttendanceForm from "../components/attendance1/manualattendanceform";
// import AttendanceResult from "../components/attendance1/attendanceresult";
// import AttendanceTable, {
//   AttendanceRecord,
// } from "../../app/components/attendance1/attendancetable";

// export default function AttendancePage() {
//   const [records, setRecords] = useState<AttendanceRecord[]>([]);
//   const [lastAttendance, setLastAttendance] =
//     useState<AttendanceRecord | null>(null);

//   const handleManualAttendance = (
//     name: string,
//     employeeId: string
//   ) => {
//     const now = new Date();

//     const newRecord: AttendanceRecord = {
//       id: Date.now(),
//       name,
//       employeeId,
//       date: now.toLocaleDateString(),
//       time: now.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//       status: "Present",
//     };

//     setRecords((currentRecords) => [
//       newRecord,
//       ...currentRecords,
//     ]);

//     setLastAttendance(newRecord);
//   };

//   return (
//     <main className="min-h-screen bg-slate-50 p-6 md:p-10">
//       <div className="mx-auto max-w-7xl">

//         {/* Page Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-900">
//             Attendance
//           </h1>

//           <p className="mt-2 text-slate-500">
//             Scan a face or manually record attendance.
//           </p>
//         </div>

//         {/* Scanner + Manual Attendance */}
//         <div className="grid gap-6 lg:grid-cols-2">

//           {/* Face Scanner */}
//           <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
//             <h2 className="text-xl font-semibold text-slate-900">
//               Attendance Scanner
//             </h2>

//             <p className="mt-1 text-sm text-slate-500">
//               Use facial recognition to record attendance.
//             </p>

//             <div className="mt-6 flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-100">
//               <div className="text-center">
//                 <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 text-4xl">
//                   👤
//                 </div>

//                 <p className="font-medium text-slate-700">
//                   Camera Scanner
//                 </p>

//                 <p className="mt-1 text-sm text-slate-500">
//                   Face recognition will appear here.
//                 </p>
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={() =>
//                 alert(
//                   "Face scanning will be connected to the facial recognition component."
//                 )
//               }
//               className="mt-5 w-full rounded-lg bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
//             >
//               Start Face Scan
//             </button>
//           </section>

//           {/* Manual Attendance */}
//           <ManualAttendanceForm
//             onSubmit={handleManualAttendance}
//           />

//         </div>

//         {/* Attendance Result */}
//         {lastAttendance && (
//           <AttendanceResult
//             name={lastAttendance.name}
//             employeeId={lastAttendance.employeeId}
//             date={lastAttendance.date}
//             time={lastAttendance.time}
//             status={
//               lastAttendance.status === "Absent"
//                 ? "Present"
//                 : lastAttendance.status
//             }
//           />
//         )}

//         {/* Attendance Table */}
//         <AttendanceTable records={records} />

//       </div>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import AttendanceResult from "../components/attendance1/attendanceresult";
import AttendanceTable, {
  AttendanceRecord,
} from "../../app/components/attendance1/attendancetable";

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [lastAttendance, setLastAttendance] =
    useState<AttendanceRecord | null>(null);

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Attendance
          </h1>

          <p className="mt-2 text-slate-500">
            Scan a face to record attendance.
          </p>
        </div>

        {/* Face Scanner */}
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            Attendance Scanner
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Use facial recognition to record attendance.
          </p>

          <div className="mt-6 flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-100">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 text-4xl">
                👤
              </div>

              <p className="font-medium text-slate-700">
                Camera Scanner
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Face recognition will appear here.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              alert(
                "Face scanning will be connected to the facial recognition component."
              )
            }
            className="mt-5 w-full rounded-lg bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
          >
            Start Face Scan
          </button>
        </section>

        {/* Attendance Result */}
        {lastAttendance && (
          <AttendanceResult
            name={lastAttendance.name}
            employeeId={lastAttendance.employeeId}
            date={lastAttendance.date}
            time={lastAttendance.time}
            status={
              lastAttendance.status === "Absent"
                ? "Present"
                : lastAttendance.status
            }
          />
        )}

        {/* Attendance Table */}
        <AttendanceTable records={records} />

      </div>
    </main>
  );
}