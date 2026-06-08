import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LayoutDashboard, Users as UsersIcon, BarChart3, Settings as SettingsIcon, User as UserIcon, Orbit, ChevronLeft, ChevronRight, X } from 'lucide-react';

function Sidebar({ isCollapsed, onToggle, mobileOpen, onMobileClose }) {
  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Users', path: '/users', icon: UsersIcon },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
    { name: 'Profile', path: '/profile', icon: UserIcon },
  ];

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between p-4">
      
      <div>
        {/* Header Branding */}
        <div className="flex items-center justify-between h-[60px] px-2">
          <Link to="/" onClick={onMobileClose} className="flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white shadow-premium group-hover:rotate-12 transition-transform duration-300">
              <Orbit className="h-5 w-5" />
            </div>
            {(!isCollapsed || mobileOpen) && (
              <span className="font-display font-extrabold text-lg text-brand-slateText dark:text-white tracking-tight">
                Stack<span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">Orbit</span>
              </span>
            )}
          </Link>

          {/* Mobile close button drawer trigger */}
          {mobileOpen && (
            <button
              onClick={onMobileClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-900 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation list */}
        <nav className="mt-8 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onMobileClose}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 text-xs font-semibold rounded-xl transition-all duration-300 relative group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#6D28D9]/10 to-[#14B8A6]/5 text-brand-primary dark:text-[#A78BFA] border border-[#6D28D9]/10'
                      : 'text-slate-400 dark:text-slate-400 hover:text-brand-slateText dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-slate-900/50 border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active side indicator pill */}
                    {isActive && (
                      <div className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-brand-primary dark:bg-brand-secondary rounded-r-md"></div>
                    )}
                    
                    <Icon className={`h-4.5 w-4.5 flex-shrink-0 transition-transform group-hover:scale-110 duration-300 ${
                      isActive ? 'text-brand-primary dark:text-[#A78BFA]' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
                    }`} />
                    
                    {(!isCollapsed || mobileOpen) && (
                      <span className="tracking-wide">{item.name}</span>
                    )}

                    {/* Collapsed hover tooltip hint */}
                    {isCollapsed && !mobileOpen && (
                      <div className="absolute left-[70px] bg-slate-900 text-white dark:bg-slate-800 text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-md whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer block (desktop collapse trigger & profile thumbnail preview) */}
      <div className="space-y-4">
        {/* Toggle trigger button (desktop only) */}
        {!mobileOpen && (
          <button
            onClick={onToggle}
            className="hidden lg:flex w-full items-center justify-center py-2 border border-slate-150/40 dark:border-slate-800 rounded-xl hover:bg-slate-100/40 dark:hover:bg-slate-900/40 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        )}

        {/* Small Profile Preview */}
        {(!isCollapsed || mobileOpen) ? (
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-brand-primary/5 dark:bg-slate-900/60 border border-brand-primary/10 dark:border-slate-800/80">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="h-9 w-9 rounded-xl object-cover ring-2 ring-brand-primary/15"
            />
            <div className="text-left overflow-hidden">
              <div className="text-xs font-bold text-brand-slateText dark:text-slate-200 truncate leading-none">{user?.name}</div>
              <div className="text-[9px] text-slate-400 truncate leading-none mt-1 font-mono">{user?.title}</div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="h-9 w-9 rounded-xl object-cover ring-2 ring-brand-primary/15"
            />
          </div>
        )}
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-20 hidden lg:block glass-sidebar border-r border-slate-200/50 dark:border-slate-800/80 transition-all duration-300 ${
          isCollapsed ? 'w-[80px]' : 'w-[260px]'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile drawer slide-over panel */}
      <aside
        className={`fixed bottom-0 top-0 z-50 flex w-72 max-w-full flex-col bg-[#FFFDF8] dark:bg-[#0A0915] border-r border-slate-200 dark:border-slate-800 transition-all duration-300 lg:hidden shadow-2xl ${
          mobileOpen ? 'left-0' : '-left-[320px]'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}

export default Sidebar;
