import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "citizen",
        department: "",
        companyName: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, formData);
            alert("Signup successful!");
        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-300">
                <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Create Your Account</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="John Doe"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Role</label>
                        <select
                            name="role"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="citizen">Citizen</option>
                            <option value="contractor">Contractor</option>
                            <option value="department-head">Department Head</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {formData.role === "department-head" && (
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Department Name</label>
                            <input
                                type="text"
                                name="department"
                                placeholder="e.g. Water Supply"
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    {formData.role === "contractor" && (
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                placeholder="e.g. BuildPro Ltd."
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-5 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;
