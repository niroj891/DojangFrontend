import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "USER",
        gender: "",
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

        if (!formData.role) {
            newErrors.role = "Please select a role";
        }

        if (!formData.gender) {
            newErrors.gender = "Please select a gender";
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
                gender: formData.gender,
                role: formData.role, // Added role to the request body
            });

            console.log(response)
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
            console.log(error)
            setMessage(
                error.response?.data?.message || "Registration failed. Please try again."
            );
            setMessageType("error");
        } finally {
            setIsLoading(false);
        }
    };

    const getPasswordStrength = () => {
        if (!formData.password) return "";
        if (formData.password.length >= 12) return "Strong";
        if (formData.password.length >= 8) return "Good";
        return "Weak";
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            {/* Left Section: Form */}
            <div className="md:w-1/2 lg:w-2/5 px-4 py-4 md:py-2 mt-8">
                <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg overflow-hidden p-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">Create an Account</h2>
                    <p className="text-gray-600 mb-6 text-center">Join our Taekwondo community today</p>

                    {message && (
                        <div
                            className={`mb-6 p-4 rounded-lg text-sm ${messageType === "success"
                                ? "bg-green-50 text-green-700 border-l-4 border-green-500"
                                : "bg-red-50 text-red-700 border-l-4 border-red-500"
                                }`}
                        >
                            {message}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleRegister}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border ${errors.firstName ? "border-red-500" : "border-gray-200"
                                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors`}
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
                                    className={`w-full px-4 py-3 border ${errors.lastName ? "border-red-500" : "border-gray-200"
                                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors`}
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
                                className={`w-full px-4 py-3 border ${errors.phoneNumber ? "border-red-500" : "border-gray-200"
                                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors`}
                                placeholder="(123) 456-7890"
                            />
                            {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <div className="grid grid-cols-2 gap-3 mt-1">
                                <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${formData.gender === 'MALE'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="MALE"
                                        checked={formData.gender === "MALE"}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm">Male</span>
                                </label>
                                <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${formData.gender === 'FEMALE'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="FEMALE"
                                        checked={formData.gender === "FEMALE"}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm">Female</span>
                                </label>
                            </div>
                            {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Register As</label>
                            <div className="grid grid-cols-2 gap-3 mt-1">
                                <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${formData.role === 'USER'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="USER"
                                        checked={formData.role === "USER"}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm">User</span>
                                </label>
                                <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${formData.role === 'INSTRUCTOR'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="INSTRUCTOR"
                                        checked={formData.role === "INSTRUCTOR"}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
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
                                className={`w-full px-4 py-3 border ${errors.email ? "border-red-500" : "border-gray-200"
                                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors`}
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
                                className={`w-full px-4 py-3 border ${errors.password ? "border-red-500" : "border-gray-200"
                                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors`}
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                            {formData.password && !errors.password && (
                                <div className="mt-2 flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                        <div
                                            className={`h-1.5 rounded-full ${getPasswordStrength() === "Strong"
                                                ? "bg-green-500 w-full"
                                                : getPasswordStrength() === "Good"
                                                    ? "bg-yellow-500 w-2/3"
                                                    : "bg-red-500 w-1/3"
                                                }`}>
                                        </div>
                                    </div>
                                    <span className={`ml-2 text-xs ${getPasswordStrength() === "Strong"
                                        ? "text-green-600"
                                        : getPasswordStrength() === "Good"
                                            ? "text-yellow-600"
                                            : "text-red-600"
                                        }`}>
                                        {getPasswordStrength()}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border ${errors.confirmPassword ? "border-red-500" : "border-gray-200"
                                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors`}
                                placeholder="••••••••"
                            />
                            {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors font-medium flex items-center justify-center"
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
            <div className="hidden md:block w-1/2 lg:w-3/5 h-screen">
                <div className="h-full w-full relative overflow-hidden mt-10 bg-gray-100">
                    <img
                        src="/image/TaekwondoRegister.jpg"
                        alt="Taekwondo training"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-black/30"></div>
                    <div className="absolute bottom-0 left-0 p-10 text-white max-w-lg">
                        <div className="inline-block p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg mb-4">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12,2L1,21H23L12,2M12,6L19.5,19H4.5L12,6Z" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-bold mb-3 drop-shadow-md">Join Our Taekwondo Community</h3>
                        <p className="text-lg text-gray-100 drop-shadow-md mb-6">
                            Discover the benefits of training with experienced instructors in a supportive environment.
                            Build discipline, strength, and confidence.
                        </p>
                        <div className="flex items-center space-x-4">
                            <div className="flex -space-x-2">
                                <img className="w-8 h-8 rounded-full border-2 border-white" src="/api/placeholder/32/32" alt="Student" />
                                <img className="w-8 h-8 rounded-full border-2 border-white" src="/api/placeholder/32/32" alt="Student" />
                                <img className="w-8 h-8 rounded-full border-2 border-white" src="/api/placeholder/32/32" alt="Student" />
                            </div>
                            <div className="text-sm text-white">
                                Join <span className="font-bold">500+</span> members
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}