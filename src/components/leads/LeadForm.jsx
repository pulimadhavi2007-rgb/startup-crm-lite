import { useEffect, useState } from "react";

const STATUS_OPTIONS = [
  "New",
  "Contacted",
  "Meeting Scheduled",
  "Proposal Sent",
  "Won",
  "Lost",
];

const SOURCE_OPTIONS = [
  "Website",
  "Referral",
  "LinkedIn",
  "Cold Call",
  "Email Campaign",
  "Other",
];

const initialForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  status: "New",
  source: "Website",
};

/**
 * Lead Form Component
 *
 * Props:
 * - initialData
 * - onSubmit
 * - onCancel
 */
export default function LeadForm({
  initialData,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialForm,
        ...initialData,
      });
    } else {
      setFormData(initialForm);
    }
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  }

  function validate() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(formData);

    if (!initialData) {
      setFormData(initialForm);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Name */}

      <div>
        <label className="mb-1 block font-medium">
          Name *
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name}
          </p>
        )}
      </div>

      {/* Company */}

      <div>
        <label className="mb-1 block font-medium">
          Company *
        </label>

        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
        />

        {errors.company && (
          <p className="mt-1 text-sm text-red-500">
            {errors.company}
          </p>
        )}
      </div>

      {/* Email */}

      <div>
        <label className="mb-1 block font-medium">
          Email *
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone */}

      <div>
        <label className="mb-1 block font-medium">
          Phone
        </label>

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Status */}

      <div>
        <label className="mb-1 block font-medium">
          Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
        >
          {STATUS_OPTIONS.map((status) => (
            <option
              key={status}
              value={status}
            >
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Source */}

      <div>
        <label className="mb-1 block font-medium">
          Source
        </label>

        <select
          name="source"
          value={formData.source}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
        >
          {SOURCE_OPTIONS.map((source) => (
            <option
              key={source}
              value={source}
            >
              {source}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 px-5 py-2 hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
        >
          {initialData ? "Update Lead" : "Add Lead"}
        </button>
      </div>
    </form>
  );
}