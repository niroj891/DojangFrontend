import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { isLogin } from "../recoil/user";

const navItems = ["Home", "Events", "About", "Leaderboard", "Community", "Contact"];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(isLogin);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <nav className="bg-yellow-50 shadow-md p-2 sticky top-0 z-50 ">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/home" className="text-2xl font-bold text-red-600 hover:text-red-700 transition flex items-center space-x-3">
                    <img
                        src="/image/Taekwondo logo.png"
                        alt="Dojang Logo"
                        className="w-12 h-12 object-contain rounded-full border-2 border-yellow-400"
                    />
                    <span className="italic">Dojang</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item}
                            to={`/${item.toLowerCase()}`}
                            className="text-xl text-gray-800 rounded-lg py-1 px-1
                            hover:text-red-600 hover:bg-yellow-200 transition"
                        >
                            {item}
                        </Link>
                    ))}
                    {isUserLoggedIn ? (
                        <Link
                            to="/profile"
                            className="bg-red-600 text-white px-6 py-1 rounded-lg text-xl hover:bg-red-700 transition"
                        >
                            Profile
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-yellow-500 text-red-900 font-semibold px-6 py-1 rounded-lg text-xl hover:bg-yellow-600 transition"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button (Repositioned to Right) */}
                <button
                    onClick={handleDrawerToggle}
                    className="md:hidden text-red-600 focus:outline-none"
                >
                    <Menu fontSize="large" />
                </button>
            </div>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={handleDrawerToggle}>
                    <div className="absolute right-0 top-0 w-64 h-full bg-yellow-50 shadow-lg p-6">
                        {/* Close Button */}
                        <button className="absolute top-4 right-4 text-red-600 text-2xl" onClick={handleDrawerToggle}>
                            ✖
                        </button>

                        {/* Mobile Nav Links */}
                        <div className="flex flex-col space-y-6 mt-10">
                            {navItems.map((item) => (
                                <Link
                                    key={item}
                                    to={`/${item.toLowerCase()}`}
                                    className="text-xl text-gray-800 hover:text-red-600 transition"
                                    onClick={handleDrawerToggle}
                                >
                                    {item}
                                </Link>
                            ))}
                            {isUserLoggedIn ? (
                                <Link
                                    to="/profile"
                                    className="bg-red-600 text-white px-6 py-2 rounded-lg text-xl text-center hover:bg-red-700 transition"
                                    onClick={handleDrawerToggle}
                                >
                                    Profile
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="bg-yellow-500 text-red-900 font-semibold px-6 py-2 rounded-lg text-xl text-center hover:bg-yellow-600 transition"
                                    onClick={handleDrawerToggle}
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}