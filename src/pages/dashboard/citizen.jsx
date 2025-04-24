import { useEffect, useState } from "react";
import axios from "axios";

const CitizenDashboard = () => {
  const [userInfo, setUserInfo] = useState({ fullName: "" });
  const [assignments, setAssignments] = useState([]);
  const [taskDataMap, setTaskDataMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [commentsMap, setCommentsMap] = useState({});
  const [newComments, setNewComments] = useState({});

  useEffect(() => {
    const fullName = localStorage.getItem("userName");
    if (fullName) setUserInfo({ fullName });

    const fetchAssignments = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/assignments`);
        setAssignments(res.data);

        // Fetch tasks
        const taskPromises = res.data.map((a) =>
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${a._id}`)
        );
        const taskResponses = await Promise.all(taskPromises);
        const taskMap = {};
        res.data.forEach((a, i) => {
          taskMap[a._id] = taskResponses[i].data;
        });
        setTaskDataMap(taskMap);

        // Fetch comments
        const commentPromises = res.data.map((a) =>
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/comments/${a._id}`)
        );
        const commentResponses = await Promise.all(commentPromises);
        const commentMap = {};
        res.data.forEach((a, i) => {
          commentMap[a._id] = commentResponses[i].data;
        });
        setCommentsMap(commentMap);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const calculateCompletionPercentage = (tasks) => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    return total > 0 ? (completed / total) * 100 : 0;
  };

  const handleCommentChange = (assignmentId, content) => {
    setNewComments((prev) => ({ ...prev, [assignmentId]: content }));
  };

  const submitComment = async (assignmentId) => {
    const userName = localStorage.getItem("userName");
    const content = newComments[assignmentId];

    if (!content) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/comments`, {
        assignmentId,
        userName,
        content,
      });

      setCommentsMap((prev) => ({
        ...prev,
        [assignmentId]: [res.data, ...(prev[assignmentId] || [])],
      }));

      setNewComments((prev) => ({ ...prev, [assignmentId]: "" }));
    } catch (err) {
      console.error("Error posting comment", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-indigo-200 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-800">Citizen Dashboard</h1>
        {userInfo.fullName ? (
          <p className="mt-4 text-center text-lg text-gray-700">Welcome, {userInfo.fullName}!</p>
        ) : (
          <p className="text-center">Loading user data...</p>
        )}

        <h2 className="mt-8 text-2xl font-semibold text-blue-700">All Assignments</h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading assignments...</p>
        ) : assignments.length > 0 ? (
          <ul className="mt-6 space-y-6">
            {assignments.map((assignment) => {
              const tasks = taskDataMap[assignment._id] || [];
              const percentage = calculateCompletionPercentage(tasks);
              const comments = commentsMap[assignment._id] || [];

              return (
                <li key={assignment._id} className="bg-white border rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-gray-800">{assignment.title}</h3>
                  <p className="text-gray-600 mt-2">{assignment.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    <strong>Location:</strong> {assignment.location}, {assignment.city}, Zone {assignment.zone}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <strong>Budget:</strong> ₹{assignment.budget}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <strong>Departments:</strong> {assignment.departments.join(", ")}
                  </p>

                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800">Progress</h4>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full bg-green-600"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm mt-2">Completed: {percentage.toFixed(2)}%</p>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Comments</h4>
                    <ul className="space-y-3">
                      {comments.map((comment, index) => (
                        <li key={index} className="bg-gray-100 p-3 rounded-lg shadow-sm">
                          <span className="font-semibold text-blue-700">{comment.userName}</span>: {comment.content}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4">
                      <textarea
                        rows={3}
                        value={newComments[assignment._id] || ""}
                        onChange={(e) =>
                          handleCommentChange(assignment._id, e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write a comment..."
                      />
                      <button
                        onClick={() => submitComment(assignment._id)}
                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No assignments found.</p>
        )}
      </div>
    </div>
  );
};

export default CitizenDashboard;
