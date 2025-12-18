import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import { supabase } from '../../supabaseClient';
import "./Contact.css";

const Contact = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      const { data } = await supabase.from('contact_info').select('*').eq('id', 1).single();
      setInfo(data);
    };
    fetchInfo();
  }, []);

  if (!info) return null;

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-heading">Get In Touch</h2>
      <p>I'm currently open to new opportunities! Feel free to reach out.</p>

      <div className="contact-icons">
        <a href={`mailto:${info.email}`} target="_blank" rel="noreferrer"><Mail /></a>
        <a href={info.github_url} target="_blank" rel="noreferrer"><Github /></a>
        <a href={info.linkedin_url} target="_blank" rel="noreferrer"><Linkedin /></a>
      </div>

      <button className="email-button" onClick={() => setIsFormVisible(true)}>Say Hello</button>

      {isFormVisible && (
        <div className="contact-form-modal">
          <div className="contact-form">
            <h3>Send Message</h3>
            <form action={info.formspree_url || '#'} method="POST">
              <input type="text" name="name" placeholder="Name" required />
              <input type="email" name="email" placeholder="Email" required />
              <textarea name="message" placeholder="Message" rows="5" required></textarea>
              <button type="submit" className="submit-btn">Send</button>
              <button type="button" className="close-btn" onClick={() => setIsFormVisible(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;