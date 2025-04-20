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
    ListItemText,
    InputAdornment,
    CircularProgress
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
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const Community = () => {
    const [postText, setPostText] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [location, setLocation] = useState("");
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openComments, setOpenComments] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);
    const [commentText, setCommentText] = useState("");
    const [currentPostComments, setCurrentPostComments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.trim() === "") {
                setFilteredPosts(posts);
            } else {
                handleSearch();
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, posts]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('jwt');
            const response = await axios.get('http://localhost:9696/api/posts', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPosts(response.data);
            setFilteredPosts(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            setFilteredPosts(posts);
            return;
        }

        try {
            setSearchLoading(true);
            const token = localStorage.getItem('jwt');
            const response = await axios.get(`http://localhost:9696/api/posts/search?name=${searchQuery}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setFilteredPosts(response.data);
        } catch (err) {
            console.error("Error searching posts:", err);
            const filtered = posts.filter(post => {
                const searchLower = searchQuery.toLowerCase();
                const captionMatch = post.caption?.toLowerCase().includes(searchLower);
                const userMatch = `${post.user?.firstName || ''} ${post.user?.lastName || ''}`
                    .toLowerCase().includes(searchLower);
                const locationMatch = post.location?.toLowerCase().includes(searchLower);

                return captionMatch || userMatch || locationMatch;
            });
            setFilteredPosts(filtered);
        } finally {
            setSearchLoading(false);
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

            await fetchPosts();

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
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                sx={{ bgcolor: '#F5F7FA' }}
            >
                <CircularProgress sx={{ color: '#6366F1' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                sx={{ bgcolor: '#F5F7FA' }}
            >
                <Box
                    sx={{
                        bgcolor: 'rgba(239, 68, 68, 0.1)',
                        p: 4,
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}
                >
                    <Typography variant="h6" sx={{ color: '#DC2626', fontWeight: 600 }}>
                        Error
                    </Typography>
                    <Typography sx={{ color: '#B91C1C', mt: 1 }}>{error}</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box
            display="flex"
            minHeight="100vh"
            sx={{
                bgcolor: '#F5F7FA',
                fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif"
            }}
        >
            {/* Main Content */}
            <Box sx={{ maxWidth: '800px', mx: 'auto', width: '100%', p: 3 }}>
                {/* Search Box */}
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
                    <CardContent sx={{ p: 3 }}>
                        <TextField
                            fullWidth
                            placeholder="Search posts by user name..."
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#64748B' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: searchLoading ? (
                                    <InputAdornment position="end">
                                        <CircularProgress size={20} sx={{ color: '#6366F1' }} />
                                    </InputAdornment>
                                ) : null,
                                sx: {
                                    borderRadius: '12px',
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
                    </CardContent>
                </Card>

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
                                    src="https://randomuser.me/api/portraits/men/1.jpg"
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        bgcolor: 'primary.main',
                                        fontSize: '1.5rem',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                                    }}
                                />
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

                {/* Posts List */}
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
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
                ) : (
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
                            maxWidth: '800px',
                            mx: 'auto'
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
                                mb: 3
                            }}
                        >
                            <ChatBubbleOutlineIcon sx={{ fontSize: 50, color: '#6366F1' }} />
                        </Box>
                        <Typography variant="h5" fontWeight={600} color="#1F2937" mb={1}>
                            {searchQuery.trim() ? "No matching posts found" : "No posts yet"}
                        </Typography>
                        <Typography variant="body1" color="#64748B" textAlign="center">
                            {searchQuery.trim() ? "Try a different search term" : "Share your thoughts to create your first post!"}
                        </Typography>
                    </Box>
                )}
            </Box>

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
                                src="https://randomuser.me/api/portraits/men/1.jpg"
                                sx={{
                                    width: 40,
                                    height: 40,
                                    bgcolor: 'primary.main',
                                    fontSize: '1rem'
                                }}
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
    );
};

export default Community;