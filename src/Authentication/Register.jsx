import axios from "axios";
import React, { useState, useEffect } from "react";
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
        role: "USER", // Added role field with default value
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
                setMessageType("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        // Validate role
        if (!formData.role) {
            newErrors.role = "Please select a role";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                password: formData.password,
                role: formData.role, // Added role to the request body
            });

            setMessage(`Registration successful! Welcome, ${response.data.firstName}. Redirecting to login...`);
            setMessageType("success");

            setFormData({
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "USER",
            });

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            setMessage(
                error.response?.data?.message || "Registration failed. Please try again."
            );
            setMessageType("error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-[75vh] justify-center items-center bg-gray-50">
            {/* Left Section: Registration Form */}
            <div className=" md:w-1/2 lg:w-2/5 px-4 py-4 md:py-2 mt-14 ">
                <div className="max-w- mx-auto bg-white rounded-xl shadow-md overflow-hidden p-4 md:p-2">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Create an Account</h2>
                    <p className="text-gray-600 mb-3 text-center">Join our Taekwondo community today</p>

                    {message && (
                        <div
                            className={`mb-4 p-3 rounded-lg text-sm ${messageType === "success"
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : "bg-red-100 text-red-700 border border-red-200"
                                }`}
                        >
                            {message}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleRegister}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors`}
                                    placeholder="First Name"
                                />
                                {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors`}
                                    placeholder="Last Name"
                                />
                                {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${errors.phoneNumber ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors`}
                                placeholder="(123) 456-7890"
                            />
                            {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>}
                        </div>

                        {/* Added Role Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Register As</label>
                            <div className="grid grid-cols-2 gap-3 mt-1">
                                <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${formData.role === 'USER' ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="USER"
                                        checked={formData.role === "USER"}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-blue-400 focus:ring-blue-400"
                                    />
                                    <span className="ml-2 text-sm">User</span>
                                </label>
                                <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${formData.role === 'INSTRUCTOR' ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="INSTRUCTOR"
                                        checked={formData.role === "INSTRUCTOR"}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-blue-400 focus:ring-blue-400"
                                    />
                                    <span className="ml-2 text-sm">Instructor</span>
                                </label>
                            </div>
                            {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors`}
                                placeholder="your.email@example.com"
                            />
                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors`}
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                            {formData.password && !errors.password && (
                                <p className="mt-1 text-xs text-gray-500">Password strength: {formData.password.length >= 12 ? "Strong" : formData.password.length >= 8 ? "Good" : "Weak"}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors`}
                                placeholder="••••••••"
                            />
                            {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-400 text-white py-3 px-4 rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors font-medium flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : "Create Account"}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-500 hover:text-blue-700 font-medium">
                                Log in
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section: Taekwondo Image */}
            <div className=" md:block w-1/2 lg:w-2.5/5 h-[80vh]">
                <div className="h-full w-full relative overflow-hidden bg-gray-100 rounded-l-xl">
                    <img
                        src="/image/TaekwondoRegister.jpg"
                        alt="Taekwondo training"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 md:p-10 text-black max-w-md">
                        <h3 className="text-2xl font-bold mb-2 drop-shadow-md">Join Our Taekwondo Community</h3>
                        <p className="text-sm drop-shadow-md">Discover the benefits of training with our experienced instructors in a supportive environment.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;