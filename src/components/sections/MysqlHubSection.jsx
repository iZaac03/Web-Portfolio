import React, { useState } from 'react';
import { MYSQL_LESSONS, INITIAL_SQL_DB } from '../../data/lessons';

export default function MysqlHubSection({ onToast }) {
  const [activeLessonKey, setActiveLessonKey] = useState('01-basics');
  const [levelFilter, setLevelFilter] = useState('All');
  const [sqlDb, setSqlDb] = useState(INITIAL_SQL_DB);
  const [queryInput, setQueryInput] = useState('SELECT * FROM tbl_students WHERE gpa >= 3.80 ORDER BY gpa DESC;');
  const [results, setResults] = useState(INITIAL_SQL_DB.tbl_students.filter(s => s.gpa >= 3.80));
  const [statusMsg, setStatusMsg] = useState('✓ 3 row(s) returned in 0.18ms (Query OK)');
  const [isError, setIsError] = useState(false);

  const lessonKeys = Object.keys(MYSQL_LESSONS);
  const filteredKeys = lessonKeys.filter(k => {
    if (levelFilter === 'All') return true;
    return MYSQL_LESSONS[k].level === levelFilter;
  });

  const currentLesson = MYSQL_LESSONS[activeLessonKey] || MYSQL_LESSONS['01-basics'];

  function runQuery(sqlToRun = queryInput) {
    const q = sqlToRun.trim().replace(/;$/, '');
    const startTime = performance.now();

    try {
      let res = [];
      const lower = q.toLowerCase();

      if (lower.startsWith('select')) {
        if (lower.includes('join')) {
          // Relational Multi-Table Join Simulation
          res = sqlDb.tbl_enrollments.map(e => {
            const s = sqlDb.tbl_students.find(st => st.student_id === e.student_id) || {};
            const c = sqlDb.tbl_courses.find(co => co.course_id === e.course_id) || {};
            return {
              student_name: s.student_name || 'Unknown',
              course_code: c.course_code || 'N/A',
              course_name: c.course_name || 'N/A',
              department: c.department || 'N/A',
              grade: e.grade,
              semester: e.semester
            };
          });

          if (lower.includes('avg') || lower.includes('count') || lower.includes('group by')) {
            const grouped = {};
            res.forEach(r => {
              if (!grouped[r.course_name]) grouped[r.course_name] = { course_name: r.course_name, department: r.department, total_enrolled: 0, total_grade: 0 };
              grouped[r.course_name].total_enrolled++;
              grouped[r.course_name].total_grade += r.grade;
            });
            res = Object.values(grouped).map(g => ({
              department: g.department,
              course_name: g.course_name,
              total_enrolled: g.total_enrolled,
              average_grade: (g.total_grade / g.total_enrolled).toFixed(2)
            }));
          } else if (lower.includes('where')) {
            if (lower.includes('3.8') || lower.includes('3.75')) {
              res = res.filter(r => r.grade >= 3.75);
            }
          }
        } else if (lower.includes('tbl_courses')) {
          res = [...sqlDb.tbl_courses];
        } else if (lower.includes('tbl_enrollments')) {
          res = [...sqlDb.tbl_enrollments];
        } else {
          // Default: tbl_students
          res = [...sqlDb.tbl_students];

          if (lower.includes('where')) {
            if (lower.includes('bsit')) {
              res = res.filter(s => s.course === 'BSIT');
            } else if (lower.includes('bscs')) {
              res = res.filter(s => s.course === 'BSCS');
            } else if (lower.includes('3.8')) {
              res = res.filter(s => s.gpa >= 3.8);
            }
          }

          if (lower.includes('avg(') || lower.includes('count(')) {
            const avgGpa = (res.reduce((acc, s) => acc + s.gpa, 0) / res.length).toFixed(2);
            res = [{ total_students: res.length, average_gpa: avgGpa, top_scholar: 'John Isaac Daumar (3.95)' }];
          } else if (lower.includes('order by')) {
            if (lower.includes('desc')) {
              res.sort((a, b) => (b.gpa || 0) - (a.gpa || 0));
            } else {
              res.sort((a, b) => (a.gpa || 0) - (b.gpa || 0));
            }
          }
        }
      } else if (lower.startsWith('insert')) {
        const newStudent = { 
          student_id: sqlDb.tbl_students.length + 1, 
          student_name: 'Alex Rivera', 
          course: 'BSIT', 
          year_level: 1, 
          gpa: 3.88 
        };
        setSqlDb(prev => ({ ...prev, tbl_students: [...prev.tbl_students, newStudent] }));
        res = [{ status: 'SUCCESS', affected_rows: 1, inserted_id: newStudent.student_id, message: 'Record inserted into tbl_students' }];
      } else if (lower.startsWith('update')) {
        setSqlDb(prev => ({
          ...prev,
          tbl_students: prev.tbl_students.map(s => s.student_id === 1 ? { ...s, gpa: 4.00 } : s)
        }));
        res = [{ status: 'SUCCESS', affected_rows: 1, message: 'Updated student_id=1 to GPA=4.00' }];
      } else if (lower.startsWith('delete')) {
        setSqlDb(prev => ({
          ...prev,
          tbl_students: prev.tbl_students.filter(s => s.student_id !== 5)
        }));
        res = [{ status: 'SUCCESS', affected_rows: 1, message: 'Deleted student_id=5 from tbl_students' }];
      } else {
        res = sqlDb.tbl_students;
      }

      const elapsed = (performance.now() - startTime + 0.12).toFixed(2);
      setResults(res);
      setIsError(false);
      setStatusMsg(`✓ ${res.length} row(s) returned in ${elapsed}ms (Query OK)`);
    } catch (err) {
      setIsError(true);
      setStatusMsg(`✗ SQL Execution Error: ${err.message}`);
    }
  }

  function handleQuickChip(sql) {
    setQueryInput(sql);
    runQuery(sql);
  }

  function copyLessonCode() {
    navigator.clipboard.writeText(currentLesson.code);
    onToast(`✓ Copied ${currentLesson.title} SQL Blueprint!`);
  }

  function loadLessonCodeIntoSandbox() {
    // Extract first runnable SELECT query if any, or whole code
    const lines = currentLesson.code.split('\n');
    const selectLine = lines.find(l => l.trim().toUpperCase().startsWith('SELECT'));
    if (selectLine) {
      const queryBlock = lines.slice(lines.indexOf(selectLine)).join('\n').replace(/;\s*$/, '') + ';';
      setQueryInput(queryBlock);
      runQuery(queryBlock);
      onToast('⚡ Loaded tutorial query into sandbox!');
    } else {
      setQueryInput(currentLesson.code);
      onToast('⚡ Code loaded into sandbox editor');
    }
    document.querySelector('.sql-sandbox-card')?.scrollIntoView({ behavior: 'smooth' });
  }

  function resetDb() {
    setSqlDb(INITIAL_SQL_DB);
    setResults(INITIAL_SQL_DB.tbl_students);
    setStatusMsg('✓ capstone_db restored to default schema state');
    onToast('✓ capstone_db restored to default state');
  }

  const headers = results.length > 0 ? Object.keys(results[0]) : [];

  return (
    <section id="mysql-hub">
      <div className="section-label">05 — DATABASE ENGINEERING &amp; TUTORIALS</div>
      <h2 className="section-title">MySQL <em>100% Academy</em> &amp; SQL Sandbox</h2>
      <p className="section-intro">
        A progressive masterclass from <strong>Beginner to Expert</strong> database engineering, authored by 
        <strong> John Isaac Daumar</strong> (Senior Capstone Systems Analyst Lead). Explore DDL schema design, 3NF normalization, 
        indexing, ACID transactions, and live in-browser query execution.
      </p>

      {/* Level Filters */}
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>Filter Level:</span>
        {['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'].map(lvl => (
          <button
            key={lvl}
            className={`btn-ghost-sm ${levelFilter === lvl ? 'active' : ''}`}
            onClick={() => setLevelFilter(lvl)}
            style={{
              borderColor: levelFilter === lvl ? 'var(--accent)' : 'var(--border)',
              background: levelFilter === lvl ? 'rgba(var(--accent-rgb), 0.12)' : 'transparent',
              color: levelFilter === lvl ? 'var(--accent)' : 'var(--text-muted)'
            }}
          >
            {lvl === 'All' ? `All Levels (${lessonKeys.length})` : lvl}
          </button>
        ))}
      </div>
      
      <div className="mysql-hub-grid">
        {/* Left: 12 Progressive Lesson Pills */}
        <div className="mysql-lesson-nav" style={{ maxHeight: '720px', overflowY: 'auto' }}>
          {filteredKeys.map((k, idx) => {
            const l = MYSQL_LESSONS[k];
            return (
              <div 
                key={k} 
                className={`lesson-pill ${activeLessonKey === k ? 'active' : ''}`}
                onClick={() => setActiveLessonKey(k)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <span className="lesson-num">{String(idx + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
                    {l.levelBadge}
                  </span>
                </div>
                <strong>{l.title.replace(/^\d+\s*—\s*/, '')}</strong>
                <span>{l.tag}</span>
              </div>
            );
          })}
        </div>

        {/* Right: Lesson Viewer & Interactive SQL Sandbox */}
        <div className="mysql-workspace">
          {/* Active Lesson Card */}
          <div className="mysql-lesson-view">
            <div className="lesson-view-header">
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', display: 'block', marginBottom: '0.3rem' }}>
                  {currentLesson.levelBadge} · LEVEL {currentLesson.level.toUpperCase()}
                </span>
                <div className="lesson-view-title">{currentLesson.title}</div>
              </div>
              <span className="lesson-tag">{currentLesson.tag}</span>
            </div>

            <div className="lesson-view-body">
              <p style={{ lineHeight: '1.8', color: 'var(--text-muted)', whiteSpace: 'pre-line' }}>
                {currentLesson.body}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0 0.4rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  SQL Blueprint &amp; Syntax:
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-ghost-sm" onClick={copyLessonCode}>
                    📋 Copy Code
                  </button>
                  <button className="btn-ghost-sm" onClick={loadLessonCodeIntoSandbox} style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                    ⚡ Test in Sandbox ↓
                  </button>
                </div>
              </div>

              <div className="lesson-code-block">
                <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                  {currentLesson.code}
                </pre>
              </div>

              <div className="lesson-takeaway">
                {currentLesson.takeaway}
              </div>
            </div>
          </div>

          {/* Interactive SQL Sandbox */}
          <div className="sql-sandbox-card">
            <div className="sandbox-header">
              <div className="sandbox-title">
                <span>🗄️ In-Browser SQL Terminal Sandbox</span>
                <span className="db-badge">MySQL 8.0 / InnoDB (Simulated)</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-ghost-sm" onClick={resetDb}>
                  ↺ Reset Database
                </button>
              </div>
            </div>

            <div className="sandbox-templates">
              <span>Quick Queries:</span>
              <button className="sql-chip" onClick={() => handleQuickChip('SELECT * FROM tbl_students;')}>
                All Students
              </button>
              <button className="sql-chip" onClick={() => handleQuickChip('SELECT * FROM tbl_courses;')}>
                Course Catalog
              </button>
              <button className="sql-chip" onClick={() => handleQuickChip('SELECT * FROM tbl_enrollments;')}>
                Enrollments
              </button>
              <button className="sql-chip" onClick={() => handleQuickChip('SELECT s.student_name, c.course_name, e.grade FROM tbl_students s JOIN tbl_enrollments e ON s.student_id = e.student_id JOIN tbl_courses c ON e.course_id = c.course_id WHERE e.grade >= 3.75;')}>
                Scholars (JOIN)
              </button>
              <button className="sql-chip" onClick={() => handleQuickChip('SELECT c.department, c.course_name, COUNT(e.student_id) AS total_enrolled, AVG(e.grade) AS avg_grade FROM tbl_courses c JOIN tbl_enrollments e ON c.course_id = e.course_id GROUP BY c.course_name;')}>
                Department Stats
              </button>
            </div>

            <div className="sandbox-editor-wrap">
              <textarea 
                className="sql-editor" 
                rows="3" 
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Type any standard SQL statement here (SELECT, INSERT, UPDATE, JOIN, GROUP BY)..."
              ></textarea>
              <button className="sql-run-btn" onClick={() => runQuery()}>
                ▶ Run Query (Ctrl+Enter)
              </button>
            </div>

            <div className="sql-output-wrap">
              <div className={`sql-result-status ${isError ? 'error' : ''}`}>
                {statusMsg}
              </div>

              {results.length > 0 && headers.length > 0 ? (
                <table className="sql-table">
                  <thead>
                    <tr>
                      {headers.map((h, i) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {headers.map((h, cellIdx) => (
                          <td key={cellIdx}>{String(row[h])}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ color: 'var(--text-dim)', fontStyle: 'italic', fontSize: '0.8rem', padding: '0.5rem 0' }}>
                  No matching records returned.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
