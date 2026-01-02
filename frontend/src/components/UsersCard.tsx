import { Mail, Briefcase, MapPin, Calendar, Phone, Globe, Edit } from 'lucide-react';

export default function UserCard() {
  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Senior Product Designer",
    location: "San Francisco, CA",
    joinDate: "January 2023",
    phone: "+1 (555) 123-4567",
    website: "sarahjohnson.design",
    department: "Design Team",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with gradient background */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="pt-20 pb-8 px-6">
            {/* Name and Edit Button */}
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                <Edit className="w-5 h-5" />
              </button>
            </div>

            {/* Role Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <Briefcase className="w-4 h-4" />
              {user.role}
            </div>

            {/* Information List */}
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-medium">Email</p>
                  <p className="text-sm text-gray-900 truncate">{user.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-medium">Phone</p>
                  <p className="text-sm text-gray-900">{user.phone}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-medium">Location</p>
                  <p className="text-sm text-gray-900">{user.location}</p>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-medium">Website</p>
                  <p className="text-sm text-blue-600 truncate">{user.website}</p>
                </div>
              </div>

              {/* Department */}
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-pink-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-medium">Department</p>
                  <p className="text-sm text-gray-900">{user.department}</p>
                </div>
              </div>

              {/* Join Date */}
              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-medium">Member Since</p>
                  <p className="text-sm text-gray-900">{user.joinDate}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition shadow-md">
                Send Message
              </button>
              <button className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition">
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}