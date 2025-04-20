import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Event, LocationOn } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpcomingEvents() {
    const [upcomingEvents, setUpcomingEvents] = useState(null);
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    useEffect(() => {
        async function fetchUpcomingEvents() {
            const response = await axios.get("http://localhost:9696/events/active")
            setUpcomingEvents(response.data)
        }

        fetchUpcomingEvents();
    }, [])

    if (!upcomingEvents) {
        return (
            <div className="flex justify-center items-center h-64 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-4"></div>
                    <p className="text-gray-200 font-medium">Loading events...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-8 bg-gradient-to-br from-gray-700 to-gray-600 rounded-2xl shadow-2xl my-12 border border-gray-600/40">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10">
                {/* Left Section - Title */}
                <div className="lg:w-1/3 text-center lg:text-left mb-8 lg:mb-0">
                    <div className="inline-block mb-4 px-3 py-1 bg-red-600/20 text-red-400 text-sm font-semibold rounded-full">Tournaments</div>
                    <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Upcoming Events</h2>
                    <p className="text-gray-300 text-lg mb-6">Stay updated with the latest martial arts tournaments and competitions worldwide.</p>
                    <button
                        onClick={() => navigate("/events")}
                        className="group relative px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 font-medium shadow-lg hover:shadow-red-600/30 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center">
                            View All Events
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    </button>
                </div>

                {/* Right Section - Slider */}
                <div className="w-full lg:w-2/3">
                    <Slider {...settings} className="event-slider">
                        {upcomingEvents.map((event, index) => (
                            <div key={index} className="p-3">
                                <div className="relative overflow-hidden group rounded-xl shadow-2xl h-72 border border-gray-700/50 bg-gray-800/50">
                                    <img
                                        src={`http://localhost:9696/images/event/${event.imageUrl}`}
                                        alt={event.title}
                                        className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90"></div>
                                    <div className="absolute top-3 right-3">
                                        <span className="bg-red-600/90 text-white text-xs font-bold px-3 py-1 rounded-full">New</span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                                        <h3 className="text-xl font-bold mb-3 line-clamp-1">{event.title}</h3>
                                        <div className="flex items-center mb-2 text-sm">
                                            <Event fontSize="small" className="mr-2 text-red-400" />
                                            <span className="text-gray-200">{event.endDate.split('T')[0]}</span>
                                        </div>

                                        <div className="flex items-center text-sm mb-4">
                                            <LocationOn fontSize="small" className="mr-2 text-red-400" />
                                            <span className="text-gray-200 line-clamp-1">{event.location}</span>
                                        </div>
                                        <button
                                            onClick={() => navigate("/events")}
                                            className="w-full px-4 py-2.5 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center group"
                                        >
                                            View Details
                                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default UpcomingEvents;