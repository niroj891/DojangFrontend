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
        <Box
            display="flex"
            minHeight="100vh"
            sx={{
                bgcolor: '#F5F7FA',
                fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif"
            }}
        >
            {/* Sidebar */}
            <Box
                width={300}
                p={3}
                display={{ xs: 'none', lg: 'block' }}
                sx={{ position: 'sticky', top: 0, height: '100vh' }}
            >
                <Box
                    bgcolor="background.paper"
                    borderRadius={3}
                    p={3}
                    boxShadow="0 4px 20px rgba(0,0,0,0.05)"
                    sx={{
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}
                >
                    <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                        <Box position="relative">
                            <Box
                                sx={{
                                    position: 'relative',
                                    borderRadius: '50%',
                                    padding: '4px',
                                    background: 'linear-gradient(45deg, #6366F1, #8B5CF6, #EC4899)',
                                }}
                            >
                                {renderProfileImage()}
                            </Box>
                            <IconButton
                                color="primary"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    bgcolor: '#4F46E5',
                                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                                    transition: 'all 0.2s ease-in-out',
                                    transform: 'scale(1)',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        bgcolor: '#4338CA'
                                    }
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
                        <Typography
                            variant="h6"
                            mt={2}
                            sx={{
                                fontWeight: 600,
                                background: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            {userInformation.firstName} {userInformation.lastName}
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2, opacity: 0.6 }} />

                    <Box display="flex" flexDirection="column" gap={1}>
                        {[
                            // { icon: <PeopleIcon />, text: "Friends" },
                            // { icon: <GroupIcon />, text: "Groups" },
                            // { icon: <VideoLibraryIcon />, text: "Watch" },
                            { icon: <EventIcon />, text: "Events", onClick: function () { navigate('/events') } },
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
                                borderRadius={2}
                                sx={{
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        bgcolor: 'rgba(99, 102, 241, 0.08)',
                                        transform: 'translateX(4px)'
                                    }
                                }}
                                onClick={item.onClick}
                            >
                                <Box
                                    sx={{
                                        color: '#6366F1',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {item.icon}
                                </Box>
                                <Typography sx={{ fontWeight: 500 }}>{item.text}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
                {/* Create Post Card */}
                <Card
                    sx={{
                        mb: 4,
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        bgcolor: 'white'
                    }}
                >
                    <CardContent sx={{ p: 0 }}>
                        <Box p={3}>
                            <Box display="flex" alignItems="center" gap={2} mb={2}>
                                <Avatar
                                    src={userInformation.image ? `http://localhost:9696/images/user/${userInformation.image}` : undefined}
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        bgcolor: 'primary.main',
                                        fontSize: '1.5rem',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                                    }}
                                >
                                    {!userInformation.image && (
                                        `${userInformation.firstName?.charAt(0)}${userInformation.lastName?.charAt(0)}`
                                    )}
                                </Avatar>
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
                                            borderRadius: '16px',
                                            backgroundColor: '#F5F7FA',
                                            '&:hover fieldset': {
                                                borderColor: '#E0E7FF',
                                            },
                                            '& fieldset': {
                                                borderColor: 'transparent'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#6366F1',
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            {selectedImage && (
                                <Box mt={2} position="relative">
                                    <img
                                        src={selectedImage}
                                        alt="Selected"
                                        style={{
                                            width: '100%',
                                            height: '300px',
                                            objectFit: 'cover',
                                            borderRadius: '12px'
                                        }}
                                    />
                                    <IconButton
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            bgcolor: 'rgba(0,0,0,0.6)',
                                            color: 'white',
                                            '&:hover': {
                                                bgcolor: 'rgba(0,0,0,0.8)'
                                            }
                                        }}
                                        onClick={() => {
                                            setSelectedImage(null);
                                            setImageFile(null);
                                        }}
                                    >
                                        <DeleteOutlineIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            )}

                            {selectedVideo && (
                                <Box mt={2} position="relative">
                                    <video
                                        src={selectedVideo}
                                        controls
                                        style={{
                                            width: '100%',
                                            height: '300px',
                                            objectFit: 'cover',
                                            borderRadius: '12px'
                                        }}
                                    />
                                    <IconButton
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            bgcolor: 'rgba(0,0,0,0.6)',
                                            color: 'white',
                                            '&:hover': {
                                                bgcolor: 'rgba(0,0,0,0.8)'
                                            }
                                        }}
                                        onClick={() => {
                                            setSelectedVideo(null);
                                            setVideoFile(null);
                                        }}
                                    >
                                        <DeleteOutlineIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            )}

                            {location && (
                                <Box
                                    mt={2}
                                    display="flex"
                                    alignItems="center"
                                    p={1.5}
                                    borderRadius={2}
                                    sx={{ bgcolor: 'rgba(59, 130, 246, 0.1)' }}
                                >
                                    <LocationOnIcon sx={{ color: '#3B82F6', mr: 1 }} />
                                    <Typography sx={{ color: '#1E40AF', fontWeight: 500 }}>
                                        {location}
                                    </Typography>
                                    <IconButton
                                        size="small"
                                        onClick={() => setLocation("")}
                                        sx={{ ml: 'auto' }}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>

                        <Divider sx={{ opacity: 0.6 }} />

                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            px={3}
                            py={2}
                        >
                            <Box display="flex" gap={1}>
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
                                        sx={{
                                            color: '#64748B',
                                            textTransform: 'none',
                                            fontWeight: 500,
                                            borderRadius: '12px',
                                            '&:hover': {
                                                bgcolor: 'rgba(100, 116, 139, 0.08)'
                                            }
                                        }}
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
                                        sx={{
                                            color: '#64748B',
                                            textTransform: 'none',
                                            fontWeight: 500,
                                            borderRadius: '12px',
                                            '&:hover': {
                                                bgcolor: 'rgba(100, 116, 139, 0.08)'
                                            }
                                        }}
                                    >
                                        Video
                                    </Button>
                                </label>
                            </Box>

                            <Button
                                variant="contained"
                                disabled={!postText && !selectedImage && !selectedVideo}
                                onClick={handlePost}
                                sx={{
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    bgcolor: '#6366F1',
                                    boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
                                    px: 3,
                                    '&:hover': {
                                        bgcolor: '#4F46E5',
                                        boxShadow: '0 6px 20px rgba(99, 102, 241, 0.6)',
                                    },
                                    '&.Mui-disabled': {
                                        bgcolor: 'rgba(99, 102, 241, 0.3)',
                                        color: 'white'
                                    }
                                }}
                            >
                                Post
                            </Button>
                        </Box>
                    </CardContent>
                </Card>

                {/* User Posts */}
                {postsLoading ? (
                    <Box display="flex" justifyContent="center" mt={8} mb={8}>
                        <CircularProgress sx={{ color: '#6366F1' }} />
                    </Box>
                ) : posts.length === 0 ? (
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        mt={8}
                        mb={8}
                        p={6}
                        borderRadius={4}
                        sx={{
                            bgcolor: 'white',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            maxWidth: '800px',  // Added this to make the width of box to samll size
                            mx: 'auto'  // Add this line to center the box
                        }}
                    >
                        <Box
                            sx={{
                                bgcolor: 'rgba(99, 102, 241, 0.1)',
                                borderRadius: '50%',
                                width: 100,
                                height: 100,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 3,
                                maxWidth: '800px',
                                mx: 'auto'
                            }}
                        >
                            <ChatBubbleOutlineIcon sx={{ fontSize: 50, color: '#6366F1' }} />
                        </Box>
                        <Typography variant="h5" fontWeight={600} color="#1F2937" mb={1}>
                            No posts yet
                        </Typography>
                        <Typography variant="body1" color="#64748B" textAlign="center">
                            Share your thoughts, photos, or videos to create your first post!
                        </Typography>
                    </Box>
                ) : (
                    posts.map((post) => (
                        <Card
                            key={post.id}
                            sx={{
                                mb: 4,
                                borderRadius: 4,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                overflow: 'hidden',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                                }
                            }}
                        >
                            <CardContent sx={{ p: 0 }}>
                                <Box p={3}>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Avatar
                                            src={post.user?.image ? `http://localhost:9696/images/user/${post.user.image}` : undefined}
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                bgcolor: 'primary.main',
                                                fontSize: '1.25rem',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                                            }}
                                        >
                                            {!post.user?.image && (
                                                `${post.user?.firstName?.charAt(0) || ""}${post.user?.lastName?.charAt(0) || ""}`
                                            )}
                                        </Avatar>
                                        <Box>
                                            <Typography fontWeight={600} color="#1F2937">
                                                {post.user?.firstName || "Unknown"} {post.user?.lastName || "User"}
                                            </Typography>
                                            <Box display="flex" alignItems="center" color="#6B7280" fontSize={13}>
                                                <Typography variant="caption">{formatDate(post.createdAt)}</Typography>
                                                {post.location && (
                                                    <>
                                                        <Box
                                                            component="span"
                                                            mx={1}
                                                            sx={{
                                                                width: '4px',
                                                                height: '4px',
                                                                borderRadius: '50%',
                                                                bgcolor: '#CBD5E1',
                                                                display: 'inline-block'
                                                            }}
                                                        />
                                                        <LocationOnIcon
                                                            fontSize="small"
                                                            sx={{ color: '#6B7280', mr: 0.5, fontSize: 14 }}
                                                        />
                                                        <Typography variant="caption">{post.location}</Typography>
                                                    </>
                                                )}
                                            </Box>
                                        </Box>
                                    </Box>

                                    {post.caption && (
                                        <Typography
                                            sx={{
                                                mt: 2.5,
                                                color: '#1F2937',
                                                lineHeight: 1.6
                                            }}
                                        >
                                            {post.caption}
                                        </Typography>
                                    )}

                                    {post.image && (
                                        <Box mt={2.5}>
                                            <img
                                                src={`http://localhost:9696/images/post/${post.image}`}
                                                alt="Post"
                                                style={{
                                                    width: '100%',
                                                    maxHeight: '500px',
                                                    objectFit: 'cover',
                                                    borderRadius: '16px'
                                                }}
                                            />
                                        </Box>
                                    )}

                                    {post.video && (
                                        <Box mt={2.5}>
                                            <video
                                                src={`http://localhost:9696/videos/post/${post.video}`}
                                                controls
                                                style={{
                                                    width: '100%',
                                                    maxHeight: '500px',
                                                    objectFit: 'cover',
                                                    borderRadius: '16px'
                                                }}
                                            />
                                        </Box>
                                    )}
                                </Box>

                                <Box
                                    px={3}
                                    py={1.5}
                                    display="flex"
                                    alignItems="center"
                                    color="#6B7280"
                                    fontSize={14}
                                >
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        sx={{
                                            bgcolor: 'rgba(99, 102, 241, 0.08)',
                                            borderRadius: '16px',
                                            px: 1.5,
                                            py: 0.5
                                        }}
                                    >
                                        <ThumbUpIcon sx={{ fontSize: 16, color: post.likedByRequser ? '#6366F1' : '#9CA3AF', mr: 0.5 }} />
                                        <Typography variant="caption" sx={{ color: post.likedByRequser ? '#6366F1' : '#6B7280', fontWeight: 500 }}>
                                            {post.liked?.length || 0}
                                        </Typography>
                                    </Box>

                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        sx={{
                                            bgcolor: 'rgba(99, 102, 241, 0.08)',
                                            borderRadius: '16px',
                                            px: 1.5,
                                            py: 0.5,
                                            ml: 1.5
                                        }}
                                    >
                                        <ChatBubbleOutlineIcon sx={{ fontSize: 16, color: '#9CA3AF', mr: 0.5 }} />
                                        <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 500 }}>
                                            {post.comments?.length || 0}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Divider sx={{ opacity: 0.6 }} />

                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    sx={{ bgcolor: 'rgba(249, 250, 251, 0.8)' }}
                                >
                                    <Button
                                        startIcon={<ThumbUpIcon />}
                                        onClick={() => handleLike(post.id)}
                                        sx={{
                                            flex: 1,
                                            py: 1.5,
                                            color: post.likedByRequser ? '#6366F1' : '#64748B',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            borderRadius: 0,
                                            '&:hover': {
                                                bgcolor: 'rgba(99, 102, 241, 0.08)'
                                            }
                                        }}
                                    >
                                        Like
                                    </Button>
                                    <Divider orientation="vertical" flexItem sx={{ opacity: 0.6 }} />
                                    <Button
                                        startIcon={<ChatBubbleOutlineIcon />}
                                        onClick={() => handleOpenComments(post.id, post.comments)}
                                        sx={{
                                            flex: 1,
                                            py: 1.5,
                                            color: '#64748B',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            borderRadius: 0,
                                            '&:hover': {
                                                bgcolor: 'rgba(99, 102, 241, 0.08)'
                                            }
                                        }}
                                    >
                                        Comment
                                    </Button>
                                </Box>
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
                        width: { xs: '90%', sm: 480 },
                        bgcolor: 'background.paper',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        borderRadius: '24px',
                        p: 0,
                        maxHeight: '80vh',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            p={3}
                            borderBottom="1px solid rgba(0,0,0,0.06)"
                        >
                            <Typography
                                id="comments-modal-title"
                                variant="h6"
                                fontWeight={600}
                                sx={{
                                    background: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                            >
                                Comments
                            </Typography>
                            <IconButton
                                onClick={handleCloseComments}
                                size="small"
                                sx={{
                                    bgcolor: 'rgba(99, 102, 241, 0.1)',
                                    '&:hover': {
                                        bgcolor: 'rgba(99, 102, 241, 0.2)'
                                    }
                                }}
                            >
                                <CloseIcon sx={{ fontSize: 18, color: '#6366F1' }} />
                            </IconButton>
                        </Box>

                        <Box sx={{ overflowY: 'auto', p: 3, flex: 1 }}>
                            <List sx={{ width: '100%', bgcolor: 'background.paper', padding: 0 }}>
                                {currentPostComments.length > 0 ? (
                                    currentPostComments.map((comment, index) => (
                                        <ListItem
                                            key={index}
                                            alignItems="flex-start"
                                            sx={{
                                                px: 0,
                                                pb: 2,
                                                mb: 2,
                                                borderBottom: index !== currentPostComments.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none'
                                            }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt="User"
                                                    src="https://randomuser.me/api/portraits/men/1.jpg"
                                                    sx={{
                                                        width: 42,
                                                        height: 42,
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                                    }}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography
                                                        component="span"
                                                        variant="subtitle2"
                                                        fontWeight={600}
                                                        color="#1F2937"
                                                    >
                                                        {comment.fullName || "Anonymous"}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="#4B5563"
                                                        sx={{
                                                            display: 'block',
                                                            mt: 0.5,
                                                            lineHeight: 1.6
                                                        }}
                                                    >
                                                        {comment.content}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                    ))
                                ) : (
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        justifyContent="center"
                                        py={8}
                                    >
                                        <Box
                                            sx={{
                                                bgcolor: 'rgba(99, 102, 241, 0.1)',
                                                borderRadius: '50%',
                                                width: 80,
                                                height: 80,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mb: 3
                                            }}
                                        >
                                            <ChatBubbleOutlineIcon sx={{ fontSize: 40, color: '#6366F1' }} />
                                        </Box>
                                        <Typography variant="h6" fontWeight={600} color="#1F2937" mb={1}>
                                            No comments yet
                                        </Typography>
                                        <Typography variant="body2" color="#64748B" textAlign="center">
                                            Be the first to share your thoughts!
                                        </Typography>
                                    </Box>
                                )}
                            </List>
                        </Box>

                        <Box
                            p={3}
                            borderTop="1px solid rgba(0,0,0,0.06)"
                            bgcolor="#F9FAFB"
                        >
                            <Box display="flex" alignItems="center" gap={2}>
                                <Avatar
                                    src={userInformation.image ? `http://localhost:9696/images/user/${userInformation.image}` : undefined}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        bgcolor: 'primary.main',
                                        fontSize: '1rem'
                                    }}
                                >
                                    {!userInformation.image && (
                                        `${userInformation.firstName?.charAt(0)}${userInformation.lastName?.charAt(0)}`
                                    )}
                                </Avatar>
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
                                            '& fieldset': {
                                                borderColor: 'rgba(0,0,0,0.06)'
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#E0E7FF'
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#6366F1'
                                            }
                                        }
                                    }}
                                />
                                <IconButton
                                    color="primary"
                                    onClick={handleAddComment}
                                    disabled={!commentText.trim()}
                                    sx={{
                                        bgcolor: commentText.trim() ? '#6366F1' : 'rgba(99, 102, 241, 0.4)',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: commentText.trim() ? '#4F46E5' : 'rgba(99, 102, 241, 0.4)'
                                        },
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <SendIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
};

export default Profile;