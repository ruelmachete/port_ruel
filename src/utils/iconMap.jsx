import React from 'react';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaDatabase, FaPython, FaJava, FaAws, FaDocker } from 'react-icons/fa';
import { SiJavascript, SiVite, SiPycharm, SiFlutter, SiGodotengine, SiTailwindcss, SiTypescript, SiMongodb, SiPostgresql, SiFirebase } from 'react-icons/si';
import { TbBrandNextjs } from "react-icons/tb";

// Map string names to actual JSX Components
export const iconMap = {
  "FaReact": <FaReact />,
  "FaNodeJs": <FaNodeJs />,
  "FaHtml5": <FaHtml5 />,
  "FaCss3Alt": <FaCss3Alt />,
  "FaGitAlt": <FaGitAlt />,
  "FaDatabase": <FaDatabase />,
  "FaPython": <FaPython />,
  "FaJava": <FaJava />,
  "FaAws": <FaAws />,
  "FaDocker": <FaDocker />,
  
  "SiJavascript": <SiJavascript />,
  "SiVite": <SiVite />,
  "SiPycharm": <SiPycharm />,
  "SiFlutter": <SiFlutter />,
  "SiGodotengine": <SiGodotengine />,
  "SiTailwindcss": <SiTailwindcss />,
  "SiTypescript": <SiTypescript />,
  "SiMongodb": <SiMongodb />,
  "SiPostgresql": <SiPostgresql />,
  "SiFirebase": <SiFirebase />,
  
  "TbBrandNextjs": <TbBrandNextjs />
};

// Helper to get icon safely
export const getIcon = (iconName) => {
  return iconMap[iconName] || <FaReact />; // Default icon if not found
};