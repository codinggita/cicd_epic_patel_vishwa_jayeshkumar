import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Activity, ShieldAlert, Cpu, CheckCircle, RefreshCw, Play, Plus } from 'lucide-react';
import { addWorkflow } from '../store/projectSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const { workflows, systemStats } = useSelector((state) => state.projects);

  const handleTriggerManual = () => {
    const randomId = Math.floor(Math.random() * 1000);
    const names = ['K8s Node Sync', 'Database Vacuum', 'Auth Certificate Rotation', 'Billing Webhook Re-drive', 'S3 Asset Compression'];
    const categories = ['Infrastructure', 'Database', 'Security', 'Billing', 'Storage'];
    const randomIndex = Math.floor(Math.random() * names.length);

    dispatch(
      addWorkflow({
        id: `wf-${randomId}`,
        name: names[randomIndex],
        status: 'running',
        category: categories[randomIndex],
        trigger: 'Manual [Web Console]',
        updated: 'Just now',
        author: 'Vishwa Patel',
      })
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome header banner */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-brand-slateText dark:text-white md:text-4xl">
            Space Control
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Real-time workflow monitoring, node clusters, and orchestrations overview.
          </p>
        </div>
        <button
          onClick={handleTriggerManual}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-primary to-[#7C3AED] px-5 py-3 text-sm font-semibold text-white shadow-premium hover:shadow-premiumHover transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="h-4 w-4" />
          Trigger Pipeline
        </button>
      </div>

      {/* Statistics overview cards grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Stat 1 */}
        <div className="glass-card hover:border-brand-primary/30 p-6 rounded-2xl transition-all duration-300 hover:shadow-premium hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Active Workflows</span>
            <div className="rounded-xl bg-[#6D28D9]/10 p-2.5 text-[#6D28D9] dark:bg-[#6D28D9]/20 dark:text-[#A78BFA]">
              <Cpu className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-brand-slateText dark:text-white">
              {systemStats.activeWorkflows}
            </span>
            <span className="text-xs font-medium text-emerald-500">+12% this hour</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="glass-card hover:border-brand-secondary/30 p-6 rounded-2xl transition-all duration-300 hover:shadow-premium hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Success Rate</span>
            <div className="rounded-xl bg-[#14B8A6]/10 p-2.5 text-[#14B8A6] dark:bg-[#14B8A6]/20 dark:text-[#2DD4BF]">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-brand-slateText dark:text-white">
              {systemStats.successRate}%
            </span>
            <span className="text-xs font-medium text-[#14B8A6]">Global health</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="glass-card hover:border-brand-accent/30 p-6 rounded-2xl transition-all duration-300 hover:shadow-premium hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Cluster Load</span>
            <div className="rounded-xl bg-orange-500/10 p-2.5 text-orange-500 dark:bg-orange-500/20 dark:text-orange-400">
              <Activity className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-brand-slateText dark:text-white">
              {systemStats.cpuUtilization}%
            </span>
            <span className="text-xs font-medium text-slate-400">Healthy nodes</span>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="glass-card hover:border-red-500/30 p-6 rounded-2xl transition-all duration-300 hover:shadow-premium hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Active Outages</span>
            <div className="rounded-xl bg-red-500/10 p-2.5 text-red-500 dark:bg-red-500/20 dark:text-red-400">
              <ShieldAlert className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold text-brand-slateText dark:text-white">
              {systemStats.activeErrors}
            </span>
            <span className="text-xs font-medium text-red-500">1 unresolved issue</span>
          </div>
        </div>
      </div>

      {/* Detailed Workflows table/list */}
      <div className="glass-card overflow-hidden rounded-2xl">
        <div className="border-b border-slate-100 dark:border-slate-800 p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-brand-slateText dark:text-white">Recent Automations</h2>
            <p className="text-xs text-slate-400">Activity and executions tracked across connected clusters.</p>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              All Systems Nominal
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-semibold tracking-wider text-slate-400 uppercase bg-slate-50/50 dark:bg-slate-900/30">
                <th className="px-6 py-4">Workflow Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Triggered By</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {workflows.map((flow) => (
                <tr key={flow.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-all duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-brand-primary/5 flex items-center justify-center text-brand-primary dark:bg-brand-primary/20 dark:text-[#A78BFA]">
                        <Cpu className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-brand-slateText dark:text-slate-200">{flow.name}</div>
                        <div className="text-xs text-slate-400 font-mono">{flow.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                      {flow.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {flow.status === 'success' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        Success
                      </span>
                    )}
                    {flow.status === 'running' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#14B8A6]/10 px-2.5 py-1 text-xs font-medium text-[#14B8A6] dark:bg-[#14B8A6]/20 dark:text-[#2DD4BF] animate-pulse">
                        <RefreshCw className="h-3 w-3 animate-spin" />
                        Running
                      </span>
                    )}
                    {flow.status === 'failed' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-600 dark:bg-red-500/20 dark:text-red-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                        Failed
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-500 dark:text-slate-400">
                    {flow.trigger}
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs">
                    {flow.updated}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#6D28D9] dark:text-[#A78BFA] hover:bg-[#6D28D9]/5 dark:hover:bg-[#6D28D9]/10 transition-colors">
                      <Play className="h-3 w-3" />
                      Rerun
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
