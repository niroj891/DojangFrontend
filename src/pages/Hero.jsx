

// import React from 'react';
// import { Avatar } from '@mui/material';
// import { EmojiEvents, Person } from '@mui/icons-material';

// const Hero = () => {
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

// export default Hero;

