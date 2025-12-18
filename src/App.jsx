import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

// Public Components
import Galaxy from "./components/Galaxy/Galaxy";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import AboutSlides from "./components/About/AboutSlides";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Certificates from "./components/Certificates/Certificates"; // NEW IMPORT
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

// Admin Components
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

function App() {
  const [isDay, setIsDay] = useState(false);
  const location = useLocation();
  
  // Check if we are on an admin route
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <div className="App">
      {/* Show Galaxy Background everywhere */}
      <Galaxy 
        mouseRepulsion={true}
        mouseInteraction={true}
        density={1.5}
        glowIntensity={0.5}
        saturation={0.0} 
        hueShift={isDay ? 60 : 240} 
      />

      {/* Only show Public Navbar if NOT on admin pages */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* PUBLIC WEBSITE */}
        <Route path="/" element={
          <main className="content-wrapper">
            <Hero />
            <AboutSlides />
            <Skills />
            <Projects />
            <Certificates /> {/* NEW SECTION Added here */}
            <Contact />
            <Footer />
          </main>
        } />

        {/* ADMIN ROUTES */}
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;