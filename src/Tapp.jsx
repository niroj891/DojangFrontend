// import React, { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// const Tapp = () => {
//     const [tournaments, setTournaments] = useState([]);
//     const [newTournament, setNewTournament] = useState({ name: "", date: "", location: "" });
//     const [selectedTournament, setSelectedTournament] = useState(null);

//     useEffect(() => {
//         // Fetch tournaments data from backend (mocked for now)
//         setTournaments([
//             { id: 1, name: "Summer Taekwondo Championship", date: "2025-07-10", location: "Seoul Arena" },
//             { id: 2, name: "Winter Open", date: "2025-12-05", location: "Tokyo Dome" }
//         ]);
//     }, []);

//     const handleAddTournament = () => {
//         setTournaments([...tournaments, { ...newTournament, id: tournaments.length + 1 }]);
//         setNewTournament({ name: "", date: "", location: "" });
//     };

//     const handleSelectTournament = (tournament) => {
//         setSelectedTournament(tournament);
//     };

//     return (
//         <div className="p-6 space-y-8">
//             <h1 className="text-2xl font-bold">Taekwondo Tournament Manager</h1>

//             {/* Coach Section */}
//             <section>
//                 <h2 className="text-xl font-semibold">Organize New Tournament</h2>
//                 <Dialog>
//                     <DialogTrigger asChild>
//                         <Button>Add New Tournament</Button>
//                     </DialogTrigger>
//                     <DialogContent>
//                         <DialogTitle>New Tournament</DialogTitle>
//                         <div className="space-y-4">
//                             <Input
//                                 placeholder="Tournament Name"
//                                 value={newTournament.name}
//                                 onChange={(e) => setNewTournament({ ...newTournament, name: e.target.value })}
//                             />
//                             <Input
//                                 type="date"
//                                 value={newTournament.date}
//                                 onChange={(e) => setNewTournament({ ...newTournament, date: e.target.value })}
//                             />
//                             <Input
//                                 placeholder="Location"
//                                 value={newTournament.location}
//                                 onChange={(e) => setNewTournament({ ...newTournament, location: e.target.value })}
//                             />
//                             <Button onClick={handleAddTournament}>Create Tournament</Button>
//                         </div>
//                     </DialogContent>
//                 </Dialog>
//             </section>

//             {/* Athlete Section */}
//             <section>
//                 <h2 className="text-xl font-semibold">Available Tournaments</h2>
//                 <Table className="w-full">
//                     <TableHeader>
//                         <TableRow>
//                             <TableHead>Name</TableHead>
//                             <TableHead>Date</TableHead>
//                             <TableHead>Location</TableHead>
//                             <TableHead>Actions</TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {tournaments.map((tournament) => (
//                             <TableRow key={tournament.id}>
//                                 <TableCell>{tournament.name}</TableCell>
//                                 <TableCell>{tournament.date}</TableCell>
//                                 <TableCell>{tournament.location}</TableCell>
//                                 <TableCell>
//                                     <Button onClick={() => handleSelectTournament(tournament)}>
//                                         View Details
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </section>

//             {/* Fixture Details Section */}
//             {selectedTournament && (
//                 <Card className="mt-8">
//                     <CardContent>
//                         <h2 className="text-xl font-bold">Tournament Fixtures: {selectedTournament.name}</h2>
//                         <p>Date: {selectedTournament.date}</p>
//                         <p>Location: {selectedTournament.location}</p>
//                         <h3 className="mt-4 font-semibold">Fixtures (mock data)</h3>
//                         <ul className="list-disc pl-4">
//                             <li>Match 1: Athlete A vs Athlete B</li>
//                             <li>Match 2: Athlete C vs Athlete D</li>
//                         </ul>
//                     </CardContent>
//                 </Card>
//             )}
//         </div>
//     );
// };

// export default Tapp;
