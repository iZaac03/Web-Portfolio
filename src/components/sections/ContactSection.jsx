import React, { useState } from 'react';

export default function ContactSection({ onToast }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  function copyText(text, label) {
    navigator.clipboard.writeText(text);
    onToast(`✓ ${label} copied: ${text}`);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);

    const formspreeEndpoint = 'https://formspree.io/f/mqazkxyz';

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSending(false);
        setSuccessMsg(`✓ Thank you, ${formData.name}! Your message was delivered directly to Isaac's inbox.`);
        onToast('✓ Message sent successfully to Isaac!');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSuccessMsg(''), 8000);
        return;
      }
    } catch (err) {
      console.log('Using webmail compose fallback...');
    }

    // Direct Webmail fallback
    setSending(false);
    setSuccessMsg('✓ Prepared dispatch for Isaac! Opening your email client to send...');
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=isaacdaumar03@gmail.com&su=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent("Name: " + formData.name + "\nEmail: " + formData.email + "\n\n" + formData.message)}`;
    const mailto = `mailto:isaacdaumar03@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent("Name: " + formData.name + "\nEmail: " + formData.email + "\n\n" + formData.message)}`;

    window.open(gmailUrl, '_blank') || (window.location.href = mailto);
    onToast('✓ Opened mail draft to isaacdaumar03@gmail.com');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSuccessMsg(''), 8000);
  }

  return (
    <section id="contact">
      <div className="section-label">08 — CONTACT &amp; INQUIRIES</div>
      <h2 className="section-title">Let's <em>Collaborate</em></h2>
      <p className="contact-intro">Open to full-stack development opportunities, systems analysis roles, tech collaborations, or music jam sessions. Reach out directly.</p>
      
      <div className="contact-grid">
        <div className="contact-links">
          <div className="contact-item" onClick={() => copyText('isaacdaumar03@gmail.com', 'Email')} style={{ cursor: 'pointer' }}>
            <span className="contact-icon">✉</span>
            <div>
              <strong>Email Address</strong>
              <span>isaacdaumar03@gmail.com</span>
            </div>
            <span className="contact-copy-badge">Click to Copy</span>
          </div>

          <div className="contact-item" onClick={() => copyText('09167140570', 'Phone')} style={{ cursor: 'pointer' }}>
            <span className="contact-icon">☏</span>
            <div>
              <strong>Phone Number</strong>
              <span>09167140570</span>
            </div>
            <span className="contact-copy-badge">Click to Copy</span>
          </div>

          <div className="contact-item">
            <span className="contact-icon">◎</span>
            <div>
              <strong>Location</strong>
              <span>Puntod, Cagayan De Oro City, Philippines</span>
            </div>
          </div>

          <div className="social-links">
            <a href="https://www.linkedin.com/in/isaac-daumar-bbab81333/" target="_blank" rel="noopener noreferrer" className="social-btn li">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block' }}>
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
            
            <a href="https://github.com/iZaac03" target="_blank" rel="noopener noreferrer" className="social-btn gh">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block' }}>
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span>GitHub</span>
            </a>

            <a href="https://www.facebook.com/johnisaac.daumar/" target="_blank" rel="noopener noreferrer" className="social-btn fb">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block' }}>
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.597 0 9 1.582 9 4.615V8z"/>
              </svg>
              <span>Facebook</span>
            </a>

            <a href="https://www.instagram.com/isaac.daumar/" target="_blank" rel="noopener noreferrer" className="social-btn ig">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block' }}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram</span>
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Your Name" 
              required 
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Your Email Address" 
              required 
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Subject / Purpose" 
              required 
              value={formData.subject}
              onChange={e => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>
          <div className="form-group">
            <textarea 
              placeholder="Your Message..." 
              rows="5" 
              required
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>
          <button type="submit" className="btn-primary" disabled={sending}>
            <span>{sending ? '⚡ Dispatching...' : 'Send Message →'}</span>
          </button>
          {successMsg && (
            <div className="form-success" style={{ display: 'block' }}>
              {successMsg}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
