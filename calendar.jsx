<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UAMD portal</title>
    <style>
        /* --- CORE VARIABLES --- */
        :root {
            --primary: #6366f1; 
            --primary-hover: #4f46e5;
            --bg-body: #f8fafc;
            --bg-card: #ffffff;
            --text-main: #1e293b;
            --text-muted: #64748b;
            --border: #e2e8f0;
            --danger: #ef4444;
            --success: #10b981;
            
            /* University Blue Specifics */
            --uni-blue-dark: #1e3a8a;
            --uni-blue-light: #3b82f6;
            
            --sidebar-width: 260px;
            --radius: 12px;
            --header-height: 70px;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
        body { background: var(--bg-body); color: var(--text-main); display: flex; min-height: 100vh; overflow-x: hidden; }
        a { text-decoration: none; color: inherit; cursor: pointer; }
        button { cursor: pointer; font-family: inherit; border: none; background: none; }

        /* --- UTILS --- */
        .hidden { display: none !important; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .justify-between { justify-content: space-between; }
        .gap-2 { gap: 8px; }
        .gap-4 { gap: 16px; }
        .mb-4 { margin-bottom: 16px; }
        .text-sm { font-size: 0.875rem; }
        .font-bold { font-weight: 700; }
        
        /* --- LOGIN PAGE --- */
        #page-login {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(135deg, var(--uni-blue-dark) 0%, var(--uni-blue-light) 100%);
            z-index: 100; display: flex; align-items: center; justify-content: center;
        }
        .login-card {
            background: white; width: 100%; max-width: 420px;
            padding: 40px; border-radius: 16px;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
            text-align: center;
        }
        .uni-logo-container {
            width: 80px; height: 80px;
            background: var(--uni-blue-dark);
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex; align-items: center; justify-content: center;
            border: 4px solid white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .uni-logo-svg { width: 48px; height: 48px; fill: white; }
        .uni-name { font-family: 'Georgia', serif; font-size: 1.75rem; font-weight: 700; color: var(--uni-blue-dark); margin-bottom: 4px; }
        .uni-motto { font-family: 'Georgia', serif; font-style: italic; color: var(--text-muted); margin-bottom: 30px; font-size: 0.95rem; }
        .portal-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 24px; color: var(--text-main); text-transform: uppercase; letter-spacing: 1px; }
        .input-group { margin-bottom: 20px; text-align: left; }
        .input-label { display: block; margin-bottom: 8px; font-size: 0.85rem; font-weight: 600; color: var(--uni-blue-dark); }
        .input-field { width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 0.95rem; transition: 0.2s; }
        .input-field:focus { outline: none; border-color: var(--uni-blue-light); box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
        .btn-university { width: 100%; background: var(--uni-blue-dark); color: white; padding: 14px; border-radius: 8px; font-weight: 600; margin-top: 10px; transition: background 0.2s; }
        .btn-university:hover { background: #172554; }

        /* --- APP LAYOUT --- */
        .sidebar {
            width: var(--sidebar-width);
            background: var(--bg-card);
            border-right: 1px solid var(--border);
            position: fixed; height: 100vh; left: 0; top: 0; z-index: 20;
            display: flex; flex-direction: column;
            transition: transform 0.3s ease;
        }
        .logo-area { height: var(--header-height); display: flex; align-items: center; padding: 0 24px; border-bottom: 1px solid var(--border); }
        .logo-icon { width: 32px; height: 32px; background: var(--primary); color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; }
        .logo-text { font-size: 1.25rem; font-weight: 700; }
        
        .nav-links { padding: 24px 16px; flex: 1; overflow-y: auto; }
        .nav-item {
            display: flex; align-items: center; padding: 12px 16px;
            border-radius: var(--radius); color: var(--text-muted); font-weight: 500;
            margin-bottom: 4px; transition: 0.2s;
        }
        .nav-item:hover { background-color: #f1f5f9; color: var(--primary); }
        .nav-item.active { background-color: #e0e7ff; color: var(--primary); }
        .nav-item svg { width: 20px; height: 20px; margin-right: 12px; }

        .main-content { margin-left: var(--sidebar-width); flex: 1; display: flex; flex-direction: column; width: calc(100% - var(--sidebar-width)); transition: margin 0.3s; }
        .top-header { height: var(--header-height); background: var(--bg-body); display: flex; align-items: center; justify-content: space-between; padding: 0 32px; position: sticky; top: 0; z-index: 10; }
        .menu-toggle { display: none; font-size: 1.5rem; margin-right: 16px; }
        .avatar { width: 36px; height: 36px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); object-fit: cover; }

        .content-wrapper { padding: 32px; }
        .page-section { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        /* --- SETTINGS LAYOUT --- */
        .settings-layout { display: flex; gap: 32px; height: calc(100vh - 160px); }
        .settings-nav { width: 220px; flex-shrink: 0; overflow-y: auto; padding-right: 8px; }
        .settings-content { flex: 1; overflow-y: auto; padding-right: 16px; }
        .s-nav-item { display: block; padding: 10px 16px; border-radius: 8px; margin-bottom: 2px; color: var(--text-muted); font-size: 0.9rem; transition: 0.2s; white-space: nowrap; }
        .s-nav-item:hover { background: #f1f5f9; color: var(--text-main); }
        .s-nav-item.active { background: #eff6ff; color: var(--primary); font-weight: 600; }
        
        .settings-card { background: white; padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); margin-bottom: 24px; }
        .section-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; }
        
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.9rem; }
        .form-input { width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 0.9rem; }
        .btn-sm { padding: 6px 12px; font-size: 0.85rem; border-radius: 6px; background: var(--primary); color: white; }
        .btn-outline { border: 1px solid var(--border); padding: 6px 12px; border-radius: 6px; font-size: 0.85rem; }
        
        /* Toggle Switch */
        .switch-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f8fafc; }
        .switch-row:last-child { border-bottom: none; }
        .switch { position: relative; display: inline-block; width: 40px; height: 22px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #cbd5e1; transition: .4s; border-radius: 22px; }
        .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
        input:checked + .slider { background-color: var(--primary); }
        input:checked + .slider:before { transform: translateX(18px); }

        /* --- ENHANCED PROFILE PAGE STYLES --- */
        .profile-cover {
            height: 160px;
            background: linear-gradient(to right, var(--uni-blue-dark), var(--uni-blue-light));
            border-radius: var(--radius);
            position: relative;
            margin-bottom: 60px;
            background-image: url('https://picsum.photos/seed/library/1200/300'); /* Overlay image */
            background-size: cover;
            background-position: center;
        }
        .profile-cover::after {
            content: ''; position: absolute; top:0; left:0; right:0; bottom:0;
            background: rgba(30, 58, 138, 0.7); /* Blue overlay */
            border-radius: var(--radius);
        }

        .profile-layout {
            display: grid;
            grid-template-columns: 280px 1fr;
            gap: 32px;
            margin-top: -40px; /* Pull up to overlap cover */
            position: relative;
            z-index: 5;
        }

        .profile-sidebar {
            background: white;
            border-radius: var(--radius);
            padding: 24px;
            text-align: center;
            border: 1px solid var(--border);
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }

        .profile-avatar-lg {
            width: 120px; height: 120px;
            border-radius: 50%;
            border: 4px solid white;
            margin-top: -60px; /* Float above cover */
            object-fit: cover;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .profile-name { font-size: 1.25rem; font-weight: 700; margin: 12px 0 4px; }
        .profile-id { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 16px; display: block; }
        .profile-major { 
            background: #e0e7ff; color: var(--uni-blue-dark); 
            padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; display: inline-block; margin-bottom: 24px;
        }

        .contact-info-row { display: flex; align-items: center; gap: 12px; text-align: left; padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; }
        .contact-icon { width: 24px; color: var(--uni-blue-dark); }

        /* Profile Inner Tabs */
        .profile-tabs { display: flex; gap: 24px; border-bottom: 1px solid var(--border); margin-bottom: 24px; }
        .p-tab { padding-bottom: 12px; color: var(--text-muted); font-weight: 500; cursor: pointer; border-bottom: 2px solid transparent; transition: 0.2s; }
        .p-tab:hover { color: var(--primary); }
        .p-tab.active { color: var(--primary); border-color: var(--primary); }

        /* Skills Progress Bars */
        .skill-item { margin-bottom: 16px; }
        .skill-header { display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 6px; }
        .progress-bg { height: 8px; background: #f1f5f9; border-radius: 4px; overflow: hidden; }
        .progress-fill { height: 100%; background: var(--uni-blue-dark); border-radius: 4px; width: 0; transition: width 1s ease; }

        /* Timeline */
        .timeline-item { padding-left: 20px; border-left: 2px solid var(--border); position: relative; padding-bottom: 24px; }
        .timeline-item::before { content: ''; position: absolute; left: -6px; top: 0; width: 10px; height: 10px; background: var(--uni-blue-dark); border-radius: 50%; }
        .timeline-date { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px; }

        /* Toast */
        .toast { position: fixed; bottom: 20px; right: 20px; background: white; border-left: 4px solid var(--uni-blue-dark); padding: 16px 24px; border-radius: 4px; box-shadow: 0 10px 15px rgba(0,0,0,0.1); transform: translateY(100px); opacity: 0; transition: 0.3s; z-index: 200; }
        .toast.show { transform: translateY(0); opacity: 1; }

        @media (max-width: 768px) {
            .sidebar { transform: translateX(-100%); }
            .sidebar.active { transform: translateX(0); }
            .main-content { margin-left: 0; width: 100%; }
            .menu-toggle { display: block; }
            .settings-layout, .profile-layout { flex-direction: column; height: auto; grid-template-columns: 1fr; }
            .settings-nav { width: 100%; display: flex; overflow-x: auto; gap: 8px; padding-bottom: 8px; margin-bottom: 16px; }
            .s-nav-item { white-space: nowrap; }
        }
    </style>
</head>
<body>

    <!-- LOGIN PAGE -->
    <section id="page-login">
        <div class="login-card">
            <div class="uni-logo-container">
                <svg class="uni-logo-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                </svg>
            </div>
            <h1 class="uni-name">UAMD University</h1>
            <p class="uni-motto">"Since 1396"</p>
            <div class="portal-title">Student Portal</div>
            <form onsubmit="handleLogin(event)">
                <div class="input-group">
                    <label class="input-label">Student ID / Email</label>
                    <input type="email" class="input-field" placeholder="student@nexus.edu" required>
                </div>
                <div class="input-group">
                    <label class="input-label">Password</label>
                    <input type="password" class="input-field" placeholder="••••••••" required>
                </div>
                <button type="submit" class="btn-university">Sign In to Portal</button>
            </form>
        </div>
    </section>

    <!-- MAIN APP -->
    <div id="app-container" class="hidden" style="display: flex; width: 100%;">
        
        <!-- SIDEBAR -->
        <nav class="sidebar" id="sidebar">
            <div class="logo-area">
                <div class="logo-icon">N</div>
                <span class="logo-text">NexusUI</span>
            </div>
            <div class="nav-links">
                <a onclick="navigateTo('dashboard')" class="nav-item active" id="nav-dashboard">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                    Dashboard
                </a>
                <a onclick="navigateTo('projects')" class="nav-item" id="nav-projects">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                    Courses
                </a>
                <a onclick="navigateTo('settings')" class="nav-item" id="nav-settings">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    Settings
                </a>
            </div>
        </nav>

        <!-- MAIN CONTENT -->
        <main class="main-content">
            <header class="top-header">
                <div class="flex items-center">
                    <button class="menu-toggle" onclick="toggleSidebar()">☰</button>
                    <h2 id="page-title-text" style="font-size: 1.25rem;">Dashboard</h2>
                </div>
                <div class="flex items-center gap-4">
                    <span style="font-size:0.9rem; font-weight:600;">Alban Albani</span>
                    <img src="https://picsum.photos/seed/Alban/100/100" class="avatar" alt="User">
                    <button onclick="handleLogout()" style="color:var(--danger); font-size:0.9rem; font-weight:600; margin-left:10px;">Logout</button>
                </div>
            </header>

            <div class="content-wrapper">

                <!-- PAGE: DASHBOARD -->
                <section id="page-dashboard" class="page-section">
                    <div class="flex justify-between items-center" style="margin-bottom: 32px;">
                        <h1>Student Overview</h1>
                        <button class="btn-sm" onclick="showToast('Transcript downloaded')">Download Transcript</button>
                    </div>
                    <div class="settings-card">
                        <h3 style="margin-bottom:12px;">Current Semester Stats</h3>
                        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:16px;">
                            <div style="padding:16px; background:#f8fafc; border-radius:8px;"><strong>3.8</strong><br><small style="color:var(--text-muted);">GPA</small></div>
                            <div style="padding:16px; background:#f8fafc; border-radius:8px;"><strong>12</strong><br><small style="color:var(--text-muted);">Credits Enrolled</small></div>
                            <div style="padding:16px; background:#f8fafc; border-radius:8px;"><strong>95%</strong><br><small style="color:var(--text-muted);">Attendance</small></div>
                        </div>
                    </div>
                </section>

                <!-- PAGE: SETTINGS (With Enhanced Profile) -->
                <section id="page-settings" class="page-section hidden">
                    <h1>Account Settings</h1>
                    <div class="settings-layout">
                        
                        <!-- SETTINGS SUB-NAV -->
                        <div class="settings-nav">
                            <a onclick="switchSettingsTab('profile')" class="s-nav-item active" id="s-nav-profile">👤 Profile</a>
                            <a onclick="switchSettingsTab('account')" class="s-nav-item" id="s-nav-account">💳 Billing</a>
                            <a onclick="switchSettingsTab('notifications')" class="s-nav-item" id="s-nav-notifications">🔔 Notifications</a>
                            <a onclick="switchSettingsTab('security')" class="s-nav-item" id="s-nav-security">🔒 Security</a>
                        </div>

                        <!-- SETTINGS CONTENT AREA -->
                        <div class="settings-content">
                            
                            <!-- Tab: ENHANCED PROFILE -->
                            <div id="s-tab-profile">
                                
                                <!-- Cover Image -->
                                <div class="profile-cover"></div>

                                <div class="profile-layout">
                                    <!-- Left: Sidebar -->
                                    <div class="profile-sidebar">
                                        <img src="https://picsum.photos/seed/Alban/300/300" class="profile-avatar-lg" alt="Profile">
                                        <h2 class="profile-name">Alban Albani</h2>
                                        <span class="profile-id">ID: 20234891</span>
                                        <div class="profile-major">Computer Science • Senior</div>
                                        
                                        <div style="margin-top: 20px; text-align: left;">
                                            <div class="contact-info-row">
                                                <span class="contact-icon">✉️</span>
                                                Alban.Albani@nexus.edu
                                            </div>
                                            <div class="contact-info-row">
                                                <span class="contact-icon">📞</span>
                                                +1 (555) 019-2834
                                            </div>
                                            <div class="contact-info-row" style="border:none;">
                                                <span class="contact-icon">📍</span>
                                                Science Hall, Room 304
                                            </div>
                                        </div>

                                        <button class="btn-outline" style="width:100%; margin-top:20px; padding:8px;">Edit Avatar</button>
                                    </div>

                                    <!-- Right: Details -->
                                    <div>
                                        <!-- Profile Internal Tabs -->
                                        <div class="profile-tabs">
                                            <div class="p-tab active" onclick="switchProfileTab('personal')" id="p-tab-personal">Personal Info</div>
                                            <div class="p-tab" onclick="switchProfileTab('academic')" id="p-tab-academic">Academic History</div>
                                            <div class="p-tab" onclick="switchProfileTab('skills')" id="p-tab-skills">Skills</div>
                                        </div>

                                        <!-- Sub-Tab: Personal Info -->
                                        <div id="p-content-personal">
                                            <div class="settings-card">
                                                <h3 class="section-title">Basic Information</h3>
                                                <div class="form-group">
                                                    <label class="form-label">Full Name</label>
                                                    <input type="text" class="form-input" value="Alban Albani">
                                                </div>
                                                <div class="form-group">
                                                    <label class="form-label">Bio</label>
                                                    <textarea class="form-input" rows="4">Passionate about AI and Machine Learning. President of the Coding Club.</textarea>
                                                </div>
                                                <button class="btn-sm" onclick="saveSettings()">Save Changes</button>
                                            </div>
                                        </div>

                                        <!-- Sub-Tab: Academic -->
                                        <div id="p-content-academic" class="hidden">
                                            <div class="settings-card">
                                                <h3 class="section-title">Education History</h3>
                                                <div class="timeline-item">
                                                    <div class="timeline-date">2020 - Present</div>
                                                    <div class="font-bold">Bachelor of Science in Computer Science</div>
                                                    <div class="text-sm text-muted">Nexus University</div>
                                                    <div class="text-sm">GPA: 3.8</div>
                                                </div>
                                                <div class="timeline-item">
                                                    <div class="timeline-date">2018 - 2020</div>
                                                    <div class="font-bold">High School Diploma</div>
                                                    <div class="text-sm text-muted">Central High School</div>
                                                    <div class="text-sm">Valedictorian</div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Sub-Tab: Skills -->
                                        <div id="p-content-skills" class="hidden">
                                            <div class="settings-card">
                                                <h3 class="section-title">Technical Skills</h3>
                                                
                                                <div class="skill-item">
                                                    <div class="skill-header"><span>Python</span><span>90%</span></div>
                                                    <div class="progress-bg"><div class="progress-fill" style="width: 90%;"></div></div>
                                                </div>
                                                <div class="skill-item">
                                                    <div class="skill-header"><span>Web Development (HTML/CSS/JS)</span><span>85%</span></div>
                                                    <div class="progress-bg"><div class="progress-fill" style="width: 85%;"></div></div>
                                                </div>
                                                <div class="skill-item">
                                                    <div class="skill-header"><span>Data Analysis</span><span>75%</span></div>
                                                    <div class="progress-bg"><div class="progress-fill" style="width: 75%;"></div></div>
                                                </div>
                                                <div class="skill-item">
                                                    <div class="skill-header"><span>UI/UX Design</span><span>60%</span></div>
                                                    <div class="progress-bg"><div class="progress-fill" style="width: 60%;"></div></div>
                                                </div>

                                                <div style="margin-top: 24px;">
                                                    <label class="form-label">Add New Skill</label>
                                                    <div class="flex gap-2">
                                                        <input type="text" class="form-input" placeholder="Skill Name">
                                                        <button class="btn-sm" onclick="showToast('Skill added')">Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <!-- Tab: Account/Billing -->
                            <div id="s-tab-account" class="hidden">
                                <div class="settings-card">
                                    <h3 class="section-title">Tuition Status</h3>
                                    <div style="background: #eff6ff; padding: 20px; border-radius: 8px; border: 1px solid #bfdbfe; margin-bottom: 20px;">
                                        <div class="flex justify-between">
                                            <div>
                                                <strong style="color:var(--primary);">Fall 2023</strong>
                                                <p style="font-size:0.85rem; color:#1e40af;">Balance Due: $4,500</p>
                                            </div>
                                            <button class="btn-sm">Pay Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Tab: Notifications -->
                            <div id="s-tab-notifications" class="hidden">
                                <div class="settings-card">
                                    <h3 class="section-title">Email Alerts</h3>
                                    <div class="switch-row">
                                        <span>Grade updates</span>
                                        <label class="switch"><input type="checkbox" checked><span class="slider"></span></label>
                                    </div>
                                    <div class="switch-row">
                                        <span>Registration reminders</span>
                                        <label class="switch"><input type="checkbox" checked><span class="slider"></span></label>
                                    </div>
                                </div>
                            </div>

                            <!-- Tab: Security -->
                            <div id="s-tab-security" class="hidden">
                                <div class="settings-card">
                                    <h3 class="section-title">Change Password</h3>
                                    <div class="form-group">
                                        <label class="form-label">Current Password</label>
                                        <input type="password" class="form-input">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">New Password</label>
                                        <input type="password" class="form-input">
                                    </div>
                                    <button class="btn-sm" onclick="saveSettings()">Update Password</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <!-- PAGE: COURSES -->
                <section id="page-projects" class="page-section hidden">
                    <h1>My Courses</h1>
                    <p style="color:var(--text-muted); margin-top:10px;">View syllabus, assignments, and grades.</p>
                </section>

            </div>
        </main>
    </div>

    <!-- TOAST NOTIFICATION -->
    <div id="toast" class="toast">Action Successful</div>

    <script>
        function handleLogin(e) {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Authenticating...";
            
            setTimeout(() => {
                document.getElementById('page-login').classList.add('hidden');
                document.getElementById('app-container').classList.remove('hidden');
                document.getElementById('app-container').style.display = 'flex';
                navigateTo('dashboard');
                showToast('Welcome to Nexus University Portal');
            }, 1000);
        }

        function handleLogout() {
            if(confirm("Are you sure you want to log out?")) {
                document.getElementById('app-container').classList.add('hidden');
                document.getElementById('app-container').style.display = 'none';
                document.getElementById('page-login').classList.remove('hidden');
                document.querySelector('form').reset();
                document.querySelector('.btn-university').innerText = "Sign In to Portal";
            }
        }

        function navigateTo(pageId) {
            const pages = document.querySelectorAll('.page-section');
            pages.forEach(page => page.classList.add('hidden'));
            document.getElementById('page-' + pageId).classList.remove('hidden');

            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => item.classList.remove('active'));
            document.getElementById('nav-' + pageId).classList.add('active');

            const titles = { 'dashboard': 'Dashboard', 'projects': 'Courses', 'settings': 'Settings' };
            document.getElementById('page-title-text').innerText = titles[pageId];

            if(window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('active');
            }
        }

        function switchSettingsTab(tabId) {
            const tabs = ['profile', 'account', 'notifications', 'security'];
            tabs.forEach(t => document.getElementById('s-tab-' + t).classList.add('hidden'));
            document.getElementById('s-tab-' + tabId).classList.remove('hidden');

            tabs.forEach(t => document.getElementById('s-nav-' + t).classList.remove('active'));
            document.getElementById('s-nav-' + tabId).classList.add('active');
        }

        // Function for Internal Profile Tabs
        function switchProfileTab(tabId) {
            const tabs = ['personal', 'academic', 'skills'];
            tabs.forEach(t => document.getElementById('p-content-' + t).classList.add('hidden'));
            document.getElementById('p-content-' + tabId).classList.remove('hidden');

            tabs.forEach(t => document.getElementById('p-tab-' + t).classList.remove('active'));
            document.getElementById('p-tab-' + tabId).classList.add('active');
        }

        function toggleSidebar() {
            document.getElementById('sidebar').classList.toggle('active');
        }
        function showToast(msg) {
            const toast = document.getElementById('toast');
            toast.innerText = msg;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }
        function saveSettings() {
            showToast('Profile Updated Successfully!');
        }
    </script>
</body>
</html>
