import React, { useState } from "react";




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

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    // const handleRegister = async (e) => {
    //     e.preventDefault();

    //     // Validate form
    //     if (formData.password !== formData.confirmPassword) {
    //         setMessage("Passwords do not match.");
    //         return;
    //     }

    //     try {
    //         // API call to register endpoint
    //         const response = await axios.post("/register", {
    //             firstName: formData.firstName,
    //             lastName: formData.lastName,
    //             phoneNumber: formData.phoneNumber,
    //             email: formData.email,
    //             password: formData.password,
    //         });
    //         setMessage(`Registration successful for ${response.data.firstName}`);
    //         setFormData({
    //             firstName: "",
    //             lastName: "",
    //             phoneNumber: "",
    //             email: "",
    //             password: "",
    //             confirmPassword: "",
    //         });
    //     } catch (error) {
    //         setMessage(
    //             error.response?.data?.message || "Registration failed. Try again."
    //         );
    //     }
    // };

    return (

        <div className="flex flex-col md:flex-row h-screen ">
            {/* Right Section: Taekwondo Image */}
            <div className="w-full md:w-1/2 bg-gray-100 flex justify-center items-center opacity-90 ">
                <img
                    src="https://as2.ftcdn.net/v2/jpg/01/43/17/87/1000_F_143178723_OGIRrqgNE7tFaRpfJxeTS2xQA8eSWy6l.jpg"
                    alt="Taekwondo"
                    className="w-full h-full object-cover rounded-lg"
                />
            </div >

            {/* Left Section: Registration Form */}
            <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center items-center p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Create an Account</h2>
                <form className="w-full max-w-sm">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                            First name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your first name"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                            Last name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your last name"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone number
                        </label>
                        <input
                            type="number"
                            name="phoneNumber"
                            id="phoneNumber"
                            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Confirm your password"
                        />
                    </div >
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-slate-200 hover:text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        Register
                    </button>
                </form>
            </div>


        </div>
    );
};

export default RegisterPage;
