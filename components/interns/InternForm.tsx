"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import FaceCamera from "../FaceCamera";

interface FormData {
  firstName: string;
  lastName: string;
  internId: string;
  email: string;
  phone: string;
  department: string;
}

export default function RegisterInternForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    internId: "",
    email: "",
    phone: "",
    department: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Check that all fields are filled
    const emptyField = Object.values(formData).some(
      (value) => value.trim() === ""
    );

    if (emptyField) {
      setError("Please fill in all required information.");
      return;
    }

    // Check phone number
    if (!/^\d{9}$/.test(formData.phone)) {
      setError("Phone number must contain exactly 9 digits.");
      return;
    }

    // Registration successful
    setSuccess("Intern registration successful!");

    console.log("Intern information:", formData);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-2">
          Register Intern
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Enter all required information to register an intern.
        </p>

        {error && (
          <div className="mb-5 rounded-lg bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-lg bg-green-100 p-3 text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block mb-2 font-medium text-gray-700"
            >
              First Name *
            </label>

            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block mb-2 font-medium text-gray-700"
            >
              Last Name *
            </label>

            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          {/* Intern ID */}
          <div>
            <label
              htmlFor="internId"
              className="block mb-2 font-medium text-gray-700"
            >
              Intern ID *
            </label>

            <input
              id="internId"
              name="internId"
              type="text"
              value={formData.internId}
              onChange={handleChange}
              placeholder="Enter intern ID"
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-700"
            >
              Email *
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full rounded-lg border border-gray-300 p-3"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 font-medium text-gray-700"
            >
              Phone Number *
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 9-digit phone number"
              maxLength={9}
              inputMode="numeric"
              className="w-full rounded-lg border border-gray-300 p-3"
            />

            <p className="mt-1 text-sm text-gray-500">
              Phone number must contain exactly 9 digits.
            </p>
          </div>

          {/* Department */}
          <div>
            <label
              htmlFor="department"
              className="block mb-2 font-medium text-gray-700"
            >
              Department *
            </label>

            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3"
            >
              <option value="">Select department</option>
              <option value="Computer Engineering">
                Computer Engineering
              </option>
              <option value="Software Engineering">
                Software Engineering
              </option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Face Registration */}
          <div className="rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 p-6 text-center">
            <h2 className="text-lg font-semibold text-blue-700">
              Register Face
            </h2>
            <FaceCamera/>

            <p className="mt-2 text-sm text-gray-600">
              The intern's face will be registered once and used later for
              attendance recognition.
            </p>

            <button
              type="button"
              className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
              onClick={() =>
                alert("Face capture will be connected to the camera here.")
              }
            >
              Capture Face
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Register Intern
          </button>
        </form>
      </div>
    </div>
  );
}