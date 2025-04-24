import { useEffect, useState } from "react";
import axios from "axios";

const ContractorDashboard = () => {
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    companyName: "",
  });

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage
    const fullName = localStorage.getItem("userName");
    const companyName = localStorage.getItem("companyName");

    if (fullName && companyName) {
      setUserInfo({ fullName, companyName });
    }
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/contractor/${userInfo.companyName}`);
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo.companyName) {
      fetchTasks();
    }
  }, [userInfo.companyName]);

  // Handler for marking task as completed
  const markTaskAsCompleted = async (taskId) => {
    try {
      const updatedTask = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${taskId}`, {
        status: "Completed",
      });
      // Update the task list with the updated task status
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: "Completed" } : task
        )
      );
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-blue-800">Contractor Dashboard</h1>
        {userInfo.fullName ? (
          <>
            <p className="mt-4 text-lg text-gray-600">Welcome, <span className="font-semibold text-blue-700">{userInfo.fullName}</span>!</p>

            <div className="mt-8 bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Assigned Tasks</h2>
              {loading ? (
                <p className="text-gray-500">Loading tasks...</p>
              ) : tasks.length === 0 ? (
                <p className="text-gray-500">No tasks assigned yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tasks.map((task) => (
                    <div
                      key={task._id}
                      className="bg-white border border-gray-300 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                      <p className="text-gray-700 mt-2">{task.description}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        <strong>Status:</strong> <span className={`font-semibold ${task.status === "Completed" ? "text-green-500" : "text-yellow-600"}`}>{task.status}</span>
                      </p>

                      {/* Add MARK AS COMPLETED button */}
                      {task.status !== "Completed" && (
                        <button
                          onClick={() => markTaskAsCompleted(task._id)}
                          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                        >
                          Mark as Completed
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-500">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default ContractorDashboard;
