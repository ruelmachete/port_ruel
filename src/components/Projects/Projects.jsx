import React from 'react';
import { projectsData } from '../../data/projectsData';
import ProjectCard from './ProjectCard';
import './Projects.css';

const Projects = () => {
  return (
    <section id="projects">
      <h2 className="section-heading">My Projects</h2>
      <div className="projects-grid">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;