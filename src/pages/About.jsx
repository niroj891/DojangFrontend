export default function About() {
    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
            {/* Hero Section with subtle Taekwondo-themed background */}
            <div className="relative overflow-hidden bg-slate-800 text-white">
                {/* Background pattern overlay - modern interpretation of traditional Korean pattern */}
                <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZiI+PC9yZWN0Pgo8cGF0aCBkPSJNMzAgMzBMMTUgMTVoMzB6IiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+CjxwYXRoIGQ9Ik0zMCAzMEwxNSA0NWgzMHoiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD4KPHBhdGggZD0iTTMwIDMwTDQ1IDE1djMweiIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPgo8cGF0aCBkPSJNMzAgMzBMMTUgMTV2MzB6IiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+Cjwvc3ZnPg==')]"></div>

                {/* Decorative elements - subtle accent colors */}
                <div className="absolute -top-16 -left-16 w-64 h-64 bg-amber-400 rounded-full opacity-10"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-slate-700 rounded-full opacity-10"></div>

                <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative z-10">
                    <div className="flex flex-col md:flex-row items-center">
                        {/* Taekwondo icon */}
                        <div className="mb-8 md:mb-0 md:mr-12">
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-amber-400 rounded-full flex items-center justify-center shadow-lg" >
                                <img
                                    src="/image/Taekwondo logo.png"
                                    alt="Dojang Logo"
                                    className="w-24 h-24 object-contain rounded-full"
                                />
                            </div>
                        </div>

                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                                About <span className="text-amber-400">Dojang</span>
                            </h1>
                            <div className="w-24 h-1 bg-amber-400 mb-6 mx-auto md:mx-0"></div>
                            <p className="text-xl md:text-2xl max-w-2xl font-light leading-relaxed">
                                A dedicated social platform for Taekwondo
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                {/* Introduction with subtle background */}
                <div className="mb-20 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-amber-100 to-slate-200 transform -skew-y-2 rounded-lg opacity-50"></div>
                    <div className="relative p-8 md:p-12 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-700 mb-6">Our Philosophy</h2>
                        <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                            Dojang is a unique platform built exclusively for martial artists.
                            We bring together Taekwondo practitioners and martial arts enthusiasts to share
                            their knowledge, techniques, and experiences in a dedicated space that honors
                            the traditions while developing the Taekwondo condition in Nepal.
                        </p>
                    </div>
                </div>

                {/* Three Core Pillars */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 transform hover:-translate-y-1 hover:border-amber-300">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-700 mb-4 text-center">Our Mission</h2>
                        <p className="text-gray-700">
                            To cultivate a strong, engaged martial arts community where players can learn,
                            grow, and support each other on their journey to mastery through the traditions of Taekwondo.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 transform hover:-translate-y-1 hover:border-slate-300">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-amber-600 mb-4 text-center">Core Features</h2>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-center">
                                <span className="w-2 h-6 bg-gradient-to-b from-slate-500 to-amber-500 rounded-full mr-3"></span>
                                Exclusive martial arts video sharing
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-6 bg-gradient-to-b from-slate-500 to-amber-500 rounded-full mr-3"></span>
                                Interactive live chat & discussions
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-6 bg-gradient-to-b from-slate-500 to-amber-500 rounded-full mr-3"></span>
                                Leaderboards & rankings
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-6 bg-gradient-to-b from-slate-500 to-amber-500 rounded-full mr-3"></span>
                                Event creation & ticket sales
                            </li>
                            <li className="flex items-center">
                                <span className="w-2 h-6 bg-gradient-to-b from-slate-500 to-amber-500 rounded-full mr-3"></span>
                                Support for athletes via donations
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 transform hover:-translate-y-1 hover:border-amber-300">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-700 mb-4 text-center">Why Join Us?</h2>
                        <p className="text-gray-700">
                            Connect with top martial artists, improve your skills through expert guidance,
                            and stay updated on the latest events and trends in the Taekwondo world while
                            honoring the traditions and discipline of martial arts.
                        </p>
                    </div>
                </div>

                {/* Founders Section with belt-style design */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-700 mb-2">Meet Our Founders</h2>
                        <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                            Dojang was founded by passionate martial artists who believe in the power
                            of community-driven learning and skill development.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {founderProfiles.map((profile, index) => (
                            <div key={index} className="group">
                                <div className="bg-white rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
                                    {/* Belt color stripe at top */}
                                    <div className="h-2 bg-gradient-to-r from-slate-600 via-amber-500 to-slate-600"></div>

                                    <div className="h-52 bg-gray-100 relative">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                                <img src={profile.img} alt={profile.name} className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 text-center">
                                        <div className={`inline-block px-4 py-1 ${index === 0 ? 'bg-slate-100 text-slate-700' :
                                            index === 1 ? 'bg-amber-100 text-amber-700' :
                                                'bg-slate-100 text-slate-700'
                                            } rounded-full text-sm font-medium mb-3`}>
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

                {/* Call to Action with modern design elements */}
                <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-xl">
                    {/* Pattern-inspired decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZiI+PC9yZWN0Pgo8cGF0aCBkPSJNMzAgMzBMMTUgMTVoMzB6IiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+CjxwYXRoIGQ9Ik0zMCAzMEwxNSA0NWgzMHoiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD4KPHBhdGggZD0iTTMwIDMwTDQ1IDE1djMweiIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPgo8cGF0aCBkPSJNMzAgMzBMMTUgMTV2MzB6IiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+Cjwvc3ZnPg==')]"></div>

                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500 rounded-full opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Be Part of the <span className="text-amber-300">Dojang</span> Community</h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Join us and contribute to a growing network of passionate martial artists.
                            Let's build a legacy together!
                        </p>
                        <button className="px-8 py-3 bg-amber-500 text-slate-800 rounded-lg font-medium text-lg hover:bg-amber-400 transition-colors duration-300 shadow-md transform hover:scale-105">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer with belt design */}
            <div className="mt-20">
                {/* Belt stripe design */}
                <div className="h-6 bg-gradient-to-r from-slate-700 via-amber-500 to-slate-700"></div>
            </div>
        </div>
    );
}

// Sample data for founders
const founderProfiles = [
    {
        name: "Niroj Panta",
        title: "3rd Dan Master",
        bio: "National gold medalist with over 5 years of teaching experience. Leading the vision for Dojang's training methodology.",
    },
    {
        name: "Master Norbu",
        title: "7th Dan Grand Master",
        bio: "International coach Refree and judge with expertise in multiple martial arts styles. Oversees community standards and growth.",
        img: "/image/IMG_0157.JPG"
    },
    {
        name: "Aayesha Shakya",
        title: "5th Dan Taekwondo Black Belt",
        bio: "Former South-Asian champion and technology entrepreneur bringing innovation to martial arts education and community building.",
        img: "/image/IMG_0158.JPG"
    }
];