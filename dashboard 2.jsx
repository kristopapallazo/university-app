import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming you saved the CSS from the previous step here

// --- SUB-COMPONENTS ---

// 1. LOGIN PAGE COMPONENT
const LoginPage = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  return (
    <section id="page-login">
      <div className="login-card">
        <div className="uni-logo-container">
          <svg className="uni-logo-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
          </svg>
        </div>
        <h1 className="uni-name">UAMD University</h1>
        <p className="uni-motto">"Illuminating the Future"</p>
        <div className="portal-title">Student Portal</div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Student ID / Email</label>
            <input type="email" className="input-field" placeholder="student@UAMD.edu" required />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input type="password" className="input-field" placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn-university">
            {loading ? "Authenticating..." : "Sign In to Portal"}
          </button>
        </form>
      </div>
    </section>
  );
};

// 2. SIDEBAR COMPONENT
const Sidebar = ({ activePage, setPage, isOpen, setIsOpen }) => {
  return (
    <nav className={`sidebar ${isOpen ? 'active' : ''}`} id="sidebar">
      <div className="logo-area">
        <div className="logo-icon">N</div>
        <span className="logo-text">UAMDUI</span>
      </div>
      <div className="nav-links">
        <a onClick={() => setPage('dashboard')} className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          Dashboard
        </a>
        <a onClick={() => setPage('projects')} className={`nav-item ${activePage === 'projects' ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
          Courses
        </a>
        <a onClick={() => setPage('settings')} className={`nav-item ${activePage === 'settings' ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          Settings
        </a>
      </div>
    </nav>
  );
};

// 3. ENHANCED PROFILE COMPONENT (Inside Settings)
const ProfileSection = ({ showToast }) => {
  const [innerTab, setInnerTab] = useState('personal');

  return (
    <div id="s-tab-profile">
      <div className="profile-cover"></div>
      <div className="profile-layout">
        {/* Left Sidebar */}
        <div className="profile-sidebar">
          <img src="https://picsum.photos/seed/alex/300/300" className="profile-avatar-lg" alt="Profile" />
          <h2 className="profile-name">Alex Morgan</h2>
          <span className="profile-id">ID: 20234891</span>
          <div className="profile-major">Computer Science • Senior</div>
          
          <div style={{ marginTop: '20px', textAlign: 'left' }}>
            <div className="contact-info-row">
              <span className="contact-icon">✉️</span> alex.morgan@UAMD.edu
            </div>
            <div className="contact-info-row">
              <span className="contact-icon">📞</span> +1 (555) 019-2834
            </div>
          </div>
          <button className="btn-outline" style={{ width: '100%', marginTop: '20px', padding: '8px' }}>Edit Avatar</button>
        </div>

        {/* Right Content */}
        <div>
          <div className="profile-tabs">
            <div className={`p-tab ${innerTab === 'personal' ? 'active' : ''}`} onClick={() => setInnerTab('personal')}>Personal Info</div>
            <div className={`p-tab ${innerTab === 'academic' ? 'active' : ''}`} onClick={() => setInnerTab('academic')}>Academic History</div>
            <div className={`p-tab ${innerTab === 'skills' ? 'active' : ''}`} onClick={() => setInnerTab('skills')}>Skills</div>
          </div>

          {innerTab === 'personal' && (
            <div className="settings-card">
              <h3 className="section-title">Basic Information</h3>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" defaultValue="Alex Morgan" />
              </div>
              <button className="btn-sm" onClick={() => showToast('Profile Updated')}>Save Changes</button>
            </div>
          )}

          {innerTab === 'academic' && (
            <div className="settings-card">
              <h3 className="section-title">Education History</h3>
              <div className="timeline-item">
                <div className="timeline-date">2020 - Present</div>
                <div className="font-bold">Bachelor of Science in Computer Science</div>
                <div className="text-sm text-muted">UAMD University</div>
              </div>
            </div>
          )}

          {innerTab === 'skills' && (
            <div className="settings-card">
              <h3 className="section-title">Technical Skills</h3>
              <div className="skill-item">
                <div className="skill-header"><span>Python</span><span>90%</span></div>
                <div className="progress-bg"><div className="progress-fill" style={{ width: '90%' }}></div></div>
              </div>
              <div className="skill-item">
                <div className="skill-header"><span>Web Development</span><span>85%</span></div>
                <div className="progress-bg"><div className="progress-fill" style={{ width: '85%' }}></div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 4. SETTINGS PAGE COMPONENT
const SettingsPage = ({ activeSubTab, setActiveSubTab, showToast }) => {
  return (
    <div className="settings-layout">
      <div className="settings-nav">
        {['profile', 'account', 'notifications', 'security'].map(tab => (
          <a 
            key={tab} 
            onClick={() => setActiveSubTab(tab)} 
            className={`s-nav-item ${activeSubTab === tab ? 'active' : ''}`}
          >
            {tab === 'profile' && '👤 Profile'}
            {tab === 'account' && '💳 Billing'}
            {tab === 'notifications' && '🔔 Notifications'}
            {tab === 'security' && '🔒 Security'}
          </a>
        ))}
      </div>

      <div className="settings-content">
        {activeSubTab === 'profile' && <ProfileSection showToast={showToast} />}
        
        {activeSubTab === 'account' && (
          <div className="settings-card">
            <h3 className="section-title">Tuition Status</h3>
            <div style={{ background: '#eff6ff', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
              <div className="flex justify-between">
                <div>
                  <strong style={{ color: 'var(--primary)' }}>Fall 2023</strong>
                  <p style={{ fontSize: '0.85rem' }}>Balance Due: $4,500</p>
                </div>
                <button className="btn-sm">Pay Now</button>
              </div>
            </div>
          </div>
        )}
        
        {/* Add other tabs similarly... */}
        {activeSubTab !== 'profile' && activeSubTab !== 'account' && (
           <div className="settings-card"><h3 className="section-title">{activeSubTab} settings coming soon</h3></div>
        )}
      </div>
    </div>
  );
};

// 5. MAIN APP COMPONENT
const App = () => {
  const [view, setView] = useState('login'); // 'login', 'dashboard', 'projects', 'settings'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState('profile');
  const [toast, setToast] = useState(null); // { message: string }

  // Toast Logic
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleLogin = () => {
    setView('dashboard');
    setToast({ message: 'Welcome to UAMD University Portal' });
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      setView('login');
      setSidebarOpen(false);
    }
  };

  // Render Login View
  if (view === 'login') {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        {toast && <div className="toast show">{toast.message}</div>}
      </>
    );
  }

  // Render Main App View
  return (
    <div className="flex" style={{ width: '100%' }}>
      <Sidebar 
        activePage={view} 
        setPage={setView} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />
      
      <main className="main-content">
        <header className="top-header">
          <div className="flex items-center">
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
            <h2 style={{ fontSize: '1.25rem', marginLeft: '10px' }}>
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Alex Morgan</span>
            <img src="https://picsum.photos/seed/alex/100/100" className="avatar" alt="User" />
            <button 
              onClick={handleLogout} 
              style={{ color: 'var(--danger)', fontSize: '0.9rem', fontWeight: '600', marginLeft: '10px' }}
            >
              Logout
            </button>
          </div>
        </header>

        <div className="content-wrapper">
          
          {/* DASHBOARD */}
          {view === 'dashboard' && (
            <section className="page-section">
              <div className="flex justify-between items-center" style={{ marginBottom: '32px' }}>
                <h1>Student Overview</h1>
                <button className="btn-sm" onClick={() => setToast({ message: 'Transcript downloaded' })}>Download Transcript</button>
              </div>
              <div className="settings-card">
                <h3 style={{ marginBottom: '12px' }}>Current Semester Stats</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  {[
                    { label: 'GPA', val: '3.8' },
                    { label: 'Credits', val: '12' },
                    { label: 'Attendance', val: '95%' }
                  ].map(stat => (
                    <div key={stat.label} style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
                      <strong>{stat.val}</strong><br />
                      <small style={{ color: 'var(--text-muted)' }}>{stat.label}</small>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* PROJECTS/COURSES */}
          {view === 'projects' && (
            <section className="page-section">
              <h1>My Courses</h1>
              <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>View syllabus, assignments, and grades.</p>
            </section>
          )}

          {/* SETTINGS */}
          {view === 'settings' && (
            <section className="page-section">
              <h1>Account Settings</h1>
              <SettingsPage 
                activeSubTab={settingsTab} 
                setActiveSubTab={setSettingsTab} 
                showToast={(msg) => setToast({ message: msg })} 
              />
            </section>
          )}

        </div>
      </main>

      {toast && <div className="toast show">{toast.message}</div>}
    </div>
  );
};

export default App;