import { Outlet, Link, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaCalendarAlt, FaSignOutAlt, FaChalkboardTeacher, FaCog } from "react-icons/fa";

// Dashboard Component
export function Dashboard() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">Total Students</h3>
                    <p className="text-3xl font-bold text-indigo-600">142</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">Active Courses</h3>
                    <p className="text-3xl font-bold text-indigo-600">8</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg mb-2">Upcoming Events</h3>
                    <p className="text-3xl font-bold text-indigo-600">3</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
                <ul className="space-y-3">
                    <li className="p-3 hover:bg-gray-50 rounded-lg">📝 Created new course "Advanced React"</li>
                    <li className="p-3 hover:bg-gray-50 rounded-lg">🎯 Scheduled workshop for Friday</li>
                    <li className="p-3 hover:bg-gray-50 rounded-lg">📊 Updated student progress reports</li>
                </ul>
            </div>
        </div>
    );
}

// Players Component
export function Players() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Player Management</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <tr key={i}>
                                <td className="px-6 py-4 whitespace-nowrap">Player {i}</td>
                                <td className="px-6 py-4 whitespace-nowrap">player{i}@example.com</td>
                                <td className="px-6 py-4 whitespace-nowrap">{i * 20}% Completed</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


// Courses Component


// Settings Component
export function Settings() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Settings</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                <div>
                    <h3 className="font-semibold mb-3">Profile Information</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="p-2 border rounded-lg"
                                defaultValue="John"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="p-2 border rounded-lg"
                                defaultValue="Doe"
                            />
                        </div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-2 border rounded-lg"
                            defaultValue="john@example.com"
                        />
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Security</h3>
                    <button className="w-full p-3 text-left bg-indigo-50 rounded-lg hover:bg-indigo-100">
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
}

// Original Instructor Layout Component (unchanged)
function InstructorLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwt')
        window.location.href = '/login'
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="hidden md:flex flex-col w-64 bg-gradient-to-b from-indigo-700 to-indigo-800 text-white shadow-lg">
                <div className="flex items-center justify-center h-16 px-4 border-b border-indigo-600">
                    <h1 className="text-xl font-bold">Instructor Dashboard</h1>
                </div>

                <div className="flex flex-col flex-grow px-4 py-6 overflow-y-auto">
                    {/* Navigation Links */}
                    <nav className="flex-1 space-y-2">
                        <Link
                            to="/instructor/dashboard"
                            className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-indigo-600 transition-colors"
                        >
                            <FaHome className="mr-3 text-lg" />
                            Dashboard
                        </Link>

                        <Link
                            to="/instructor/players"
                            className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-indigo-600 transition-colors"
                        >
                            <FaUsers className="mr-3 text-lg" />
                            Players
                        </Link>

                        <Link
                            to="/instructor/events"
                            className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-indigo-600 transition-colors"
                        >
                            <FaCalendarAlt className="mr-3 text-lg" />
                            Events
                        </Link>

                        <Link
                            to="/instructor/settings"
                            className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-indigo-600 transition-colors"
                        >
                            <FaCog className="mr-3 text-lg" />
                            Settings
                        </Link>
                    </nav>

                    {/* Bottom Section - Logout */}
                    <div className="mt-auto pt-6">
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg hover:bg-indigo-600 transition-colors"
                        >
                            <FaSignOutAlt className="mr-3 text-lg" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile sidebar toggle (hidden on desktop) */}
            <div className="md:hidden fixed bottom-4 right-4 z-50">
                <button className="p-3 bg-indigo-600 rounded-full shadow-lg text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            {/* Mobile sidebar toggle */}
            <div className="md:hidden fixed bottom-4 right-4 z-50">
                <button className="p-3 bg-indigo-600 rounded-full shadow-lg text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default InstructorLayout;