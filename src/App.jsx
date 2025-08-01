import { useState } from "react";

const countries = [
  "India",
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
];

export default function QuestionnaireForm() {
  const [form, setForm] = useState({
    fullName: "",
    age: "",
    dob: "",
    location: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!form.age || isNaN(form.age) || form.age <= 0)
      newErrors.age = "Valid age is required";
    if (!form.dob) newErrors.dob = "Date of Birth is required";
    if (!form.location) newErrors.location = "Location is required";
    const digits = form.mobile.replace(/\D/g, "");
    if (!/^[0-9]{12,13}$/.test(digits))
      newErrors.mobile = "Mobile must be 12–13 digits (incl. country code)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted:", form);
      alert("Form submitted successfully!");
      setForm({ fullName: "", age: "", dob: "", location: "", mobile: "" });
      setErrors({});
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-md mx-auto p-6 border rounded-xl shadow-lg">
        <h1 className="text-xl font-bold mb-4">Questionnaire Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>

          <div>
            <label className="block font-semibold">Date of Birth (DOB)</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
          </div>

          <div>
            <label className="block font-semibold">Location</label>
            <select
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select a country</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
