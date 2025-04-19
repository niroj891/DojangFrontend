import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, CircularProgress } from "@mui/material";
import { FaMedal } from "react-icons/fa";
import axios from "axios";

const getRankStyle = (rank) => {
    switch (rank) {
        case 1:
            return { color: "gold", icon: <FaMedal className="text-3xl text-yellow-500" /> };
        case 2:
            return { color: "silver", icon: <FaMedal className="text-3xl text-gray-400" /> };
        case 3:
            return { color: "#CD7F32", icon: <FaMedal className="text-3xl text-orange-700" /> };
        default:
            return { color: "black", icon: rank };
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
                        weightCategory: group[0].participation.weightCategory
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
        const { color, icon } = getRankStyle(rank);
        const { firstName, lastName, id, dojangName } = winner.participation;

        return (
            <Card className="w-full h-full shadow-lg rounded-lg flex flex-col items-center p-4 bg-white">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl font-bold" style={{ color }}>{icon}</span>
                    <Typography variant="h6" className="font-bold">
                        {firstName} {lastName}
                    </Typography>
                </div>

                <img
                    src={getRandomImage(id)}
                    alt={`${firstName} ${lastName}`}
                    className="w-32 h-32 object-cover rounded-full border-4 border-gray-300"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150";
                    }}
                />

                <CardContent className="text-center bg-white p-4">
                    <Typography variant="body2" className="text-gray-500">ID: {id}</Typography>
                    <Typography variant="body1" className="mt-2">{dojangName}</Typography>
                    <Typography variant="body2" className="text-blue-600 font-bold mt-1">
                        Points: {winner.points}
                    </Typography>
                    <Typography variant="body2" className="mt-1 font-semibold">
                        {rank === 1 ? "Champion" : rank === 2 ? "Runner-up" : "Second Runner-up"}
                    </Typography>
                </CardContent>
            </Card>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress></CircularProgress>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Typography variant="h5" color="error">
                    Error loading leaderboard: {error}
                </Typography>
            </div>
        );
    }

    if (winnerGroups.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Typography variant="h5">
                    No tournament results available
                </Typography>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-5">
            {winnerGroups.map((group, index) => (
                <div key={index} className="mb-12">
                    <Typography variant="h4" className="text-center mb-6 font-bold">
                        {group.weightCategory.replace("BELOW", "Below ")} kg Category
                    </Typography>

                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={4}>
                            {renderWinnerCard(group.firstPlace, 1)}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {renderWinnerCard(group.secondPlace, 2)}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {renderWinnerCard(group.thirdPlace, 3)}
                        </Grid>
                    </Grid>
                </div>
            ))}
        </div>
    );
};

export default Leaderboard;