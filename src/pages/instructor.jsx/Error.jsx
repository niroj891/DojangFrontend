import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';

function ErrorPage() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/instructor');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-indigo-600 p-6 text-center">
                    <div className="flex justify-center text-6xl text-white mb-4">
                        <FaExclamationTriangle />
                    </div>
                    <h1 className="text-3xl font-bold text-white">404 - Page Not Found</h1>
                </div>

                {/* Content */}
                <div className="p-8 text-center">
                    <p className="text-gray-600 mb-6 text-lg">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                    <p className="text-gray-500 mb-8">
                        You may have mistyped the address or the page may have been removed.
                    </p>

                    {/* Button */}
                    <button
                        onClick={goBack}
                        className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        <FaArrowLeft className="mr-2" />
                        Return to Dashboard
                    </button>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 text-center">
                    <p className="text-sm text-gray-500">
                        Need help? Contact support@example.com
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;