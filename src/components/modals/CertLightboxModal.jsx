import React from 'react';

export default function CertLightboxModal({ open, imageSrc, title, onClose }) {
  if (!open || !imageSrc) return null;

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lb-inner" onClick={e => e.stopPropagation()}>
        <img src={imageSrc} alt={title || 'Certificate'} />
        <button className="lb-close" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}
