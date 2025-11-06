import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import './Hero.css';
import BibleVerse from '../Bibleverse/Bibleverse.jsx';
import ChromaGrid from '../ChromaGrid/ChromaGrid.jsx';

const chromaItems = [
  {
    image: "/assets/profile.jpg", 
    title: "Ruel Machete",
    subtitle: "Software Developer",
    handle: "@ruelmachete", 
    borderColor: "#64ffda",
    gradient: "linear-gradient(145deg, #112240, #0a192f)",
    url: "https://github.com" 
  },
  {
    image: "/assets/profile2.jpg",
    title: "I'm 21 years old",
    subtitle: "Fresh Graduate",
    handle: "@ruelmachete", 
    borderColor: "#FFFFFF",
    gradient: "linear-gradient(180deg, #333, #000)",
    url: "https://github.com/your-username" 
  },
  {
    image: "/assets/profile3.jpg",
    title: "Single",
    subtitle: "Connect with Me",
    handle: "@ruelmachete", 
    borderColor: "#0A66C2",
    gradient: "linear-gradient(165deg, #0A66C2, #000)",
    url: "https://linkedin.com/in/your-profile" 
  }
];

const Hero = () => {
  return (
    <section id="hero" className="hero-section">
      {}
      <div className="hero-content">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          Hi! My Name is Ruel.
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
          Hey there! I’m Ruel, a software developer in training with a growing passion for crafting accessible and human-centered web applications. I’m currently pursuing my Bachelor’s degree in Information Technology, continuously learning how to turn ideas into meaningful digital solutions.
        </motion.p>
        
        <BibleVerse />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
          <Link to="projects" spy={true} smooth={true} offset={-70} duration={500}>
            <button className="hero-button">Check out my projects!</button>
          </Link>
        </motion.div>
      </div>

      {}
      <motion.div 
        className="hero-grid-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <ChromaGrid 
          items={chromaItems}
        
          columns={3}
          rows={1}
          radius={200}
          damping={0.5}
        />
      </motion.div>
    </section>
  );
};

export default Hero;