import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import toast from 'react-hot-toast';
import { Trash2, Edit, Plus, UploadCloud, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminCertificates = () => {
  const [certs, setCerts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  // Simplified State
  const [formData, setFormData] = useState({ 
    id: null, 
    title: '', 
    image: null 
  });

  useEffect(() => { fetchCerts(); }, []);

  const fetchCerts = async () => {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
        toast.error("Error fetching certificates");
    } else {
        setCerts(data || []);
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
        const fileName = `cert-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('portfolio-images')
          .upload(fileName, formData.image);
          
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }

      // Payload only has title and image
      const payload = { 
        title: formData.title,
        image: imageUrl
      };

      if (formData.id) {
        const { error } = await supabase.from('certificates').update(payload).eq('id', formData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('certificates').insert([payload]);
        if (error) throw error;
      }
      
      toast.success("Certificate Saved!", { id: toastId });
      setIsEditing(false); 
      fetchCerts(); 
      setFormData({ id: null, title: '', image: null });
    } catch (error) { 
        console.error(error);
        toast.error("Error saving certificate", { id: toastId }); 
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete certificate?")) return;
    const { error } = await supabase.from('certificates').delete().eq('id', id);
    if (error) toast.error("Error deleting");
    else {
      toast.success("Certificate deleted");
      fetchCerts();
    }
  };

  return (
    <motion.div className="admin-editor-wrapper" initial={{opacity:0}} animate={{opacity:1}}>
      <div className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={24} color="#64ffda" />
            <h3>{isEditing ? (formData.id ? 'Edit Certificate' : 'New Certificate') : 'Manage Certificates'}</h3>
        </div>
        {!isEditing && <button className="action-btn" onClick={() => setIsEditing(true)}><Plus size={18}/> Add Certificate</button>}
      </div>

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
            onSubmit={handleSave}
            style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}
          >
            <input 
              className="edit-input" 
              placeholder="Certificate Title" 
              value={formData.title || ''} 
              onChange={e=>setFormData({...formData, title:e.target.value})} 
              required 
            />
            
            <label className="edit-input" style={{cursor:'pointer', display:'flex', alignItems:'center', gap:10}}>
              <UploadCloud size={20}/> 
              {formData.image instanceof File 
                ? formData.image.name 
                : (formData.image ? "Change Image" : "Upload Image")}
              <input 
                type="file" 
                hidden 
                accept="image/*" 
                onChange={e=>setFormData({...formData, image:e.target.files[0]})}
              />
            </label>

            {/* Image Preview */}
            {formData.image && typeof formData.image === 'string' && (
                <img src={formData.image} alt="Preview" style={{height: '150px', objectFit: 'contain', alignSelf: 'flex-start', border: '1px solid #333', borderRadius: '8px'}} />
            )}

            <div style={{display:'flex', gap:10, marginTop: '10px'}}>
              <button type="submit" className="action-btn">Save Certificate</button>
              <button type="button" onClick={() => setIsEditing(false)} className="action-btn" style={{background:'transparent', border:'1px solid #8892b0', color:'#8892b0'}}>Cancel</button>
            </div>
          </motion.form>
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', padding: '20px' }}
          >
            {certs.map(cert => (
              <div key={cert.id} style={{background:'#0a192f', border:'1px solid #233554', borderRadius:8, overflow:'hidden', position:'relative', display: 'flex', flexDirection: 'column'}}>
                <div style={{height:180, background:`url(${cert.image}) center/cover no-repeat`, backgroundColor: '#000'}}></div>
                <div style={{padding:15, flex: 1, display: 'flex', flexDirection: 'column'}}>
                  <h4 style={{color:'white', margin:'0 0 10px 0', textAlign: 'center'}}>{cert.title}</h4>
                  
                  <div style={{marginTop: 'auto', display:'flex', gap:10, justifyContent: 'center'}}>
                    <button onClick={() => { setFormData(cert); setIsEditing(true); }} className="action-btn" style={{padding:'5px 10px', fontSize:'0.8rem'}}><Edit size={14}/> Edit</button>
                    <button onClick={() => handleDelete(cert.id)} className="delete-icon-btn"><Trash2 size={14}/></button>
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

export default AdminCertificates;