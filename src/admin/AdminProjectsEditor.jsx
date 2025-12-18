import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // ✅ FIXED IMPORT PATH
import toast from 'react-hot-toast';
import { Trash2, Edit, Plus, UploadCloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminProjectsEditor = () => {
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ 
    id: null, 
    title: '', 
    description: '', 
    technologies: '', 
    github_link: '', 
    live_link: '', 
    image: null 
  });

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error("Error fetching projects", error);
      toast.error("Error loading projects");
    } else {
      setProjects(data || []);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Saving...");
    try {
      let imageUrl = formData.image;
      
      // Handle Image Upload
      if (formData.image instanceof File) {
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `project-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('portfolio-images')
          .upload(fileName, formData.image);
          
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }

      // Prepare payload
      const payload = { 
        title: formData.title,
        description: formData.description,
        technologies: Array.isArray(formData.technologies) 
          ? formData.technologies 
          : formData.technologies.split(',').map(t => t.trim()),
        github_link: formData.github_link,
        live_link: formData.live_link,
        image: imageUrl
      };

      if (formData.id) {
        const { error } = await supabase.from('projects').update(payload).eq('id', formData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('projects').insert([payload]);
        if (error) throw error;
      }
      
      toast.success("Project Saved!", { id: toastId });
      setIsEditing(false); 
      fetchProjects(); 
      setFormData({ id: null, title: '', description: '', technologies: '', github_link: '', live_link: '', image: null });
    } catch (error) { 
      console.error(error);
      toast.error(`Error saving: ${error.message}`, { id: toastId }); 
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete project?")) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) toast.error("Error deleting");
    else {
      toast.success("Project deleted");
      fetchProjects();
    }
  };

  const handleEditClick = (proj) => {
    setFormData({
      ...proj,
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies
    });
    setIsEditing(true);
  };

  return (
    <motion.div className="admin-editor-wrapper" initial={{opacity:0}} animate={{opacity:1}}>
      <div className="admin-header">
        <h3>{isEditing ? (formData.id ? 'Edit Project' : 'New Project') : 'Project Manager'}</h3>
        {!isEditing && <button className="action-btn" onClick={() => setIsEditing(true)}><Plus size={18}/> New Project</button>}
      </div>

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
            onSubmit={handleSave}
            style={{ padding: '20px' }}
          >
            <input className="edit-input" placeholder="Title" value={formData.title || ''} onChange={e=>setFormData({...formData, title:e.target.value})} required style={{marginBottom:15}}/>
            
            <textarea className="edit-textarea" placeholder="Description" rows={4} value={formData.description || ''} onChange={e=>setFormData({...formData, description:e.target.value})} required style={{marginBottom:15}}/>
            
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:15, marginBottom:15}}>
              <input className="edit-input" placeholder="Github URL" value={formData.github_link || ''} onChange={e=>setFormData({...formData, github_link:e.target.value})}/>
              <input className="edit-input" placeholder="Live Demo URL" value={formData.live_link || ''} onChange={e=>setFormData({...formData, live_link:e.target.value})}/>
            </div>
            
            <input className="edit-input" placeholder="Technologies (comma separated)" value={formData.technologies || ''} onChange={e=>setFormData({...formData, technologies:e.target.value})} style={{marginBottom:15}}/>
            
            <label className="edit-input" style={{cursor:'pointer', display:'flex', alignItems:'center', gap:10, marginBottom:20}}>
              <UploadCloud size={20}/> {formData.image instanceof File ? formData.image.name : "Upload Image"}
              <input type="file" hidden accept="image/*" onChange={e=>setFormData({...formData, image:e.target.files[0]})}/>
            </label>

            <div style={{display:'flex', gap:10}}>
              <button type="submit" className="action-btn">Save Project</button>
              <button type="button" onClick={() => setIsEditing(false)} className="action-btn" style={{background:'transparent', border:'1px solid #8892b0', color:'#8892b0'}}>Cancel</button>
            </div>
          </motion.form>
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', padding: '20px' }}
          >
            {projects.map(proj => (
              <div key={proj.id} style={{background:'#0a192f', border:'1px solid #233554', borderRadius:8, overflow:'hidden', position:'relative'}}>
                <div style={{height:150, background:`url(${proj.image}) center/cover`}}></div>
                <div style={{padding:15}}>
                  <h4 style={{color:'white', margin:'0 0 10px 0'}}>{proj.title}</h4>
                  <div style={{display:'flex', gap:10}}>
                    <button onClick={() => handleEditClick(proj)} className="action-btn" style={{padding:'5px 10px', fontSize:'0.8rem'}}><Edit size={14}/> Edit</button>
                    <button onClick={() => handleDelete(proj.id)} className="delete-icon-btn"><Trash2 size={14}/></button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default AdminProjectsEditor;