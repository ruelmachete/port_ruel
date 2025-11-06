import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AboutSlides.css";

const slides = [
  {
    id: 1,
    title: "About Me",
    content: (
      <div className="slide-content">
        <h2>About Me</h2>
        <p>
          Hi! I’m <strong>Ruel Machete</strong>, a passionate and detail-oriented
          BS Information Technology student who enjoys creating dynamic,
          user-friendly web applications and systems.
        </p>
        <p>
          I’m driven by curiosity and continuous learning — always finding new ways
          to improve and grow in the tech industry.
        </p>
        <button
          className="resume-btn"
          onClick={() => {
            const link = document.createElement("a");
            link.href = "/assets/resume.pdf";
            link.download = "Ruel_Machete_Resume.pdf";
            link.click();
          }}
        >
          📄 Download Resume
        </button>
      </div>
    ),
  },
  {
    id: 2,
    title: "Education",
    content: (
      <div className="slide-content">
        <h2>Education</h2>
        <p>
          <strong>La Consolacion University Philippines</strong><br />
          Bachelor of Science in Information Technology<br />
          2022 – Present
        </p>
        <p>
          <strong>ABE International Business College – Malolos</strong><br />
          Senior High School (2021–2022)
        </p>
        <p>
          <strong>Dampol 1 National High School</strong><br />
          Junior High School (2016–2020)
        </p>
        <p>
          <strong>Dampol Elementary School</strong><br />
          Primary Education (2009–2016)
        </p>
      </div>
    ),
  },
  {
    id: 3,
    title: "Achievements",
    content: (
      <div className="slide-content">
        <h2>Achievements</h2>
        <ul style={{ textAlign: "left", margin: "1rem auto", listStyle: "disc" }}>
          <li>Batch Salutatorian, SHS (2021–2022)</li>
          <li>With High Honors – SHS (2020–2022)</li>
          <li>With Honors – JHS (2017–2020)</li>
          <li>CISCO Certification (2020–2021)</li>
          <li>Microsoft Office Specialist Certification (2022–2023)</li>
          <li>Dean’s Lister – Silver Medalist (2022–2024)</li>
          <li>Conduct Awardee (2016–2018)</li>
          <li>2nd Place – Short Film Contest (2023–2024)</li>
          <li>2nd Place – Araling Panlipunan Quiz Bee (2019–2020)</li>
          <li>Outstanding in Social Science (2019–2020)</li>
        </ul>
      </div>
    ),
  },
];

const AboutSlides = () => {
  const [index, setIndex] = useState(0);

  const goToSlide = (i) => setIndex(i);

  const prevSlide = () => setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <section id="about" className="about-section">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="about-slide"
        >
          {slides[index].content}
        </motion.div>
      </AnimatePresence>

      {}
      <div className="dot-navigation">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${index === i ? "active" : ""}`}
            onClick={() => goToSlide(i)}
          ></span>
        ))}
      </div>

      {}
      <button className="arrow left-arrow" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="arrow right-arrow" onClick={nextSlide}>
        &#10095;
      </button>
    </section>
  );
};

export default AboutSlides;
