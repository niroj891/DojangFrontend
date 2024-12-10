import React from "react";

const RegisterPage = () => {
    return (



        <div className="flex flex-col md:flex-row h-screen ">
            {/* Right Section: Taekwondo Image */}
            <div className="w-full md:w-1/2 bg-gray-100 flex justify-center items-center opacity-90">
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
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Confirm your password"
                        />
                    </div >
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                        Register
                    </button>
                </form>
            </div>


        </div>
    );
};

export default RegisterPage;
