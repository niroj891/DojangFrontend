import React, { useState } from "react";
import { Link } from "react-router-dom";
//import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Button } from "@mui/material";
import { Menu } from "@mui/icons-material";

const navItems = ["Home", "Events", "About", "Leaderboard", "Community", "Contact"];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <nav className="bg-gray-100 shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/home" className="text-2xl font-bold text-black hover:text-gray-600  transition flex  items-center space-x-3">
                    <img
                        src="/image/Taekwondo logo.png"
                        alt="Dojang Logo"
                        className="w-12 h-12 object-contain rounded-full"
                    />
                    <span className="italic">Dojang</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item}
                            to={`/${item.toLowerCase()}`}
                            className="text-xl text-black rounded-lg py-1 px-1
                            hover:text-black hover:bg-gray-400 transition"
                        >
                            {item}
                        </Link>
                    ))}
                    <Link
                        to="/login"
                        className="bg-blue-500 text-white px-6 py-1 rounded-lg text-xl hover:bg-blue-600 transition"
                    >
                        Login
                    </Link>
                </div>

                {/* Mobile Menu Button (Repositioned to Right) */}
                <button
                    onClick={handleDrawerToggle}
                    className="md:hidden text-black focus:outline-none"
                >
                    <Menu fontSize="large" />
                </button>
            </div>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={handleDrawerToggle}>
                    <div className="absolute right-0 top-0 w-64 h-full bg-white shadow-lg p-6">
                        {/* Close Button */}
                        <button className="absolute top-4 right-4 text-black text-2xl" onClick={handleDrawerToggle}>
                            ✖
                        </button>

                        {/* Mobile Nav Links */}
                        <div className="flex flex-col space-y-6 mt-10">
                            {navItems.map((item) => (
                                <Link
                                    key={item}
                                    to={`/${item.toLowerCase()}`}
                                    className="text-xl text-black hover:text-blue-500 transition"
                                >
                                    {item}
                                </Link>
                            ))}
                            <Link
                                to="/login"
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg text-xl text-center hover:bg-blue-600 transition"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
