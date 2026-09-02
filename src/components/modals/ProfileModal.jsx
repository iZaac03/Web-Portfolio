import React from 'react';

export default function ProfileModal({ open, onClose, onOpenResume, onOpenArch, onToast }) {
  if (!open) return null;

  function copyEmail() {
    navigator.clipboard.writeText('isaacdaumar03@gmail.com');
    onToast('✓ Email copied: isaacdaumar03@gmail.com');
  }

  return (
    <div className="cyber-modal open" onClick={(e) => { if (e.target.classList.contains('cyber-modal')) onClose(); }}>
      <div className="cyber-modal-box" style={{ maxWidth: '820px' }}>
        <div className="cyber-modal-header">
          <div className="cyber-modal-title">
            <span className="pulse-dot"></span>
            <span>Developer &amp; Systems Analyst Snapshot</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="profile-modal-body">
          <div className="profile-modal-img-wrap">
            <img src="/images/Profile.jpg" alt="John Isaac Samon Daumar" className="profile-modal-img" />
            <div className="profile-modal-img-badge">Lead Systems Analyst</div>
          </div>

          <div className="profile-modal-details">
            <h3>John Isaac Samon Daumar</h3>
            <div className="profile-modal-role">
              BSIT Student · STI College Cagayan de Oro · Full-Stack Developer
            </div>

            <div className="profile-meta-list">
              <div className="meta-item">
                <span>Degree Track</span>
                <strong>BS Information Technology</strong>
              </div>
              <div className="meta-item">
                <span>Institution</span>
                <strong>STI College CDO</strong>
              </div>
              <div className="meta-item">
                <span>Capstone Role</span>
                <strong>Systems Analyst &amp; Architecture Lead</strong>
              </div>
              <div className="meta-item">
                <span>Location</span>
                <strong>Puntod, CDO, Philippines</strong>
              </div>
              <div className="meta-item">
                <span>Core Database</span>
                <strong>MySQL 100% Mastery</strong>
              </div>
              <div className="meta-item">
                <span>Creative Affinity</span>
                <strong>Guitar &amp; Bass (GNR / Lofi)</strong>
              </div>
            </div>

            <div className="profile-modal-actions">
              <button className="btn-primary" onClick={copyEmail}>
                ✉ Copy Email
              </button>
              <button className="btn-ghost" onClick={() => { onClose(); onOpenResume(); }}>
                📄 Open Full CV
              </button>
              <button className="btn-ghost" onClick={() => { onClose(); onOpenArch(); }}>
                📐 View Architecture
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
