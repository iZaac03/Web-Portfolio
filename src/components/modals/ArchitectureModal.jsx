import React, { useState, useEffect } from 'react';

export default function ArchitectureModal({ open, initialTab = 'arch-overview', onClose }) {
  const [activeTab, setActiveTab] = useState('arch-overview');

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab, open]);

  if (!open) return null;

  return (
    <div className="cyber-modal open" onClick={(e) => { if (e.target.classList.contains('cyber-modal')) onClose(); }}>
      <div className="cyber-modal-box" style={{ maxWidth: '900px' }}>
        <div className="cyber-modal-header">
          <div className="cyber-modal-title">
            <span className="pulse-dot"></span>
            <span>Senior Capstone System Architecture Specifications</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="arch-modal-nav">
          <button 
            className={`arch-tab-btn ${activeTab === 'arch-overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('arch-overview')}
          >
            📋 Overview
          </button>
          <button 
            className={`arch-tab-btn ${activeTab === 'arch-erd' ? 'active' : ''}`}
            onClick={() => setActiveTab('arch-erd')}
          >
            🗄️ Relational Schema (ERD)
          </button>
          <button 
            className={`arch-tab-btn ${activeTab === 'arch-dfd' ? 'active' : ''}`}
            onClick={() => setActiveTab('arch-dfd')}
          >
            🔄 DFD Level 0 &amp; 1 Flow
          </button>
          <button 
            className={`arch-tab-btn ${activeTab === 'arch-usecase' ? 'active' : ''}`}
            onClick={() => setActiveTab('arch-usecase')}
          >
            👤 Use Case Matrix
          </button>
        </div>

        <div className="arch-modal-content">
          {activeTab === 'arch-overview' && (
            <div className="arch-tab-content active">
              <div className="arch-header">
                <h3>System Architecture Overview &amp; Requirements</h3>
                <p>Designed and modeled by <strong>John Isaac Samon Daumar</strong> (Systems Analyst Lead) for the STI College Cagayan de Oro Senior Capstone.</p>
              </div>
              <div className="erd-grid">
                <div className="erd-table">
                  <div className="erd-table-header"><span>Functional Specifications</span></div>
                  <ul className="erd-field-list">
                    <li className="erd-field"><span>Role-Based Access Control</span></li>
                    <li className="erd-field"><span>Automated Audit Logging</span></li>
                    <li className="erd-field"><span>Parameterized SQL Queries</span></li>
                    <li className="erd-field"><span>Enrollment &amp; GPA Analytics</span></li>
                  </ul>
                </div>
                <div className="erd-table">
                  <div className="erd-table-header"><span>Non-Functional Specs</span></div>
                  <ul className="erd-field-list">
                    <li className="erd-field"><span className="pk">&lt;50ms Query Latency</span></li>
                    <li className="erd-field"><span>3NF Normalized Database</span></li>
                    <li className="erd-field"><span>ACID Transaction Integrity</span></li>
                    <li className="erd-field"><span>Full Mobile/Desktop UI</span></li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'arch-erd' && (
            <div className="arch-tab-content active">
              <div className="arch-header">
                <h3>Entity-Relationship Diagram &amp; 3NF Schema</h3>
                <p>Relational entities modeled in Third Normal Form (3NF) to guarantee zero functional transitive dependencies.</p>
              </div>
              <div className="lesson-code-block" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                <pre>{`-- CAPSTONE RELATIONAL DATABASE SCHEMA (3NF NORMALIZED)
-- LEAD SYSTEMS ANALYST: JOHN ISAAC SAMON DAUMAR

CREATE TABLE tbl_roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE tbl_users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    CONSTRAINT fk_users_role FOREIGN KEY (role_id) 
        REFERENCES tbl_roles(role_id) ON DELETE RESTRICT
) ENGINE=InnoDB;

CREATE TABLE tbl_students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    student_number VARCHAR(20) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    course VARCHAR(50) NOT NULL,
    year_level INT NOT NULL,
    gpa DECIMAL(3,2) DEFAULT 0.00,
    CONSTRAINT fk_students_user FOREIGN KEY (user_id) 
        REFERENCES tbl_users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE tbl_courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(20) NOT NULL UNIQUE,
    course_name VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL,
    units INT NOT NULL DEFAULT 3
) ENGINE=InnoDB;

CREATE TABLE tbl_enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    semester VARCHAR(20) NOT NULL,
    grade DECIMAL(3,2),
    CONSTRAINT fk_enroll_student FOREIGN KEY (student_id) 
        REFERENCES tbl_students(student_id) ON DELETE CASCADE,
    CONSTRAINT fk_enroll_course FOREIGN KEY (course_id) 
        REFERENCES tbl_courses(course_id) ON DELETE RESTRICT
) ENGINE=InnoDB;`}</pre>
              </div>
            </div>
          )}

          {activeTab === 'arch-dfd' && (
            <div className="arch-tab-content active">
              <div className="arch-header">
                <h3>Data Flow Diagrams (DFD Level 0 &amp; Level 1)</h3>
                <p>Gane &amp; Sarson notation tracking data flows from external entities into transaction processes.</p>
              </div>
              <div className="dfd-flow">
                <div className="dfd-step">
                  <span className="dfd-badge">DFD 0.0</span>
                  <div className="dfd-text">
                    <strong>Context Level System Boundary</strong>
                    <p>[Student / Faculty] ➔ Credentials &amp; Requests ➔ (0.0 System Engine) ➔ Reports ➔ [Admin / Dean]</p>
                  </div>
                </div>
                <div className="dfd-step">
                  <span className="dfd-badge">DFD 1.1</span>
                  <div className="dfd-text">
                    <strong>User Authentication Sub-Process</strong>
                    <p>Validates credentials against data store (D1: tbl_users) with bcrypt hashing.</p>
                  </div>
                </div>
                <div className="dfd-step">
                  <span className="dfd-badge">DFD 1.2</span>
                  <div className="dfd-text">
                    <strong>Course Enrollment &amp; Grading Pipeline</strong>
                    <p>Verifies prerequisites in (D2: tbl_courses) and persists transaction in (D3: tbl_enrollments).</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'arch-usecase' && (
            <div className="arch-tab-content active">
              <div className="arch-header">
                <h3>UML Use Case Specification Matrix</h3>
                <p>Actor interaction boundary and preconditions mapping.</p>
              </div>
              <table className="spec-table">
                <thead>
                  <tr>
                    <th>Actor</th>
                    <th>Use Case</th>
                    <th>Preconditions</th>
                    <th>Postconditions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Student</td>
                    <td>Enroll into Course</td>
                    <td>Authenticated, Active Semester</td>
                    <td>Record saved in tbl_enrollments</td>
                  </tr>
                  <tr>
                    <td>Faculty</td>
                    <td>Submit Grades</td>
                    <td>Course Instructor Assigned</td>
                    <td>Grades updated, Audit Log created</td>
                  </tr>
                  <tr>
                    <td>Admin / Analyst</td>
                    <td>Generate Systems Analytics</td>
                    <td>Admin privileges</td>
                    <td>Aggregated GPA &amp; Enrollment report</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
