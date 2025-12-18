import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiLogOut, FiLayout, FiUser, FiCode, FiGrid, FiMail, FiExternalLink, FiCommand, FiAward } from 'react-icons/fi';
import './Admin.css'; 

// Import Editors
import AdminHeroEditor from './AdminHeroEditor'; 
import AdminProjectsEditor from './AdminProjectsEditor'; 
import AdminAbout from './editors/AdminAbout';
import AdminSkills from './editors/AdminSkills';
import AdminContact from './editors/AdminContact';
import AdminCertificates from './editors/AdminCertificates'; // NEW IMPORT

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hero');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/login');
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const tabs = [
    { id: 'hero', icon: <FiLayout />, label: 'Hero' },
    { id: 'about', icon: <FiUser />, label: 'About' },
    { id: 'skills', icon: <FiCode />, label: 'Skills' },
    { id: 'projects', icon: <FiGrid />, label: 'Projects' },
    { id: 'certificates', icon: <FiAward />, label: 'Certificates' }, // NEW TAB
    { id: 'contact', icon: <FiMail />, label: 'Contact' },
  ];

  return (
    <div className="admin-container">
      <Toaster position="top-right" toastOptions={{ style: { background: '#112240', color: '#64ffda', border: '1px solid #64ffda' } }} />
      
      {/* Navbar */}
      <nav className="admin-navbar">
        <div className="admin-logo">
          <FiCommand className="logo-icon" style={{color: '#64ffda'}} />
          Admin<span className="logo-highlight">Panel</span>
        </div>

        <div className="nav-links-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="nav-actions">
          <a href="/" target="_blank" className="site-link">
            <FiExternalLink /> View Site
          </a>
          <button onClick={handleLogout} className="logout-btn">
            <FiLogOut /> Logout
          </button>
        </div>
      </nav>

      {/* Content Area */}
      <motion.div 
        className="admin-content-area"
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'hero' && <AdminHeroEditor />}
        {activeTab === 'about' && <AdminAbout />}
        {activeTab === 'skills' && <AdminSkills />}
        {activeTab === 'projects' && <AdminProjectsEditor />}
        {activeTab === 'certificates' && <AdminCertificates />} {/* NEW COMPONENT */}
        {activeTab === 'contact' && <AdminContact />}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;