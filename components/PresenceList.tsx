type Person = {
  id: number;
  name: string;
  role: string;
  status: "Present" | "Absent";
};

const people: Person[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Intern",
    status: "Present",
  },
  {
    id: 2,
    name: "Mary Smith",
    role: "Trainer",
    status: "Present",
  },
  {
    id: 3,
    name: "Paul Johnson",
    role: "Intern",
    status: "Absent",
  },
  {
    id: 4,
    name: "Sarah Brown",
    role: "Intern",
    status: "Present",
  },
  {
    id: 5,
    name: "David Williams",
    role: "Trainer",
    status: "Absent",
  },
];

export default function PresenceList() {
  return (
    <div className="mt-8 rounded-xl border bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Today's Attendance
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          List of people who are present or absent today.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Name
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Role
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {people.map((person) => (
              <tr
                key={person.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {person.name}
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  {person.role}
                </td>

                <td className="px-6 py-4">
                  {person.status === "Present" ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      ✓ Present
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                      ✕ Absent
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}