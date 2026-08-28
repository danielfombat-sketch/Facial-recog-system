type AttendanceResultProps = {
  name: string;
  employeeId: string;
  date: string;
  time: string;
  status: "Present" | "Late";
};

export default function AttendanceResult({
  name,
  employeeId,
  date,
  time,
  status,
}: AttendanceResultProps) {
  return (
    <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-xl font-semibold text-slate-900">
        Attendance Result
      </h2>

      <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl">
            ✓
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-800">
              Attendance Recorded
            </h3>

            <p className="mt-1 text-sm text-green-700">
              The attendance record has been successfully created.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-medium uppercase text-slate-500">
              Name
            </p>
            <p className="mt-1 font-semibold text-slate-900">{name}</p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase text-slate-500">
              Employee ID
            </p>
            <p className="mt-1 font-semibold text-slate-900">
              {employeeId}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase text-slate-500">
              Date
            </p>
            <p className="mt-1 font-semibold text-slate-900">{date}</p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase text-slate-500">
              Time
            </p>
            <p className="mt-1 font-semibold text-slate-900">{time}</p>
          </div>
        </div>

        <div className="mt-5">
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            {status}
          </span>
        </div>
      </div>
    </section>
  );
}