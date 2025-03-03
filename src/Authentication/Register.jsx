import axios from "axios";
import React, { useState } from "react";
import { API_BASE_URL } from "../config/api";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleRegister = async (e) => {
        e.preventDefault();

        // Validate form
        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            // API call to register endpoint
            const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                password: formData.password,
            });
            setMessage(`Registration successful for ${response.data.firstName}`);
            // Navigate the register to login page after sucessful registration setout time 2 seconds.
            //setTimeout(() => Navigate("/login"), 2000);

            // Reset form
            setFormData({
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            setTimeout(() => {
                console.log("Navigating to login...");
                navigate("/login");
            }, 2000);



        } catch (error) {
            setMessage(
                error.response?.data?.message || "Registration failed. Try again."
            );
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-[80vh] justify-center items-center">
            {/* Right Section: Taekwondo Image */}
            <div className="w-full md:w-2/5 h-[80vh] bg-gray-100 flex justify-center items-center opacity-90">
                <img
                    src="/image/TaekwondoRegister.jpg"
                    alt="Taekwondo"
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            {/* Left Section: Registration Form */}
            <div className="w-full md:w-2/5 h-[80vh] bg-pink-50 flex flex-col justify-center items-center p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Create an Account</h2>

                {message && <p className="text-red-500">{message}</p>}

                <form className="w-full max-w-sm" onSubmit={handleRegister}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="First Name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                placeholder="Last Name"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-400 text-white py-2 px-4 rounded-full hover:bg-slate-200 hover:text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
