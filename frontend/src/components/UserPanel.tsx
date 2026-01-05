import { useEffect, useState } from 'react';
import { MdDashboard, MdCalendarToday, MdNotifications, MdPerson, MdWork, MdTimer, MdTrendingUp, MdCheckCircle } from 'react-icons/md';
import { FaBriefcase, FaTasks, FaUserFriends, FaClock } from 'react-icons/fa';
import { BiTask } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function UserPanel() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            // Replace with your actual API call
            // const res = await apiFetch('/user/profile');
            
            // Demo data
            const demoUser = {
                name: "John Doe",
                email: "john.doe@company.com",
                role: "Software Developer",
                department: "Engineering",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
                stats: {
                    tasksCompleted: 24,
                    hoursWorked: 156,
                    projectsActive: 3,
                    teamMembers: 8
                },
                tasks: [
                    { id: 1, title: "Complete Dashboard UI", priority: "high", status: "in-progress", dueDate: "2025-01-10" },
                    { id: 2, title: "Review Pull Requests", priority: "medium", status: "pending", dueDate: "2025-01-08" },
                    { id: 3, title: "Update Documentation", priority: "low", status: "pending", dueDate: "2025-01-12" }
                ],
                recentActivities: [
                    { id: 1, action: "Completed task: API Integration", time: "2 hours ago" },
                    { id: 2, action: "Joined meeting: Team Standup", time: "4 hours ago" },
                    { id: 3, action: "Updated profile information", time: "1 day ago" }
                ],
                upcomingEvents: [
                    { id: 1, title: "Team Meeting", date: "Jan 8, 2025", time: "10:00 AM" },
                    { id: 2, title: "Project Review", date: "Jan 10, 2025", time: "2:00 PM" },
                    { id: 3, title: "1-on-1 with Manager", date: "Jan 12, 2025", time: "3:30 PM" }
                ]
            };
            setUser(demoUser);
        } catch (err) {
            console.error('Failed to fetch user data:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <AiOutlineLoading3Quarters className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-blue-200">
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}! 👋</h1>
                                <p className="text-gray-600">{user.role} • {user.department}</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            <MdNotifications className="inline w-5 h-5 mr-2" />
                            Notifications
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <BiTask className="w-8 h-8 opacity-80" />
                            <span className="text-3xl font-bold">{user.stats.tasksCompleted}</span>
                        </div>
                        <p className="text-blue-100">Tasks Completed</p>
                        <div className="mt-2 flex items-center gap-1 text-sm">
                            <MdTrendingUp className="w-4 h-4" />
                            <span>+12% this month</span>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <FaClock className="w-8 h-8 opacity-80" />
                            <span className="text-3xl font-bold">{user.stats.hoursWorked}</span>
                        </div>
                        <p className="text-purple-100">Hours Worked</p>
                        <div className="mt-2 flex items-center gap-1 text-sm">
                            <MdTimer className="w-4 h-4" />
                            <span>This month</span>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <FaBriefcase className="w-8 h-8 opacity-80" />
                            <span className="text-3xl font-bold">{user.stats.projectsActive}</span>
                        </div>
                        <p className="text-pink-100">Active Projects</p>
                        <div className="mt-2 flex items-center gap-1 text-sm">
                            <MdWork className="w-4 h-4" />
                            <span>In progress</span>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <FaUserFriends className="w-8 h-8 opacity-80" />
                            <span className="text-3xl font-bold">{user.stats.teamMembers}</span>
                        </div>
                        <p className="text-green-100">Team Members</p>
                        <div className="mt-2 flex items-center gap-1 text-sm">
                            <MdPerson className="w-4 h-4" />
                            <span>Your team</span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-lg p-2 mb-6">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition ${
                                activeTab === 'overview'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <MdDashboard className="inline w-5 h-5 mr-2" />
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('tasks')}
                            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition ${
                                activeTab === 'tasks'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <FaTasks className="inline w-5 h-5 mr-2" />
                            Tasks
                        </button>
                        <button
                            onClick={() => setActiveTab('calendar')}
                            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition ${
                                activeTab === 'calendar'
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <MdCalendarToday className="inline w-5 h-5 mr-2" />
                            Calendar
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {activeTab === 'overview' && (
                            <>
                                {/* Recent Activities */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
                                    <div className="space-y-4">
                                        {user.recentActivities.map(activity => (
                                            <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                                                <div className="flex-1">
                                                    <p className="text-gray-900">{activity.action}</p>
                                                    <p className="text-sm text-gray-500">{activity.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-left">
                                            <FaTasks className="w-6 h-6 text-blue-600 mb-2" />
                                            <p className="font-semibold text-gray-900">New Task</p>
                                            <p className="text-sm text-gray-500">Create a new task</p>
                                        </button>
                                        <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-left">
                                            <MdCalendarToday className="w-6 h-6 text-purple-600 mb-2" />
                                            <p className="font-semibold text-gray-900">Schedule</p>
                                            <p className="text-sm text-gray-500">View your schedule</p>
                                        </button>
                                        <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition text-left">
                                            <FaUserFriends className="w-6 h-6 text-pink-600 mb-2" />
                                            <p className="font-semibold text-gray-900">Team</p>
                                            <p className="text-sm text-gray-500">View team members</p>
                                        </button>
                                        <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left">
                                            <MdPerson className="w-6 h-6 text-green-600 mb-2" />
                                            <p className="font-semibold text-gray-900">Profile</p>
                                            <p className="text-sm text-gray-500">Update profile</p>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'tasks' && (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">My Tasks</h2>
                                <div className="space-y-3">
                                    {user.tasks.map(task => (
                                        <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-semibold text-gray-900">{task.title}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    task.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-green-100 text-green-700'
                                                }`}>
                                                    {task.priority}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className={`px-2 py-1 rounded ${
                                                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                    {task.status}
                                                </span>
                                                <span className="text-gray-500">Due: {task.dueDate}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'calendar' && (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
                                <div className="space-y-3">
                                    {user.upcomingEvents.map(event => (
                                        <div key={event.id} className="p-4 border-l-4 border-blue-600 bg-blue-50 rounded-lg">
                                            <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                <span className="flex items-center gap-1">
                                                    <MdCalendarToday className="w-4 h-4" />
                                                    {event.date}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MdTimer className="w-4 h-4" />
                                                    {event.time}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Profile</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-gray-900">{user.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Department</p>
                                    <p className="text-gray-900">{user.department}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Role</p>
                                    <p className="text-gray-900">{user.role}</p>
                                </div>
                            </div>
                        </div>

                        {/* Progress Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">This Month's Progress</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Tasks Completed</span>
                                        <span className="font-semibold">80%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Hours Logged</span>
                                        <span className="font-semibold">95%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Goals Achieved</span>
                                        <span className="font-semibold">70%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}