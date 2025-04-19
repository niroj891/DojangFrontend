import React, { useState, useEffect } from "react";
import {
    Avatar,
    Card,
    CardContent,
    Button,
    Divider,
    TextField,
    IconButton,
    Box,
    Typography,
    Modal,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';

const Community = () => {
    const [postText, setPostText] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [location, setLocation] = useState("");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openComments, setOpenComments] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);
    const [commentText, setCommentText] = useState("");
    const [currentPostComments, setCurrentPostComments] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.get('http://localhost:9696/api/posts', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPosts(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImageFile(file);
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleVideoChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setVideoFile(file);
            setSelectedVideo(URL.createObjectURL(file));
        }
    };

    const handlePost = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const formData = new FormData();
            formData.append('caption', postText);

            if (imageFile) {
                formData.append('imageFile', imageFile);
            }

            if (videoFile) {
                formData.append('videoFile', videoFile);
            }

            if (location) {
                formData.append('location', location);
            }

            const response = await axios.post('http://localhost:9696/api/posts', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Refresh posts after successful creation
            fetchPosts();

            // Reset form
            setPostText("");
            setSelectedImage(null);
            setSelectedVideo(null);
            setImageFile(null);
            setVideoFile(null);
            setLocation("");
        } catch (err) {
            console.error("Error creating post:", err);
        }
    };

    const handleLike = async (postId) => {
        try {
            const token = localStorage.getItem('jwt');
            await axios.post(`http://localhost:9696/api/posts/${postId}/like`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Refresh posts after successful like
            fetchPosts();
        } catch (err) {
            console.error("Error liking post:", err);
        }
    };

    const handleOpenComments = (postId, comments) => {
        setCurrentPostId(postId);
        setCurrentPostComments(comments || []);
        setOpenComments(true);
    };

    const handleCloseComments = () => {
        setOpenComments(false);
        setCurrentPostId(null);
        setCurrentPostComments([]);
        setCommentText("");
    };

    const handleAddComment = async () => {
        if (!commentText.trim() || !currentPostId) return;

        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.post(
                `http://localhost:9696/api/comments/${currentPostId}`,
                { content: commentText },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            setCurrentPostComments([...currentPostComments, response.data]);
            setCommentText("");

            // Refresh posts to update comment count
            fetchPosts();
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-pulse text-blue-600 font-semibold text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-red-50 p-4 rounded-lg shadow-md border border-red-200">
                    <h3 className="text-red-500 font-medium">Error</h3>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* Left Sidebar */}
            <div className="w-1/4 p-5 hidden lg:block">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-5">
                    <div className="flex flex-col items-center">
                        <Avatar
                            src="https://randomuser.me/api/portraits/men/1.jpg"
                            sx={{ width: 70, height: 70 }}
                        />
                        <p className="mt-3 font-bold text-lg">John Doe</p>
                        <p className="text-gray-500 text-sm">@johndoe</p>
                    </div>

                    <Divider className="my-4" />

                    <div className="space-y-2">
                        <Button
                            startIcon={<PeopleIcon />}
                            fullWidth
                            variant="text"
                            className="justify-start normal-case text-gray-700 hover:bg-blue-50 hover:text-blue-600 py-2"
                        >
                            Friends
                        </Button>
                        <Button
                            startIcon={<ChatIcon />}
                            fullWidth
                            variant="text"
                            className="justify-start normal-case text-gray-700 hover:bg-blue-50 hover:text-blue-600 py-2"
                        >
                            Messages
                        </Button>
                    </div>
                </div>
            </div>

            {/* Middle Feed Section */}
            <div className="w-full lg:w-3/4 p-5 max-w-3xl mx-auto">
                {/* Create Post Card */}
                <Card className="mb-6 shadow-sm border border-gray-100 rounded-xl overflow-hidden">
                    <CardContent className="p-0">
                        <div className="p-4">
                            <div className="flex items-center space-x-3 mb-4">
                                <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />
                                <TextField
                                    fullWidth
                                    placeholder="What's on your mind?"
                                    variant="outlined"
                                    value={postText}
                                    onChange={(e) => setPostText(e.target.value)}
                                    multiline
                                    rows={2}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            backgroundColor: '#f5f7fa',
                                            '&:hover fieldset': {
                                                borderColor: '#e0e7ff',
                                            },
                                        }
                                    }}
                                />
                            </div>

                            {selectedImage && (
                                <div className="mt-3 relative">
                                    <img
                                        src={selectedImage}
                                        alt="Selected"
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <IconButton
                                        size="small"
                                        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70"
                                        onClick={() => {
                                            setSelectedImage(null);
                                            setImageFile(null);
                                        }}
                                    >
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </div>
                            )}

                            {selectedVideo && (
                                <div className="mt-3 relative">
                                    <video
                                        src={selectedVideo}
                                        controls
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <IconButton
                                        size="small"
                                        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white hover:bg-black hover:bg-opacity-70"
                                        onClick={() => {
                                            setSelectedVideo(null);
                                            setVideoFile(null);
                                        }}
                                    >
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </div>
                            )}

                            {location && (
                                <div className="flex items-center mt-2 bg-blue-50 p-2 rounded-lg">
                                    <LocationOnIcon className="text-blue-500 mr-2" />
                                    <p className="text-blue-700">{location}</p>
                                    <IconButton
                                        size="small"
                                        color="default"
                                        onClick={() => setLocation("")}
                                        className="ml-auto"
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </div>
                            )}
                        </div>

                        <Divider />

                        <div className="flex justify-between items-center px-4 py-2">
                            <div className="flex space-x-1">
                                <input
                                    accept="image/*"
                                    id="image-input"
                                    type="file"
                                    hidden
                                    onChange={handleImageChange}
                                />
                                <label htmlFor="image-input">
                                    <Button
                                        startIcon={<ImageIcon />}
                                        component="span"
                                        variant="text"
                                        className="text-gray-600 normal-case"
                                    >
                                        Photo
                                    </Button>
                                </label>

                                <input
                                    accept="video/*"
                                    id="video-input"
                                    type="file"
                                    hidden
                                    onChange={handleVideoChange}
                                />
                                <label htmlFor="video-input">
                                    <Button
                                        startIcon={<VideocamIcon />}
                                        component="span"
                                        variant="text"
                                        className="text-gray-600 normal-case"
                                    >
                                        Video
                                    </Button>
                                </label>

                                <Button
                                    startIcon={<LocationOnIcon />}
                                    variant="text"
                                    className="text-gray-600 normal-case"
                                    onClick={() => setLocation("New Location")}
                                >
                                    Location
                                </Button>
                            </div>

                            <Button
                                variant="contained"
                                disabled={!postText && !selectedImage && !selectedVideo}
                                onClick={handlePost}
                                sx={{
                                    borderRadius: '20px',
                                    textTransform: 'none',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                    }
                                }}
                            >
                                Post
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Posts List */}
                {posts.map((post) => (
                    <Card key={post.id} className="mb-6 shadow-sm border border-gray-100 rounded-xl overflow-hidden">
                        <CardContent className="p-0">
                            <div className="p-4">
                                <div className="flex items-center space-x-3">
                                    <Avatar src={post.user?.image || "https://randomuser.me/api/portraits/men/1.jpg"} />
                                    <div>
                                        <p className="font-semibold">
                                            {post.user?.firstName || "Unknown"} {post.user?.lastName || "User"}
                                        </p>
                                        <div className="flex items-center text-gray-500 text-xs">
                                            <p>{formatDate(post.createdAt)}</p>
                                            {post.location && (
                                                <>
                                                    <span className="mx-1">•</span>
                                                    <LocationOnIcon fontSize="small" className="text-gray-500 mr-1" style={{ fontSize: '14px' }} />
                                                    <span>{post.location}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {post.caption && (
                                    <p className="mt-3 text-gray-800">{post.caption}</p>
                                )}

                                {post.image && (
                                    <div className="mt-3">
                                        <img
                                            src={`http://localhost:9696/images/post/${post.image}`}
                                            alt="Post"
                                            className="rounded-lg w-full object-cover"
                                            style={{ maxHeight: '500px' }}
                                        />
                                    </div>
                                )}

                                {post.video && (
                                    <div className="mt-3">
                                        <video
                                            src={`http://localhost:9696/videos/post/${post.video}`}
                                            controls
                                            className="rounded-lg w-full object-cover"
                                            style={{ maxHeight: '500px' }}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="px-4 py-1 flex items-center text-sm text-gray-500">
                                <span>{post.liked?.length || 0} likes</span>
                                <span className="mx-2">•</span>
                                <span>{post.comments?.length || 0} comments</span>
                            </div>

                            <Divider />

                            <div className="flex justify-around text-gray-600">
                                <Button
                                    startIcon={<ThumbUpIcon />}
                                    onClick={() => handleLike(post.id)}
                                    color={post.likedByRequser ? "primary" : "inherit"}
                                    className="flex-1 rounded-none py-2"
                                    sx={{ textTransform: 'none' }}
                                >
                                    Like
                                </Button>
                                <Divider orientation="vertical" flexItem />
                                <Button
                                    startIcon={<ChatBubbleOutlineIcon />}
                                    onClick={() => handleOpenComments(post.id, post.comments)}
                                    className="flex-1 rounded-none py-2"
                                    sx={{ textTransform: 'none' }}
                                >
                                    Comment
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Comments Modal */}
            <Modal
                open={openComments}
                onClose={handleCloseComments}
                aria-labelledby="comments-modal-title"
                aria-describedby="comments-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: 450 },
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: '16px',
                    p: 0,
                    maxHeight: '80vh',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div className="flex justify-between items-center p-4 border-b">
                        <Typography id="comments-modal-title" variant="h6" component="h2" className="font-semibold">
                            Comments
                        </Typography>
                        <IconButton onClick={handleCloseComments} size="small" className="hover:bg-gray-100">
                            <CloseIcon />
                        </IconButton>
                    </div>

                    <div className="overflow-y-auto p-4 flex-1">
                        <List sx={{ width: '100%', bgcolor: 'background.paper', padding: 0 }}>
                            {currentPostComments.length > 0 ? (
                                currentPostComments.map((comment, index) => (
                                    <ListItem key={index} alignItems="flex-start" sx={{ px: 0 }}>
                                        <ListItemAvatar>
                                            <Avatar alt="User" src="https://randomuser.me/api/portraits/men/1.jpg" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography component="span" variant="body2" color="text.primary" fontWeight="medium">
                                                    {comment.fullName || "NO NAME"}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography component="span" variant="body1" color="text.primary" sx={{ display: 'block', mt: 0.5 }}>
                                                    {comment.content}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                                    <ChatBubbleOutlineIcon sx={{ fontSize: 50, mb: 2, color: '#e0e0e0' }} />
                                    <Typography variant="body1" color="text.secondary">
                                        No comments yet
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="mt-1">
                                        Be the first to comment!
                                    </Typography>
                                </div>
                            )}
                        </List>
                    </div>

                    <div className="p-3 border-t bg-gray-50">
                        <div className="flex items-center">
                            <Avatar
                                src="https://randomuser.me/api/portraits/men/1.jpg"
                                sx={{ width: 32, height: 32, mr: 1 }}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Write a comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleAddComment();
                                    }
                                }}
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '20px',
                                        backgroundColor: 'white',
                                    }
                                }}
                            />
                            <IconButton
                                color="primary"
                                onClick={handleAddComment}
                                disabled={!commentText.trim()}
                                sx={{ ml: 1 }}
                            >
                                <SendIcon />
                            </IconButton>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Community;