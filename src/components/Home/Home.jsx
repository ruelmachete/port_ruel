import React, { useState } from "react";
import Galaxy from "../Galaxy/Galaxy";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import AboutSlides from "../About/AboutSlides";
import Skills from "../Skills/Skills";
import Projects from "../Projects/Projects";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";

const Home = () => {
  const [isDay, setIsDay] = useState(false);

  return (
    <div className="home-container">
      {/* Background Galaxy Animation */}
      <Galaxy
        mouseRepulsion={true}
        mouseInteraction={true}
        density={1.5}
        glowIntensity={0.5}
        saturation={0.0}
        hueShift={isDay ? 60 : 240}
      />

      <Navbar />

      <main className="content-wrapper">
        <Hero />
        <AboutSlides />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
      
      {/* Day/Night Toggle (Optional, kept from original) */}
      <button 
        className="day-toggle" 
        onClick={() => setIsDay(!isDay)}
        style={{ display: 'none' }} // Hidden by default, enable if needed
      >
        {isDay ? "Night" : "Day"}
      </button>
    </div>
  );
};

export default Home;