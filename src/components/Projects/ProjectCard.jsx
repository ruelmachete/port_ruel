import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './ProjectCard.css';

const ProjectCard = ({ project, onClick }) => {
  return (
    <div className="project-card" onClick={() => onClick(project)}>
      {/* New Image Section */}
      <div className="project-image-container">
        {/* FIX: Check for project.image_url OR project.image */}
        <img 
            src={project.image_url || project.image} 
            alt={project.title} 
            className="project-card-image" 
        />
        <div className="project-overlay">
          <span>View Details</span>
        </div>
      </div>

      <div className="project-content">
        <header className="project-header">
          <h3 className="project-title">{project.title}</h3>
          <div className="project-links">
            {/* FIX: Check for github_link (Supabase) OR githubLink (Old Data) */}
            {(project.github_link || project.githubLink) && (
              <a 
                href={project.github_link || project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub />
              </a>
            )}
            
            {/* FIX: Check for live_link (Supabase) OR liveLink (Old Data) */}
            {(project.live_link || project.liveLink) && (
              <a 
                href={project.live_link || project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </header>

        <p className="project-description">{project.description}</p>

        <ul className="project-tech-list">
            {/* Handle both Array (Supabase) and String (Possible legacy) */}
            {Array.isArray(project.technologies) 
            ? project.technologies.map((tech, i) => <li key={i}>{tech}</li>)
            : null
            }
        </ul>
      </div>
    </div>
  );
};

export default ProjectCard;