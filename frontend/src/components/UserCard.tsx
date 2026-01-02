import { MdEmail, MdPhone, MdLocationOn, MdEdit, MdCalendarToday } from 'react-icons/md';
import { FaUser, FaShieldAlt, FaBriefcase } from 'react-icons/fa';
import EmployeeIcon from '../assets/employee.png';
import AdminIcon from '../assets/admin.png';
import { Link } from 'react-router-dom';

export default function UserCard({ name, email, _id, role, createdAt }) {
  const user = {
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    website: "sarahjohnson.design",
    department: "Design Team",
    avatar: EmployeeIcon
  };

  return (
    <div className="w-full max-w-md mt-10">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header with gradient background */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
              <img
                src={role=='admin'?AdminIcon:EmployeeIcon}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-20 pb-8 px-6">
          {/* Name and Edit Button */}
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
            <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
              <MdEdit className="w-5 h-5" />
            </button>
          </div>

          {/* Role Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            {role === 'admin' ? <FaShieldAlt className="w-4 h-4" /> 
            : <FaUser className="w-4 h-4" />
            }
            {role}
          </div>

          {/* Information List */}
          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <MdEmail className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-medium">Email</p>
                <p className="text-sm text-gray-900 truncate">{email}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <MdPhone className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-medium">Phone</p>
                <p className="text-sm text-gray-900">{user.phone}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <MdLocationOn className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-medium">Location</p>
                <p className="text-sm text-gray-900">{user.location}</p>
              </div>
            </div>

            {/* Department */}
            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaBriefcase className="w-5 h-5 text-pink-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-medium">Department</p>
                <p className="text-sm text-gray-900">{user.department}</p>
              </div>
            </div>

            {/* Join Date */}
            <div className="flex items-center gap-3 text-gray-600">
              <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <MdCalendarToday className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-medium">Member Since</p>
                <p className="text-sm text-gray-900">{createdAt}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            <Link to={`/user/${_id}`} className="w-full">
              <button className="w-full cursor-pointer px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition">
                View Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}