export type ReportRecord = {
  id: number;
  name: string;
  employeeId: string;
  date: string;
  time: string;
  status: "Present" | "Late" | "Absent";
};

type ReportTableProps = {
  records: ReportRecord[];
};

export default function ReportTable({
  records,
}: ReportTableProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">
          Attendance Report
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Detailed attendance records.
        </p>
      </div>

      <div className="overflow-x-auto">
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
            {records.length > 0 ? (
              records.map((record) => (
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
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}