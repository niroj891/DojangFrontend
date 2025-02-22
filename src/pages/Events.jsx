import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, TextField, List, ListItem, ListItemText, Divider } from "@mui/material";
import { LocationOn, Event, People, Search } from "@mui/icons-material";

const events = [
    {
        title: "Slovenia Open 2025 - World Taekwondo - G-1",
        location: "Ljubljana, Slovenia",
        date: "22 Feb - 23 Feb 2025",
        attendees: 1095,
        deadline: "11 Feb 04:44 am",
        image: "slovenia_open.jpg",
    },
    {
        title: "(Kyorugi) Bulgaria Open 2025 - World Taekwondo - G-1",
        location: "Sofia, Bulgaria",
        date: "1 Mar - 2 Mar 2025",
        attendees: 1173,
        deadline: "18 Feb 03:44 am",
        image: "bulgaria_open.jpg",
    },
    {
        title: "(Poomsae) Bulgaria Open 2025 - World Taekwondo - G-1",
        location: "Sofia, Bulgaria",
        date: "3 Mar 2025",
        attendees: 354,
        deadline: "22 Feb 03:44 am",
        image: "bulgaria_poomsae.jpg",
    },
    {
        title: "52nd Dutch Open Taekwondo Championships 2025 - G-2",
        location: "Eindhoven, Netherlands",
        date: "8 Mar - 9 Mar 2025",
        attendees: 1803,
        deadline: "Closed",
        image: "dutch_open.jpg",
    },
];

const EventCard = ({ event }) => (
    <Card className="w-80 shadow-lg rounded-lg">
        <CardMedia component="img" height="140" image={event.image} alt={event.title} />
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
    <div className="w-64 p-4 bg-gray-100 h-screen">
        <TextField fullWidth variant="outlined" placeholder="Search events" InputProps={{ startAdornment: <Search /> }} />
        <List className="mt-4">
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
