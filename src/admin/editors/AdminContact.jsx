import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

// Icons
import { 
  FiSave, 
  FiMail, 
  FiGithub, 
  FiLinkedin, 
  FiSend, 
  FiLink, 
  FiExternalLink,
  FiAtSign,
  FiGlobe
} from 'react-icons/fi';

const AdminContact = () => {
  const [info, setInfo] = useState({ 
    email: '', 
    github_url: '', 
    linkedin_url: '', 
    formspree_url: '' 
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      const { data, error } = await supabase.from('contact_info').select('*').eq('id', 1).single();
      if (error) throw error;
      if (data) setInfo(data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching contact info");
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from('contact_info').update(info).eq('id', 1);
      if (error) throw error;
      toast.success("Contact settings updated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="admin-content-area">
      <div className="admin-editor-wrapper">
        
        {/* --- Header --- */}
        <div className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiGlobe size={24} color="#64ffda" />
            <h3>Contact Hub</h3>
          </div>
          <button className="action-btn" onClick={handleSave} disabled={loading}>
            <FiSave /> {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* --- Content --- */}
        <div className="admin-editor-content">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '2rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}
          >

            {/* CARD 1: DIRECT CONTACT (Email) */}
            <motion.div variants={cardVariants} className="card-editor" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#64ffda' }}>
                <FiMail size={22} />
                <h4 style={{ margin: 0, fontSize: '1.2rem', color: 'white' }}>Direct Contact</h4>
              </div>
              
              <div className="input-group">
                <label className="input-label">Primary Email Address</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <FiAtSign style={{ position: 'absolute', left: '15px', color: '#8892b0' }} />
                  <input 
                    className="edit-input" 
                    value={info.email} 
                    onChange={e => setInfo({...info, email: e.target.value})}
                    placeholder="youremail@example.com"
                    style={{ paddingLeft: '40px' }}
                  />
                </div>
                <p style={{ fontSize: '0.8rem', color: '#8892b0', marginTop: '5px' }}>
                  Displayed in the hero and footer sections.
                </p>
              </div>
            </motion.div>

            {/* CARD 2: SOCIAL PROFILES */}
            <motion.div variants={cardVariants} className="card-editor" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#64ffda' }}>
                <FiLink size={22} />
                <h4 style={{ margin: 0, fontSize: '1.2rem', color: 'white' }}>Social Profiles</h4>
              </div>

              {/* Github */}
              <div className="input-group">
                <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>GitHub Profile</span>
                  {info.github_url && (
                    <a href={info.github_url} target="_blank" rel="noreferrer" style={{ color: '#64ffda', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontSize: '0.75rem' }}>
                      Test <FiExternalLink />
                    </a>
                  )}
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <FiGithub style={{ position: 'absolute', left: '15px', color: '#8892b0' }} />
                  <input 
                    className="edit-input" 
                    value={info.github_url} 
                    onChange={e => setInfo({...info, github_url: e.target.value})}
                    placeholder="https://github.com/username"
                    style={{ paddingLeft: '40px' }}
                  />
                </div>
              </div>

              {/* LinkedIn */}
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>LinkedIn Profile</span>
                  {info.linkedin_url && (
                    <a href={info.linkedin_url} target="_blank" rel="noreferrer" style={{ color: '#64ffda', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontSize: '0.75rem' }}>
                      Test <FiExternalLink />
                    </a>
                  )}
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <FiLinkedin style={{ position: 'absolute', left: '15px', color: '#8892b0' }} />
                  <input 
                    className="edit-input" 
                    value={info.linkedin_url} 
                    onChange={e => setInfo({...info, linkedin_url: e.target.value})}
                    placeholder="https://linkedin.com/in/username"
                    style={{ paddingLeft: '40px' }}
                  />
                </div>
              </div>
            </motion.div>

            {/* CARD 3: BACKEND CONFIG (Formspree) */}
            <motion.div 
              variants={cardVariants} 
              className="card-editor" 
              style={{ 
                padding: '2rem', 
                gridColumn: '1 / -1', // Span full width
                background: 'linear-gradient(145deg, rgba(2,12,27,0.6) 0%, rgba(100,255,218,0.05) 100%)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#64ffda' }}>
                <FiSend size={22} />
                <h4 style={{ margin: 0, fontSize: '1.2rem', color: 'white' }}>Contact Form Backend</h4>
              </div>
              
              <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Formspree Endpoint URL</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
                    <FiGlobe style={{ position: 'absolute', left: '15px', color: '#8892b0' }} />
                    <input 
                      className="edit-input" 
                      value={info.formspree_url} 
                      onChange={e => setInfo({...info, formspree_url: e.target.value})}
                      placeholder="https://formspree.io/f/your_form_id"
                      style={{ paddingLeft: '40px', fontFamily: 'monospace', marginBottom: 0 }}
                    />
                  </div>
                  {info.formspree_url && (
                     <motion.div
                       initial={{ scale: 0 }}
                       animate={{ scale: 1 }}
                       style={{ background: '#0a192f', padding: '10px 15px', borderRadius: '6px', border: '1px solid #64ffda', color: '#64ffda', fontSize: '0.8rem', display: 'flex', alignItems: 'center' }}
                     >
                       <span style={{ width: '8px', height: '8px', background: '#64ffda', borderRadius: '50%', display: 'inline-block', marginRight: '8px', boxShadow: '0 0 8px #64ffda' }}></span>
                       Active
                     </motion.div>
                  )}
                </div>
                <p style={{ fontSize: '0.85rem', color: '#8892b0', marginTop: '10px', lineHeight: '1.5' }}>
                  This URL connects your portfolio's contact form to your email. 
                  Create one at <a href="https://formspree.io" target="_blank" rel="noreferrer" style={{ color: '#64ffda', textDecoration: 'underline' }}>formspree.io</a>.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminContact;