

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import CourseContent from './CourseContent';
import Courses from './Courses';

function App() {
  const [page, setPage] = useState('landing'); // landing, login, dashboard, course, courses
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [courses, setCourses] = useState([]); // all courses with enrollment
  const [myCourses, setMyCourses] = useState([]); // enrolled courses
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      setLoading(true);
      axios.get('http://localhost:5000/api/courses')
        .then(res => {
          setCourses(res.data.map(c => ({ ...c, enrolled: false })));
        })
        .catch(() => setCourses([]))
        .finally(() => setLoading(false));
    }
  }, [loggedIn]);

  const handleStart = () => setPage('login');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoggedIn(true);
    setPage('dashboard');
  };

  const handleEnroll = async (id) => {
    try {
      await axios.post('http://localhost:5000/api/enroll', { courseId: id });
      const updated = courses.map(course =>
        course.id === id ? { ...course, enrolled: true } : course
      );
      setCourses(updated);
      setMyCourses(updated.filter(c => c.enrolled));
    } catch {
      alert('Enrollment failed');
    }
  };

  useEffect(() => {
    setMyCourses(courses.filter(c => c.enrolled));
  }, [courses]);

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
    setCourses([]);
    setMyCourses([]);
    setPage('landing');
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setPage('course');
  };

  const handleBackToDashboard = () => {
    setSelectedCourse(null);
    setPage('dashboard');
  };


  // Main render logic
  if (page === 'landing') {
    return <LandingPage onStart={handleStart} />;
  }

  if (page === 'login') {
    return (
      <div style={{ fontFamily: 'sans-serif', maxWidth: 400, margin: '60px auto', border: '1px solid #ddd', borderRadius: 8, padding: 32, background: '#fafbfc' }}>
        <h2 style={{ textAlign: 'center', color: '#2d3a4b' }}>SkillSync Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ padding: 10, borderRadius: 4, border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: 12, borderRadius: 4, background: '#2d3a4b', color: '#fff', border: 'none', fontSize: 18 }}>
            Login
          </button>
        </form>
      </div>
    );
  }


  if (page === 'dashboard') {
    return (
      <>
        <Dashboard
          username={username}
          onLogout={handleLogout}
          onSelectCourse={handleSelectCourse}
          courses={myCourses}
        />
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button onClick={() => setPage('courses')} style={{ background: '#2d3a4b', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 28px', fontSize: 18, cursor: 'pointer' }}>
            Browse All Courses
          </button>
        </div>
      </>
    );
  }

  if (page === 'courses') {
    return (
      <Courses
        courses={courses}
        onEnroll={handleEnroll}
        onBack={() => setPage('dashboard')}
      />
    );
  }

  if (page === 'course' && selectedCourse) {
    return (
      <CourseContent course={selectedCourse} onBack={handleBackToDashboard} />
    );
  }

  // fallback
  return <div>Loading...</div>;
}

export default App;
