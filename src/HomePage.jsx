import React from 'react';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Hero Section */}
            <div className="relative h-screen flex items-center justify-center bg-[url('/taekwondo-hero.jpg')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        Unite, Train, and Grow with the Global Taekwondo Community
                    </h1>
                    <p className="text-xl md:text-2xl mb-8">
                        Join a vibrant network of Taekwondo enthusiasts, instructors, and champions. Share knowledge, track progress, and celebrate the art of Taekwondo together.
                    </p>
                    <div className="space-x-4">
                        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                            Join the Community – Sign Up for Free
                        </button>
                        <button className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                            Explore Resources
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 px-4 bg-gray-800">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Why Join Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-4">Connect Worldwide</h3>
                            <p>Find training partners, mentors, and friends across the globe.</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-4">Personalized Training</h3>
                            <p>Access tutorials, training plans, and track your progress.</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-4">Compete & Showcase</h3>
                            <p>Participate in virtual tournaments and share your achievements.</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-4">Learn from Masters</h3>
                            <p>Watch exclusive tutorials and attend live webinars.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonial Section */}
            <div className="py-16 px-4 bg-gray-900">
                <div className="max-w-4xl mx-auto text-center">
                    <blockquote className="text-2xl italic mb-4">
                        "This platform has transformed my Taekwondo journey. I’ve connected with amazing people and improved my skills faster than ever!"
                    </blockquote>
                    <p className="text-xl font-bold">– Jane Doe, 2nd Dan Black Belt</p>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="py-8 px-4 bg-gray-800">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-lg">&copy; 2023 Taekwondo Community. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="text-white hover:text-red-600">About Us</a>
                        <a href="#" className="text-white hover:text-red-600">Resources</a>
                        <a href="#" className="text-white hover:text-red-600">Events</a>
                        <a href="#" className="text-white hover:text-red-600">Contact</a>
                    </div>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="text-white hover:text-red-600">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="text-white hover:text-red-600">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="text-white hover:text-red-600">
                            <i className="fab fa-youtube"></i>
                        </a>
                        <a href="#" className="text-white hover:text-red-600">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;