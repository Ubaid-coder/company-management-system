import { useState } from 'react';
import { Menu, X, ChevronDown, Search, Bell, User } from 'lucide-react';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">L</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">Logo</span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button className="text-gray-700 hover:text-blue-600 font-medium transition">
                            Home
                        </button>

                        <button className="text-gray-700 hover:text-blue-600 font-medium transition">
                            About
                        </button>

                        {/* Products Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProductsOpen(!isProductsOpen)}
                                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition"
                            >
                                Products
                                <ChevronDown className={`w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isProductsOpen && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                                        Product 1
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                                        Product 2
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
                                        Product 3
                                    </button>
                                </div>
                            )}
                        </div>

                        <button className="text-gray-700 hover:text-blue-600 font-medium transition">
                            Services
                        </button>

                        <button className="text-gray-700 hover:text-blue-600 font-medium transition">
                            Contact
                        </button>
                    </div>

                    {/* Right Side Icons & Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Search */}
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Sign In Button */}
                        <button className="px-4 py-2 text-gray-700 hover:text-blue-600 font-semibold transition">
                            Sign In
                        </button>

                        {/* Sign Up Button */}
                        <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition shadow-md">
                            Sign Up
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white">
                    <div className="px-4 py-3 space-y-3">
                        <button className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 font-medium transition">
                            Home
                        </button>
                        <button className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 font-medium transition">
                            About
                        </button>
                        <button className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 font-medium transition">
                            Products
                        </button>
                        <button className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 font-medium transition">
                            Services
                        </button>
                        <button className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 font-medium transition">
                            Contact
                        </button>

                        <div className="border-t border-gray-200 pt-3 space-y-3">
                            <button className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 transition">
                                Profile
                            </button>
                            <button className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 transition">
                                Settings
                            </button>
                            <button className="block w-full text-left py-2 text-red-600 hover:text-red-700 transition">
                                Logout
                            </button>
                        </div>

                        <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition shadow-md">
                            Get Started
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}