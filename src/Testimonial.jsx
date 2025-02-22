import React from "react";

export default function Testimonial() {
    return (


        <div className="py-16 px-4 bg-white">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold  mb-8">What Our Instructors Say</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <img
                            src="https://via.placeholder.com/150" // Replace with instructor's photo
                            alt="Instructor 1"
                            className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                        />
                        <blockquote className="text-xl italic mb-4">
                            "This platform has helped my students push their limits and achieve their goals faster than before!"
                        </blockquote>
                        <p className="text-lg font-bold">– John Smith, 5th Dan Black Belt</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <img
                            src="https://via.placeholder.com/150" // Replace with instructor's photo
                            alt="Instructor 2"
                            className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                        />
                        <blockquote className="text-xl italic mb-4">
                            "This platform makes training more interactive and keeps me connected with my students all over the world."
                        </blockquote>
                        <p className="text-lg font-bold">– Sarah Lee, 3rd Dan Black Belt</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                        <img
                            src="https://via.placeholder.com/150" // Replace with instructor's photo
                            alt="Instructor 3"
                            className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                        />
                        <blockquote className="text-xl italic mb-4">
                            "The personalized training plans and progress tracking have truly made a difference for my students."
                        </blockquote>
                        <p className="text-lg font-bold">– Mark Taylor, 4th Dan Black Belt</p>
                    </div>
                </div>

                {/* Optional Main Testimonial */}
                <div className="mt-16 text-center">
                    <blockquote className="text-2xl italic mb-4">
                        "This platform has transformed my Taekwondo journey. I’ve connected with amazing people and improved my skills faster than ever!"
                    </blockquote>
                    <p className="text-xl font-bold">– Jane Doe, 2nd Dan Black Belt</p>
                </div>
            </div>
        </div>
    )
}
