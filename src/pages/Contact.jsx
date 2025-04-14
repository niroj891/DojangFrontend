import React, { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: '',
        privacyAgreed: false
    });
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!formData.privacyAgreed) {
            setSubmissionStatus('Please accept the Privacy Policy');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:9696/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.text();
            setSubmissionStatus('Message sent successfully!');

            // Clear form on successful submission
            setFormData({
                fullName: '',
                email: '',
                subject: '',
                message: '',
                privacyAgreed: false
            });
        } catch (error) {
            setSubmissionStatus('Error sending message: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white min-h-screen py-12 px-6 md:px-16 lg:px-32 flex flex-col lg:flex-row gap-12">

            {/* Left Section - Contact Information */}
            <div className="lg:w-1/2 space-y-6">
                <h1 className="text-4xl font-bold text-gray-900">Get in Touch</h1>
                <p className="text-lg text-gray-700">
                    We'd love to hear from you. Here's how you can reach us.
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
                {submissionStatus && (
                    <div className={`mb-4 p-3 rounded-lg ${submissionStatus.includes('successfully') ?
                            'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {submissionStatus}
                    </div>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Full name"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Email address"
                            required
                        />
                    </div>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Subject"
                        required
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="5"
                        placeholder="Your message"
                        required
                    ></textarea>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="privacy"
                            name="privacyAgreed"
                            checked={formData.privacyAgreed}
                            onChange={handleChange}
                            className="w-4 h-4"
                            required
                        />
                        <label htmlFor="privacy" className="text-gray-700">
                            I accept the <a href="#" className="text-blue-600 font-medium">Privacy Policy</a> of this site.
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
}