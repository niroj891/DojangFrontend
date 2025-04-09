import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaTimes, FaCalendarAlt, FaImage, FaMapMarkerAlt } from 'react-icons/fa';

export default function Events() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        location: '',
        endDate: '',
        imageFile: null
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Get all events when page loads
    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await axios.get("http://localhost:9696/instructor/event", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                });
                setEvents(response.data);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            }
        }
        fetchEvents();
    }, []);

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
            // Format the date properly for Spring Boot
            const formattedDate = new Date(newEvent.endDate)

            // Create form data
            const formData = new FormData();
            formData.append('title', newEvent.title);
            formData.append('description', newEvent.description);
            formData.append('location', newEvent.location);
            formData.append('endDate', formattedDate);
            if (newEvent.imageFile) {
                formData.append('imageFile', newEvent.imageFile);
            }

            // Send to backend
            const response = await axios.post(
                "http://localhost:9696/instructor/event",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            );

            // Refresh events list
            const updatedEvents = await axios.get("http://localhost:9696/instructor/event", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            });
            setEvents(updatedEvents.data);

            // Close modal and reset form
            setIsModalOpen(false);
            setNewEvent({
                title: '',
                description: '',
                location: '',
                endDate: '',
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

    return (
        <div className="p-4">
            {/* Add Event Button */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Events</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add New Event
                </button>
            </div>

            {/* Events List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map(event => (
                    <div key={event.eventId} className="border rounded-lg p-4 shadow">
                        <h3 className="font-bold text-lg">{event.title}</h3>
                        <p className="text-gray-600 my-2">{event.description}</p>
                        <p className="flex items-center text-gray-600">
                            <FaMapMarkerAlt className="mr-1" /> {event.location}
                        </p>
                        <p className="text-gray-600">
                            Ends: {new Date(event.endDate).toLocaleString()}
                        </p>
                        {event.imageUrl && (
                            <img
                                src={`http://localhost:9696/files/images/event/${event.imageUrl}`}
                                alt="Event"
                                className="mt-2 w-full h-40 object-cover rounded"
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Add Event Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg w-full max-w-md">
                        <div className="flex justify-between items-center border-b p-4">
                            <h2 className="text-xl font-bold">Add New Event</h2>
                            <button onClick={() => setIsModalOpen(false)}>
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <div>
                                <label className="block mb-1">Title*</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newEvent.title}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1">Description*</label>
                                <textarea
                                    name="description"
                                    value={newEvent.description}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1">Location*</label>
                                <div className="flex items-center">
                                    <FaMapMarkerAlt className="mr-2 text-gray-400" />
                                    <input
                                        type="text"
                                        name="location"
                                        value={newEvent.location}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-1">End Date & Time*</label>
                                <div className="flex items-center">
                                    <FaCalendarAlt className="mr-2 text-gray-400" />
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={newEvent.endDate}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-1">Event Image</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full p-2 border rounded"
                                    accept="image/*"
                                />
                                {previewImage && (
                                    <img src={previewImage} alt="Preview" className="mt-2 h-32 object-contain" />
                                )}
                            </div>

                            <div className="flex justify-end space-x-2 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border rounded"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Saving...' : 'Save Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}