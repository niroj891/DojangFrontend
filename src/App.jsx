// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import LoginPage from './Authentication/Login.jsx'
// import RegisterPage from './Authentication/Register.jsx'
import { TablePagination } from '@mui/material'
import HomePage from './HomePage.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Footer from './Authentication/Footer.jsx'
import Navbar from './Navbar.jsx';
import Login from './Authentication/Login.jsx'
import LoginPage from './Authentication/Login.jsx';
import Testimonial from './Testimonial.jsx';
import RegisterPage from './Authentication/Register.jsx';
import UserRoutes from './routes/UserRoutes.jsx';


const Classes = () => <h1>Classes Page</h1>;
const About = () => <h1>About Us</h1>;
const Contact = () => <h1>Contact Page</h1>;

function App() {


  return (
    // <HomePage />
    <Router>
      <Navbar />

      <UserRoutes></UserRoutes>
      <Footer />
    </Router>

    // <Router>
    //   <div className="flex flex-col min-h-screen">
    //     <main className="flex-grow">
    //       {/* Define your routes here */}
    //       <Routes>
    //         <Route path="" element={<HomePage />} />
    //         <Route path="/classes" element={<h1>Classes Page</h1>} />
    //         <Route path="/about" element={<h1>About Us Page</h1>} />
    //         <Route path="/contact" element={<h1>Contact Page</h1>} />
    //       </Routes>
    //     </main>

    //     {/* Footer remains fixed at the bottom */}
    //     <Footer />
    //   </div>
    // </Router>
  );
}

export default App
