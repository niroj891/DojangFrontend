import Link from "react-router";
import { Facebook, Twitter, Instagram } from "@mui/icons-material"

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">TaekwondoMaster</h3>
                        <p className="text-sm">Empowering lives through the art of Taekwondo</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/classes" className="hover:text-gray-300">
                                    Classes
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-gray-300">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-gray-300">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-gray-300">
                                <Facebook />
                            </a>
                            <a href="#" className="hover:text-gray-300">
                                <Twitter />
                            </a>
                            <a href="#" className="hover:text-gray-300">
                                <Instagram />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center text-sm">
                    © {new Date().getFullYear()} TaekwondoMaster. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

