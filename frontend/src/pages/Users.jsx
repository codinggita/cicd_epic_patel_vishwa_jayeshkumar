import React, { useState } from 'react';
import { UserPlus, Search, Mail, Shield, ShieldCheck, MoreVertical, Trash2 } from 'lucide-react';

function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'Vishwa Patel', email: 'vishwa@stackorbit.com', role: 'Admin', title: 'Principal DevOps Architect', status: 'Active', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80' },
    { id: 2, name: 'Jayesh', email: 'jayesh@stackorbit.com', role: 'Admin', title: 'Senior Software Engineer', status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80' },
    { id: 3, name: 'Sarah Jenkins', email: 'sarah.j@stackorbit.com', role: 'User', title: 'SRE Specialist', status: 'Active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80' },
    { id: 4, name: 'Mark Davis', email: 'mark.davis@stackorbit.com', role: 'User', title: 'Junior Cloud Developer', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80' },
    { id: 5, name: 'Elena Rostova', email: 'elena.r@stackorbit.com', role: 'User', title: 'Security Specialist', status: 'Active', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80' },
  ]);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header section */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-brand-slateText dark:text-white md:text-4xl">
            Workspace Directory
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your team access, invite collaborators, and adjust role-based security configurations.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-primary to-[#7C3AED] px-5 py-3 text-sm font-semibold text-white shadow-premium hover:shadow-premiumHover transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
          <UserPlus className="h-4 w-4" />
          Invite Associate
        </button>
      </div>

      {/* Control bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search associates, titles, roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200/80 bg-white/70 py-2.5 pl-11 pr-4 text-sm text-brand-slateText outline-none ring-offset-2 transition-all duration-300 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-slate-800 dark:bg-[#121124]/70 dark:text-slate-200"
          />
        </div>
        <div className="flex gap-2">
          <select className="rounded-xl border border-slate-200/80 bg-white/70 px-4 py-2.5 text-sm text-brand-slateText outline-none dark:border-slate-800 dark:bg-[#121124]/70 dark:text-slate-200">
            <option>All Roles</option>
            <option>Admin Only</option>
            <option>User Only</option>
          </select>
          <select className="rounded-xl border border-slate-200/80 bg-white/70 px-4 py-2.5 text-sm text-brand-slateText outline-none dark:border-slate-800 dark:bg-[#121124]/70 dark:text-slate-200">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      {/* Users directory grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((member) => (
          <div
            key={member.id}
            className="glass-card hover:border-brand-primary/30 p-6 rounded-2xl transition-all duration-300 hover:shadow-premium relative flex flex-col justify-between group overflow-hidden"
          >
            {/* Top border decoration hover effect */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-primary to-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div>
              {/* Profile card metadata header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-12 w-12 rounded-xl object-cover ring-2 ring-brand-primary/10 dark:ring-brand-secondary/20"
                  />
                  <div>
                    <h3 className="font-display font-bold text-brand-slateText dark:text-white flex items-center gap-1.5">
                      {member.name}
                      {member.role === 'Admin' ? (
                        <ShieldCheck className="h-4 w-4 text-brand-primary dark:text-[#A78BFA]" title="Admin" />
                      ) : (
                        <Shield className="h-4 w-4 text-brand-secondary dark:text-brand-secondary" title="Standard User" />
                      )}
                    </h3>
                    <p className="text-xs text-slate-400">{member.title}</p>
                  </div>
                </div>
                <div className="relative">
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors">
                    <MoreVertical className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

              {/* Details and fields */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold">Authorization:</span>
                  <span className="rounded bg-brand-primary/5 px-2 py-0.5 text-xs text-brand-primary dark:bg-brand-primary/20 dark:text-[#A78BFA] font-medium">
                    {member.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <div>
                {member.status === 'Active' ? (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-500 font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-amber-500 font-semibold animate-pulse">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping"></span>
                    Pending invite
                  </span>
                )}
              </div>
              {member.id !== 1 && (
                <button
                  onClick={() => handleDelete(member.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
                  title="Remove User"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
