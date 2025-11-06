import React, { useState } from "react";
import "./App.css";

import Galaxy from "./components/Galaxy/Galaxy";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import AboutSlides from "./components/About/AboutSlides";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  const [isDay, setIsDay] = useState(false); 

  return (
    <div className="App">
      {}
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
        <AboutSlides /> {}
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />

      {}
      {}
    </div>
  );
}

export default App;
