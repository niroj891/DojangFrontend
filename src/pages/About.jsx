export default function About() {
    return (
        <div className="bg-gray-100 min-h-screen py-12 px-6 md:px-16 lg:px-32">
            <div className="max-w-5xl mx-auto text-center">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">About Dojang</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Dojang is a unique social media platform built exclusively for martial artists. We bring together Taekwondo practitioners
                    and martial arts enthusiasts to share their knowledge, techniques, and experiences in a dedicated space.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">Our Mission</h2>
                    <p className="text-gray-700">
                        To cultivate a strong, engaged martial arts community where members can learn, grow, and support each other.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">Core Features</h2>
                    <ul className="text-gray-700 list-disc list-inside">
                        <li>Exclusive martial arts video sharing</li>
                        <li>Interactive live chat & discussions</li>
                        <li>Leaderboards & rankings</li>
                        <li>Event creation & ticket sales</li>
                        <li>Donation-based support for athletes</li>
                        <li>Personalized training plans</li>
                        <li>Expert mentorship programs</li>
                        <li>Martial arts gear marketplace</li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">Why Join Us?</h2>
                    <p className="text-gray-700">
                        Connect with top martial artists, improve your skills, and stay updated on the latest events and trends in the martial arts world.
                    </p>
                </div>
            </div>

            <div className="text-center mt-12">
                <h2 className="text-3xl font-semibold text-gray-900">Meet Our Founders</h2>
                <p className="text-gray-700 mt-3">
                    Dojang was founded by passionate martial artists who believe in the power of community-driven learning. Our team consists of
                    experienced instructors, tournament champions, and dedicated enthusiasts committed to making this platform a success.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">8th Dan Grand Master</h2>
                    <p className="text-gray-700">
                        Connect with top martial artists, improve your skills, and stay updated on the latest events and trends in the martial arts world.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">7th Dan Grand Master</h2>
                    <p className="text-gray-700">
                        Connect with top martial artists, improve your skills, and stay updated on the latest events and trends in the martial arts world.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">3rd Dan Taekwondo Black belt</h2>
                    <p className="text-gray-700">
                        Connect with top martial artists, improve your skills, and stay updated on the latest events and trends in the martial arts world.
                    </p>
                </div>
            </div>

            <div className="text-center mt-12">
                <h2 className="text-3xl font-semibold text-gray-900">Be Part of the Dojang Community</h2>
                <p className="text-gray-700 mt-3">
                    Join us and contribute to a growing network of passionate martial artists. Let’s build a legacy together!
                </p>
                <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Get Started
                </button>
            </div>
        </div>
    );
}
