import React from 'react';

export default function Dashboard({ username, onLogout, onSelectCourse, courses }) {
  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24, background: 'rgba(24,24,31,0.95)', borderRadius: 12, boxShadow: '0 2px 24px #000a' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ color: '#fff' }}>SkillSync Dashboard</h2>
        <button onClick={onLogout} style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer' }}>Logout</button>
      </div>
      <div style={{ marginBottom: 24, color: '#bfc7d5' }}>
        <span>Welcome, <b style={{ color: '#fff' }}>{username}</b>!</span>
      </div>
      <h3 style={{ color: '#fff' }}>My Courses</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {courses.length === 0 && <li style={{ color: '#bfc7d5' }}>No courses enrolled yet.</li>}
        {courses.map(course => (
          <li key={course.id} style={{ marginBottom: 16, padding: 12, border: '1px solid #333', borderRadius: 4, background: 'rgba(36,36,48,0.95)', cursor: 'pointer', color: '#fff' }} onClick={() => onSelectCourse(course)}>
            <span style={{ fontWeight: 500 }}>{course.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
