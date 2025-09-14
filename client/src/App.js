

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import CourseContent from './CourseContent';
import Courses from './Courses';

const backgroundStyle = {
  minHeight: '100vh',
  width: '100vw',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: -1,
  background: 'linear-gradient(135deg, #18181f 0%, #23233a 100%)',
  overflow: 'hidden',
};

function GraphBackground() {
  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }} width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.12">
        <path d="M0 800 Q480 600 960 800 T1920 800" stroke="#fff" strokeWidth="2" fill="none"/>
        <path d="M0 600 Q480 400 960 600 T1920 600" stroke="#fff" strokeWidth="2" fill="none"/>
        <path d="M0 400 Q480 200 960 400 T1920 400" stroke="#fff" strokeWidth="2" fill="none"/>
        <circle cx="480" cy="600" r="8" fill="#fff"/>
        <circle cx="960" cy="800" r="8" fill="#fff"/>
        <circle cx="1440" cy="600" r="8" fill="#fff"/>
      </g>
    </svg>
  );
}

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
  return (
    <div style={{ position: 'relative', minHeight: '100vh', minWidth: '100vw', overflow: 'hidden' }}>
      <div style={backgroundStyle}>
        <GraphBackground />
      </div>
      {page === 'landing' && <LandingPage onStart={handleStart} />}
      {page === 'login' && (
        <div style={{ fontFamily: 'sans-serif', maxWidth: 400, margin: '60px auto', border: '1px solid #222', borderRadius: 8, padding: 32, background: 'rgba(30,32,40,0.95)', boxShadow: '0 2px 16px #0008' }}>
          <h2 style={{ textAlign: 'center', color: '#fff' }}>SkillSync Login</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{ padding: 10, borderRadius: 4, border: '1px solid #444', background: '#23233a', color: '#fff' }}
            />
            <button type="submit" style={{ padding: 12, borderRadius: 4, background: '#2d3a4b', color: '#fff', border: 'none', fontSize: 18 }}>
              Login
            </button>
          </form>
        </div>
      )}
      {page === 'dashboard' && (
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
      )}
      {page === 'courses' && (
        <Courses
          courses={courses}
          onEnroll={handleEnroll}
          onBack={() => setPage('dashboard')}
        />
      )}
      {page === 'course' && selectedCourse && (
        <CourseContent course={selectedCourse} onBack={handleBackToDashboard} />
      )}
      {!(page === 'landing' || page === 'login' || page === 'dashboard' || page === 'courses' || (page === 'course' && selectedCourse)) && <div>Loading...</div>}
    </div>
  );

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
