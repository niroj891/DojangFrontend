
export default function Contact() {
    return (
        <div className="bg-gray-100 min-h-screen py-12 px-6 md:px-16 lg:px-32">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Have any questions or suggestions? Feel free to reach out to us. We’d love to hear from you!
                </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Name</label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your name" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Message</label>
                        <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="5" placeholder="Type your message here"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">Send Message</button>
                </form>
            </div>
        </div>
    );
}
