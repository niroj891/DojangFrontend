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
            }, 4000);

        } catch (error) {
            console.error('Registration error:', error);

            // Custom error messages based on different error types
            let errorMessage = 'Already registered in this event.';

            if (error.response) {
                // Backend returned an error response
                errorMessage = error.response.data?.message || errorMessage;

                // Handle specific status codes
                if (error.response.status === 401) {
                    errorMessage = 'Session expired. Please login again.';
                } else if (error.response.status === 409) {
                    errorMessage = 'You are already registered for this event.';
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
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Event Registration</h2>

            {/* Success Message */}
            {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                    {success}
                    <div className="text-sm mt-1">Redirecting to events page...</div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                    {error.includes('login') && (
                        <button
                            onClick={() => navigate('/login')}
                            className="ml-2 text-sm underline hover:text-red-900"
                        >
                            Go to Login
                        </button>
                    )}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                        disabled={isSubmitting || success}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                        disabled={isSubmitting || success}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="dojangName">
                        Dojang Name
                    </label>
                    <input
                        type="text"
                        id="dojangName"
                        name="dojangName"
                        value={formData.dojangName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                        disabled={isSubmitting || success}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="weightCategory">
                        Weight Category
                    </label>
                    <select
                        id="weightCategory"
                        name="weightCategory"
                        value={formData.weightCategory}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                        disabled={isSubmitting || success}
                    >
                        <option value="">Select weight category</option>
                        {weightCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() => navigate('/events')}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                        disabled={isSubmitting || success}
                    >
                        {isSubmitting ? 'Registering...' : success ? 'Registered!' : 'Register'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;