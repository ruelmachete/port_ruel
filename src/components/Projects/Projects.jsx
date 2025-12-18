import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient'; // IMPORT SUPABASE
import ProjectCard from './ProjectCard';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectsData, setProjectsData] = useState([]); // Dynamic State

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error) console.error("Error fetching projects", error);
      else setProjectsData(data);
    };
    fetchProjects();
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      closeModal();
    }
  };

  return (
    <section id="projects">
      <h2 className="section-heading">My Projects</h2>
      <div className="projects-grid">
        {projectsData.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={{
              ...project,
              // Map DB names to Component names if needed (e.g., github_link -> githubLink)
              githubLink: project.github_link,
              liveLink: project.live_link
            }} 
            onClick={openModal} 
          />
        ))}
      </div>

      {/* Modal / Lightbox */}
      {selectedProject && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <button className="modal-close-btn" onClick={closeModal}><FaTimes /></button>
            <div className="modal-image-wrapper">
              <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" />
            </div>
            <div className="modal-details">
              <div className="modal-header">
                <h3 className="modal-title">{selectedProject.title}</h3>
                <div className="modal-links">
                  {selectedProject.github_link && (
                    <a href={selectedProject.github_link} target="_blank" rel="noopener noreferrer"><FaGithub /> Code</a>
                  )}
                  {selectedProject.live_link && (
                    <a href={selectedProject.live_link} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Live</a>
                  )}
                </div>
              </div>
              <p className="modal-description">{selectedProject.description}</p>
              <div className="modal-tech">
                <h4>Technologies Used:</h4>
                <ul className="project-tech-list">
                  {selectedProject.technologies && selectedProject.technologies.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;