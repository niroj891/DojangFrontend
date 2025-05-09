import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, CircularProgress, Pagination, Button, Menu, MenuItem } from "@mui/material";
import { FaMedal, FaTrophy, FaUniversity, FaSort, FaCalendarAlt } from "react-icons/fa";
import { GiBlackBelt } from "react-icons/gi";
import axios from "axios";

const getRankStyle = (rank) => {
    switch (rank) {
        case 1:
            return {
                icon: <FaTrophy className="text-2xl text-yellow-500" />,
                bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
                borderColor: "border-yellow-300",
                badgeColor: "bg-yellow-500"
            };
        case 2:
            return {
                icon: <FaMedal className="text-xl text-gray-400" />,
                bgColor: "bg-gradient-to-br from-gray-50 to-gray-100",
                borderColor: "border-gray-300",
                badgeColor: "bg-gray-300"
            };
        case 3:
            return {
                icon: <FaMedal className="text-xl text-orange-700" />,
                bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
                borderColor: "border-orange-300",
                badgeColor: "bg-orange-600"
            };
        default:
            return {
                icon: rank,
                bgColor: "bg-white",
                borderColor: "border-gray-200",
                badgeColor: "bg-blue-600"
            };
    }
};

const getRandomImage = (id) => {
    const gender = id % 2 === 0 ? 'men' : 'women';
    return `https://randomuser.me/api/portraits/${gender}/${id % 100}.jpg`;
};

const getUserImage = (user) => {
    if (user.imageUrl) {
        return `http://localhost:9696/images/user/${user.imageUrl}`;
    }
    return getRandomImage(user.participation?.id || 1);
};

const Leaderboard = () => {
    const [winnerGroups, setWinnerGroups] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const [sortOrder, setSortOrder] = useState('newest');
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://localhost:9696/leaderboard');
                const data = response.data;

                // Process groups
                const processedGroups = data
                    .filter(group => group && group.length >= 3)
                    .map(group => ({
                        firstPlace: {
                            ...group[0],
                            points: 10
                        },
                        secondPlace: {
                            ...group[1],
                            points: 6
                        },
                        thirdPlace: {
                            ...group[2],
                            points: 4
                        },
                        weightCategory: group[0].participation?.weightCategory || "Open Weight",
                        eventName: group[0].event || "Taekwondo Championship",
                        instructorName: group[0].instructor || "Master Instructor",
                        eventDate: group[0].eventDate ? new Date(group[0].eventDate) : new Date(0) // Default to epoch if no date
                    }));

                setWinnerGroups(processedGroups);
                sortGroups(processedGroups, sortOrder);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching leaderboard:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    const sortGroups = (groups, order) => {
        const sorted = [...groups].sort((a, b) => {
            if (order === 'newest') {
                return b.eventDate - a.eventDate;
            } else {
                return a.eventDate - b.eventDate;
            }
        });
        setFilteredGroups(sorted);
        setPage(1); // Reset to first page when sorting changes
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
        sortGroups(winnerGroups, order);
        setAnchorEl(null);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
    const paginatedGroups = filteredGroups.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const renderWinnerCard = (winner, rank) => {
        const { icon, bgColor, borderColor, badgeColor } = getRankStyle(rank);
        const { firstName, lastName, id, dojangName } = winner.participation || {};

        const rankLabels = {
            1: "CHAMPION",
            2: "SILVER",
            3: "BRONZE"
        };

        return (
            <Card
                className={`w-full shadow-md rounded-xl ${bgColor} overflow-hidden border ${borderColor} transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}
                sx={{ height: '200px' }}
            >
                <div className={`w-full py-2 ${badgeColor} text-white text-center relative`}>
                    <div className="absolute top-1 right-2">
                        {icon}
                    </div>
                    <Typography variant="subtitle2" className="font-bold uppercase tracking-wider text-xs">
                        {rankLabels[rank]}
                    </Typography>
                </div>

                <div className="flex items-center p-4 h-[calc(200px-40px)]">
                    <div className="relative mr-4">
                        <img
                            src={getUserImage(winner)}
                            alt={`${firstName || "Winner"} ${lastName || ""}`}
                            className={`w-16 h-16 object-cover rounded-full border-2 ${borderColor}`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = getRandomImage(id || 1);
                            }}
                        />
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow">
                            <div className="rounded-full bg-blue-600 text-white font-bold w-6 h-6 flex items-center justify-center text-xs">
                                {winner.points}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col flex-1">
                        <Typography variant="body1" className="font-bold text-gray-800 leading-tight text-lg">
                            {firstName || "Winner"} {lastName || ""}
                        </Typography>

                        <div className="flex items-center mt-2 text-sm text-gray-500">
                            <FaUniversity className="text-blue-600 mr-1" />
                            <Typography variant="caption" noWrap className="max-w-[160px]" title={dojangName || "Unknown Dojang"}>
                                {dojangName || "Unknown Dojang"}
                            </Typography>
                        </div>

                        <div className="mt-3">
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                                ID: {id || "N/A"}
                            </span>
                        </div>
                    </div>
                </div>
            </Card>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="flex flex-col items-center">
                    <CircularProgress sx={{ color: "#3B82F6" }} size={32} />
                    <Typography variant="subtitle1" className="mt-3 text-gray-600">
                        Loading Tournament Results...
                    </Typography>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="bg-blue-50 p-4 rounded-lg shadow-md border border-blue-200 max-w-md">
                    <Typography variant="h6" color="primary" className="font-bold mb-2">
                        Error Loading Leaderboard
                    </Typography>
                    <Typography variant="body2" className="text-gray-700">
                        {error}
                    </Typography>
                </div>
            </div>
        );
    }

    if (winnerGroups.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-100 max-w-md text-center">
                    <GiBlackBelt className="text-5xl text-blue-700 mx-auto mb-3" />
                    <Typography variant="h6" className="font-bold text-gray-800">
                        No Tournament Results Available
                    </Typography>
                    <Typography variant="body2" className="mt-2 text-gray-600">
                        Check back later for upcoming competition results
                    </Typography>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-6">
                    <div className="flex justify-center mb-2">
                        <GiBlackBelt className="text-4xl text-blue-700" />
                    </div>
                    <Typography variant="h4" className="font-bold text-gray-800 tracking-tighter">
                        Taekwondo <span className="text-blue-600">Champions</span>
                    </Typography>
                    <Typography variant="subtitle1" className="text-gray-500">
                        Tournament Results & Rankings
                    </Typography>
                </div>

                {/* Sorting controls */}
                <div className="flex justify-between items-center mb-4 px-2">
                    <div className="flex items-center space-x-2">
                        <FaCalendarAlt className="text-blue-600 text-sm" />
                        <Typography variant="body2" className="text-gray-600">
                            {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
                        </Typography>
                    </div>
                    <div>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<FaSort />}
                            onClick={handleMenuOpen}
                            className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                            Sort
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={() => handleSortChange('newest')}>Newest First</MenuItem>
                            <MenuItem onClick={() => handleSortChange('oldest')}>Oldest First</MenuItem>
                        </Menu>
                    </div>
                </div>

                {paginatedGroups.map((group, index) => (
                    <div key={index} className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-red-600 to-black text-white p-3">
                            <div className="flex flex-wrap items-center justify-between">
                                <Typography variant="h6" className="font-bold">
                                    {group.eventName}
                                </Typography>
                                <Typography variant="caption" className="text-blue-100">
                                    {group.eventDate.toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </Typography>
                            </div>
                            <div className="flex flex-wrap items-center justify-between mt-1">
                                <Typography variant="body2" className="flex items-center gap-1">
                                    <span className="bg-white text-blue-600 px-2 py-0.5 rounded-full text-xs font-bold">
                                        {group.weightCategory.replace("BELOW", "Below ")} kg
                                    </span>
                                </Typography>
                                <Typography variant="caption" className="text-blue-100">
                                    Instructor: {group.instructorName}
                                </Typography>
                            </div>
                        </div>

                        <div className="p-3">
                            <Grid container spacing={2}>

                                <Grid item xs={4} className="flex items-center justify-center -mt-4">
                                    {renderWinnerCard(group.firstPlace, 1)}
                                </Grid>
                                <Grid item xs={4} className="flex items-center justify-center">
                                    {renderWinnerCard(group.secondPlace, 2)}
                                </Grid>
                                <Grid item xs={4} className="flex items-center justify-center">
                                    {renderWinnerCard(group.thirdPlace, 3)}
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-6 mb-8">
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(event, value) => setPage(value)}
                            color="primary"
                            size="medium"
                            showFirstButton
                            showLastButton
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                },
                                '& .Mui-selected': {
                                    backgroundColor: '#3B82F6 !important',
                                    color: '#fff',
                                },
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;