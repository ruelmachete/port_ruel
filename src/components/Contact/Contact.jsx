import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import "./Contact.css";

const Contact = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => setIsFormVisible(!isFormVisible);

  return (
    <section id="contact" className="contact-section">
      <motion.h2
        className="section-heading"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Get In Touch
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        I'm currently open to new opportunities and always excited to connect!
        Whether you have a question, a project idea, or just want to say hello,
        feel free to reach out — I’d love to hear from you.
      </motion.p>

      <motion.div
        className="contact-icons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <a
          href="mailto:ruel@example.com"
          aria-label="Email"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail />
        </a>
        <a
          href="https://github.com/yourusername"
          aria-label="GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin />
        </a>
      </motion.div>

      <motion.button
        className="email-button"
        onClick={toggleForm}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Say Hello
      </motion.button>

      {isFormVisible && (
        <motion.div
          className="contact-form-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="contact-form">
            <h3>Send a Message</h3>
            <form
              action="https://formspree.io/f/yourformid"
              method="POST"
              onSubmit={() => setIsFormVisible(false)}
            >
              <input type="text" name="name" placeholder="Your Name" required />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>
              <button type="submit" className="submit-btn">
                Send Message
              </button>
              <button
                type="button"
                className="close-btn"
                onClick={toggleForm}
              >
                Cancel
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Contact;
