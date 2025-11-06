import React from 'react';
import { skillsData } from '../../data/skillsData';
import './Skills.css';

const Skills = () => {
  return (
    <section id="skills">
      <h2 className="section-heading">My Skills</h2>
      <ul className="skills-grid">
        {skillsData.map((skill, index) => (
          <li key={index} className="skill-item">
            <div className="skill-icon">{skill.icon}</div>
            <span>{skill.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;