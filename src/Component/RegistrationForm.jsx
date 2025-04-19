import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const weightCategories = [
    "BELOW54",
    "BELOW58",
    "BELOW63",
    "BELOW68",
];

const RegistrationForm = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dojangName: '',
        weightCategory: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                throw new Error('Authentication token not found. Please login again.');
            }

            const response = await axios.post(
                `http://localhost:9696/api/users/events/register/${eventId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log(response.status)
            if (response.status == 200) {
                // Success message from backend if available, otherwise use custom message
                const successMessage = response.data?.message || 'Registration successful!';
                setSuccess(successMessage);
                // Clear form on successful submission
                setFormData({
                    firstName: '',
                    lastName: '',
                    dojangName: '',
                    weightCategory: ''
                });

                // Optionally navigate after a delay to let user see the success message
                setTimeout(() => {
                    navigate('/events', { state: { registrationSuccess: true } });
                }, 2000);
            } else {

                const errormessage = "User already exists";
                setError(errormessage)
            }
        } catch (error) {
            console.error('Registration error:', error);

            // Custom error messages based on different error types
            let errorMessage = 'Already registered in this event.';

            if (error.response) {
                // Backend returned an error response
                errorMessage = error.response.data || errorMessage;

                // Handle specific status codes
                if (error.response.status === 500) {
                    errorMessage = 'User Already registered';

                } else if (error.response.status === 500) {
                    errorMessage = 'User Already Exists.';
                }
            } else if (error.request) {
                // Request was made but no response received
                errorMessage = 'Network error. Please check your connection.';
            } else if (error.message.includes('token')) {
                // Specific JWT related errors
                errorMessage = 'Authentication issue. Please login again.';
            }

            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-24 bg-red-600 opacity-10 -skew-y-2 transform-gpu z-0"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-100 rounded-full -mb-32 -mr-32 z-0"></div>
            <div className="absolute top-40 left-10 w-20 h-20 bg-red-200 rounded-full z-0"></div>

            {/* Taekwondo Symbol or Logo */}
            <div className="mb-8 relative z-10">
                <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-red-500">
                    <div className="text-4xl">🥋</div>
                </div>
            </div>

            <div className="max-w-lg w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden relative z-10">
                {/* Form Header with Taekwondo-themed color */}
                <div className="bg-red-600 text-white py-6 px-8">
                    <h2 className="text-3xl font-bold text-center">Event Registration</h2>
                    <p className="text-center text-red-100 mt-2">Nepal Taekwondo Community</p>
                </div>

                <div className="p-8">
                    {/* Success Message */}
                    {success && (
                        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md flex items-center border-l-4 border-green-500">
                            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <div>
                                {success}
                                <div className="text-sm mt-1">Redirecting to events page...</div>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md flex items-center border-l-4 border-red-500">
                            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <div>
                                {error}
                                {error.includes('login') && (
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="ml-2 text-sm font-medium underline hover:text-red-900"
                                    >
                                        Go to Login
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                First Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                                    required
                                    disabled={isSubmitting || success}
                                    placeholder="Enter your first name"
                                />
                                <span className="absolute left-3 top-3 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                Last Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                                    required
                                    disabled={isSubmitting || success}
                                    placeholder="Enter your last name"
                                />
                                <span className="absolute left-3 top-3 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dojangName">
                                Dojang Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="dojangName"
                                    name="dojangName"
                                    value={formData.dojangName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                                    required
                                    disabled={isSubmitting || success}
                                    placeholder="Enter your dojang name"
                                />
                                <span className="absolute left-3 top-3 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weightCategory">
                                Weight Category
                            </label>
                            <div className="relative">
                                <select
                                    id="weightCategory"
                                    name="weightCategory"
                                    value={formData.weightCategory}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white transition appearance-none"
                                    required
                                    disabled={isSubmitting || success}
                                >
                                    <option value="">Select weight category</option>
                                    {weightCategories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                <span className="absolute left-3 top-3 text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                    </svg>
                                </span>
                                <span className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/events')}
                                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 border border-gray-300 disabled:opacity-50 transition font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center"
                                disabled={isSubmitting}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center shadow-md"
                                disabled={isSubmitting || success}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Registering...
                                    </span>
                                ) : success ? (
                                    <span className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Registered!
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                        Register
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Decorative Bottom Border */}
                <div className="h-2 bg-gradient-to-r from-red-500 via-red-600 to-red-500"></div>
            </div>

            {/* Decorative Belt Element */}
            <div className="mt-8 relative z-10">
                <div className="h-6 w-48 bg-black rounded-sm relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-1 w-36 bg-red-500"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;