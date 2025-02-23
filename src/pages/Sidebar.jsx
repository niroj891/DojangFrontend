// import React from "react";
// import { Avatar, Divider, Button, Menu, MenuItem } from "@mui/material";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import HomeIcon from "@mui/icons-material/Home";
// import ExploreIcon from "@mui/icons-material/Explore";
// import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
// import PersonIcon from "@mui/icons-material/Person";
// import LogoutIcon from "@mui/icons-material/Logout";
// //import "./SideBar.css";

// const Sidebar = () => {
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const openLogoutMenu = Boolean(anchorEl);

//     const handleOpenLogoutMenu = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     return (
//         <div className="card text-white h-screen flex flex-col justify-between py-5 bg-[rgb(3,11,40)]">
//             <div className="space-y-8 pl-5">
//                 {/* Logo */}
//                 <div className="text-2xl font-bold text-white">Dojang</div>

//                 {/* Navigation Menu */}
//                 <div className="space-y-8">
//                     <div className="cursor-pointer flex space-x-3 items-center">
//                         <HomeIcon className="text-white" />
//                         <p className="text-xl">Home</p>
//                     </div>
//                     <div className="cursor-pointer flex space-x-3 items-center">
//                         <ExploreIcon className="text-white" />
//                         <p className="text-xl">Explore</p>
//                     </div>
//                     <div className="cursor-pointer flex space-x-3 items-center">
//                         <VideoLibraryIcon className="text-white" />
//                         <p className="text-xl">Reels</p>
//                     </div>
//                     <div className="cursor-pointer flex space-x-3 items-center">
//                         <PersonIcon className="text-white" />
//                         <p className="text-xl">Profile</p>
//                     </div>
//                 </div>
//             </div>

//             {/* User Section */}
//             <div>
//                 <Divider />
//                 <div className="pl-5 flex items-center justify-between pt-5">
//                     <div className="flex items-center space-x-3">
//                         <Avatar
//                             alt="User"
//                             src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
//                         />
//                         <div>
//                             <p className="font-bold">John Doe</p>
//                             <p className="opacity-70">@johndoe</p>
//                         </div>
//                     </div>
//                     <Button onClick={handleOpenLogoutMenu}>
//                         <MoreHorizIcon className="text-white" />
//                     </Button>
//                     <Menu
//                         anchorEl={anchorEl}
//                         open={openLogoutMenu}
//                         onClose={handleClose}
//                     >
//                         <MenuItem onClick={handleClose}>
//                             <LogoutIcon className="mr-2" /> Logout
//                         </MenuItem>
//                     </Menu>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;
