import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [userInfo, setUserInfo] = useState({
    fullName: "",
  });

  useEffect(() => {
    const fullName = localStorage.getItem("userName");
    if (fullName) {
      setUserInfo({ fullName });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 sm:p-10">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Admin Dashboard</h1>
        {userInfo.fullName ? (
          <>
            <p className="text-gray-700 text-lg mb-6">Welcome back, <span className="font-semibold">{userInfo.fullName}</span>!</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Create Assignment Card */}
              <Link
                to="/admin/create-assignment"
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold text-blue-700 group-hover:text-blue-800">Create Assignment</h2>
                  <span className="text-blue-600 text-lg">+</span>
                </div>
                <p className="text-sm text-gray-600">Assign tasks or responsibilities to departments or contractors.</p>
              </Link>

              {/* View Assignment Card */}
              <Link
                to="/admin/view-assignment"
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold text-blue-700 group-hover:text-blue-800">View Assignments</h2>
                  <span className="text-blue-600 text-lg">📋</span>
                </div>
                <p className="text-sm text-gray-600">Review all assigned tasks for departments or contractors.</p>
              </Link>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-lg mt-4">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
