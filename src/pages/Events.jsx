import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// const EventCard = ({ event }) => {
//     // Use API data for available fields, fallback to static placeholders
//     return (
//         <div className="w-80 shadow-lg rounded-lg overflow-hidden bg-white">
//             <img
//                 src={event.imageUrl ? `http://localhost:9696/images/event/${event.imageUrl}` : "/image/default-event.jpg"}
//                 alt={event.title || "Event image"}
//                 className="h-60 w-full object-cover"
//             />
//             <div className="p-4">
//                 <h3 className="text-lg font-bold mb-2">
//                     {event.title || "Upcoming Taekwondo Event"}
//                 </h3>

//                 {/* Instructor tag - static placeholder */}
//                 <div className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mb-2">
//                     Instructor: Master Kim
//                 </div>

//                 <div className="flex items-center mt-2 text-gray-600">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//                     </svg>
//                     <span className="ml-1 text-sm">
//                         {event.location || "Main Training Hall"}
//                     </span>
//                 </div>

//                 <div className="flex items-center mt-1 text-gray-600">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
//                     </svg>
//                     <span className="ml-1 text-sm">
//                         {new Date(event.eventDate).toLocaleDateString('en-US', {
//                             year: 'numeric',
//                             month: 'short',
//                             day: 'numeric'
//                         })}
//                     </span>
//                 </div>

//                 <div className="flex items-center mt-1 text-gray-600">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
//                     </svg>
//                     <span className="ml-1 text-sm">
//                         {event.attendees || "100"} going
//                     </span>
//                 </div>

//                 <div className="mt-3 flex justify-between items-center">
//                     <span className="text-sm font-semibold text-red-500">
//                         {event.status === "PENDING" ? "Registration Open" : "Registration Closed"}
//                     </span>
//                     <button
//                         className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
//                         disabled={event.status !== "PENDING"}
//                     >
//                         {event.status === "PENDING" ? "Register" : "Closed"}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const EventCard = ({ event, onRegisterClick }) => {
//     const currentDate = new Date();
//     const eventEndDate = event.endDate ? new Date(event.endDate) : new Date(event.eventDate);
//     const registrationOpen = currentDate <= eventEndDate;

//     return (
//         <div className="w-80 shadow-lg rounded-lg overflow-hidden bg-white">
//             <img
//                 src={event.imageUrl ? `http://localhost:9696/images/event/${event.imageUrl}` : "/image/default-event.jpg"}
//                 alt={event.title || "Event image"}
//                 className="h-60 w-full object-cover"
//             />
//             <div className="p-4">
//                 <h3 className="text-lg font-bold mb-2">
//                     {event.title || "Upcoming Taekwondo Event"}
//                 </h3>

//                 <div className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mb-2">
//                     Instructor: Master Kim
//                 </div>

//                 <div className="flex items-center mt-2 text-gray-600">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//                     </svg>
//                     <span className="ml-1 text-sm">
//                         {event.location || "Main Training Hall"}
//                     </span>
//                 </div>

//                 <div className="flex items-center mt-1 text-gray-600">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
//                     </svg>
//                     <span className="ml-1 text-sm">
//                         {new Date(event.eventDate).toLocaleDateString('en-US', {
//                             year: 'numeric',
//                             month: 'short',
//                             day: 'numeric'
//                         })}
//                         {event.endDate && (
//                             <> to {new Date(event.endDate).toLocaleDateString('en-US', {
//                                 year: 'numeric',
//                                 month: 'short',
//                                 day: 'numeric'
//                             })}</>
//                         )}
//                     </span>
//                 </div>

//                 <div className="flex items-center mt-1 text-gray-600">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
//                     </svg>
//                     <span className="ml-1 text-sm">
//                         {event.registrations?.length || 0} going
//                     </span>
//                 </div>

//                 <div className="mt-3 flex justify-between items-center">
//                     <span className="text-sm font-semibold text-red-500">
//                         {registrationOpen ? "Registration Open" : "Registration Closed"}
//                     </span>
//                     <button
//                         className={`py-1 px-3 rounded text-sm ${registrationOpen ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
//                         disabled={!registrationOpen}
//                         onClick={() => onRegisterClick(event.eventId)}
//                     >
//                         {registrationOpen ? "Register" : "Closed"}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

const EventCard = ({ event, onRegisterClick }) => {
    const currentDate = new Date();
    const eventEndDate = event.endDate ? new Date(event.endDate) : new Date(event.eventDate);
    const registrationOpen = currentDate <= eventEndDate;

    // Format date with custom function for better control
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Determine status badge style
    const statusBadgeClass = registrationOpen
        ? "bg-green-100 text-green-800"
        : "bg-gray-100 text-gray-800";

    return (
        <div className="w-full sm:w-80 rounded-xl overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
                {/* Image with overlay gradient for better text contrast */}
                <img
                    src={event.imageUrl ? `http://localhost:9696/images/event/${event.imageUrl}` : "/image/default-event.jpg"}
                    alt={event.title || "Event image"}
                    className="h-52 w-full object-cover"
                />

                {/* Status badge positioned in top-right */}
                <div className={`absolute top-3 right-3 ${statusBadgeClass} px-3 py-1 rounded-full text-xs font-medium`}>
                    {registrationOpen ? "Registration Open" : "Registration Closed"}
                </div>
            </div>

            <div className="p-5">
                {/* Event title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {event.title || "Upcoming Taekwondo Event"}
                </h3>

                {/* Instructor badge */}
                <div className="flex items-center mb-3">
                    <div className="bg-red-50 text-red-700 text-xs px-2 py-1 rounded-full flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1z" />
                        </svg>
                        <span>Instructor: Master Kim</span>
                    </div>
                </div>

                {/* Info container */}
                <div className="space-y-2 mb-4">
                    {/* Location info */}
                    <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 text-sm">
                            {event.location || "Main Training Hall"}
                        </span>
                    </div>

                    {/* Date info */}
                    <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 text-sm">
                            {formatDate(event.eventDate)}
                            {event.endDate && (
                                <> to {formatDate(event.endDate)}</>
                            )}
                        </span>
                    </div>

                    {/* Attendees info */}
                    <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                        </svg>
                        <span className="ml-2 text-sm">
                            <strong>{event.registrations?.length || 0}</strong> participants registered
                        </span>
                    </div>
                </div>

                {/* Registration button - full width for better tap target */}
                <button
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${registrationOpen
                        ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                    disabled={!registrationOpen}
                    onClick={() => registrationOpen && onRegisterClick(event.eventId)}
                    aria-label={registrationOpen ? `Register for ${event.title || "event"}` : "Registration closed"}
                >
                    {registrationOpen ? "Register Now" : "Registration Closed"}
                </button>
            </div>
        </div>
    );
};


const Sidebar = () => (
    <div className="w-72 min-h-screen p-6 bg-gray-200 flex flex-col">
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search events"
            />
        </div>
        <div className="mt-4 flex-grow">
            <ul className="space-y-1">
                <li className="px-2 py-2 bg-blue-100 text-blue-800 rounded">
                    <a href="#" className="block">All Events</a>
                </li>
                <li className="border-t border-gray-300"></li>
                <li className="px-2 py-2 hover:bg-gray-100 rounded">
                    <a href="#" className="block">Tournaments</a>
                </li>
                <li className="border-t border-gray-300"></li>
                <li className="px-2 py-2 hover:bg-gray-100 rounded">
                    <a href="#" className="block">Workshops</a>
                </li>
            </ul>
        </div>
    </div>
);

// const Events = () => {
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 const response = await fetch('http://localhost:9696/events');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch events');
//                 }
//                 const data = await response.json();
//                 console.log(data)
//                 setEvents(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchEvents();
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex">
//                 <Sidebar />
//                 <div className="flex-grow p-6 flex items-center justify-center">
//                     <p>Loading events...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex">
//                 <Sidebar />
//                 <div className="flex-grow p-6 flex items-center justify-center">
//                     <p className="text-red-500">Error: {error}</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="flex">
//             <Sidebar />
//             <div className="flex flex-wrap gap-6 justify-center p-6">
//                 {events.map((event) => (
//                     <EventCard key={event.eventId} event={event} />
//                 ))}
//             </div>
//         </div>
//     );
// };


const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:9696/events');
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const data = await response.json();
                setEvents(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleRegisterClick = (eventId) => {
        navigate(`/events/${eventId}/register`);
    };

    if (loading) {
        return (
            <div className="flex">
                <Sidebar />
                <div className="flex-grow p-6 flex items-center justify-center">
                    <p>Loading events...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex">
                <Sidebar />
                <div className="flex-grow p-6 flex items-center justify-center">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-wrap gap-6 justify-center p-6">
                {events.map((event) => (
                    <EventCard
                        key={event.eventId}
                        event={event}
                        onRegisterClick={handleRegisterClick}
                    />
                ))}
            </div>
        </div>
    );
};


export default Events;