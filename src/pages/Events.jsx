import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, TextField, List, ListItem, ListItemText, Divider } from "@mui/material";
import { LocationOn, Event, People, Search } from "@mui/icons-material";

const events = [
    {
        title: "Bagmati Aanchal tournament - G-1",
        location: "Rangashala",
        date: "22 Feb - 23 Feb 2025",
        attendees: 1095,
        deadline: "11 Feb 04:44 am",
        image: "/image/IndoNepalChamp.jpg",
    },
    {
        title: "(Kyorugi) Nepal open tournament National - G-1",
        location: "Rastriya kavard hall rangashala",
        date: "1 Mar - 2 Mar 2025",
        attendees: 1173,
        deadline: "18 Feb 03:44 am",
        image: "/image/IntChamp.jpg",
    },
    {
        title: "(Poomsae) 2nd Sagarmatha open taekwodno championship - G-1",
        location: "Satdobato",
        date: "3 Mar 2025",
        attendees: 354,
        deadline: "22 Feb 03:44 am",
        image: "/image/Champ.jpg",
    },
    {
        title: "Kathnamdu uptyaka taekwondo championship - G-2",
        location: "Mulpani, Mulpani taekwondo dojang",
        date: "8 Mar - 9 Mar 2025",
        attendees: 1803,
        deadline: "Closed",
        image: "/image/Taekwondo-Chapionships.jpg",
    },
    {
        title: "World taekwondo championship - G-2",
        location: "South korea, Seoul",
        date: "8 Mar - 9 Mar 2025",
        attendees: 1803,
        deadline: "Closed",
        image: "/image/WorldChampionship.jpg",
    },
    {
        title: "3rd Korean ambassador international taekwondo championship - G-2",
        location: "Eindhoven, Netherlands",
        date: "8 Mar - 9 Mar 2025",
        attendees: 1803,
        deadline: "Closed",
        image: "/image/NepalInternational.jpg",
    },
];

const EventCard = ({ event }) => (
    <Card className="w-80 shadow-lg rounded-lg">
        <CardMedia component="img" image={event.image} alt={event.title} sx={{ height: 250, objectFit: "cover", borderRadius: "10px" }} />
        <CardContent>
            <Typography variant="h6" className="font-bold">
                {event.title}
            </Typography>
            <div className="flex items-center mt-2 text-gray-600">
                <LocationOn fontSize="small" />
                <Typography variant="body2" className="ml-1">
                    {event.location}
                </Typography>
            </div>
            <div className="flex items-center mt-1 text-gray-600">
                <Event fontSize="small" />
                <Typography variant="body2" className="ml-1">
                    {event.date}
                </Typography>
            </div>
            <div className="flex items-center mt-1 text-gray-600">
                <People fontSize="small" />
                <Typography variant="body2" className="ml-1">
                    {event.attendees} going
                </Typography>
            </div>
            <Typography variant="body2" className="mt-2 text-red-500 font-semibold">
                Deadline: {event.deadline}
            </Typography>
            <Button
                variant="contained"
                color="error"
                className="w-full mt-3"
                disabled
            >
                Registration Closed
            </Button>
        </CardContent>
    </Card>
);


const Sidebar = () => (
    <div className="w-72 min-h-screen p-6 bg-gray-200 flex flex-col">
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Search events"
            InputProps={{ startAdornment: <Search /> }}
        />
        <List className="mt-4 flex-grow">
            <ListItem button selected>
                <ListItemText primary="All" />
            </ListItem>
            <Divider />
            <ListItem button>
                <ListItemText primary="Tournaments" />
            </ListItem>
            <Divider />
            <ListItem button>
                <ListItemText primary="Live Webinar" />
            </ListItem>
            <Divider />
            <ListItem button>
                <ListItemText primary="Courses" />
            </ListItem>
        </List>
    </div>
);


const Events = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-wrap gap-6 justify-center p-6">
                {events.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>
        </div>
    );
};

export default Events;
