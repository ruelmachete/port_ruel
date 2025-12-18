import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { FaTimes } from 'react-icons/fa';
import './Certificates.css';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error("Error fetching certificates", error);
    else setCertificates(data || []);
  };

  const openModal = (cert) => {
    setSelectedCert(cert);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedCert(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="certificates">
      <h2 className="section-heading">Certifications</h2>
      
      <div className="certificates-grid">
        {certificates.map((cert) => (
          <div key={cert.id} className="cert-card" onClick={() => openModal(cert)}>
            <div className="cert-image-wrapper">
              <img src={cert.image} alt={cert.title} className="cert-image" loading="lazy" />
            </div>
            <div className="cert-content">
              <h3 className="cert-title">{cert.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Modal (Simplified) */}
      {selectedCert && (
        <div className="cert-modal-overlay" onClick={(e) => e.target.className === 'cert-modal-overlay' && closeModal()}>
          <div className="cert-modal-content">
            <button className="modal-close-btn" onClick={closeModal}>
              <FaTimes />
            </button>
            
            <img src={selectedCert.image} alt={selectedCert.title} className="cert-modal-image-full" />
            
            <div className="cert-modal-details">
              <h3 style={{fontSize: '1.5rem', color: '#fff', textAlign: 'center'}}>{selectedCert.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;