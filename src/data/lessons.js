export const MYSQL_LESSONS = {
  '01-basics': {
    level: 'Beginner',
    levelBadge: '🟢 Beginner',
    title: '01 — Database & Table Fundamentals (DDL Basics)',
    tag: 'DDL & Data Types',
    summary: 'Creating schemas, defining data types (INT, VARCHAR, DECIMAL, TIMESTAMP), and establishing primary keys.',
    body: `Relational Database Management Systems (RDBMS) like MySQL store data in structured tables consisting of rows (records) and columns (attributes). Data Definition Language (DDL) is the foundation where you define schema architecture, precision data types, and primary key identity rules.`,
    code: `-- Step 1: Create Database & Set Character Encoding
CREATE DATABASE IF NOT EXISTS capstone_db
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

USE capstone_db;

-- Step 2: Define Master Entity Table with Primary Key
CREATE TABLE tbl_students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    course VARCHAR(50) NOT NULL DEFAULT 'BSIT',
    year_level TINYINT UNSIGNED NOT NULL CHECK (year_level BETWEEN 1 AND 4),
    gpa DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;`,
    takeaway: '⭐ Best Practice: Always use utf8mb4 for universal unicode support and choose appropriate data types (e.g., DECIMAL for money/grades, TINYINT for small integers) to optimize memory and disk I/O.'
  },

  '02-crud': {
    level: 'Beginner',
    levelBadge: '🟢 Beginner',
    title: '02 — CRUD Operations: INSERT, SELECT, UPDATE & DELETE',
    tag: 'DML Core',
    summary: 'Mastering the 4 fundamental Data Manipulation Language (DML) operations with explicit WHERE safeguards.',
    body: `CRUD represents the four foundational data lifecycle operations in any application backend (Laravel, Node.js, Python): Create (INSERT), Read (SELECT), Update (UPDATE), and Delete (DELETE).`,
    code: `-- 1. CREATE: Insert Single & Batch Records
INSERT INTO tbl_students (student_name, course, year_level, gpa)
VALUES 
    ('John Isaac Daumar', 'BSIT', 4, 3.95),
    ('Maria Santos', 'BSCS', 3, 3.82),
    ('Carlos Reyes', 'BSIT', 4, 3.65);

-- 2. READ: Query Records
SELECT student_id, student_name, course, gpa 
FROM tbl_students;

-- 3. UPDATE: Modify Specific Records with WHERE clause
UPDATE tbl_students 
SET gpa = 3.98, year_level = 4
WHERE student_name = 'John Isaac Daumar';

-- 4. DELETE: Remove Record with Strict Primary Key Filter
DELETE FROM tbl_students 
WHERE student_id = 3;`,
    takeaway: '⚠️ Critical Rule: ALWAYS write and verify your WHERE clause using a SELECT statement first before running an UPDATE or DELETE to prevent wiping out entire tables!'
  },

  '03-filtering': {
    level: 'Beginner',
    levelBadge: '🟢 Beginner',
    title: '03 — Filtering, Pattern Matching & Sorting',
    tag: 'Query Filtering',
    summary: 'Advanced WHERE criteria: AND, OR, BETWEEN, IN, LIKE wildcards, ORDER BY, and LIMIT pagination.',
    body: `Real-world applications require precise filtering to generate reports, search bars, and paginated API responses. Combining logical operators with sorting ensures deterministic and lightning-fast queries.`,
    code: `-- Query Dean's List Scholars (GPA >= 3.80 in IT/CS Departments)
SELECT 
    student_id, 
    student_name, 
    course, 
    gpa 
FROM tbl_students
WHERE course IN ('BSIT', 'BSCS')
  AND gpa BETWEEN 3.75 AND 4.00
  AND student_name LIKE 'John%'
ORDER BY gpa DESC, student_name ASC
LIMIT 10 OFFSET 0; -- Pagination Page 1`,
    takeaway: '⭐ Indexing Tip: Queries using LIKE "term%" can utilize B-Tree indexes, whereas leading wildcards LIKE "%term%" force an expensive full table scan.'
  },

  '04-relations': {
    level: 'Intermediate',
    levelBadge: '🟡 Intermediate',
    title: '04 — Relational Integrity, Foreign Keys & Cascade Rules',
    tag: 'Relational Integrity',
    summary: 'Enforcing referential integrity between parent and child tables with CASCADE, RESTRICT, and SET NULL.',
    body: `Foreign keys enforce business logic relationships across tables. Setting up foreign key constraints guarantees that child records (such as course enrollments) cannot reference non-existent parent records (students or courses).`,
    code: `-- Parent Table 1: Courses
CREATE TABLE tbl_courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(20) NOT NULL UNIQUE,
    course_name VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL,
    units INT NOT NULL DEFAULT 3
) ENGINE=InnoDB;

-- Child Transaction Table with Foreign Key Constraints
CREATE TABLE tbl_enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    grade DECIMAL(3,2) DEFAULT 0.00,
    semester VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_enrollment_student
        FOREIGN KEY (student_id) REFERENCES tbl_students(student_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_enrollment_course
        FOREIGN KEY (course_id) REFERENCES tbl_courses(course_id)
        ON DELETE RESTRICT
) ENGINE=InnoDB;`,
    takeaway: '⭐ Best Practice: Use ON DELETE RESTRICT on master catalogs (courses) to prevent accidental deletions, and ON DELETE CASCADE on transactional child records.'
  },

  '05-aggregation': {
    level: 'Intermediate',
    levelBadge: '🟡 Intermediate',
    title: '05 — Aggregations, GROUP BY & HAVING Analytics',
    tag: 'Data Analytics',
    summary: 'Building analytical metrics using COUNT, AVG, SUM, MIN, MAX, GROUP BY grouping, and HAVING filters.',
    body: `Analytical queries power systems analyst dashboards, administrative grade reports, and department performance metrics. Understanding the execution pipeline between WHERE (pre-filter) and HAVING (post-aggregation filter) is essential.`,
    code: `-- Departmental GPA & Enrollment Analytics Report
SELECT 
    c.department,
    c.course_name,
    COUNT(e.student_id) AS total_enrolled,
    ROUND(AVG(e.grade), 2) AS average_grade,
    MAX(e.grade) AS highest_grade,
    MIN(e.grade) AS lowest_grade
FROM tbl_courses c
LEFT JOIN tbl_enrollments e ON c.course_id = e.course_id
GROUP BY c.department, c.course_name
HAVING total_enrolled > 0
ORDER BY average_grade DESC;`,
    takeaway: '⭐ Key Distinction: WHERE filters raw rows before aggregation occurs; HAVING filters grouped summary rows after aggregations are computed.'
  },

  '06-joins': {
    level: 'Intermediate',
    levelBadge: '🟡 Intermediate',
    title: '06 — Multi-Table Relational JOIN Operations',
    tag: 'Relational Joins',
    summary: 'Mastering INNER JOIN, LEFT OUTER JOIN, RIGHT JOIN, and Self-Joins for complex data projection.',
    body: `JOIN operations project relational views across normalized entities without data duplication. INNER JOIN returns only records that match both tables, whereas LEFT JOIN preserves all parent rows even if no child enrollment exists.`,
    code: `-- Comprehensive Transcript Report with 3-Table Multi-Join
SELECT 
    s.student_id,
    s.student_name,
    s.course AS student_major,
    c.course_code,
    c.course_name,
    e.semester,
    e.grade,
    CASE 
        WHEN e.grade >= 3.75 THEN 'President Lister'
        WHEN e.grade >= 3.50 THEN 'Deans Lister'
        ELSE 'Regular'
    END AS academic_honor
FROM tbl_students s
INNER JOIN tbl_enrollments e ON s.student_id = e.student_id
INNER JOIN tbl_courses c ON e.course_id = c.course_id
WHERE e.grade IS NOT NULL
ORDER BY s.student_name ASC, e.grade DESC;`,
    takeaway: '⭐ Optimization Tip: Always specify table aliases (s, e, c) and join on indexed foreign keys to minimize Cartesian buffer computations.'
  },

  '07-normalization': {
    level: 'Advanced',
    levelBadge: '🟣 Advanced',
    title: '07 — Database Normalization Masterclass: 1NF to 3NF & BCNF',
    tag: 'Systems Architecture',
    summary: 'Eliminating insertion, deletion, and update anomalies through rigorous Third Normal Form decomposition.',
    body: `Normalization is the systematic mathematical process of organizing database fields to eliminate functional redundancy and anomalies:
• 1NF: Atomic values only (no comma-separated lists), unique row identifier (PK).
• 2NF: In 1NF + Zero partial functional dependencies (all columns depend on the whole composite key).
• 3NF: In 2NF + Zero transitive dependencies (non-key columns depend only on the primary key, never on other non-key attributes).`,
    code: `-- BEFORE (Unnormalized 0NF - Violates 3NF due to Transitive Dependency):
-- tbl_unnormalized: [student_id, student_name, dept_id, dept_name, dean_name]
-- Problem: dean_name depends on dept_id, NOT student_id! If all students in a dept drop out, dept info is lost!

-- AFTER (3NF Fully Normalized Schema):
CREATE TABLE tbl_departments (
    dept_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL UNIQUE,
    dean_name VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE tbl_normalized_students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    dept_id INT NOT NULL,
    CONSTRAINT fk_student_dept 
        FOREIGN KEY (dept_id) REFERENCES tbl_departments(dept_id)
) ENGINE=InnoDB;`,
    takeaway: '⭐ The Golden Rule of Systems Analysis: "Every non-key attribute must provide a fact about the key, the whole key, and nothing but the key (so help me Codd)!"'
  },

  '08-subqueries-cte': {
    level: 'Advanced',
    levelBadge: '🟣 Advanced',
    title: '08 — Subqueries, Correlated Queries & CTEs (WITH Clause)',
    tag: 'Advanced SQL',
    summary: 'Writing elegant Common Table Expressions (WITH) and correlated subqueries for complex multi-tier calculations.',
    body: `Subqueries allow you to compute dynamic filter benchmarks inline. Common Table Expressions (CTEs) create clean, reusable temporary named result sets that make complex multi-level SQL logic readable and highly maintainable.`,
    code: `-- Using Common Table Expression (CTE) to Find Above-Average Scholars
WITH CourseAverages AS (
    SELECT 
        course_id,
        AVG(grade) AS class_average
    FROM tbl_enrollments
    GROUP BY course_id
),
TopScholars AS (
    SELECT 
        s.student_name,
        c.course_name,
        e.grade,
        ROUND(ca.class_average, 2) AS class_avg,
        ROUND(e.grade - ca.class_average, 2) AS differential
    FROM tbl_enrollments e
    INNER JOIN tbl_students s ON e.student_id = s.student_id
    INNER JOIN tbl_courses c ON e.course_id = c.course_id
    INNER JOIN CourseAverages ca ON e.course_id = ca.course_id
    WHERE e.grade > ca.class_average
)
SELECT * FROM TopScholars
ORDER BY differential DESC;`,
    takeaway: '⭐ Best Practice: Replace deeply nested subqueries with CTEs (WITH clause) to dramatically enhance query readability and allow query planner reuse.'
  },

  '09-views-indexes': {
    level: 'Advanced',
    levelBadge: '🟣 Advanced',
    title: '09 — Database Views, Security Masking & Virtual Entities',
    tag: 'Data Abstraction',
    summary: 'Creating virtual views to mask sensitive columns and encapsulate complex joins for role-based security.',
    body: `A VIEW is a virtual table defined by an underlying SQL query. Views provide an abstraction layer to encapsulate intricate multi-table joins, enforce row/column access security, and present simplified interfaces to frontend applications.`,
    code: `-- Create Secured Public Academic Roster View (Hiding internal IDs)
CREATE OR REPLACE VIEW vw_public_academic_roster AS
SELECT 
    s.student_name,
    s.course,
    s.year_level,
    c.course_name,
    e.semester,
    e.grade
FROM tbl_students s
INNER JOIN tbl_enrollments e ON s.student_id = e.student_id
INNER JOIN tbl_courses c ON e.course_id = c.course_id;

-- Query the View just like a physical table!
SELECT * FROM vw_public_academic_roster
WHERE grade >= 3.80;`,
    takeaway: '⭐ Security Pattern: Use Views in production to expose analytics to reporting roles without giving direct access to raw underlying tables containing sensitive credentials.'
  },

  '10-indexing': {
    level: 'Expert',
    levelBadge: '🔥 Expert',
    title: '10 — B-Tree Indexing, Composite Keys & Query Optimization',
    tag: 'Performance Tuning',
    summary: 'InnoDB B+Tree storage architecture, clustered vs secondary indexes, and EXPLAIN execution plans.',
    body: `Indexes are specialized B+Tree data structures that accelerate row retrieval from O(N) linear scans to O(log N) logarithmic searches. Understanding clustered indexes (Primary Key data pages) vs secondary indexes avoids costly full table scans.`,
    code: `-- 1. Add Composite Index for Multi-Column Filtering
CREATE INDEX idx_students_course_gpa 
ON tbl_students(course, gpa);

-- 2. Add Unique Index for Identifying Attributes
CREATE UNIQUE INDEX idx_courses_code 
ON tbl_courses(course_code);

-- 3. Analyze Query Execution Plan with EXPLAIN
EXPLAIN FORMAT=JSON
SELECT student_id, student_name, gpa
FROM tbl_students
WHERE course = 'BSIT' AND gpa >= 3.80;`,
    takeaway: '⭐ Indexing Rule: Follow the Leftmost Prefix rule on composite indexes (col1, col2). Only index columns frequently present in WHERE, JOIN ON, and ORDER BY clauses.'
  },

  '11-acid-transactions': {
    level: 'Expert',
    levelBadge: '🔥 Expert',
    title: '11 — ACID Transactions, Row Locks & Concurrency Control',
    tag: 'Database Engineering',
    summary: 'Atomicity, Consistency, Isolation, Durability, row-level locking, and transactional rollback recovery.',
    body: `ACID transactions guarantee enterprise data safety in concurrent systems:
• Atomicity: All operations succeed or all are rolled back.
• Consistency: Invariant constraints and foreign keys remain valid.
• Isolation: Concurrent transactions do not overwrite or read dirty states.
• Durability: Committed updates survive server crashes and power loss.`,
    code: `-- Enterprise Atomic Grade Processing & Audit Trail
START TRANSACTION;

-- Step A: Update Student GPA
UPDATE tbl_students 
SET gpa = 3.98 
WHERE student_id = 1;

-- Step B: Insert Immutable Audit Record
INSERT INTO tbl_audit_logs (user_id, action_type, details)
VALUES (1, 'GPA_RECALCULATED', 'Recalculated semester GPA to 3.98');

-- If all queries succeed without constraint errors:
COMMIT; -- All mutations permanently applied!

-- (If an error occurred, ROLLBACK restores pre-transaction state)`,
    takeaway: '⭐ Systems Design: Wrap dependent multi-entity mutations inside transactions to prevent partial updates from leaving your database in a corrupt, half-written state.'
  },

  '12-triggers-procedures': {
    level: 'Expert',
    levelBadge: '🔥 Expert',
    title: '12 — Stored Procedures, Triggers & Automated Audit Trails',
    tag: 'Server-Side Automation',
    summary: 'Writing server-side stored procedures with parameters and BEFORE/AFTER triggers for automated audit compliance.',
    body: `Stored procedures encapsulate parameterized business logic directly inside the MySQL server engine, reducing network overhead. Triggers automatically execute in response to table events (INSERT, UPDATE, DELETE) to enforce automated audit logs.`,
    code: `-- 1. Automated Audit Log Table
CREATE TABLE tbl_audit_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    old_gpa DECIMAL(3,2),
    new_gpa DECIMAL(3,2),
    modified_by VARCHAR(50) DEFAULT 'SYSTEM',
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Automated Trigger: Log GPA Changes Automatically!
DELIMITER //
CREATE TRIGGER trg_after_student_gpa_update
AFTER UPDATE ON tbl_students
FOR EACH ROW
BEGIN
    IF OLD.gpa <> NEW.gpa THEN
        INSERT INTO tbl_audit_logs (student_id, old_gpa, new_gpa, modified_by)
        VALUES (NEW.student_id, OLD.gpa, NEW.gpa, USER());
    END IF;
END //
DELIMITER ;`,
    takeaway: '⭐ Systems Analyst Note: Database triggers guarantee tamper-proof audit trails regardless of whether updates originate from Laravel web apps, CLI scripts, or manual admin edits.'
  }
};

export const INITIAL_SQL_DB = {
  tbl_students: [
    { student_id: 1, student_name: 'John Isaac Daumar', course: 'BSIT', year_level: 4, gpa: 3.95 },
    { student_id: 2, student_name: 'Maria Santos', course: 'BSCS', year_level: 3, gpa: 3.82 },
    { student_id: 3, student_name: 'Carlos Reyes', course: 'BSIT', year_level: 4, gpa: 3.65 },
    { student_id: 4, student_name: 'Alyssa Chen', course: 'BSIS', year_level: 2, gpa: 3.88 },
    { student_id: 5, student_name: 'Mark Gonzales', course: 'BSCS', year_level: 1, gpa: 3.45 }
  ],
  tbl_courses: [
    { course_id: 101, course_code: 'IT-401', course_name: 'Advanced Database Systems', department: 'IT', units: 3 },
    { course_id: 102, course_code: 'IT-402', course_name: 'Systems Analysis & Design', department: 'IT', units: 3 },
    { course_id: 103, course_code: 'CS-301', course_name: 'Web Applications with Laravel', department: 'CS', units: 3 },
    { course_id: 104, course_code: 'CS-302', course_name: 'Information Security & Cryptography', department: 'CS', units: 3 }
  ],
  tbl_enrollments: [
    { enrollment_id: 1, student_id: 1, course_id: 101, grade: 3.98, semester: '1st Sem 2025-2026' },
    { enrollment_id: 2, student_id: 1, course_id: 102, grade: 4.00, semester: '1st Sem 2025-2026' },
    { enrollment_id: 3, student_id: 2, course_id: 101, grade: 3.75, semester: '1st Sem 2025-2026' },
    { enrollment_id: 4, student_id: 3, course_id: 103, grade: 3.60, semester: '1st Sem 2025-2026' },
    { enrollment_id: 5, student_id: 4, course_id: 102, grade: 3.85, semester: '1st Sem 2025-2026' },
    { enrollment_id: 6, student_id: 5, course_id: 104, grade: 3.40, semester: '1st Sem 2025-2026' }
  ]
};
