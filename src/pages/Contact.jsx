export default function Contact() {
    return (
        <div className="bg-white min-h-screen py-12 px-6 md:px-16 lg:px-32 flex flex-col lg:flex-row gap-12">

            {/* Left Section - Contact Information */}
            <div className="lg:w-1/2 space-y-6">
                <h1 className="text-4xl font-bold text-gray-900">Get in Touch</h1>
                <p className="text-lg text-gray-700">
                    We’d love to hear from you. Here’s how you can reach us.
                </p>

                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Visit our office</h2>
                    <p className="text-blue-600 font-medium">
                        Dojang
                    </p>
                    <p>Kalanki-14 kathmandu,Bagmati | Nepal</p>
                    <p>Email: <a href="mailto:info@dojangtaekwondo.org" className="text-blue-600">info@dojangtaekwondo.org</a></p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-gray-900">CEO</h2>
                    <p className="text-blue-600 font-medium">Mr. Niroj Prasad Panta</p>
                    <p>Tel. +977 9087865456</p>
                    <p>Fax. +977 9800007676</p>
                    <p>Email: <a href="mailto:info@dojangtaekwondo.org" className="text-blue-600">info@dojangtaekwondo.org</a></p>
                </div>
            </div>

            {/* Right Section - Contact Form */}
            <div className="lg:w-1/2 bg-white p-6 rounded-2xl shadow-lg">

                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Send a message</h2>
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Full name" />
                        <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email address" />
                    </div>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Subject" />
                    <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="5" placeholder="Your message"></textarea>

                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="privacy" className="w-4 h-4" />
                        <label htmlFor="privacy" className="text-gray-700">I accept the <a href="#" className="text-blue-600 font-medium">Privacy Policy</a> of this site.</label>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">Send Message</button>
                </form>
            </div>
        </div>
    );
}
