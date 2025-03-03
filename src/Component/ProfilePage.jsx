import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user profile data
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/users/{userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile</h2>
            <div className="flex items-center mb-4">
                <img
                    src={user.profilePicture || "/image/default-avatar.png"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border"
                />
                <div className="ml-4">
                    <h3 className="text-xl font-semibold">{user.firstName} {user.lastName}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-gray-600">{user.phoneNumber}</p>
                </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Edit Profile</button>
        </div>
    );
};

export default ProfilePage;
