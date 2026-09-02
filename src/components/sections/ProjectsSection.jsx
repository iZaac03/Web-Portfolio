import React from 'react';

export default function ProjectsSection({ onOpenArch, onOpenTerminal }) {
  return (
    <section id="projects">
      <div className="section-label">04 — Works &amp; Systems</div>
      <h2 className="section-title">Featured <em>Projects</em></h2>
      <p className="section-intro">A selection of systems architecture, full-stack web applications, and database solutions engineered for scalability and clarity.</p>

      <div className="projects-grid">
        {/* Capstone Architecture */}
        <div className="project-card featured-project">
          <div className="project-badge-top">⭐ Capstone Highlight</div>
          <div className="project-header-row">
            <div>
              <div className="project-tag">Systems Analysis &amp; Database Architecture</div>
              <h3>Senior Capstone System Architecture Blueprint</h3>
            </div>
            <button className="btn-primary" onClick={() => onOpenArch('arch-overview')}>
              📐 Open Blueprint Modal →
            </button>
          </div>
          <p className="project-desc">
            Complete architectural framework engineered for the STI CDO Senior Capstone. 
            Includes 3NF Relational Database Schema, Data Flow Diagrams (Context &amp; Level 1 decomposition), 
            Entity-Relationship Diagrams (Crow's Foot notation), and UML Use Case traceability matrix.
          </p>
          <div className="project-techs">
            <span>MySQL 8.0</span><span>3NF Normalization</span><span>ERD Modeling</span>
            <span>DFD Level 0/1</span><span>UML Use Cases</span><span>Relational Constraints</span>
          </div>
          <div className="project-actions">
            <button className="project-btn primary" onClick={() => onOpenArch('arch-erd')}>View ERD Schema</button>
            <button className="project-btn secondary" onClick={() => onOpenArch('arch-dfd')}>View DFD Flow</button>
            <button className="project-btn secondary" onClick={() => onOpenArch('arch-usecase')}>View Use Cases</button>
          </div>
        </div>

        {/* Cyber Portfolio */}
        <div className="project-card">
          <div>
            <div className="project-tag">Frontend &amp; Audio Engineering</div>
            <h3>Cyber Portfolio &amp; Audio Engine</h3>
            <p>Modern developer portfolio featuring YouTube MP3 streaming with chapter scrubbing, Web Audio synthesis, interactive terminal CLI, MySQL Academy, and Cyber Arcade mini-games.</p>
            <div className="project-techs">
              <span>React 18</span><span>Vite</span><span>Vanilla CSS</span><span>Web Audio API</span><span>MySQL Sandbox</span>
            </div>
          </div>
          <div className="project-actions">
            <a href="https://github.com/iZaac03" target="_blank" rel="noopener noreferrer" className="project-btn primary">GitHub Profile ↗</a>
            <button className="project-btn secondary" onClick={onOpenTerminal}>Open Terminal</button>
          </div>
        </div>

        {/* Laravel Enterprise */}
        <div className="project-card">
          <div>
            <div className="project-tag">Full-Stack · MVC Architecture</div>
            <h3>Laravel Enterprise Web Application</h3>
            <p>Full-stack MVC web application featuring role-based authentication, relational MySQL schema with foreign key constraints, Eloquent ORM migrations, and responsive UI.</p>
            <div className="project-techs">
              <span>Laravel</span><span>PHP</span><span>MySQL</span><span>Blade</span><span>REST API</span>
            </div>
          </div>
          <div className="project-actions">
            <a href="https://github.com/iZaac03" target="_blank" rel="noopener noreferrer" className="project-btn primary">GitHub Profile ↗</a>
            <button className="project-btn secondary" onClick={() => onOpenTerminal('skills')}>Tech Stack</button>
          </div>
        </div>

        {/* Python Tooling */}
        <div className="project-card">
          <div>
            <div className="project-tag">Scripting &amp; Automation</div>
            <h3>Python Automation &amp; Data Tooling</h3>
            <p>A collection of Python scripts developed for automated task execution, file parsing, data cleaning, and academic problem-solving algorithms.</p>
            <div className="project-techs">
              <span>Python 3</span><span>File I/O</span><span>Automation</span><span>Data Processing</span>
            </div>
          </div>
          <div className="project-actions">
            <a href="https://github.com/iZaac03" target="_blank" rel="noopener noreferrer" className="project-btn primary">GitHub Profile ↗</a>
            <button className="project-btn secondary" onClick={() => onOpenTerminal('contact')}>Inquire</button>
          </div>
        </div>
      </div>
    </section>
  );
}
