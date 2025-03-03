
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import {
    Edit,
    ArrowBack,
    Person,
    Email,
    AdminPanelSettings,
    CheckCircle,
    Cancel,
    CardMembership
} from "@mui/icons-material";

const usersData = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Member", status: "Active", membership: "Premium", joinDate: "2023-01-15" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Member", status: "Active", membership: "Basic", joinDate: "2023-02-20" },
    { id: 3, name: "Robert Johnson", email: "robert.j@example.com", role: "Admin", status: "Active", membership: "Premium", joinDate: "2022-11-05" },
    { id: 4, name: "Emily Davis", email: "emily.d@example.com", role: "Member", status: "Inactive", membership: "Basic", joinDate: "2023-03-10" },
    { id: 5, name: "Michael Wilson", email: "michael.w@example.com", role: "Member", status: "Active", membership: "Premium", joinDate: "2023-04-25" },
];


// Admin Dashboard Layout
function AdminDashboard() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-700 text-white p-6 space-y-8 fixed h-full">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <AdminPanelSettings /> Admin Portal
                </h2>
                <nav>
                    <ul className="space-y-2">
                        {['Users', 'Instructors', 'Schedules', 'Attendance', 'Payments'].map((item) => (
                            <li key={item}>
                                <Link
                                    to={item.toLowerCase()}
                                    className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded-lg transition-colors"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <main className="ml-64 flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
}

// Dashboard Component
function Dashboard() {
    const stats = [
        { title: "Total Users", value: usersData.length, icon: <Person /> },
        { title: "Active Members", value: usersData.filter(u => u.status === 'Active').length, icon: <CheckCircle /> },
        { title: "Premium Members", value: usersData.filter(u => u.membership === 'Premium').length, icon: <CardMembership /> },
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">{stat.title}</p>
                                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                            </div>
                            <div className="text-blue-600 text-3xl">
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
                <UserList users={usersData.slice(0, 5)} />
            </div>
        </div>
    );
}

// User List Component
function UserList({ users, onEdit }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Role</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="px-6 py-4">{user.name}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">
                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm 
                    ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {user.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <a href="/admin/userdetails"> <IconButton color="primary">
                                    <Edit fontSize="small" />
                                </IconButton></a>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// User Details Component
function UserDetails({ user, goBack }) {
    const navigate = useNavigate();
    const userData = usersData;

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm max-w-3xl">
            <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
                className="mb-6"
            >
                Back to Users
            </Button>

            <div className="flex items-start gap-8">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                    <Person className="text-4xl text-gray-400" />
                </div>

                <div className="flex-1 space-y-4">
                    <h2 className="text-2xl font-bold">{userData.name}</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <DetailItem icon={<Email />} label="Email" value={userData.email} />
                        <DetailItem icon={<AdminPanelSettings />} label="Role" value={userData.role} />
                        <DetailItem icon={<CheckCircle />} label="Status" value={userData.status} />
                        <DetailItem icon={<CardMembership />} label="Membership" value={userData.membership} />
                        <DetailItem label="Join Date" value={new Date(userData.joinDate).toLocaleDateString()} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper component for User Details
function DetailItem({ icon, label, value }) {
    return (
        <div className="flex items-center gap-3">
            {icon && <span className="text-gray-500">{icon}</span>}
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-medium">{value}</p>
            </div>
        </div>
    );
}



export { AdminDashboard, UserDetails, UserList, Dashboard }
