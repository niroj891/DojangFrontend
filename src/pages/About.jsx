export default function About() {
    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
            {/* Hero Section with subtle animation */}
            <div className="relative overflow-hidden bg-blue-700 text-white">
                {/* Background overlay for depth */}
                <div className="absolute inset-0 bg-black opacity-10"></div>

                {/* Decorative elements */}
                <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-600 rounded-full opacity-20"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-800 rounded-full opacity-20"></div>

                <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        About Dojang
                    </h1>
                    <div className="w-24 h-1 bg-white mx-auto mb-6 opacity-70"></div>
                    <p className="text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
                        A dedicated social platform built by and for martial artists
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Introduction */}
                <div className="mb-16 text-center">
                    <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                        Dojang is a unique social media platform built exclusively for martial artists.
                        We bring together Taekwondo practitioners and martial arts enthusiasts to share
                        their knowledge, techniques, and experiences in a dedicated space.
                    </p>
                </div>

                {/* Three Core Pillars */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                        <p className="text-gray-700">
                            To cultivate a strong, engaged martial arts community where members can learn,
                            grow, and support each other on their journey to mastery.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Core Features</h2>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                Exclusive martial arts video sharing
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                Interactive live chat & discussions
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                Leaderboards & rankings
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                Event creation & ticket sales
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                Support for athletes via donations
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Join Us?</h2>
                        <p className="text-gray-700">
                            Connect with top martial artists, improve your skills through expert guidance,
                            and stay updated on the latest events and trends in the martial arts world.
                        </p>
                    </div>
                </div>

                {/* Founders Section */}
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Founders</h2>
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                            Dojang was founded by passionate martial artists who believe in the power
                            of community-driven learning and skill development.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {founderProfiles.map((profile, index) => (
                            <div key={index} className="group">
                                <div className="bg-white rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                                    <div className="h-48 bg-gray-200 relative">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <img src={`/api/placeholder/300/300`} alt={profile.name} className="w-32 h-32 rounded-full object-cover border-4 border-white" />
                                        </div>
                                    </div>
                                    <div className="p-6 text-center">
                                        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-3">
                                            {profile.title}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{profile.name}</h3>
                                        <p className="text-gray-700">{profile.bio}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Be Part of the Dojang Community</h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Join us and contribute to a growing network of passionate martial artists.
                            Let's build a legacy together!
                        </p>
                        <button className="px-8 py-3 bg-white text-blue-700 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors duration-300 shadow-md">
                            Get Started
                        </button>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-800 text-white py-8 mt-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="text-gray-400">© {new Date().getFullYear()} Dojang. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}

// Sample data for founders
const founderProfiles = [
    {
        name: "Master Kim",
        title: "8th Dan Grand Master",
        bio: "Olympic gold medalist with over 30 years of teaching experience. Leading the vision for Dojang's training methodology."
    },
    {
        name: "Master Chen",
        title: "7th Dan Grand Master",
        bio: "International coach and judge with expertise in multiple martial arts styles. Oversees community standards and growth."
    },
    {
        name: "Sarah Johnson",
        title: "3rd Dan Taekwondo Black Belt",
        bio: "Former national champion and technology entrepreneur bringing innovation to martial arts education and community building."
    }
];