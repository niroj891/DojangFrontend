// import React from 'react';
// import { Avatar } from '@mui/material';
// import { EmojiEvents, Person } from '@mui/icons-material';

// const Leaderboard = () => {
//     const players = [
//         { id: 1, name: 'Alex Johnson', weight: '75kg', points: 2450 },
//         { id: 2, name: 'Sarah Miller', weight: '68kg', points: 2320 },
//         { id: 3, name: 'Chris Thompson', weight: '80kg', points: 2180 },
//         { id: 4, name: 'Emma Wilson', weight: '63kg', points: 2055 },
//         { id: 5, name: 'Mike Davis', weight: '72kg', points: 1980 },
//     ];

//     const getMedalColor = (index) => {
//         switch (index) {
//             case 0: return 'bg-amber-400';
//             case 1: return 'bg-gray-300';
//             case 2: return 'bg-amber-600';
//             default: return 'bg-gray-100';
//         }
//     };

//     return (
//         <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//             <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
//                 <EmojiEvents className="mr-2 text-amber-500" />
//                 Tournament Leaderboard
//             </h1>

//             <div className="space-y-4">
//                 {players.map((player, index) => (
//                     <div
//                         key={player.id}
//                         className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                     >
//                         <div className="flex items-center space-x-4">
//                             <div className={`${getMedalColor(index)} w-8 h-8 rounded-full flex items-center justify-center`}>
//                                 <span className="text-gray-800 font-semibold">{index + 1}</span>
//                             </div>
//                             <Avatar className="!h-12 !w-12 !bg-blue-500">
//                                 <Person className="!text-white" />
//                             </Avatar>
//                             <div>
//                                 <h2 className="text-lg font-semibold text-gray-800">{player.name}</h2>
//                                 <p className="text-sm text-gray-600">{player.weight} Category</p>
//                             </div>
//                         </div>
//                         <div className="text-right">
//                             <p className="text-sm text-gray-600">Total Points</p>
//                             <p className="text-xl font-bold text-blue-600">{player.points}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Leaderboard;

import React from "react";
import { Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const players = [
    { rank: 1, name: "Tae-Joon PARK", id: "KOR-5579", dojang: "Kathmandu Taekwondo dojang", flag: "🇰🇷", points: 200.0, image: "https://randomuser.me/api/portraits/men/1.jpg" },
    { rank: 2, name: "Gashim MAGOMEDOV", id: "AZE-1988", dojang: "Koteshor Taekwondo dojang", flag: "🇦🇿", points: 120.0, image: "https://randomuser.me/api/portraits/men/2.jpg" },
    { rank: 3, name: "Mohamed Khalil JENDOUBI", id: "TUN-1731", dojang: "Rastriya Taekwondo dojang", flag: "🇹🇳", points: 72.0, image: "https://randomuser.me/api/portraits/men/3.jpg" },
    { rank: 3, name: "Cyrian RAVET", id: "FRA-1865", dojang: "Dhalko Taekwondo Dojang", flag: "🇫🇷", points: 72.0, image: "https://randomuser.me/api/portraits/men/4.jpg" },
    { rank: 5, name: "Vito DELL'AQUILA", id: "ITA-2116", dojang: "Syuchatar Taekwondo Dojang", flag: "🇮🇹", points: 43.2, image: "https://randomuser.me/api/portraits/men/5.jpg" },
    { rank: 5, name: "Adrian VICENTE YUNTA", id: "ESP-2994", dojang: "Chitwan Taekwondo Dojang", flag: "🇪🇸", points: 43.2, image: "https://randomuser.me/api/portraits/men/6.jpg" },
    { rank: 7, name: "Jack WOOLLEY", id: "IRL-1542", dojang: "Bagmati Taekwondo Dojang", flag: "🇮🇪", points: 41.42, image: "https://randomuser.me/api/portraits/men/7.jpg" },
    { rank: 8, name: "Sina MOHTARAMI", id: "IRI-24088", dojang: "Bhaktapur Taekwondo Dojang", flag: "🇮🇷", points: 40.0, image: "https://randomuser.me/api/portraits/men/8.jpg" },
    { rank: 8, name: "Junho SIM", id: "KOR-8964", dojang: "Rastriya Taekwondo Dojang", flag: "🇰🇷", points: 40.0, image: "https://randomuser.me/api/portraits/men/9.jpg" },
    { rank: 10, name: "Samirkhon ABAKAKIROV", id: "KAZ-3181", dojang: "Balaju Taekwongo Dojang", flag: "🇰🇿", points: 38.5, image: "https://randomuser.me/api/portraits/men/10.jpg" },
];

const Leaderboard = () => {
    return (
        <div className="min-h-screen flex justify-center bg-gray-100 p-5">
            <TableContainer component={Paper} className="shadow-lg">
                <Table>
                    {/* Table Head */}
                    <TableHead className="bg-blue-500">
                        <TableRow>
                            <TableCell className="text-white font-semibold">RANK</TableCell>
                            <TableCell className="text-white font-semibold">NAME</TableCell>
                            <TableCell className="text-white font-semibold">DOJANG Name</TableCell>
                            <TableCell className="text-white font-semibold">POINTS</TableCell>
                        </TableRow>
                    </TableHead>

                    {/* Table Body */}
                    <TableBody>
                        {players.map((player, index) => (
                            <TableRow key={index} className="hover:bg-gray-200">
                                <TableCell>{player.rank}</TableCell>
                                <TableCell className="flex items-center space-x-3">
                                    <Avatar src={player.image} />
                                    <div>
                                        <p className="font-semibold">{player.name}</p>
                                        <p className="text-gray-500 text-sm">{player.id}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="flex items-center space-x-2">
                                    <span className="text-2xl">{ }</span>
                                    <p>{player.dojang}</p>
                                </TableCell>
                                <TableCell>{player.points}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Leaderboard;
