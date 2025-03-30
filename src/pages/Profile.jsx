import React from "react";
import { Avatar, Card, CardContent, Button, Divider } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import PeopleIcon from "@mui/icons-material/People";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import ChatIcon from '@mui/icons-material/Chat';






const Profile = () => {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Left Sidebar */}
            <div className="w-1/4 p-5 hidden lg:block">
                <div className="bg-white rounded-lg shadow-md p-5">
                    <Avatar
                        src="https://randomuser.me/api/portraits/men/1.jpg"
                        sx={{ width: 56, height: 56 }}
                    />
                    <p className="mt-2 font-semibold text-lg">John Doe</p>
                    <Divider className="my-4" />
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded">
                            <PeopleIcon className="text-blue-500" />
                            <p>Friends</p>
                        </div>
                        <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded">
                            <GroupIcon className="text-blue-500" />
                            <p>Groups</p>
                        </div>
                        <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded">
                            <VideoLibraryIcon className="text-blue-500" />
                            <p>Watch</p>
                        </div>
                        <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded">
                            <EventIcon className="text-blue-500" />
                            <p>Events</p>
                        </div>
                        <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded">
                            <ChatIcon className="text-blue-500" />
                            <p>Chat</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile;