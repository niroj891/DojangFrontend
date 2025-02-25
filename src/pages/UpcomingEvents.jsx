import React from "react";
import Slider from "react-slick";
import { Event, LocationOn } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const upcomingEvents = [
    {
        title: "5th Everest International Taekwondo Championship",
        date: "22 Feb - 23 Feb 2025",
        location: "Rastriya kavard Hall",
        image: "/image/Champ.jpg",
    },
    {
        title: "1st Indo Nepal International Taekwondo Championship",
        date: "1 Mar - 2 Mar 2025",
        location: "Mulpani",
        image: "/image/Taekwondo-Chapionships.jpg",
    },
    {
        title: "3rd Mount Everest Taekwondo Championship",
        date: "3 Mar 2025",
        location: "Koteshor",
        image: "/image/IntChamp.jpg",
    },
    {
        title: "10th Kathmandu Taekwondo Championships - G2",
        date: "8 Mar - 9 Mar 2025",
        location: "Kathmandu",
        image: "/image/IndoNepalChamp.jpg",
    },
];

const UpcomingEvents = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };

    return (
        <div className="flex items-center justify-between max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* Left Section - Title */}
            <div className="w-1/3">
                <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
                <p className="text-gray-600 mt-2">Stay updated with the latest martial arts tournaments</p>
            </div>

            {/* Right Section - Slider */}
            <div className="w-2/3">
                <Slider {...settings}>
                    {upcomingEvents.map((event, index) => (
                        <div key={index} className="p-4">
                            <div className="relative">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-56 object-cover rounded-lg shadow-md"
                                />
                                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 p-4 rounded-b-lg text-white">
                                    <h3 className="text-lg font-semibold">{event.title}</h3>
                                    <div className="flex items-center mt-1 text-sm">
                                        <Event fontSize="small" className="mr-1" />
                                        {event.date}
                                    </div>
                                    <div className="flex items-center mt-1 text-sm">
                                        <LocationOn fontSize="small" className="mr-1" />
                                        {event.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default UpcomingEvents;
