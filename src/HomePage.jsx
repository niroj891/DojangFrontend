import React from 'react';
import Testimonial from './Testimonial';
import UpcomingEvents from './pages/UpcomingEvents';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Hero Section */}
            <div className="relative h-screen flex flex-col items-center justify-center bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: "url('/image/TaekwondoRegister.jpg')" }}>

                {/* Dark Overlay with improved gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 to-slate-700/80"></div>

                {/* Content with improved spacing and hierarchy */}
                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <div className="animate-fade-in-down">
                        <img
                            src="/image/Taekwondo logo.png"
                            alt="USATKD Logo"
                            className="mx-auto mb-8 w-32 sm:w-40 md:w-48 rounded-full shadow-lg border-2 border-white/30"
                        />
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                            Unite, Train, and Grow with Nepal Taekwondo Community
                        </h1>
                        <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mt-4 font-light">
                            NEPAL TAEKWONDO ATHLETES
                        </p>

                        {/* Improved Buttons */}
                        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href="/events"
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                UPCOMING EVENTS
                            </a>
                            <a
                                href="/register"
                                className="bg-white text-red-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-2 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                JOIN DOJANG
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>

            {/* Features Section with improved visuals */}
            <div className="py-24 px-6 bg-gradient-to-b from-slate-100 to-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4 text-slate-800">
                        Why Join Dojang?
                    </h2>
                    <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto mb-16">
                        Join our community and elevate your Taekwondo journey with dedicated practitioners from around the world
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature Cards with icons */}
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
                                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl text-center transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-2xl font-bold mb-3 text-slate-800">{feature.title}</h3>
                                <p className="text-slate-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Upcoming Events with section header */}
            <div className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16 text-slate-800">
                        Upcoming <span className="text-red-600">Events</span>
                    </h2>
                    <UpcomingEvents />
                </div>
            </div>

            {/* Testimonials Section with better context */}
            <div className="py-20 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4 text-slate-800">
                        Community Voices
                    </h2>
                    <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto mb-16">
                        Hear what our members have to say about their experience with Nepal Taekwondo Community
                    </p>
                    <Testimonial />
                </div>
            </div>


        </div>
    );
};

export default HomePage;