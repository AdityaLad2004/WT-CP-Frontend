import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-blue-900 text-white py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">Digital Governance Portal</h1>
          <p className="text-sm mt-1">Empowering Citizens. Enabling Transparency.</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-12 shadow-inner">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-blue-900">Welcome to the Official Portal</h2>
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
            Access government services, register as a contractor, file citizen concerns, and manage department activities – all in one unified platform.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link to="/Login">
              <button className="bg-blue-800 text-white px-6 py-2 rounded-md hover:bg-blue-900 transition">Login</button>
            </Link>
            <Link to="/Signup">
              <button className="bg-white border border-blue-800 text-blue-800 px-6 py-2 rounded-md hover:bg-blue-50 transition">Sign Up</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-xl font-bold text-blue-900 text-center mb-8">Available Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
              <h4 className="text-lg font-semibold text-blue-800">Citizen Services</h4>
              <p className="mt-2 text-sm text-gray-700">File complaints, check status, view civic updates, and access public documents.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border">
              <h4 className="text-lg font-semibold text-blue-800">Department Head Access</h4>
              <p className="mt-2 text-sm text-gray-700">Manage inter-departmental projects, assign tasks, and oversee issue resolutions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border">
              <h4 className="text-lg font-semibold text-blue-800">Contractor Portal</h4>
              <p className="mt-2 text-sm text-gray-700">Bid on public contracts, receive updates, and track tender progress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-4 mt-12 text-center">
        <p className="text-sm">&copy; 2025 Digital Governance Platform | Government of India</p>
      </footer>
    </div>
  );
}
