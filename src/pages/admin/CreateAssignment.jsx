import { useState } from "react";
import axios from "axios";

const CreateAssignment = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    city: "",
    zone: "",
    startDate: "",
    endDate: "",
    budget: "",
    departments: [],
  });

  const [deptOptions, setDeptOptions] = useState([
    "Water Supply",
    "Sanitation",
    "Roads and Transport",
    "Electricity",
    "Parks and Gardens",
    "Solid Waste Management",
    "Drainage",
    "Public Health",
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (dept) => {
    const updated = formData.departments.includes(dept)
      ? formData.departments.filter((d) => d !== dept)
      : [...formData.departments, dept];

    setFormData({ ...formData, departments: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/assignments`, formData);
      alert("Assignment created successfully!");
      setFormData({
        title: "",
        description: "",
        location: "",
        city: "",
        zone: "",
        startDate: "",
        endDate: "",
        budget: "",
        departments: [],
      });
    } catch (err) {
      alert("Failed to create assignment");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-10">
        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Create Government Project Assignment</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            name="location"
            placeholder="Location (Area)"
            value={formData.location}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            name="zone"
            placeholder="Ward/Zone"
            value={formData.zone}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="md:col-span-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
            required
          />
          <input
            name="budget"
            type="number"
            placeholder="Estimated Budget (INR)"
            value={formData.budget}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <div className="md:col-span-2">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Assign Departments</h4>
            <div className="flex flex-wrap gap-4">
              {deptOptions.map((dept, i) => (
                <label key={i} className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200 transition">
                  <input
                    type="checkbox"
                    checked={formData.departments.includes(dept)}
                    onChange={() => handleCheckboxChange(dept)}
                    className="accent-blue-700"
                  />
                  <span className="text-gray-700">{dept}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg text-lg font-medium transition"
            >
              Create Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
