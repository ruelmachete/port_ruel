import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiLock, FiMail, FiLogIn } from 'react-icons/fi';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success('Welcome back!');
      navigate('/admin'); 
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Text shadow added for readability on transparent bg */}
        <h2 style={{ color: 'white', marginBottom: '2rem', fontWeight: '800', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
          Admin<span style={{ color: '#64ffda' }}>Login</span>
        </h2>
        
        <form onSubmit={handleLogin}>
          <div className="input-group" style={{ textAlign: 'left' }}>
            <label className="input-label" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              <FiMail style={{ marginRight: '8px' }} /> Email
            </label>
            <input 
              type="email" 
              className="edit-input" 
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              style={{ background: 'rgba(2, 12, 27, 0.8)' }} /* Dark bg for input only */
            />
          </div>
          
          <div className="input-group" style={{ textAlign: 'left' }}>
            <label className="input-label" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              <FiLock style={{ marginRight: '8px' }} /> Password
            </label>
            <input 
              type="password" 
              className="edit-input" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={{ background: 'rgba(2, 12, 27, 0.8)' }} /* Dark bg for input only */
            />
          </div>

          <button 
            type="submit" 
            className="action-btn" 
            style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }} 
            disabled={loading}
          >
            {loading ? 'Signing in...' : <><FiLogIn /> Login</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;