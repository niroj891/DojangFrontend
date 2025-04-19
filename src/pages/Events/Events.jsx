import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event, onRegisterClick }) => {
    const currentDate = new Date();
    const eventEndDate = event.endDate ? new Date(event.endDate) : new Date(event.eventDate);
    const registrationOpen = currentDate <= eventEndDate;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const statusBadgeClass = registrationOpen
        ? "bg-green-100 text-green-800"
        : "bg-gray-100 text-gray-800";

    return (
        <div className="w-full sm:w-72 rounded-xl overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
                <img
                    src={event.imageUrl ? `http://localhost:9696/images/event/${event.imageUrl}` : "/image/default-event.jpg"}
                    alt={event.title || "Event image"}
                    className="h-52 w-full object-cover"
                />

                <div className={`absolute top-3 right-3 ${statusBadgeClass} px-3 py-1 rounded-full text-xs font-medium`}>
                    {registrationOpen ? "Registration Open" : "Registration Closed"}
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {event.title || "Upcoming Taekwondo Event"}
                </h3>

                <div className="flex items-center mb-3">
                    <div className="bg-red-50 text-red-700 text-xs px-2 py-1 rounded-full flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1z" />
                        </svg>
                        <span>Instructor: Master Kim</span>
                    </div>
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 text-sm">
                            {event.location || "Kathmandu"}
                        </span>
                    </div>

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

                    <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                        </svg>
                        <span className="ml-2 text-sm">
                            <strong>{event.registrations?.length || 0}</strong> participants registered
                        </span>
                    </div>
                </div>

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

const Sidebar = ({ filter, setFilter }) => (
    <div className="w-80 min-h-screen p-6 bg-gray-50 border-r border-gray-200 flex flex-col">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Event Filters</h2>

        <div className="mt-4 flex-grow">
            <ul className="space-y-2">
                <li className={`px-4 py-3 rounded-lg font-medium cursor-pointer ${filter === 'all' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
                    onClick={() => setFilter('all')}>
                    <div className="block flex items-center">
                        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        All Events
                    </div>
                </li>

                <li className={`px-4 py-3 rounded-lg font-medium cursor-pointer ${filter === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
                    onClick={() => setFilter('upcoming')}>
                    <div className="block flex items-center">
                        <svg className="w-5 h-5 mr-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        Upcoming Events
                    </div>
                </li>

                <li className={`px-4 py-3 rounded-lg font-medium cursor-pointer ${filter === 'past' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
                    onClick={() => setFilter('past')}>
                    <div className="block flex items-center">
                        <svg className="w-5 h-5 mr-3 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                        Past Events
                    </div>
                </li>
            </ul>
        </div>
    </div>
);

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(8); // Number of events per page
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:9696/events');
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const data = await response.json();
                // Sort events by creation date (newest first)
                const sortedEvents = [...data].sort((a, b) => new Date(b.createdAt || b.eventDate) - new Date(a.createdAt || a.eventDate));
                setEvents(sortedEvents);
                setFilteredEvents(sortedEvents);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const currentDate = new Date();

        if (filter === 'all') {
            setFilteredEvents(events);
        } else if (filter === 'upcoming') {
            setFilteredEvents(events.filter(event => {
                const eventEndDate = event.endDate ? new Date(event.endDate) : new Date(event.eventDate);
                return currentDate <= eventEndDate;
            }));
        } else if (filter === 'past') {
            setFilteredEvents(events.filter(event => {
                const eventEndDate = event.endDate ? new Date(event.endDate) : new Date(event.eventDate);
                return currentDate > eventEndDate;
            }));
        }
        setCurrentPage(1); // Reset to first page when filter changes
    }, [filter, events]);

    // Get current events
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleRegisterClick = (eventId) => {
        navigate(`/events/${eventId}/register`);
    };

    if (loading) {
        return (
            <div className="flex">
                <Sidebar filter={filter} setFilter={setFilter} />
                <div className="flex-grow p-6 flex items-center justify-center">
                    <CircularProgress></CircularProgress>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex">
                <Sidebar filter={filter} setFilter={setFilter} />
                <div className="flex-grow p-6 flex items-center justify-center">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex">
            <Sidebar filter={filter} setFilter={setFilter} />
            <div className="flex-grow p-8 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentEvents.map((event) => (
                        <EventCard
                            key={event.eventId}
                            event={event}
                            onRegisterClick={handleRegisterClick}
                        />
                    ))}
                </div>

                {/* Pagination */}
                {filteredEvents.length > eventsPerPage && (
                    <div className="flex justify-center mt-8">
                        <nav className="inline-flex rounded-md shadow">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            {Array.from({ length: Math.ceil(filteredEvents.length / eventsPerPage) }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium ${currentPage === index + 1 ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredEvents.length / eventsPerPage)))}
                                disabled={currentPage === Math.ceil(filteredEvents.length / eventsPerPage)}
                                className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;