import React, { useState } from "react";
import "./About.css";

const About = () => {
  const [showEducation, setShowEducation] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/assets/resume.pdf";
    link.download = "Ruel_Machete_Resume.pdf";
    link.click();
  };

  const handleShowEducation = () => {
    setShowEducation(true);
  };

  const handleCloseEducation = () => {
    setShowEducation(false);
  };

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* Hide About content when Education is shown */}
        {!showEducation ? (
          <div className="about-content">
            <h2 className="section-heading">About Me</h2>
            <p>
              Hi! I’m <span className="highlight">Ruel Machete</span>, a passionate
              and driven <span className="highlight">4th-year BS Information Technology student</span> 
              at La Consolacion University Philippines. I’m detail-oriented and skilled 
              in leadership, communication, and teamwork. I’m also equipped with a solid 
              foundation in software development and digital tools.
            </p>
            <p>
              My goal is to continue growing as a software developer while also 
              contributing to meaningful and impactful tech solutions.
            </p>

            <div className="about-buttons">
              <button className="resume-btn" onClick={handleDownload}>
                📄 Download Resume
              </button>
              <button className="education-btn" onClick={handleShowEducation}>
                🎓 View Education
              </button>
            </div>
          </div>
        ) : (
          // Education popup overlay
          <div className="education-popup">
            <div className="education-content">
              <h2 className="section-heading">Education</h2>
              <ul>
                <li>
                  <strong>La Consolacion University Philippines</strong> <br />
                  <span>BS in Information Technology (2022 – Present)</span>
                </li>
                <li>
                  <strong>ABE International Business College – Malolos</strong> <br />
                  <span>Senior High School (2021 – 2022)</span>
                </li>
                <li>
                  <strong>Dampol 1 National High School</strong> <br />
                  <span>Junior High School (2016 – 2020)</span>
                </li>
                <li>
                  <strong>Dampol Elementary School</strong> <br />
                  <span>Primary Education (2009 – 2016)</span>
                </li>
              </ul>

              <button className="close-btn" onClick={handleCloseEducation}>
                ✖ Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
