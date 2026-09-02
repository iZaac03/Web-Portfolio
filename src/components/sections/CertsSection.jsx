import React from 'react';

export default function CertsSection({ onOpenLightbox }) {
  const certs = [
    {
      img: '/images/Cert java.png',
      issuer: 'Oracle Academy',
      title: 'Java Fundamentals',
      date: 'Award of Course Completion — June 19, 2024'
    },
    {
      img: '/images/Cert bitskwela.jpg',
      issuer: 'Bitskwela × DICT',
      title: 'Blockchain Developer Event',
      date: 'Certificate of Attendance — June 17–19, 2025 · CDO'
    },
    {
      img: '/images/Cert devcon1.png',
      issuer: 'Devcon CDO × DICT',
      title: 'Geek Up 2025',
      date: 'Certificate of Appreciation — April 5, 2025'
    },
    {
      img: '/images/Cert devcon2.png',
      issuer: 'GDSC Xavier Ateneo',
      title: 'CTRL+ALT+DELVE: Into Code',
      date: 'Certificate of Participation — April 3, 2025'
    }
  ];

  return (
    <section id="certs">
      <div className="section-label">07 — Certifications &amp; Events</div>
      <h2 className="section-title">Credentials &amp; <em>Badges</em></h2>
      <div className="certs-grid">
        {certs.map((c, idx) => (
          <div className="cert-card" key={idx} onClick={() => onOpenLightbox(c.img, c.title)}>
            <div className="cert-img-wrap">
              <img src={c.img} alt={c.title} />
              <div className="cert-overlay">
                <span>🔍 Expand Certificate</span>
              </div>
            </div>
            <div className="cert-info">
              <span className="cert-issuer">{c.issuer}</span>
              <h4>{c.title}</h4>
              <p>{c.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
