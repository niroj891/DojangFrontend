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
            <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading events...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg my-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
                {/* Left Section - Title */}
                <div className="lg:w-1/3 text-center lg:text-left mb-6 lg:mb-0">
                    <h2 className="text-4xl font-bold text-gray-800 mb-3">Upcoming Events</h2>
                    <p className="text-gray-600 text-lg">Stay updated with the latest martial arts tournaments</p>
                    <button
                        onClick={() => navigate("/events")}
                        className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md"
                    >
                        View All Events
                    </button>
                </div>

                {/* Right Section - Slider */}
                <div className="w-full lg:w-2/3">
                    <Slider {...settings} className="event-slider">
                        {upcomingEvents.map((event, index) => (
                            <div key={index} className="p-2">
                                <div className="relative overflow-hidden group rounded-lg shadow-lg h-64 border border-gray-200">
                                    <img
                                        src={`http://localhost:9696/images/event/${event.imageUrl}`}
                                        alt={event.title}
                                        className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                                    <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                        <div className="flex items-center mb-2 text-sm">
                                            <Event fontSize="small" className="mr-2 text-red-400" />
                                            <span>{event.endDate}</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <LocationOn fontSize="small" className="mr-2 text-red-400" />
                                            <span>{event.location}</span>
                                        </div>
                                        <button
                                            onClick={() => navigate("/events")}
                                            className="mt-3 px-4 py-2 bg-white text-red-600 rounded-md hover:bg-gray-100 transition-colors text-sm font-medium w-full"
                                        >
                                            View Details
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