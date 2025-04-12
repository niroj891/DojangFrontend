
import { TablePagination } from '@mui/material'
import HomePage from './pages/HomePage.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Footer from './Component/Footer.jsx'
import UserRoutes from './routes/UserRoutes.jsx';
import RouteHandler from './routes/Router.jsx';





function App() {


  return (
    <Router>
      <RouteHandler></RouteHandler>

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
