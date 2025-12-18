import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSave, FiPlus, FiTrash2, FiCpu, FiUploadCloud, FiPercent } from 'react-icons/fi';

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // State for new/editing skill
  const [formData, setFormData] = useState({ 
    id: null,
    name: '', 
    category: 'Frontend', 
    percentage: 50,
    image: null 
  });

  useEffect(() => { fetchSkills(); }, []);

  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('percentage', { ascending: false }); // Order by highest proficiency
      
    if (error) console.error(error);
    else setSkills(data || []);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name) return toast.error("Skill name is required");
    
    setLoading(true);
    const toastId = toast.loading("Saving...");

    try {
      let imageUrl = formData.image;

      // 1. Handle Image Upload if it's a new file
      if (formData.image instanceof File) {
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `skill-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('portfolio-images')
          .upload(fileName, formData.image);
          
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }

      const payload = {
        name: formData.name,
        category: formData.category,
        percentage: formData.percentage,
        image: imageUrl
      };

      if (formData.id) {
        // Update existing
        const { error } = await supabase.from('skills').update(payload).eq('id', formData.id);
        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase.from('skills').insert([payload]);
        if (error) throw error;
      }
      
      toast.success("Skill Saved!", { id: toastId });
      setFormData({ id: null, name: '', category: 'Frontend', percentage: 50, image: null }); 
      fetchSkills();

    } catch (error) {
      console.error(error);
      toast.error("Failed to save skill", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = async (id) => {
    if(!window.confirm("Delete this skill?")) return;
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) toast.error("Failed to delete");
    else {
      toast.success("Skill removed");
      setSkills(skills.filter(s => s.id !== id));
    }
  };

  const handleEdit = (skill) => {
    setFormData({
      id: skill.id,
      name: skill.name,
      category: skill.category,
      percentage: skill.percentage,
      image: skill.image // Keep existing URL string
    });
    // Scroll to top to see form
    document.querySelector('.admin-editor-content').scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="admin-editor-wrapper">
        
      {/* Header */}
      <div className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FiCpu size={24} color="#64ffda" />
          <h3>Manage Skills</h3>
        </div>
      </div>

      {/* Content */}
      <div className="admin-editor-content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* 1. ADD/EDIT PANEL */}
          <motion.form 
            onSubmit={handleSave}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-editor"
            style={{ 
              padding: '2rem', 
              background: 'rgba(2, 12, 27, 0.4)', 
              border: '1px solid #64ffda',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                <div className="input-group" style={{ marginBottom: 0 }}>
                    <label className="input-label">Skill Name</label>
                    <input 
                    className="edit-input" 
                    placeholder="e.g. MS Excel"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                </div>

                <div className="input-group" style={{ marginBottom: 0 }}>
                    <label className="input-label">Category</label>
                    <input 
                    className="edit-input" 
                    placeholder="e.g. Productivity / Frontend"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    />
                </div>
            </div>

            {/* Percentage Slider */}
            <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span>Proficiency</span>
                    <span style={{color: '#64ffda'}}>{formData.percentage}%</span>
                </label>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    className="edit-input"
                    value={formData.percentage}
                    onChange={e => setFormData({...formData, percentage: parseInt(e.target.value)})}
                    style={{ padding: 0, height: '40px', cursor: 'pointer' }}
                />
            </div>

            {/* Image Upload */}
            <div className="input-group" style={{ marginBottom: 0 }}>
                <label className="input-label">Skill Icon / Logo</label>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <label className="action-btn" style={{ background: 'transparent', border: '1px solid #64ffda', color: '#64ffda', cursor: 'pointer' }}>
                        <FiUploadCloud /> {formData.image ? "Change Icon" : "Upload Icon"}
                        <input 
                            type="file" 
                            hidden 
                            accept="image/*" 
                            onChange={e => setFormData({...formData, image: e.target.files[0]})}
                        />
                    </label>
                    {/* Preview */}
                    {formData.image && (
                        <div style={{width: '50px', height: '50px', background: '#fff', borderRadius: '8px', padding: '5px'}}>
                            <img 
                                src={formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image} 
                                alt="Preview" 
                                style={{width: '100%', height: '100%', objectFit: 'contain'}} 
                            />
                        </div>
                    )}
                </div>
            </div>

            <button 
              type="submit"
              className="action-btn" 
              disabled={loading}
              style={{ justifyContent: 'center' }}
            >
              {formData.id ? <><FiSave /> Update Skill</> : <><FiPlus /> Add Skill</>}
            </button>
            
            {formData.id && (
                <button 
                    type="button"
                    onClick={() => setFormData({ id: null, name: '', category: 'Frontend', percentage: 50, image: null })}
                    style={{ background: 'transparent', border: 'none', color: '#8892b0', cursor: 'pointer', textDecoration: 'underline', alignSelf: 'center' }}
                >
                    Cancel Edit
                </button>
            )}
          </motion.form>

          {/* 2. SKILLS LIST */}
          <motion.div 
            layout 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '1.5rem' 
            }}
          >
            <AnimatePresence>
              {skills.map((skill) => (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  style={{
                    background: 'rgba(17, 34, 64, 0.6)',
                    border: '1px solid rgba(100, 255, 218, 0.1)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    position: 'relative'
                  }}
                >
                  <div style={{width: '60px', height: '60px', background: 'white', borderRadius: '50%', padding: '10px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {skill.image ? (
                        <img src={skill.image} alt={skill.name} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                    ) : (
                        <FiCpu color="black" size={30} />
                    )}
                  </div>

                  <div style={{flex: 1}}>
                    <h4 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>{skill.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: '#8892b0' }}>{skill.category}</span>
                    
                    {/* Progress Bar Preview */}
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '8px', position: 'relative' }}>
                        <div style={{ width: `${skill.percentage}%`, height: '100%', background: '#64ffda', borderRadius: '3px' }}></div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64ffda', marginTop: '4px', textAlign: 'right' }}>{skill.percentage}%</div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <button onClick={() => handleEdit(skill)} className="action-btn" style={{ padding: '5px', borderRadius: '50%', width: '32px', height: '32px', justifyContent: 'center' }}><FiCpu size={14} /></button>
                    <button onClick={() => deleteSkill(skill.id)} className="delete-icon-btn" style={{ borderRadius: '50%', width: '32px', height: '32px', padding: 0 }}><FiTrash2 size={14} /></button>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminSkills;