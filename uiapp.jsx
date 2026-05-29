<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UI App</title>
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
            --sidebar-width: 260px;
            --radius: 12px;
            --header-height: 70px;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
        body { background: var(--bg-body); color: var(--text-main); display: flex; min-height: 100vh; overflow-x: hidden; }
        a { text-decoration: none; color: inherit; cursor: pointer; }
        button { cursor: pointer; font-family: inherit; border: none; background: none; }

        /* --- LAYOUT UTILS --- */
        .hidden { display: none !important; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .justify-between { justify-content: space-between; }

        /* --- SIDEBAR --- */
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
        
        .nav-links { padding: 24px 16px; flex: 1; }
        .nav-item {
            display: flex; align-items: center; padding: 12px 16px;
            border-radius: var(--radius); color: var(--text-muted); font-weight: 500;
            margin-bottom: 4px; transition: 0.2s;
        }
        .nav-item:hover { background-color: #f1f5f9; color: var(--primary); }
        .nav-item.active { background-color: #e0e7ff; color: var(--primary); }
        .nav-item svg { width: 20px; height: 20px; margin-right: 12px; }

        /* --- MAIN CONTENT --- */
        .main-content { margin-left: var(--sidebar-width); flex: 1; display: flex; flex-direction: column; width: calc(100% - var(--sidebar-width)); transition: margin 0.3s; }
        
        /* Header */
        .top-header {
            height: var(--header-height); background: var(--bg-body);
            display: flex; align-items: center; justify-content: space-between;
            padding: 0 32px; position: sticky; top: 0; z-index: 10;
        }
        .menu-toggle { display: none; font-size: 1.5rem; margin-right: 16px; }
        
        .profile-btn { display: flex; align-items: center; gap: 10px; }
        .avatar { width: 36px; height: 36px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }

        /* Pages Container */
        .content-wrapper { padding: 32px; }
        .page-section { animation: fadeIn 0.3s ease-out; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        /* --- PAGE: DASHBOARD --- */
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-bottom: 32px; }
        .stat-card { background: white; padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
        .stat-val { font-size: 1.75rem; font-weight: 700; color: var(--text-main); }
        .stat-label { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px; }
        
        /* Chart Placeholder */
        .chart-card { background: white; padding: 24px; border-radius: var(--radius); border: 1px solid var(--border); height: 300px; display: flex; align-items: flex-end; justify-content: space-around; padding-bottom: 40px; position: relative; }
        .bar { width: 40px; background: var(--primary-light); border-radius: 4px 4px 0 0; transition: height 1s ease; position: relative; }
        .bar:hover { background: var(--primary); }
        .bar::after { content: attr(data-val); position: absolute; top: -25px; left: 50%; transform: translateX(-50%); font-size: 0.75rem; opacity: 0; transition: opacity 0.2s; }
        .bar:hover::after { opacity: 1; }
        .chart-label { position: absolute; bottom: 10px; font-size: 0.75rem; color: var(--text-muted); }

        /* --- PAGE: PROJECTS --- */
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
        .project-card { background: white; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
        .project-card:hover { transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
        .p-image { height: 140px; background-color: #cbd5e1; position: relative; }
        .p-image img { width: 100%; height: 100%; object-fit: cover; }
        .p-badge { position: absolute; top: 12px; right: 12px; background: white; padding: 4px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 600; }
        .p-content { padding: 20px; }
        .p-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 4px; }
        .p-desc { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px; }
        .p-meta { display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--text-muted); }

        /* --- PAGE: SETTINGS --- */
        .settings-layout { display: flex; gap: 32px; }
        .settings-nav { width: 200px; flex-shrink: 0; }
        .settings-content { flex: 1; background: white; padding: 32px; border-radius: var(--radius); border: 1px solid var(--border); }
        
        .s-nav-item { display: block; padding: 12px 16px; border-radius: 8px; margin-bottom: 4px; color: var(--text-muted); font-size: 0.95rem; transition: 0.2s; }
        .s-nav-item:hover { background: #f1f5f9; color: var(--text-main); }
        .s-nav-item.active { background: #eff6ff; color: var(--primary); font-weight: 600; }

        /* Settings Forms */
        .form-group { margin-bottom: 24px; }
        .form-label { display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.9rem; }
        .form-input { width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 0.9rem; transition: border 0.2s; }
        .form-input:focus { outline: none; border-color: var(--primary); }
        
        .section-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }

        /* Toggle Switch */
        .switch-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
        .switch { position: relative; display: inline-block; width: 44px; height: 24px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #cbd5e1; transition: .4s; border-radius: 24px; }
        .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
        input:checked + .slider { background-color: var(--primary); }
        input:checked + .slider:before { transform: translateX(20px); }

        .btn-save { background: var(--primary); color: white; padding: 10px 24px; border-radius: 8px; font-weight: 500; }
        .btn-save:hover { background: var(--primary-hover); }

        /* Toast */
        .toast { position: fixed; bottom: 20px; right: 20px; background: white; border-left: 4px solid var(--primary); padding: 16px 24px; border-radius: 4px; box-shadow: 0 10px 15px rgba(0,0,0,0.1); transform: translateY(100px); opacity: 0; transition: 0.3s; z-index: 100; }
        .toast.show { transform: translateY(0); opacity: 1; }

        /* Responsive */
        @media (max-width: 768px) {
            .sidebar { transform: translateX(-100%); }
            .sidebar.active { transform: translateX(0); }
            .main-content { margin-left: 0; width: 100%; }
            .menu-toggle { display: block; }
            .settings-layout { flex-direction: column; }
            .settings-nav { width: 100%; display: flex; overflow-x: auto; gap: 8px; padding-bottom: 8px; }
            .s-nav-item { white-space: nowrap; }
        }
    </style>
</head>
<body>

    <!-- SIDEBAR -->
    <nav class="sidebar" id="sidebar">
        <div class="logo-area">
            <div class="logo-icon">N</div>
            <span class="logo-text">UAMDappUI</span>
        </div>
        <div class="nav-links">
            <a onclick="navigateTo('dashboard')" class="nav-item active" id="nav-dashboard">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                Dashboard
            </a>
            <a onclick="navigateTo('projects')" class="nav-item" id="nav-projects">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                Projects
            </a>
            <a onclick="navigateTo('settings')" class="nav-item" id="nav-settings">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                Settings
            </a>
        </div>
    </nav>

    <!-- MAIN CONTENT AREA -->
    <main class="main-content">
        <header class="top-header">
            <div class="flex items-center">
                <button class="menu-toggle" onclick="toggleSidebar()">☰</button>
                <h2 id="page-title-text" style="font-size: 1.25rem;">Dashboard</h2>
            </div>
            <div class="profile-btn">
                <img src="https://picsum.photos/seed/alex/100/100" class="avatar" alt="User">
            </div>
        </header>

        <div class="content-wrapper">

            <!-- PAGE 1: DASHBOARD -->
            <section id="page-dashboard" class="page-section">
                <div class="page-header">
                    <h1>Overview</h1>
                    <button class="btn-save" onclick="showToast('Report downloaded')">Export Report</button>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-label">Total Revenue</div>
                        <div class="stat-val">$24,500</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Active Projects</div>
                        <div class="stat-val">12</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">New Clients</div>
                        <div class="stat-val">8</div>
                    </div>
                </div>

                <div class="chart-card">
                    <!-- Simulated Chart -->
                    <div class="bar" style="height: 40%;" data-val="Jan"></div>
                    <div class="bar" style="height: 65%;" data-val="Feb"></div>
                    <div class="bar" style="height: 50%;" data-val="Mar"></div>
                    <div class="bar" style="height: 80%;" data-val="Apr"></div>
                    <div class="bar" style="height: 60%;" data-val="May"></div>
                    <div class="bar" style="height: 95%;" data-val="Jun"></div>
                    <div class="bar" style="height: 75%;" data-val="Jul"></div>
                </div>
            </section>

            <!-- PAGE 2: PROJECTS -->
            <section id="page-projects" class="page-section hidden">
                <div class="page-header">
                    <h1>Your Projects</h1>
                    <button class="btn-save" onclick="showToast('Create modal opened')">+ New Project</button>
                </div>

                <div class="projects-grid">
                    <!-- Card 1 -->
                    <div class="project-card">
                        <div class="p-image">
                            <img src="https://picsum.photos/seed/p1/400/200" alt="Project">
                            <span class="p-badge" style="color:#10b981;">Active</span>
                        </div>
                        <div class="p-content">
                            <div class="p-title">Website Redesign</div>
                            <div class="p-desc">Complete overhaul of the corporate website.</div>
                            <div class="p-meta">
                                <span>Due: Oct 24</span>
                                <span>3 Members</span>
                            </div>
                        </div>
                    </div>
                    <!-- Card 2 -->
                    <div class="project-card">
                        <div class="p-image">
                            <img src="https://picsum.photos/seed/p2/400/200" alt="Project">
                            <span class="p-badge" style="color:#f59e0b;">Pending</span>
                        </div>
                        <div class="p-content">
                            <div class="p-title">Mobile App API</div>
                            <div class="p-desc">Backend integration for iOS and Android.</div>
                            <div class="p-meta">
                                <span>Due: Nov 01</span>
                                <span>5 Members</span>
                            </div>
                        </div>
                    </div>
                    <!-- Card 3 -->
                    <div class="project-card">
                        <div class="p-image">
                            <img src="https://picsum.photos/seed/p3/400/200" alt="Project">
                            <span class="p-badge" style="color:#64748b;">Completed</span>
                        </div>
                        <div class="p-content">
                            <div class="p-title">Q3 Marketing</div>
                            <div class="p-desc">Social media campaign assets.</div>
                            <div class="p-meta">
                                <span>Due: Sep 15</span>
                                <span>2 Members</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- PAGE 3: SETTINGS -->
            <section id="page-settings" class="page-section hidden">
                <h1>Settings</h1>
                <div class="settings-layout" style="margin-top: 24px;">
                    
                    <!-- Settings Sub-Nav -->
                    <div class="settings-nav">
                        <a onclick="switchSettingsTab('profile')" class="s-nav-item active" id="s-nav-profile">Profile</a>
                        <a onclick="switchSettingsTab('preferences')" class="s-nav-item" id="s-nav-preferences">Preferences</a>
                        <a onclick="switchSettingsTab('security')" class="s-nav-item" id="s-nav-security">Security</a>
                    </div>

                    <!-- Settings Content Area -->
                    <div class="settings-content">
                        
                        <!-- Tab: Profile -->
                        <div id="s-tab-profile">
                            <h3 class="section-title">Public Profile</h3>
                            <div class="form-group">
                                <label class="form-label">Display Name</label>
                                <input type="text" class="form-input" value="Alban Albani">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email Address</label>
                                <input type="email" class="form-input" value="alban.albani@example.com">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Bio</label>
                                <textarea class="form-input" rows="4">Product designer and frontend developer.</textarea>
                            </div>
                            <button class="btn-save" onclick="saveSettings()">Save Changes</button>
                        </div>

                        <!-- Tab: Preferences -->
                        <div id="s-tab-preferences" class="hidden">
                            <h3 class="section-title">App Preferences</h3>
                            
                            <div class="switch-row">
                                <div>
                                    <div style="font-weight:500;">Email Notifications</div>
                                    <div style="font-size:0.8rem; color:var(--text-muted);">Receive weekly updates</div>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" checked>
                                    <span class="slider"></span>
                                </label>
                            </div>

                            <div class="switch-row">
                                <div>
                                    <div style="font-weight:500;">Dark Mode</div>
                                    <div style="font-size:0.8rem; color:var(--text-muted);">Switch interface theme</div>
                                </div>
                                <label class="switch">
                                    <input type="checkbox">
                                    <span class="slider"></span>
                                </label>
                            </div>

                            <div class="switch-row">
                                <div>
                                    <div style="font-weight:500;">Public Profile</div>
                                    <div style="font-size:0.8rem; color:var(--text-muted);">Allow others to see you</div>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" checked>
                                    <span class="slider"></span>
                                </label>
                            </div>
                            
                            <div style="margin-top: 24px;">
                                <button class="btn-save" onclick="saveSettings()">Update Preferences</button>
                            </div>
                        </div>

                        <!-- Tab: Security -->
                        <div id="s-tab-security" class="hidden">
                            <h3 class="section-title">Change Password</h3>
                            <div class="form-group">
                                <label class="form-label">Current Password</label>
                                <input type="password" class="form-input">
                            </div>
                            <div class="form-group">
                                <label class="form-label">New Password</label>
                                <input type="password" class="form-input">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Confirm New Password</label>
                                <input type="password" class="form-input">
                            </div>
                            <button class="btn-save" onclick="saveSettings()">Update Password</button>

                            <h3 class="section-title" style="margin-top: 40px; border-color: #fee2e2; color: #ef4444;">Danger Zone</h3>
                            <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 16px;">Once you delete your account, there is no going back.</p>
                            <button style="border: 1px solid #ef4444; color: #ef4444; padding: 8px 16px; border-radius: 6px; font-size: 0.9rem;">Delete Account</button>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    </main>

    <!-- TOAST NOTIFICATION -->
    <div id="toast" class="toast">Action Successful</div>

    <script>
        // --- NAVIGATION LOGIC (SPA ROUTER) ---
        function navigateTo(pageId) {
            // 1. Hide all pages
            const pages = document.querySelectorAll('.page-section');
            pages.forEach(page => page.classList.add('hidden'));

            // 2. Show target page
            document.getElementById('page-' + pageId).classList.remove('hidden');

            // 3. Update Sidebar Active State
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => item.classList.remove('active'));
            document.getElementById('nav-' + pageId).classList.add('active');

            // 4. Update Header Title
            const titles = {
                'dashboard': 'Dashboard',
                'projects': 'Projects',
                'settings': 'Settings'
            };
            document.getElementById('page-title-text').innerText = titles[pageId];

            // 5. Close mobile sidebar if open
            if(window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('active');
            }
        }

        // --- SETTINGS SUB-TAB LOGIC ---
        function switchSettingsTab(tabId) {
            // Hide all tabs
            document.getElementById('s-tab-profile').classList.add('hidden');
            document.getElementById('s-tab-preferences').classList.add('hidden');
            document.getElementById('s-tab-security').classList.add('hidden');

            // Show target tab
            document.getElementById('s-tab-' + tabId).classList.remove('hidden');

            // Update Nav Styles
            document.getElementById('s-nav-profile').classList.remove('active');
            document.getElementById('s-nav-preferences').classList.remove('active');
            document.getElementById('s-nav-security').classList.remove('active');

            document.getElementById('s-nav-' + tabId).classList.add('active');
        }

        // --- UI INTERACTIONS ---
        function toggleSidebar() {
            document.getElementById('sidebar').classList.toggle('active');
        }

        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.innerText = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        function saveSettings() {
            showToast('Settings Saved Successfully!');
        }
    </script>
</body>
</html>