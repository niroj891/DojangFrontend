import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Avatar,
    Divider,
    CircularProgress,
    IconButton,
    Typography,
    Box,
    Card,
    CardContent,
    Button,
    TextField,
    Modal,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@mui/material";
import {
    People as PeopleIcon,
    Group as GroupIcon,
    VideoLibrary as VideoLibraryIcon,
    Event as EventIcon,
    Chat as ChatIcon,
    ExitToApp as ExitToAppIcon,
    Edit as EditIcon,
    ThumbUp as ThumbUpIcon,
    ChatBubbleOutline as ChatBubbleOutlineIcon,
    Image as ImageIcon,
    Videocam as VideocamIcon,
    LocationOn as LocationOnIcon,
    Send as SendIcon,
    Close as CloseIcon,
    DeleteOutline as DeleteOutlineIcon
} from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { isLogin, userInformationSelector } from "../../recoil/user";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
    const navigate = useNavigate();
    const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(isLogin);
    const [userInformation, setUserInformation] = useRecoilState(userInformationSelector);
    const [loading, setLoading] = useState(false);
    const [postsLoading, setPostsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [postText, setPostText] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [location, setLocation] = useState("");
    const [openComments, setOpenComments] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);
    const [commentText, setCommentText] = useState("");
    const [currentPostComments, setCurrentPostComments] = useState([]);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchUserPosts();
    }, []);

    const fetchUserPosts = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const response = await axios.get('http://localhost:9696/api/posts/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPosts(response.data);
            setPostsLoading(false);
        } catch (err) {
            console.error("Error fetching user posts:", err);
            setPostsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        setIsUserLoggedIn(false);
        navigate('/login');
    };

    const handleProfileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            toast.error("Image size must be less than 5MB");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('profileImage', file);

        try {
            const response = await axios.put(
                `http://localhost:9696/api/users/change-profile`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            );

            setUserInformation(prev => ({
                ...prev,
                image: response.data.imagePath
            }));

            toast.success("Profile image updated successfully");
        } catch (error) {
            console.error("Error updating profile image:", error);
            toast.error(error.response?.data?.message || "Failed to update profile image");
        } finally {
            setLoading(false);
            e.target.value = ''; // Reset file input
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

            await axios.post('http://localhost:9696/api/posts', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Refresh posts after successful creation
            fetchUserPosts();

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
            await axios.put(`http://localhost:9696/api/posts/like/${postId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Refresh posts after successful like
            fetchUserPosts();
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
            fetchUserPosts();
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const renderProfileImage = () => {
        if (userInformation.image) {
            return (
                <Avatar
                    src={`http://localhost:9696/images/user/${userInformation.image}`}
                    sx={{ width: 120, height: 120 }}
                />
            );
        }
        return (
            <Avatar
                sx={{
                    width: 120,
                    height: 120,
                    bgcolor: 'primary.main',
                    fontSize: '3rem'
                }}
            >
                {userInformation.firstName?.charAt(0)}{userInformation.lastName?.charAt(0)}
            </Avatar>
        );
    };

    return (
        <Box display="flex" minHeight="100vh" bgcolor="background.default">
            {/* Sidebar */}
            <Box width={300} p={3} display={{ xs: 'none', lg: 'block' }}>
                <Box bgcolor="background.paper" borderRadius={2} p={3} boxShadow={1}>
                    <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                        <Box position="relative">
                            {renderProfileImage()}
                            <IconButton
                                color="primary"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    bgcolor: 'primary.main',
                                    '&:hover': { bgcolor: 'primary.dark' }
                                }}
                                onClick={() => fileInputRef.current.click()}
                                disabled={loading}
                            >
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    <EditIcon sx={{ color: 'common.white' }} />
                                )}
                            </IconButton>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleProfileChange}
                                accept="image/*"
                            />
                        </Box>
                        <Typography variant="h6" mt={2}>
                            {userInformation.firstName} {userInformation.lastName}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box display="flex" flexDirection="column" gap={1}>
                        {[
                            { icon: <PeopleIcon />, text: "Friends" },
                            { icon: <GroupIcon />, text: "Groups" },
                            { icon: <VideoLibraryIcon />, text: "Watch" },
                            { icon: <EventIcon />, text: "Events" },
                            { icon: <ChatIcon />, text: "Chat" },
                            {
                                icon: <ExitToAppIcon />,
                                text: "Logout",
                                onClick: handleLogout
                            }
                        ].map((item, index) => (
                            <Box
                                key={index}
                                display="flex"
                                alignItems="center"
                                gap={2}
                                p={1.5}
                                borderRadius={1}
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': { bgcolor: 'action.hover' }
                                }}
                                onClick={item.onClick}
                            >
                                {item.icon}
                                <Typography>{item.text}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Main Content */}
            <Box flex={1} p={3}>
                {/* Create Post Card */}
                <Card className="mb-6 shadow-sm border border-gray-100 rounded-xl overflow-hidden">
                    <CardContent className="p-0">
                        <div className="p-4">
                            <div className="flex items-center space-x-3 mb-4">
                                {renderProfileImage()}
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

                {/* User Posts */}
                {postsLoading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : posts.length === 0 ? (
                    <Box textAlign="center" mt={4}>
                        <Typography variant="h6" color="textSecondary">
                            No posts yet. Create your first post!
                        </Typography>
                    </Box>
                ) : (
                    posts.map((post) => (
                        <Card key={post.id} className="mb-6 shadow-sm border border-gray-100 rounded-xl overflow-hidden">
                            <CardContent className="p-0">
                                <div className="p-4">
                                    <div className="flex items-center space-x-3">
                                        {renderProfileImage()}
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
                    ))
                )}

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
                                {renderProfileImage()}
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
            </Box>
        </Box>
    );
};

export default Profile;