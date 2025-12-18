import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import toast from 'react-hot-toast';
import { 
  FiSave, 
  FiPlus, 
  FiTrash2, 
  FiBriefcase, 
  FiAward, 
  FiUser, 
  FiFileText,
  FiCalendar,
  FiBookOpen,
  FiUpload,
  FiLink
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const AdminAbout = () => {
  const [data, setData] = useState({
    about_text: '',
    resume_link: '',
    education: [],
    achievements: []
  });
  const [loading, setLoading] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from('about_content').select('*').eq('id', 1).single();
      if (error) throw error;
      if (data) setData(data);
    } catch (error) {
      console.error(error);
      toast.error("Error loading About data");
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from('about_content').update(data).eq('id', 1);
      if (error) throw error;
      toast.success("About section updated!");
    } catch (error) {
      console.error(error);
      toast.error("Save failed");
    } finally {
      setLoading(false);
    }
  };

  // --- Resume Upload Handler ---
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingResume(true);
    try {
      // 1. Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `resume-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 2. Upload to Supabase (using 'portfolio-images' bucket for simplicity)
      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 3. Get the Public URL
      const { data: urlData } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath);

      // 4. Update the state with the new link
      setData({ ...data, resume_link: urlData.publicUrl });
      toast.success("Resume uploaded! Click Save to apply.");

    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Error uploading file.");
    } finally {
      setUploadingResume(false);
    }
  };

  // --- Education Handlers ---
  const updateEdu = (index, field, value) => {
    const newEdu = [...data.education];
    newEdu[index][field] = value;
    setData({ ...data, education: newEdu });
  };

  const addEdu = () => {
    setData({
      ...data,
      education: [...data.education, { school: '', degree: '', year: '' }]
    });
  };

  const removeEdu = (index) => {
    const newEdu = data.education.filter((_, i) => i !== index);
    setData({ ...data, education: newEdu });
  };

  // --- Achievement Handlers ---
  const updateAch = (index, value) => {
    const newAch = [...data.achievements];
    newAch[index] = value;
    setData({ ...data, achievements: newAch });
  };

  const addAch = () => {
    setData({
      ...data,
      achievements: [...data.achievements, ""]
    });
  };

  const removeAch = (index) => {
    const newAch = data.achievements.filter((_, i) => i !== index);
    setData({ ...data, achievements: newAch });
  };

  // --- Animation Variants ---
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
    <div className="admin-content-area">
      <div className="admin-editor-wrapper">
        
        {/* Sticky Header */}
        <div className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiUser size={24} color="#64ffda" />
            <h3>Edit About Me</h3>
          </div>
          <button className="action-btn" onClick={handleSave} disabled={loading}>
            <FiSave /> {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="admin-editor-content">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
          >
            
            {/* 1. Main Bio Section */}
            <motion.div variants={itemVariants} className="input-group">
              <label className="input-label"><FiFileText style={{marginRight:8}}/> Biography</label>
              <textarea 
                className="edit-textarea" 
                rows={6}
                value={data.about_text} 
                onChange={e => setData({...data, about_text: e.target.value})} 
                placeholder="Tell your story here..."
                style={{ fontSize: '1.05rem', lineHeight: '1.6' }}
              />
            </motion.div>

            {/* 2. Resume Link & Upload */}
            <motion.div variants={itemVariants} className="input-group">
              <label className="input-label"><FiLink style={{marginRight:8}}/> Resume / CV</label>
              
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {/* Text Input for Link */}
                <div style={{ flex: 1 }}>
                  <input 
                    className="edit-input"
                    value={data.resume_link}
                    onChange={e => setData({...data, resume_link: e.target.value})}
                    placeholder="https://example.com/my-resume.pdf"
                  />
                  {data.resume_link && (
                    <a 
                      href={data.resume_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.8rem', color: '#64ffda', marginTop: '5px', display: 'inline-block', textDecoration: 'none' }}
                    >
                      <FiLink /> Test Link
                    </a>
                  )}
                </div>

                {/* Upload Button */}
                <div style={{ position: 'relative' }}>
                  <input 
                    type="file" 
                    id="resume-upload" 
                    onChange={handleResumeUpload}
                    accept=".pdf,.doc,.docx" 
                    style={{ display: 'none' }} 
                  />
                  <label 
                    htmlFor="resume-upload" 
                    className="action-btn" 
                    style={{ 
                      background: 'transparent', 
                      border: '1px solid #64ffda', 
                      color: '#64ffda', 
                      padding: '12px 20px',
                      cursor: uploadingResume ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    {uploadingResume ? (
                      <span>Uploading...</span>
                    ) : (
                      <>
                        <FiUpload /> Upload File
                      </>
                    )}
                  </label>
                </div>
              </div>
            </motion.div>

            {/* 3. Split Grid for Education & Achievements */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
              
              {/* --- EDUCATION COLUMN --- */}
              <motion.div variants={itemVariants}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(100,255,218,0.2)', paddingBottom: '0.5rem' }}>
                  <label className="input-label" style={{ margin: 0, fontSize: '1.1rem' }}>
                    <FiBriefcase style={{marginRight:8}}/> Education
                  </label>
                  <button 
                    onClick={addEdu} 
                    style={{ background: 'transparent', border: '1px solid #64ffda', color: '#64ffda', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
                    title="Add Education"
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(100,255,218,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <FiPlus />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <AnimatePresence>
                    {data.education.map((edu, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: -20 }}
                        className="card-editor"
                        style={{ position: 'relative' }}
                      >
                        <button 
                          onClick={() => removeEdu(i)} 
                          style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', color: '#ff5555', cursor: 'pointer', opacity: 0.7 }}
                          title="Remove"
                        >
                          <FiTrash2 />
                        </button>

                        <div style={{ marginBottom: '10px' }}>
                          <span style={{ fontSize: '0.8rem', color: '#64ffda', textTransform: 'uppercase', letterSpacing: '1px' }}>School / University</span>
                          <input 
                            className="edit-input" 
                            value={edu.school} 
                            onChange={e => updateEdu(i, 'school', e.target.value)} 
                            placeholder="University Name"
                            style={{ fontWeight: 'bold' }}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                          <div>
                            <span style={{ fontSize: '0.8rem', color: '#8892b0' }}><FiBookOpen style={{fontSize:10}}/> Degree</span>
                            <input 
                              className="edit-input" 
                              value={edu.degree} 
                              onChange={e => updateEdu(i, 'degree', e.target.value)} 
                              placeholder="BS Computer Science"
                            />
                          </div>
                          <div>
                            <span style={{ fontSize: '0.8rem', color: '#8892b0' }}><FiCalendar style={{fontSize:10}}/> Year</span>
                            <input 
                              className="edit-input" 
                              value={edu.year} 
                              onChange={e => updateEdu(i, 'year', e.target.value)} 
                              placeholder="2020-2024"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {data.education.length === 0 && <p style={{color: '#8892b0', fontStyle: 'italic', fontSize: '0.9rem'}}>No education entries added.</p>}
                </div>
              </motion.div>

              {/* --- ACHIEVEMENTS COLUMN --- */}
              <motion.div variants={itemVariants}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(100,255,218,0.2)', paddingBottom: '0.5rem' }}>
                  <label className="input-label" style={{ margin: 0, fontSize: '1.1rem' }}>
                    <FiAward style={{marginRight:8}}/> Achievements
                  </label>
                  <button 
                    onClick={addAch} 
                    style={{ background: 'transparent', border: '1px solid #64ffda', color: '#64ffda', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
                    title="Add Achievement"
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(100,255,218,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <FiPlus />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <AnimatePresence>
                    {data.achievements.map((ach, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.9 }}
                        style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
                      >
                        <div style={{ color: '#64ffda' }}><FiAward /></div>
                        <input 
                          className="edit-input" 
                          value={ach} 
                          onChange={e => updateAch(i, e.target.value)} 
                          placeholder="Achievement Title"
                          style={{ margin: 0 }}
                        />
                        <button 
                          onClick={() => removeAch(i)} 
                          className="delete-icon-btn"
                          style={{ flexShrink: 0 }}
                        >
                          <FiTrash2 />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {data.achievements.length === 0 && <p style={{color: '#8892b0', fontStyle: 'italic', fontSize: '0.9rem'}}>No achievements listed.</p>}
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;