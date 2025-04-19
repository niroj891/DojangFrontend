import React from 'react';
import Testimonial from '../../Component/Testimonial';
import UpcomingEvents from '../../Component/UpcomingEvents';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Hero Section - Modern with Parallax Effect */}
            <div className="relative h-screen flex flex-col items-center justify-center bg-cover bg-fixed bg-center overflow-hidden"
                style={{ backgroundImage: "url('/image/TaekwondoRegister.jpg')", backgroundPosition: "center 20%" }}>

                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-slate-900/70 to-slate-800/80"></div>

                {/* Content with improved spacing and visual hierarchy */}
                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <div className="animate-fade-in-down">
                        <img
                            src="/image/Taekwondo logo.png"
                            alt="Dojang Logo"
                            className="mx-auto mb-4 w-32 sm:w-40 md:w-48 rounded-full shadow-2xl border-4 border-white/20 hover:border-white/40 transition-all duration-300"
                        />
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
                            Unite, Train, and Grow with Nepal Taekwondo Community
                        </h1>
                        <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mt-6 font-light tracking-wider">
                            NEPAL TAEKWONDO ATHLETES
                        </p>

                        {/* Modernized CTA Buttons */}
                        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
                            <a
                                href="/events"
                                className="group bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-600/30 transform hover:-translate-y-1 flex items-center justify-center"
                            >
                                <span>TAEKWONDO EVENTS</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-0 w-0 group-hover:h-5 group-hover:w-5 group-hover:ml-2 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href="/register"
                                className="group bg-white text-red-600 hover:bg-gray-50 font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-transparent hover:border-red-100"
                            >
                                <span>JOIN DOJANG</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Modern scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-10 h-16 rounded-full border-2 border-white/50 flex items-start justify-center pt-2">
                        <div className="w-2 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Features Section - Modern cards with hover effects */}
            <div className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4 text-slate-800 relative">
                        Why Join <span className="text-red-600">Dojang</span>
                        <div className="absolute w-24 h-1 bg-red-600 rounded-full bottom-0 left-1/2 transform -translate-x-1/2 mt-4"></div>
                    </h2>
                    <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto mb-20 mt-6">
                        Join our community and elevate your Taekwondo journey with dedicated practitioners from around the world
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Enhanced Feature Cards with modern styling */}
                        {[
                            {
                                title: "Connect Worldwide",
                                description: "Find training partners, mentors, and friends across the globe.",
                                icon: "🌎"
                            },
                            {
                                title: "Learn",
                                description: "Access tutorials, training plans, and track your progress.",
                                icon: "📚"
                            },
                            {
                                title: "Compete & Showcase",
                                description: "Participate in virtual tournaments and share your achievements.",
                                icon: "🏆"
                            },
                            {
                                title: "Leaderboard",
                                description: "Climb the ranks and showcase your skills in the community.",
                                icon: "📊"
                            },
                            {
                                title: "Learn from Masters",
                                description: "Watch exclusive tutorials and attend live webinars.",
                                icon: "👨‍🏫"
                            },
                            {
                                title: "Community Events",
                                description: "Join workshops, seminars, and local meetups.",
                                icon: "🤝"
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl text-center transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 group"
                            >
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                                <h3 className="text-2xl font-bold mb-3 text-slate-800">{feature.title}</h3>
                                <p className="text-slate-600">{feature.description}</p>
                                <div className="w-16 h-1 bg-red-600 scale-0 group-hover:scale-100 transition-all duration-300 mx-auto mt-6"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Upcoming Events with modern styling */}
            <div className="py-24 px-6 bg-white relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full -mr-48 -mt-48 z-0"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-50 rounded-full -ml-32 -mb-32 z-0"></div>

                <div className="max-w-6xl mx-auto relative z-10 text-center">
                    <h2 className="text-4xl font-bold text-center mb-4 text-slate-800 relative inline-block">
                        Upcoming <span className="text-red-600">Events</span>
                        <div className="absolute w-full h-1 bg-red-600 rounded-full bottom-0 left-0 transform translate-y-6"></div>
                    </h2>
                    <div className="mt-20">
                        <UpcomingEvents />
                    </div>
                </div>
            </div>

            {/* Testimonials Section with modern styling */}
            <div className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white relative">
                {/* Background decorative elements */}
                <div className="absolute inset-0 bg-slate-50 z-0">
                    <div className="absolute top-0 left-0 w-full h-full opacity-20">
                        <div className="w-32 h-32 bg-red-600 rounded-full absolute -top-16 -left-16"></div>
                        <div className="w-24 h-24 bg-slate-300 rounded-full absolute top-32 right-16"></div>
                        <div className="w-16 h-16 bg-red-400 rounded-full absolute bottom-32 left-32"></div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10 text-center">
                    <h2 className="text-4xl font-bold text-center mb-4 text-slate-800 relative inline-block">
                        Community <span className="text-red-600 text-center">Voices</span>
                        <div className="absolute w-24 h-1 bg-red-600 rounded-full bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6"></div>
                    </h2>
                    <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto mb-20 mt-8">
                        Hear what our members have to say about their experience with Nepal Taekwondo Community
                    </p>
                    <Testimonial />
                </div>
            </div>
        </div>
    );
};

export default HomePage;