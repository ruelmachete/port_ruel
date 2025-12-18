import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from '../../supabaseClient';
import "./AboutSlides.css";

const AboutSlides = () => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const { data, error } = await supabase
          .from('about_content')
          .select('*')
          .eq('id', 1)
          .single();
        
        if (error) throw error;
        if (data) setData(data);
      } catch (error) {
        console.error("Error fetching about:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  // Show loading state while fetching
  if (loading) return <div className="about-loading">Loading...</div>;
  if (!data) return null; 

  const slides = [
    {
      id: 1,
      title: "About Me",
      content: (
        <div className="slide-content">
          <h2>About Me</h2>
          <div className="text-body">
            <p>{data.about_text || "No description available."}</p>
          </div>
          {data.resume_link && (
            <a 
              href={data.resume_link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="resume-btn"
            >
              📄 Download Resume
            </a>
          )}
        </div>
      )
    },
    {
      id: 2,
      title: "Education",
      content: (
        <div className="slide-content">
          <h2>Education</h2>
          <div className="education-list">
            {data.education && Array.isArray(data.education) && data.education.map((edu, i) => (
              <div key={i} className="edu-item">
                <strong className="school-name">{edu.school}</strong>
                <span className="degree">{edu.degree}</span>
                <span className="year">{edu.year}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Achievements",
      content: (
        <div className="slide-content">
          <h2>Achievements</h2>
          <ul className="achievements-list">
            {data.achievements && Array.isArray(data.achievements) && data.achievements.map((ach, i) => (
              <li key={i}>{ach}</li>
            ))}
          </ul>
        </div>
      )
    }
  ];

  const nextSlide = () => setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section id="about" className="about-section">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="about-slide-container"
        >
          {slides[index].content}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="dot-navigation">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${index === i ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>

      {/* Arrows */}
      <button className="arrow left-arrow" onClick={prevSlide}>&#10094;</button>
      <button className="arrow right-arrow" onClick={nextSlide}>&#10095;</button>
    </section>
  );
};

export default AboutSlides;