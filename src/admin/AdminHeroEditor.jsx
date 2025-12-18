import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import toast from 'react-hot-toast';
import { FiSave } from 'react-icons/fi';

const AdminHeroEditor = () => {
  const [content, setContent] = useState({ 
    headline: '', 
    bio: '', 
    cards: [] 
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase.from('hero_content').select('*').eq('id', 1).single();
      if (error) throw error;
      if (data) {
        setContent({
          headline: data.headline || '',
          bio: data.bio || '',
          cards: data.cards || [] 
        });
      }
    } catch (error) {
      console.error('Error fetching hero content:', error);
      toast.error('Could not load content');
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from('hero_content').update({
        headline: content.headline,
        bio: content.bio,
        cards: content.cards
      }).eq('id', 1);

      if (error) throw error;
      toast.success("Hero updated on live site!");
    } catch (error) {
      console.error('Error saving:', error);
      toast.error("Failed to save changes");
    } finally {
      setLoading(false);
    }
  };

  const handleCardChange = (index, field, value) => {
    const newCards = [...content.cards];
    newCards[index] = { ...newCards[index], [field]: value };
    setContent({ ...content, cards: newCards });
  };

  const handleImageUpload = async (event, index) => {
    try {
      setUploading(index);
      const file = event.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `hero-card-${index}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath);

      const newCards = [...content.cards];
      newCards[index] = { ...newCards[index], image: data.publicUrl };
      setContent({ ...content, cards: newCards });
      
      toast.success("Image uploaded!");
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Error uploading image");
    } finally {
      setUploading(null);
    }
  };

  return (
    <div className="admin-content-area">
      <div className="admin-editor-wrapper">
        
        {/* Header - Fixed Top */}
        <div className="admin-header">
          <h3>Edit Hero Section</h3>
          <button className="action-btn" onClick={handleSave} disabled={loading}>
            <FiSave /> {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="admin-editor-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            
            {/* Left Column: Hero Text */}
            <div className="hero-text-editor">
              <div className="input-group">
                <label className="input-label">Headline</label>
                <textarea 
                  className="edit-textarea" 
                  style={{ fontSize: '2rem', fontWeight: 'bold', lineHeight: '1.2' }}
                  value={content.headline}
                  onChange={(e) => setContent({...content, headline: e.target.value})}
                  rows={3}
                  placeholder="e.g. Hi! My Name is Ruel"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Bio / Description</label>
                <textarea 
                  className="edit-textarea"
                  value={content.bio}
                  onChange={(e) => setContent({...content, bio: e.target.value})}
                  rows={5}
                  placeholder="Your short bio here..."
                />
              </div>
            </div>

            {/* Right Column: Cards */}
            <div className="hero-cards-editor">
              <label className="input-label" style={{ marginBottom: '1rem' }}>Profile Cards</label>
              <div className="cards-grid" style={{ gridTemplateColumns: '1fr' }}>
                {content.cards.map((card, index) => (
                  <div key={index} className="card-editor">
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                      
                      {/* Image Preview & Upload (Mini) */}
                      <div style={{ width: '80px', flexShrink: 0 }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333', marginBottom: '5px' }}>
                          {card.image ? (
                            <img src={card.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ width: '100%', height: '100%', background: '#000' }} />
                          )}
                        </div>
                        <label style={{ cursor: 'pointer', fontSize: '0.7rem', color: '#64ffda', display: 'block', textAlign: 'center' }}>
                          {uploading === index ? '...' : 'Upload'}
                          <input type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(e, index)} />
                        </label>
                      </div>

                      {/* Inputs */}
                      <div style={{ flex: 1 }}>
                        <input 
                          className="edit-input" 
                          placeholder="Title" 
                          value={card.title || ''}
                          onChange={(e) => handleCardChange(index, 'title', e.target.value)}
                          style={{ marginBottom: '5px', padding: '8px' }}
                        />
                        <input 
                          className="edit-input" 
                          placeholder="Subtitle" 
                          value={card.subtitle || ''}
                          onChange={(e) => handleCardChange(index, 'subtitle', e.target.value)}
                          style={{ marginBottom: '5px', padding: '8px' }}
                        />
                        <input 
                          className="edit-input" 
                          placeholder="Handle / Tag" 
                          value={card.handle || ''}
                          onChange={(e) => handleCardChange(index, 'handle', e.target.value)}
                          style={{ padding: '8px' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminHeroEditor;