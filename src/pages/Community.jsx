import React from "react";
import { Avatar, Card, CardContent, Button, Divider } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import PeopleIcon from "@mui/icons-material/People";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";

const Community = () => {
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
                    </div>
                </div>
            </div>

            {/* Middle Feed Section */}
            <div className="w-full lg:w-2/4 p-5">
                {/* Post Card 1 */}
                <Card className="mb-5 shadow-lg">
                    <CardContent>
                        <div className="flex items-center space-x-3">
                            <Avatar src="https://randomuser.me/api/portraits/women/1.jpg" />
                            <div>
                                <p className="font-semibold">Sarah Smith</p>
                                <p className="text-gray-500 text-sm">2 hrs ago</p>
                            </div>
                        </div>
                        <p className="mt-3">
                            Had an amazing day at the beach! 🌊☀️ #Vacation #Relaxing
                        </p>
                        <img
                            src="https://source.unsplash.com/600x300/?beach"
                            alt="Post"
                            className="mt-3 rounded-lg"
                        />
                        <Divider className="my-3" />
                        <div className="flex justify-around text-gray-600">
                            <Button startIcon={<ThumbUpIcon />}>Like</Button>
                            <Button startIcon={<ChatBubbleOutlineIcon />}>Comment</Button>
                            <Button startIcon={<ShareIcon />}>Share</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Post Card 2 */}
                <Card className="mb-5 shadow-lg">
                    <CardContent>
                        <div className="flex items-center space-x-3">
                            <Avatar src="https://randomuser.me/api/portraits/men/2.jpg" />
                            <div>
                                <p className="font-semibold">Michael Brown</p>
                                <p className="text-gray-500 text-sm">5 hrs ago</p>
                            </div>
                        </div>
                        <p className="mt-3">Just finished my first marathon! 🏃‍♂️💨</p>
                        <img
                            src="https://source.unsplash.com/600x300/?running"
                            alt="Post"
                            className="mt-3 rounded-lg"
                        />
                        <Divider className="my-3" />
                        <div className="flex justify-around text-gray-600">
                            <Button startIcon={<ThumbUpIcon />}>Like</Button>
                            <Button startIcon={<ChatBubbleOutlineIcon />}>Comment</Button>
                            <Button startIcon={<ShareIcon />}>Share</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Sidebar */}
            <div className="w-1/4 p-5 hidden lg:block">
                <div className="bg-white rounded-lg shadow-md p-5">
                    <h3 className="text-lg font-semibold">Friend Suggestions</h3>
                    <div className="flex items-center space-x-3 mt-3">
                        <Avatar src="https://randomuser.me/api/portraits/women/3.jpg" />
                        <div>
                            <p className="font-semibold">Emily Johnson</p>
                            <Button size="small" variant="contained" className="mt-1">
                                Add Friend
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 mt-3">
                        <Avatar src="https://randomuser.me/api/portraits/men/4.jpg" />
                        <div>
                            <p className="font-semibold">James Wilson</p>
                            <Button size="small" variant="contained" className="mt-1">
                                Add Friend
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-5 mt-5">
                    <h3 className="text-lg font-semibold">Trending Topics</h3>
                    <p className="text-blue-600 mt-2 cursor-pointer hover:underline">
                        #TechNews
                    </p>
                    <p className="text-blue-600 mt-2 cursor-pointer hover:underline">
                        #FitnessGoals
                    </p>
                    <p className="text-blue-600 mt-2 cursor-pointer hover:underline">
                        #GamingCommunity
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Community;
