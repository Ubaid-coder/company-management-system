import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdEmail, MdPhone, MdLocationOn, MdEdit, MdCalendarToday, MdArrowBack, MdSave, MdClose } from 'react-icons/md';
import { FaUser, FaShieldAlt, FaBriefcase } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import AdminIcon from '../assets/admin.png';
import EmployeeIcon from '../assets/employee.png';
import { apiFetch } from '../lib/api';

interface UserInterface {
    _id: string | undefined;
    name: string;
    email: string;
    role: string;
    isBlocked: boolean;
    phone?: string;
    location?: string;
    department?: string;
    createdAt: string;
}

export default function UserProfilePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedUser, setEditedUser] = useState<UserInterface | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, [id]);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const res: { message: string; user: UserInterface } = await apiFetch(`/admin/user/${id}`);
            const demoUser = res?.user;
            setUser(demoUser);
            setEditedUser(demoUser);
        } catch (err) {
            const errorMessage = (err as Error)?.message || 'Failed to load user data';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleEditToggle = () => {
        if (isEditing) {
            setEditedUser(user);
            toast('Changes discarded', { icon: '↩️' });
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (field: keyof UserInterface, value: string) => {
        
        setEditedUser(prev => prev ? { ...prev, [field]: value } : null);
    };

    const handleSave = async () => {
        try {
            setSaving(true);
           
            const res = await apiFetch(`/admin/updateuser/${id}`, {
                method: 'PUT',
                body: JSON.stringify(editedUser)
            });


            await new Promise(resolve => setTimeout(resolve, 1000));

            setUser(editedUser);
            setIsEditing(false);
            toast.success('User updated successfully!');
        } catch (err) {
            const errorMessage = (err as Error)?.message || 'Failed to save changes';
            toast.error(errorMessage);
        } finally {
            setSaving(false);
        }
    };

    const handleBlockToggle = async () => {
        try {
            const newBlockedState = !user?.isBlocked;
        
            setUser(prev => prev ? { ...prev, isBlocked: newBlockedState } : null);
            setEditedUser(prev => prev ? { ...prev, isBlocked: newBlockedState } : null);
            setIsEditing(true);
            if (newBlockedState) {
                toast.success('Save to block user!');
            } else {
                toast.success('Save to unblock user!');
            }
        } catch (err) {
            const errorMessage = (err as Error)?.message || 'Failed to update block status';
            toast.error(errorMessage);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <AiOutlineLoading3Quarters className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading user profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-lg shadow-md">
                    <p className="text-red-600 mb-4">Error: {error}</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
                <p className="text-gray-600">User not found</p>
            </div>
        );
    }

    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        duration: 4000,
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />
            <div className="min-h-screen w-full bg-gray-100 py-8 px-4">
                <div className="max-w-5xl mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition cursor-pointer"
                    >
                        <MdArrowBack className="w-5 h-5" />
                        <span className="font-medium">Back to Users</span>
                    </button>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-linear-to-r from-slate-700 to-slate-800 px-8 py-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
                                        <img
                                            src={user.role === 'admin' ? AdminIcon : EmployeeIcon}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mt-1 ${user.role === 'admin' ? 'bg-purple-500 text-white' : 'bg-blue-500 text-white'
                                            }`}>
                                            {user.role === 'admin' ? <FaShieldAlt className="w-3 h-3" /> : <FaUser className="w-3 h-3" />}
                                            {user.role.toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {isEditing ? (
                                        <>
                                            <button
                                                onClick={handleEditToggle}
                                                className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition cursor-pointer"
                                            >
                                                <MdClose className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                disabled={saving}
                                                className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50"
                                            >
                                                {saving ? <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" /> : <MdSave className="w-5 h-5" />}
                                                Save
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={handleEditToggle}
                                            className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition"
                                        >
                                            <MdEdit className="w-5 h-5" />
                                            Edit
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="mb-8">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">User Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-2">User ID</label>
                                        <span className="font-mono text-sm text-gray-900">{user._id}</span>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editedUser?.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{user.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-2">
                                            <MdEmail className="inline w-4 h-4 mr-1" />
                                            Email Address
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={editedUser?.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{user.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-2">
                                            <MdPhone className="inline w-4 h-4 mr-1" />
                                            Phone Number
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={editedUser?.phone || ''}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                placeholder="Enter phone number"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{user.phone || 'Not provided'}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-2">
                                            <MdLocationOn className="inline w-4 h-4 mr-1" />
                                            Location
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editedUser?.location || ''}
                                                onChange={(e) => handleInputChange('location', e.target.value)}
                                                placeholder="Enter location"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{user.location || 'Not provided'}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-2">
                                            <FaBriefcase className="inline w-4 h-4 mr-1" />
                                            Department
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editedUser?.department || ''}
                                                onChange={(e) => handleInputChange('department', e.target.value)}
                                                placeholder="Enter department"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{user.department || 'Not provided'}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-2">Role</label>
                                        {isEditing ? (
                                            <select
                                                value={editedUser?.role}
                                                onChange={(e) => handleInputChange('role', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                            >
                                                <option value="employee">Employee</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        ) : (
                                            <p className="text-gray-900 capitalize">{user.role}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-2">
                                            <MdCalendarToday className="inline w-4 h-4 mr-1" />
                                            Member Since
                                        </label>
                                        <p className="text-gray-900">
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            }) : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">Account Status</h2>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-4 py-2 rounded-lg font-semibold ${user.isBlocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                            }`}>
                                            {user.isBlocked ? '🚫 Blocked' : '✓ Active'}
                                        </span>
                                        {user.isBlocked && (
                                            <p className="text-sm text-gray-600">This account has been blocked</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleBlockToggle}
                                        className={`px-6 py-2 rounded-lg font-semibold transition cursor-pointer ${user.isBlocked
                                                ? 'bg-green-600 text-white hover:bg-green-700'
                                                : 'bg-red-600 text-white hover:bg-red-700'
                                            }`}
                                    >
                                        {user.isBlocked ? 'Unblock User' : 'Block User'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}