import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Bell, Sun, Moon, Menu, LogOut, User, Settings as SettingsIcon } from 'lucide-react';
import { logout } from '../../store/authSlice';
import { setSearchQuery } from '../../store/projectSlice';

function Navbar({ isSidebarCollapsed, onToggleSidebar, onOpenMobileSidebar }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Initialize and update theme class on HTML element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <header className="fixed top-0 right-0 z-30 h-[70px] glass-navbar border-b border-slate-200/50 dark:border-slate-800/80 transition-all duration-300 w-full lg:w-auto left-0 lg:left-0">
      <div className="flex h-full items-center justify-between px-4 md:px-8">
        
        {/* Left Section: Mobile trigger and logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenMobileSidebar}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-900 lg:hidden transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <div className="hidden lg:flex items-center gap-1 bg-[#059669]/5 px-3 py-1.5 rounded-lg border border-[#059669]/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-[#059669] dark:text-[#34D399] tracking-wider uppercase">Cluster: orbital-prd</span>
          </div>
        </div>

        {/* Middle Section: Search workspace */}
        <div className="hidden md:flex relative w-64 lg:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search workflows, metrics..."
            onChange={handleSearchChange}
            className="w-full rounded-xl border border-slate-200/65 bg-slate-50/40 py-2 pl-10 pr-4 text-xs text-brand-slateText outline-none ring-offset-2 transition-all focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/15 focus:bg-white dark:border-slate-800/80 dark:bg-slate-900/30 dark:text-slate-350 dark:focus:border-[#D97706]"
          />
        </div>

        {/* Right Section: Toggles, notifications, profile */}
        <div className="flex items-center gap-3">
          
          {/* Theme toggler */}
          <button
            onClick={toggleTheme}
            className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 border border-slate-150/40 dark:border-slate-800 transition-all"
            title="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          {/* Notifications Center */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileDropdown(false);
              }}
              className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 border border-slate-150/40 dark:border-slate-800 transition-all"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#EAB308]"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 rounded-2xl glass-card border border-slate-200/50 dark:border-slate-800/80 p-4 shadow-xl z-50 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/85 pb-2.5">
                  <h4 className="font-display font-bold text-xs text-brand-slateText dark:text-white uppercase tracking-wider">Alert Center</h4>
                  <button className="text-[10px] text-[#059669] dark:text-[#34D399] font-medium hover:underline">Mark all read</button>
                </div>
                <div className="mt-3 space-y-3">
                  <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-100/40 dark:hover:bg-slate-900/40 transition-colors">
                    <div className="h-2 w-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs font-semibold text-brand-slateText dark:text-slate-200">Replica Sync Failed</p>
                      <p className="text-[10px] text-slate-400">Postgres secondary failed to vacuum.</p>
                      <span className="text-[9px] text-slate-400 font-mono">1 hr ago</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-100/40 dark:hover:bg-slate-900/40 transition-colors">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs font-semibold text-brand-slateText dark:text-slate-200">GraphQL GW Deployed</p>
                      <p className="text-[10px] text-slate-400">Main cluster release v4.2.1 successful.</p>
                      <span className="text-[9px] text-slate-400 font-mono">2 mins ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-[1px] bg-slate-250/50 dark:bg-slate-800 mx-1"></div>

          {/* User profile avatar and details menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileDropdown(!showProfileDropdown);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-150/40 dark:hover:bg-slate-900 transition-all border border-transparent hover:border-slate-150/40 dark:hover:border-slate-800"
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="h-8 w-8 rounded-lg object-cover ring-2 ring-[#059669]/20 hover:ring-[#059669]/40 transition-all"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-brand-slateText dark:text-slate-200 leading-none">{user?.name}</div>
                <div className="text-[9px] text-slate-400 font-mono leading-none mt-0.5">{user?.role}</div>
              </div>
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-3 w-56 rounded-2xl glass-card border border-slate-200/50 dark:border-slate-800/80 p-2 shadow-xl z-50 animate-fadeIn">
                <Link
                  to="/profile"
                  onClick={() => setShowProfileDropdown(false)}
                  className="flex items-center gap-2 px-3.5 py-2.5 text-xs text-brand-slateText dark:text-slate-200 hover:bg-[#059669]/5 dark:hover:bg-[#059669]/10 rounded-xl transition-all font-semibold"
                >
                  <User className="h-4 w-4 text-slate-450" />
                  My Identity
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setShowProfileDropdown(false)}
                  className="flex items-center gap-2 px-3.5 py-2.5 text-xs text-brand-slateText dark:text-slate-200 hover:bg-[#059669]/5 dark:hover:bg-[#059669]/10 rounded-xl transition-all font-semibold"
                >
                  <SettingsIcon className="h-4 w-4 text-slate-450" />
                  Cluster Config
                </Link>
                <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 text-xs text-red-500 hover:bg-red-500/5 rounded-xl transition-all font-semibold text-left"
                >
                  <LogOut className="h-4 w-4" />
                  Terminate Session
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}

export default Navbar;
