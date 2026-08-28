"use client";

import { useState } from "react";

type ManualAttendanceFormProps = {
  onSubmit: (name: string, employeeId: string) => void;
};

export default function ManualAttendanceForm({
  onSubmit,
}: ManualAttendanceFormProps) {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !employeeId.trim()) {
      return;
    }

    onSubmit(name.trim(), employeeId.trim());

    setName("");
    setEmployeeId("");
  };

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-xl font-semibold text-slate-900">
        Manual Attendance
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Record attendance manually when face scanning is unavailable.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="employeeName"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Employee / Intern Name
          </label>

          <input
            id="employeeName"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter name"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-600"
          />
        </div>

        <div>
          <label
            htmlFor="employeeId"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Employee ID
          </label>

          <input
            id="employeeId"
            type="text"
            value={employeeId}
            onChange={(event) => setEmployeeId(event.target.value)}
            placeholder="Enter employee ID"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-600"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
        >
          Record Attendance
        </button>
      </form>
    </section>
  );
}