import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { motion } from 'framer-motion';
// Removed 'react-intersection-observer' import to fix error
import './Skills.css';

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data } = await supabase
        .from('skills')
        .select('*')
        .order('percentage', { ascending: false }); 
      if (data) setSkills(data);
    };
    fetchSkills();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="skills">
      <h2 className="section-heading">Technical Proficiency</h2>
      
      <motion.div 
        className="skills-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {skills.map((skill) => (
          <motion.div key={skill.id} variants={itemVariants} className="skill-card-modern">
            
            {/* 1. Header: Icon & Name */}
            <div className="skill-header">
              <div className="skill-icon-wrapper">
                {skill.image ? (
                    <img src={skill.image} alt={skill.name} className="skill-img-real" />
                ) : (
                    <div className="skill-placeholder">?</div>
                )}
              </div>
              <div className="skill-info">
                <h3 className="skill-name">{skill.name}</h3>
                <span className="skill-category">{skill.category}</span>
              </div>
            </div>

            {/* 2. Progress Bar Section */}
            <div className="skill-progress-container">
                <div className="skill-progress-labels">
                    <span>Proficiency</span>
                    <span className="skill-percent-text">{skill.percentage}%</span>
                </div>
                
                <div className="skill-track">
                    <motion.div 
                        className="skill-bar"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    />
                </div>
            </div>

          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;