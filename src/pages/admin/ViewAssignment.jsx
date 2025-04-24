import { useEffect, useState } from "react";
import axios from "axios";

const ViewAssignment = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/assignments`);
        setAssignments(res.data);
      } catch (err) {
        console.error("Failed to fetch assignments:", err);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-semibold text-blue-800 mb-8 text-center">All Government Project Assignments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assignments.map((assignment) => (
            <div
              key={assignment._id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">{assignment.title}</h3>
              <p className="text-gray-600 mb-4">{assignment.description}</p>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  <strong className="text-gray-900">Location:</strong> {assignment.location}, {assignment.city} ({assignment.zone})
                </p>
                <p>
                  <strong className="text-gray-900">Start Date:</strong> {new Date(assignment.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong className="text-gray-900">End Date:</strong> {new Date(assignment.endDate).toLocaleDateString()}
                </p>
                <p>
                  <strong className="text-gray-900">Budget:</strong> ₹{assignment.budget.toLocaleString()}
                </p>
                <p>
                  <strong className="text-gray-900">Departments:</strong> {assignment.departments.join(", ")}
                </p>
                <p>
                  <strong className="text-gray-900">Created At:</strong> {new Date(assignment.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewAssignment;
