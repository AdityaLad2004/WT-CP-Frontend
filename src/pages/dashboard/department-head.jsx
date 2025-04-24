import { useEffect, useState } from "react";
import axios from "axios";

const DeptHeadDashboard = () => {
    const [userInfo, setUserInfo] = useState({
        fullName: "",
        department: "",
    });
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showViewTasksModal, setShowViewTasksModal] = useState(false);
    const [newTask, setNewTask] = useState({ title: "", description: "", contractor: "" });
    const [taskList, setTaskList] = useState([]);
    const [contractors, setContractors] = useState([]);
    const [taskDataMap, setTaskDataMap] = useState({}); // to store task list for each assignment

    useEffect(() => {
        const fullName = localStorage.getItem("userName");
        const department = localStorage.getItem("userDepartment");
        if (fullName && department) setUserInfo({ fullName, department });
    }, []);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/assignments`);
                const filtered = res.data.filter((a) => a.departments.includes(userInfo.department));
                setAssignments(filtered);
            } catch (error) {
                console.error("Failed to fetch assignments:", error);
            } finally {
                setLoading(false);
            }
        };
        if (userInfo.department) fetchAssignments();
    }, [userInfo.department]);

    useEffect(() => {
        const fetchContractors = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/contractors`);
                setContractors(res.data.map(c => c.companyName));
            } catch (err) {
                console.error("Failed to fetch contractors:", err);
            }
        };

        fetchContractors();
    }, []);

    const handleAddTask = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tasks`, {
                ...newTask,
                assignmentId: selectedAssignment._id,
            });
            alert("Task added successfully");
            setNewTask({ title: "", description: "", contractor: "" });
            setShowTaskModal(false);
        } catch (err) {
            alert("Failed to add task");
            console.error(err);
        }
    };

    const fetchTasks = async (assignment) => {
        try {
            setSelectedAssignment(assignment);
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${assignment._id}`);
            setTaskList(res.data);
            setTaskDataMap(prev => ({ ...prev, [assignment._id]: res.data }));
            setShowViewTasksModal(true);
        } catch (err) {
            alert("Failed to fetch tasks");
            console.error(err);
        }
    };

    const calculateCompletionPercentage = (tasks) => {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.status === "Completed").length;
        return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold text-blue-800">Department Head Dashboard</h1>

            {userInfo.fullName && userInfo.department ? (
                <div className="mt-4 text-lg text-gray-700">
                    <p>Welcome, <span className="font-semibold">{userInfo.fullName}</span>!</p>
                    <p className="mt-1">You are part of the <span className="font-semibold">{userInfo.department}</span> department.</p>
                </div>
            ) : (
                <p className="text-gray-600">Loading user data...</p>
            )}

            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Assigned Projects for Your Department</h2>

                {loading ? (
                    <div className="text-gray-600">Loading assignments...</div>
                ) : assignments.length === 0 ? (
                    <p className="text-gray-600">No assignments found for your department.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {assignments.map((assignment) => {
                            const tasks = taskDataMap[assignment._id] || [];
                            const completionPercentage = calculateCompletionPercentage(tasks);

                            return (
                                <div
                                    key={assignment._id}
                                    className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 hover:shadow-xl transition"
                                >
                                    <h3 className="text-xl font-semibold text-gray-800">{assignment.title}</h3>
                                    <p className="text-gray-600 mt-2">{assignment.description}</p>
                                    <div className="mt-2 text-sm text-gray-700 space-y-1">
                                        <p>
                                            <strong>Location:</strong> {assignment.location}, {assignment.city} ({assignment.zone})
                                        </p>
                                        <p>
                                            <strong>Dates:</strong>{" "}
                                            {new Date(assignment.startDate).toLocaleDateString()} -{" "}
                                            {new Date(assignment.endDate).toLocaleDateString()}
                                        </p>
                                        <p>
                                            <strong>Budget:</strong> ₹{assignment.budget.toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <h4 className="font-semibold text-gray-800">Progress</h4>
                                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-green-600"
                                                style={{ width: `${completionPercentage}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm mt-1 text-gray-600">Completed: {completionPercentage.toFixed(2)}%</p>
                                    </div>

                                    <div className="mt-4 flex flex-col space-y-4">
                                        <button
                                            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
                                            onClick={() => {
                                                setSelectedAssignment(assignment);
                                                setShowTaskModal(true);
                                            }}
                                        >
                                            ➕ Add Tasks
                                        </button>

                                        <button
                                            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
                                            onClick={() => fetchTasks(assignment)}
                                        >
                                            📋 View Tasks
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Add Task Modal */}
            {showTaskModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
                        <h2 className="text-2xl font-semibold mb-4">Add Task</h2>
                        <input
                            className="w-full border p-3 my-2 rounded-lg"
                            placeholder="Task Title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        />
                        <textarea
                            className="w-full border p-3 my-2 rounded-lg"
                            placeholder="Description"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        />
                        <select
                            className="w-full border p-3 my-2 rounded-lg"
                            value={newTask.contractor}
                            onChange={(e) => setNewTask({ ...newTask, contractor: e.target.value })}
                        >
                            <option value="" disabled>Select Contractor</option>
                            {contractors.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                className="bg-gray-500 text-white px-6 py-2 rounded-lg"
                                onClick={() => setShowTaskModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                                onClick={handleAddTask}
                            >
                                Add Task
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Tasks Modal */}
            {showViewTasksModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-3xl shadow-xl max-h-[80vh] overflow-y-auto">
                        <h2 className="text-2xl font-semibold mb-4">
                            Tasks for {selectedAssignment?.title}
                        </h2>
                        {taskList.length === 0 ? (
                            <p>No tasks assigned yet.</p>
                        ) : (
                            <ul className="space-y-4">
                                {taskList.map((task) => (
                                    <li
                                        key={task._id}
                                        className="border p-4 rounded-lg shadow-sm bg-gray-50"
                                    >
                                        <h4 className="font-semibold text-gray-800">{task.title}</h4>
                                        <p className="text-gray-600 mt-1">{task.description}</p>
                                        <p className="text-sm text-gray-600 mt-2">
                                            Contractor: {task.contractor} | Status: {task.status}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="text-right mt-4">
                            <button
                                className="bg-gray-500 text-white px-6 py-2 rounded-lg"
                                onClick={() => setShowViewTasksModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeptHeadDashboard;
