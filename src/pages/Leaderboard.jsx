import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { FaMedal } from "react-icons/fa"; // Medal icons

const players = [
    { rank: 1, name: "Jeewan Shakya", id: "KOR-5579", dojang: "Kathmandu Taekwondo dojang", flag: "🇰🇷", points: 200.0, image: "https://randomuser.me/api/portraits/men/1.jpg" },
    { rank: 2, name: "Ram Limbu", id: "AZE-1988", dojang: "Koteshor Taekwondo dojang", flag: "🇦🇿", points: 120.0, image: "https://randomuser.me/api/portraits/men/2.jpg" },
    { rank: 3, name: "Ramesh Shrestha", id: "TUN-1731", dojang: "Rastriya Taekwondo dojang", flag: "🇹🇳", points: 72.0, image: "https://randomuser.me/api/portraits/men/3.jpg" },
    { rank: 4, name: "Prasanga Bhandari", id: "FRA-1865", dojang: "Dhalko Taekwondo Dojang", flag: "🇫🇷", points: 72.0, image: "https://randomuser.me/api/portraits/men/4.jpg" },
    { rank: 5, name: "Danny Rai", id: "ITA-2116", dojang: "Syuchatar Taekwondo Dojang", flag: "🇮🇹", points: 43.2, image: "https://randomuser.me/api/portraits/men/5.jpg" },
    { rank: 6, name: "Adrian VICENTE YUNTA", id: "ESP-2994", dojang: "Chitwan Taekwondo Dojang", flag: "🇪🇸", points: 43.2, image: "https://randomuser.me/api/portraits/men/6.jpg" },
];

const getRankStyle = (rank) => {
    switch (rank) {
        case 1: return { color: "gold", icon: <FaMedal className="text-3xl text-yellow-500" /> };
        case 2: return { color: "silver", icon: <FaMedal className="text-3xl text-gray-400" /> };
        case 3: return { color: "#CD7F32", icon: <FaMedal className="text-3xl text-orange-700" /> }; // Bronze color
        default: return { color: "black", icon: rank }; // Show rank number for others
    }
};

const Leaderboard = () => {
    return (
        <div className="min-h-screen flex flex-wrap justify-center gap-6 bg-gray-100 p-5">
            {players.map((player, index) => {
                const { color, icon } = getRankStyle(player.rank);

                return (
                    <Card key={index} className="w-72 shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-4 bg-white">
                        {/* Medal or Rank Number */}
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl font-bold" style={{ color }}>{icon}</span>
                            <Typography variant="h6" className="font-bold">{player.name}</Typography>
                        </div>

                        {/* Player Image */}
                        <img src={player.image} alt={player.name} className="w-32 h-32 object-cover rounded-full border-4 border-gray-300" />

                        {/* Player Info */}
                        <CardContent className="text-center bg-white p-4">
                            <Typography variant="body2" className="text-gray-500">ID: {player.id}</Typography>
                            <Typography variant="body1" className="mt-2">{player.dojang}</Typography>
                            <Typography variant="body2" className="text-blue-600 font-bold mt-1">Points: {player.points}</Typography>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default Leaderboard;
