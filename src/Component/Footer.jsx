import React from "react";
//import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; 

import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-1">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Taekwondo Nepal</h4>
                        <ul className="space-y-1">
                            <li>
                                <Link to="/classes" className="hover:text-gray-300">
                                    History
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-gray-300">
                                    Rules and Regulations
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-gray-300">
                                    News
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-1">
                            <li>
                                <Link to="/classes" className="hover:text-gray-300">
                                    Leaderboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-gray-300">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-gray-300">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>


                    <div >
                        <h4 className="flex justify-center text-lg underline-offset-4 font-semibold mb-2">Connect With Us</h4>
                        <div className="space-y-4">
                            <a href="#" className="flex justify-center hover:text-gray-300">
                                <Facebook />
                            </a>
                            <a href="#" className="flex justify-center hover:text-gray-300">
                                <Twitter />
                            </a>
                            <a href="#" className="flex justify-center hover:text-gray-300">
                                <Instagram />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center text-sm">
                    © {new Date().getFullYear()} Dojang. All rights reserved.
                </div>
            </div>
        </footer>
    )
}



