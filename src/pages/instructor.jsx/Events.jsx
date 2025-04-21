import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaTimes, FaCalendarAlt, FaMapMarkerAlt, FaEdit, FaTrash, FaClock } from 'react-icons/fa';

export default function Events() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        location: '',
        endDate: '',
        imageFile: null,
        eventDate: '',
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(6); // Number of events per page

    // Check if event is closed
    const isEventClosed = (endDate) => {
        return new Date(endDate) < new Date();
    };

    // Get all events when page loads
    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await axios.get("http://localhost:9696/instructor/event", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                });
                // Sort events by creation date (newest first)
                console.log(response.data)
                const sortedEvents = [...response.data].sort((a, b) =>
                    new Date(b.eventDate || b.endDate) - new Date(a.eventDate || a.endDate)
                );
                setEvents(sortedEvents);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        }
        fetchEvents();
    }, []);

    // Get current events
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent(prev => ({ ...prev, [name]: value }));
    };

    // Handle file upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewEvent(prev => ({ ...prev, imageFile: file }));

            // Show preview
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Submit new event
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', newEvent.title);
            formData.append('description', newEvent.description);
            formData.append('location', newEvent.location);
            formData.append('endDate', new Date(newEvent.endDate));
            formData.append('eventDate', new Date(newEvent.eventDate))
            if (newEvent.imageFile) {
                formData.append('imageFile', newEvent.imageFile);
            }

            await axios.post(
                "http://localhost:9696/instructor/event",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            );

            const updatedEvents = await axios.get("http://localhost:9696/instructor/event", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            });
            // Sort events by creation date (newest first)
            const sortedEvents = [...updatedEvents.data].sort((a, b) =>
                new Date(b.createdAt || b.endDate) - new Date(a.createdAt || a.endDate)
            );
            setEvents(sortedEvents);

            setIsModalOpen(false);
            setNewEvent({
                title: '',
                description: '',
                location: '',
                endDate: '',
                eventDate: '',
                imageFile: null
            });
            setPreviewImage(null);

            alert("Event created successfully!");

        } catch (error) {
            console.error("Error creating event:", error);
            alert("Failed to create event. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Open edit modal with event data
    const handleEditClick = (event) => {
        setCurrentEvent(event);
        setNewEvent({
            title: event.title,
            description: event.description,
            location: event.location,
            endDate: event.endDate ? event.endDate.split('T')[0] : '',
            eventDate: event.eventDate ? event.eventDate.split('T')[0] : '',
            imageFile: null
        });
        if (event.imageUrl) {
            setPreviewImage(`http://localhost:9696/files/images/event/${event.imageUrl}`);
        }
        setIsEditModalOpen(true);
    };

    // Update event
    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', newEvent.title);
            formData.append('description', newEvent.description);
            formData.append('location', newEvent.location);
            formData.append('endDate', new Date(newEvent.endDate));
            formData.append('eventDate', new Date(newEvent.eventDate));
            if (newEvent.imageFile) {
                formData.append('imageFile', newEvent.imageFile);
            }

            await axios.put(
                `http://localhost:9696/instructor/event/${currentEvent.eventId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            );

            const updatedEvents = await axios.get("http://localhost:9696/instructor/event", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            });
            // Sort events by creation date (newest first)
            const sortedEvents = [...updatedEvents.data].sort((a, b) =>
                new Date(b.createdAt || b.endDate) - new Date(a.createdAt || a.endDate)
            );
            setEvents(sortedEvents);

            setIsEditModalOpen(false);
            setCurrentEvent(null);
            setNewEvent({
                title: '',
                description: '',
                location: '',
                endDate: '',
                eventDate: '',
                imageFile: null
            });
            setPreviewImage(null);

            alert("Event updated successfully!");

        } catch (error) {
            console.error("Error updating event:", error);
            alert("Failed to update event. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Delete event
    const handleDelete = async (eventId) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                await axios.delete(`http://localhost:9696/instructor/event/${eventId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                });

                const updatedEvents = await axios.get("http://localhost:9696/instructor/event", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                });
                // Sort events by creation date (newest first)
                const sortedEvents = [...updatedEvents.data].sort((a, b) =>
                    new Date(b.createdAt || b.endDate) - new Date(a.createdAt || a.endDate)
                );
                setEvents(sortedEvents);

                alert("Event deleted successfully!");
            } catch (error) {
                console.error("Error deleting event:", error);
                alert("Failed to delete event. Please try again.");
            }
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            {/* Add Event Button */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
                <h1 className="text-2xl font-bold text-gray-800">Events Management</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
                >
                    <span>Add New Event</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Events List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentEvents.length > 0 ? (
                    currentEvents.map(event => {
                        const closed = isEventClosed(event.endDate);
                        return (
                            <div key={event.eventId} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
                                {event.imageUrl ? (
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={`http://localhost:9696/files/images/event/${event.imageUrl}`}
                                            alt={event.title}
                                            className="w-full h-48 object-cover transition-transform hover:scale-105"
                                        />

                                    </div>
                                ) : (
                                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">No Image Available</span>
                                    </div>
                                )}
                                <div className="p-5">
                                    <h3 className="font-bold text-xl mb-2 text-gray-800">{event.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>

                                    <div className="space-y-3 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <FaMapMarkerAlt className="mr-2 text-blue-500" />
                                            <span>{event.location}</span>
                                        </div>
                                        {event.eventDate && (
                                            <div className="flex items-center">
                                                <FaClock className="mr-2 text-green-500" />
                                                <span>Starts: {event.eventDate ? event.eventDate.split('T')[0] : "No date specified"}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center">
                                            <FaCalendarAlt className="mr-2 text-red-500" />
                                            <span>Ends : {event.endDate ? event.endDate.split('T')[0] : 'No date specified'}</span>
                                        </div>
                                    </div>

                                    {/* Edit and Delete buttons shown for all events */}
                                    <div className="flex justify-end space-x-2 mt-4">
                                        <button
                                            onClick={() => handleEditClick(event)}
                                            className="px-3 py-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors flex items-center"
                                        >
                                            <FaEdit className="mr-1" /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event.eventId)}
                                            className="px-3 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors flex items-center"
                                        >
                                            <FaTrash className="mr-1" /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-3 p-8 text-center">
                        <p className="text-gray-500 text-lg">No events found. Click "Add New Event" to create one.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {events.length > eventsPerPage && (
                <div className="flex justify-center mt-8">
                    <nav className="inline-flex rounded-md shadow-sm">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        {Array.from({ length: Math.ceil(events.length / eventsPerPage) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`px-4 py-2 border-t border-b border-gray-300 text-sm font-medium ${currentPage === index + 1 ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(events.length / eventsPerPage)))}
                            disabled={currentPage === Math.ceil(events.length / eventsPerPage)}
                            className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </nav>
                </div>
            )}

            {/* Add Event Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
                        <div className="flex justify-between items-center border-b p-4 bg-gray-50 rounded-t-lg">
                            <h2 className="text-xl font-bold text-gray-800">Add New Event</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-5 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newEvent.title}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                                <textarea
                                    name="description"
                                    value={newEvent.description}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    rows="3"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                                <div className="flex items-center">
                                    <FaMapMarkerAlt className="mr-2 text-gray-400" />
                                    <input
                                        type="text"
                                        name="location"
                                        value={newEvent.location}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <div className="flex items-center">
                                    <FaCalendarAlt className="mr-2 text-gray-400" />
                                    <input
                                        type="date"
                                        name="eventDate"
                                        value={newEvent.eventDate}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date*</label>
                                <div className="flex items-center">
                                    <FaCalendarAlt className="mr-2 text-gray-400" />
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={newEvent.endDate}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    accept="image/*"
                                />
                                {previewImage && (
                                    <div className="mt-2 border rounded-md p-2">
                                        <img src={previewImage} alt="Preview" className="h-32 w-full object-contain rounded" />
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end space-x-2 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Saving...' : 'Save Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Event Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
                        <div className="flex justify-between items-center border-b p-4 bg-gray-50 rounded-t-lg">
                            <h2 className="text-xl font-bold text-gray-800">Edit Event</h2>
                            <button
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                    setCurrentEvent(null);
                                    setNewEvent({
                                        title: '',
                                        description: '',
                                        location: '',
                                        endDate: '',
                                        eventDate: '',
                                        imageFile: null
                                    });
                                    setPreviewImage(null);
                                }}
                                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="p-5 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newEvent.title}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                                <textarea
                                    name="description"
                                    value={newEvent.description}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    rows="3"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                                <div className="flex items-center">
                                    <FaMapMarkerAlt className="mr-2 text-gray-400" />
                                    <input
                                        type="text"
                                        name="location"
                                        value={newEvent.location}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date*</label>
                                <div className="flex items-center">
                                    <FaClock className="mr-2 text-gray-400" />
                                    <input
                                        type="date"
                                        name="eventDate"
                                        value={newEvent.eventDate}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date*</label>
                                <div className="flex items-center">
                                    <FaCalendarAlt className="mr-2 text-gray-400" />
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={newEvent.endDate}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    accept="image/*"
                                />
                                {previewImage && (
                                    <div className="mt-2 border rounded-md p-2">
                                        <img src={previewImage} alt="Preview" className="h-32 w-full object-contain rounded" />
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end space-x-2 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditModalOpen(false);
                                        setCurrentEvent(null);
                                        setNewEvent({
                                            title: '',
                                            description: '',
                                            location: '',
                                            endDate: '',
                                            eventDate: '',
                                            imageFile: null
                                        });
                                        setPreviewImage(null);
                                    }}
                                    className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Updating...' : 'Update Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}