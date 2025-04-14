import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Close } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { isLogin } from "../recoil/user";

const navItems = ["Home", "Events", "About", "Leaderboard", "Community", "Contact"];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(isLogin);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Track scroll position for navbar effects
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <nav className={`bg-white sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg py-1" : "shadow-md py-3"
            }`}>
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logo with subtle animation */}
                <Link to="/home" className="text-2xl font-bold text-red-600 hover:text-red-700 transition-all duration-300 flex items-center space-x-3 group">
                    <div className="overflow-hidden rounded-full border-2 border-yellow-400 group-hover:border-red-600 transition-all duration-300">
                        <img
                            src="/image/Taekwondo logo.png"
                            alt="Dojang Logo"
                            className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                    <span className="italic tracking-wide group-hover:tracking-wider transition-all duration-300">Dojang</span>
                </Link>

                {/* Desktop Navigation with refined styling */}
                <div className="hidden md:flex items-center space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item}
                            to={`/${item.toLowerCase()}`}
                            className={`text-lg font-medium rounded-lg py-2 px-3 transition-all duration-200 relative overflow-hidden ${location.pathname === `/${item.toLowerCase()}`
                                ? "text-red-600 bg-yellow-200 font-semibold"
                                : "text-gray-800 hover:text-red-600 hover:bg-yellow-100"
                                }`}
                        >
                            <span className="relative z-10">{item}</span>
                            {location.pathname === `/${item.toLowerCase()}` && (
                                <span className="absolute bottom-0 left-0 w-full h-1 bg-red-500 rounded-t-md"></span>
                            )}
                        </Link>
                    ))}
                    {isUserLoggedIn ? (
                        <Link
                            to="/profile"
                            className="bg-red-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                        >
                            Profile
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-yellow-500 text-red-900 font-semibold px-6 py-2 rounded-lg text-lg hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button with animation */}
                <button
                    onClick={handleDrawerToggle}
                    className="md:hidden text-red-600 focus:outline-none p-2 rounded-full hover:bg-yellow-200 transition-colors duration-300"
                    aria-label="Toggle menu"
                >
                    <Menu fontSize="large" />
                </button>
            </div>

            {/* Mobile Drawer with improved animation */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-opacity duration-300"
                    onClick={handleDrawerToggle}
                >
                    <div
                        className="absolute right-0 top-0 w-72 h-full bg-yellow-50 shadow-xl p-6 animate-slideIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-red-600 p-2 rounded-full hover:bg-red-100 transition-colors duration-300"
                            onClick={handleDrawerToggle}
                            aria-label="Close menu"
                        >
                            <Close />
                        </button>

                        {/* Dojang Logo in Mobile Menu */}
                        <div className="flex items-center space-x-3 mb-8 mt-4">
                            <img
                                src="/image/Taekwondo logo.png"
                                alt="Dojang Logo"
                                className="w-10 h-10 object-contain rounded-full border-2 border-yellow-400"
                            />
                            <span className="text-xl font-bold text-red-600 italic">Dojang</span>
                        </div>

                        {/* Mobile Nav Links with animation */}
                        <div className="flex flex-col space-y-4">
                            {navItems.map((item, index) => (
                                <Link
                                    key={item}
                                    to={`/${item.toLowerCase()}`}
                                    className={`text-lg font-medium py-3 px-4 rounded-lg transition-all duration-200 ${location.pathname === `/${item.toLowerCase()}`
                                        ? "text-red-600 bg-yellow-200 font-semibold"
                                        : "text-gray-800 hover:text-red-600 hover:bg-yellow-100"
                                        }`}
                                    onClick={handleDrawerToggle}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {item}
                                </Link>
                            ))}

                            <div className="pt-4 mt-4 border-t border-yellow-300">
                                {isUserLoggedIn ? (
                                    <Link
                                        to="/profile"
                                        className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-all duration-300 block text-center shadow-md"
                                        onClick={handleDrawerToggle}
                                    >
                                        Profile
                                    </Link>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="bg-yellow-500 text-red-900 font-semibold px-6 py-3 rounded-lg text-lg hover:bg-yellow-600 transition-all duration-300 block text-center shadow-md"
                                        onClick={handleDrawerToggle}
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add global styles for animations */}
            <style jsx global>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out forwards;
                }
            `}</style>
        </nav>
    );
}