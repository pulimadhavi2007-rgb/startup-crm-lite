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

const INITIAL_FORM = {
  name: "",
  company: "",
  email: "",
  phone: "",
  status: "New",
  source: "Website",
};

const INPUT_CLASS =
  "w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700 outline-none transition";

export default function LeadForm({
  initialData,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...INITIAL_FORM,
        ...initialData,
      });
    } else {
      setFormData(INITIAL_FORM);
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

    if (!formData.name.trim())
      newErrors.name = "Name is required";

    if (!formData.company.trim())
      newErrors.company = "Company is required";

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
      setFormData(INITIAL_FORM);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {initialData ? "Edit Lead" : "Add New Lead"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Name */}

        <div>
          <label
            htmlFor="name"
            className="mb-2 block font-medium text-gray-700 dark:text-gray-300"
          >
            Name *
          </label>

          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={INPUT_CLASS}
            autoComplete="name"
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        {/* Company */}

        <div>
          <label
            htmlFor="company"
            className="mb-2 block font-medium text-gray-700 dark:text-gray-300"
          >
            Company *
          </label>

          <input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={INPUT_CLASS}
            autoComplete="organization"
          />

          {errors.company && (
            <p className="mt-1 text-sm text-red-500">
              {errors.company}
            </p>
          )}
        </div>

        {/* Email */}

        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-medium text-gray-700 dark:text-gray-300"
          >
            Email *
          </label>

          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={INPUT_CLASS}
            autoComplete="email"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block font-medium text-gray-700 dark:text-gray-300"
          >
            Phone
          </label>

          <input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={INPUT_CLASS}
            autoComplete="tel"
          />
        </div>

        {/* Status */}

        <div>
          <label
            htmlFor="status"
            className="mb-2 block font-medium text-gray-700 dark:text-gray-300"
          >
            Status
          </label>

          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={INPUT_CLASS}
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
          <label
            htmlFor="source"
            className="mb-2 block font-medium text-gray-700 dark:text-gray-300"
          >
            Source
          </label>

          <select
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            className={INPUT_CLASS}
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

      </div>

      {/* Buttons */}

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">

        <button
          type="button"
          onClick={onCancel}
          className="min-h-[44px] rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-6 py-3 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="min-h-[44px] rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
        >
          {initialData ? "Update Lead" : "Add Lead"}
        </button>

      </div>

    </form>
  );
}