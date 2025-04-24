import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import './App.css'
import Home from "./pages/Home";
import CitizenDashboard from "./pages/dashboard/citizen";
import ContractorDashboard from "./pages/dashboard/contractor";
import DeptHeadDashboard from "./pages/dashboard/department-head";
import AdminDashboard from "./pages/dashboard/admin";
import CreateAssignment from "./pages/admin/CreateAssignment";
import ViewAssignment from "./pages/admin/ViewAssignment";

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/citizen" element={<CitizenDashboard/>} />
          <Route path="/dashboard/contractor" element={<ContractorDashboard/>} />
          <Route path="/dashboard/department-head" element={<DeptHeadDashboard/>} />
          <Route path="/dashboard/admin" element={<AdminDashboard/>} />
          <Route path="/admin/create-assignment" element={<CreateAssignment/>} />
          <Route path="/admin/view-assignment" element={<ViewAssignment/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
