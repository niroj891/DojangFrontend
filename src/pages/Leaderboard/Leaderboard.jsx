import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, CircularProgress } from "@mui/material";
import { FaMedal, FaTrophy, FaUniversity } from "react-icons/fa";
import { GiBlackBelt } from "react-icons/gi";
import axios from "axios";

const getRankStyle = (rank) => {
    switch (rank) {
        case 1:
            return {
                icon: <FaTrophy className="text-4xl text-yellow-500" />,
                bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
                borderColor: "border-yellow-300",
                badgeColor: "bg-yellow-500"
            };
        case 2:
            return {
                icon: <FaMedal className="text-3xl text-gray-400" />,
                bgColor: "bg-gradient-to-br from-gray-50 to-gray-100",
                borderColor: "border-gray-300",
                badgeColor: "bg-gray-300"
            };
        case 3:
            return {
                icon: <FaMedal className="text-3xl text-orange-700" />,
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

const Leaderboard = () => {
    const [winnerGroups, setWinnerGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://localhost:9696/leaderboard');
                const data = response.data;

                // Filter out empty arrays and process each group
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
                        instructorName: group[0].instructor || "Master Instructor"
                    }));

                setWinnerGroups(processedGroups);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching leaderboard:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    const renderWinnerCard = (winner, rank) => {
        const { icon, bgColor, borderColor, badgeColor } = getRankStyle(rank);
        const { firstName, lastName, id, dojangName } = winner.participation || {};

        const rankLabels = {
            1: "CHAMPION",
            2: "SILVER MEDALIST",
            3: "BRONZE MEDALIST"
        };

        return (
            <Card
                className={`w-full h-full shadow-lg rounded-2xl flex flex-col ${bgColor} overflow-hidden border ${borderColor} transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}
            >
                <div className={`w-full py-3 ${badgeColor} text-white text-center relative`}>
                    <div className="absolute top-0 right-0 m-2">
                        {icon}
                    </div>
                    <Typography variant="h6" className="font-bold uppercase tracking-wider">
                        {rankLabels[rank]}
                    </Typography>
                </div>

                <div className="flex flex-col items-center p-4">
                    <div className="relative mb-2">
                        <img
                            src={getRandomImage(id || 1)}
                            alt={`${firstName || "Winner"} ${lastName || ""}`}
                            className={`w-28 h-28 object-cover rounded-full border-4 ${borderColor} shadow-md`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/150";
                            }}
                        />
                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                            <div className="rounded-full bg-blue-600 text-white font-bold w-8 h-8 flex items-center justify-center text-sm">
                                {winner.points}
                            </div>
                        </div>
                    </div>

                    <Typography variant="h5" className="font-bold mt-2 text-gray-800">
                        {firstName || "Winner"} {lastName || ""}
                    </Typography>

                    <div className="flex items-center mt-1 text-gray-500">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">ID: {id || "N/A"}</span>
                    </div>

                    <div className="flex items-center gap-1 mt-3 text-gray-700">
                        <FaUniversity className="text-lg text-blue-600" />
                        <Typography variant="body1" className="font-medium">
                            {dojangName || "Unknown Dojang"}
                        </Typography>
                    </div>
                </div>
            </Card>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="flex flex-col items-center">
                    <CircularProgress sx={{ color: "#3B82F6" }} />
                    <Typography variant="h6" className="mt-4 text-gray-600">
                        Loading Tournament Results...
                    </Typography>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200 max-w-md">
                    <Typography variant="h5" color="primary" className="font-bold mb-2">
                        Error Loading Leaderboard
                    </Typography>
                    <Typography variant="body1" className="text-gray-700">
                        {error}
                    </Typography>
                </div>
            </div>
        );
    }

    if (winnerGroups.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="bg-blue-50 p-8 rounded-lg shadow-md border border-blue-100 max-w-md text-center">
                    <GiBlackBelt className="text-6xl text-blue-700 mx-auto mb-4" />
                    <Typography variant="h5" className="font-bold text-gray-800">
                        No Tournament Results Available
                    </Typography>
                    <Typography variant="body1" className="mt-2 text-gray-600">
                        Check back later for upcoming competition results
                    </Typography>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
            <div className="container mx-auto">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <GiBlackBelt className="text-5xl text-blue-700" />
                    </div>
                    <Typography variant="h3" className="font-bold text-gray-800 tracking-tighter">
                        Taekwondo <span className="text-blue-600">Champions</span>
                    </Typography>
                    <Typography variant="h6" className="text-gray-500 mt-2">
                        Tournament Results & Rankings
                    </Typography>
                </div>

                {winnerGroups.map((group, index) => (
                    <div key={index} className="mb-16 bg-white rounded-3xl shadow-md overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                            <Typography variant="h4" className="font-bold">
                                {group.eventName}
                            </Typography>
                            <div className="flex flex-wrap items-center justify-between mt-2">
                                <Typography variant="h6" className="flex items-center gap-2">
                                    <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
                                        {group.weightCategory.replace("BELOW", "Below ")} kg
                                    </span>
                                </Typography>
                                <Typography variant="body1" className="flex items-center gap-1">
                                    <span className="font-medium">Instructor:</span> {group.instructorName}
                                </Typography>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Traditional podium layout - champion in center, silver on left, bronze on right */}
                            <div className="flex flex-col">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-2 bg-blue-600 rounded-full"></div>
                                </div>

                                <Grid container spacing={4}>
                                    {/* Silver medalist - Left */}

                                    {/* Champion - Center */}
                                    <Grid item xs={12} md={4} className="-mt-6">
                                        {renderWinnerCard(group.firstPlace, 1)}
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        {renderWinnerCard(group.secondPlace, 2)}
                                    </Grid>



                                    {/* Bronze medalist - Right */}
                                    <Grid item xs={12} md={4}>
                                        {renderWinnerCard(group.thirdPlace, 3)}
                                    </Grid>
                                </Grid>


                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;