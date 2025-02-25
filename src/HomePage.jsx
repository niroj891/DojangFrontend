import React from 'react';
import Testimonial from './Testimonial';
import UpcomingEvents from './pages/UpcomingEvents';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-screen flex flex-col items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: "url('/image/TaekwondoRegister.jpg')" }}>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-slate-600 opacity-70"></div>

                {/* Content */}
                <div className="relative z-10 text-center px-4">
                    <img src="/image/Taekwondo logo.png" alt="USATKD Logo" className="mx-auto mb-6 w-32 sm:w-40 md:w-48 rounded-full" />
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">Unite, Train, and Grow with Nepal Taekwondo Community</h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-white mt-2">NEPAL TAEKWONDO ATHLETES</p>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                            UPCOMING EVENTS
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition duration-300">
                            JOIN DOJANG
                            <span>🔗</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20 px-4 bg-slate-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">Why Join Dojang?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature Cards */}
                        {[
                            { title: "Connect Worldwide", description: "Find training partners, mentors, and friends across the globe." },
                            { title: "Learn", description: "Access tutorials, training plans, and track your progress." },
                            { title: "Compete & Showcase", description: "Participate in virtual tournaments and share your achievements." },
                            { title: "Leaderboard", description: "Climb the ranks and showcase your skills in the community." },
                            { title: "Learn from Masters", description: "Watch exclusive tutorials and attend live webinars." },
                            { title: "Community Events", description: "Join workshops, seminars, and local meetups." },
                        ].map((feature, index) => (
                            <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer">
                                <h3 className="text-2xl font-bold mb-4 text-slate-800">{feature.title}</h3>
                                <p className="text-slate-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Upcoming Events */}
            <div>
                <UpcomingEvents />
            </div>

            {/* Testimonials Section */}
            <Testimonial />
        </div>

    );
};

export default HomePage;