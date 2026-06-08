import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

function Analytics() {
  const nodeUtilization = [
    { name: 'eu-west-1 (Primary)', load: 82, status: 'high' },
    { name: 'us-east-2 (Failover)', load: 43, status: 'nominal' },
    { name: 'ap-south-1 (Edge)', load: 68, status: 'nominal' },
    { name: 'sa-east-1 (Staging)', load: 21, status: 'low' },
  ];

  const throughputTrend = [
    { label: '08:00 AM', count: '12.4k req/s', barHeight: 'h-16' },
    { label: '10:00 AM', count: '18.1k req/s', barHeight: 'h-28' },
    { label: '12:00 PM', count: '24.8k req/s', barHeight: 'h-40' },
    { label: '02:00 PM', count: '21.3k req/s', barHeight: 'h-32' },
    { label: '04:00 PM', count: '15.9k req/s', barHeight: 'h-24' },
    { label: '06:00 PM', count: '29.2k req/s', barHeight: 'h-48' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header section */}
      <div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-brand-slateText dark:text-white md:text-4xl">
          Telemetry Analytics
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Deep-dive cluster metrics, CPU telemetry, throughput pipelines, and system latencies.
        </p>
      </div>

      {/* Primary analytics summary grids */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Throughput chart */}
        <div className="glass-card p-6 rounded-2xl lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-brand-slateText dark:text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-brand-primary" />
                Requests Throughput
              </h3>
              <span className="text-xs font-semibold text-[#14B8A6] bg-[#14B8A6]/10 px-2.5 py-1 rounded-lg">
                Live
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Average execution latency: 14.2ms</p>
          </div>

          {/* Render bar charts */}
          <div className="mt-8 flex items-end justify-between gap-4 h-56 pt-6 border-b border-slate-100 dark:border-slate-800">
            {throughputTrend.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center group">
                <span className="text-[10px] font-bold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-2">
                  {item.count}
                </span>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg overflow-hidden h-48 flex items-end">
                  <div className={`w-full bg-gradient-to-t from-brand-primary to-brand-secondary rounded-t-lg group-hover:brightness-110 transition-all duration-500 ease-out ${item.barHeight}`}></div>
                </div>
                <span className="text-xs text-slate-400 mt-2 font-mono">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info card side deck */}
        <div className="space-y-6">
          {/* Global network diagnostics status */}
          <div className="glass-card p-6 rounded-2xl bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5">
            <h3 className="font-display font-bold text-brand-slateText dark:text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-brand-accent" />
              API Optimization
            </h3>
            <p className="text-xs text-slate-400 mt-1">Caching policies save bandwidth and resources.</p>
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-1">
                  <span>CDN Cache Hit Rate</span>
                  <span className="text-[#14B8A6]">92.4%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-secondary rounded-full" style={{ width: '92.4%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-1">
                  <span>Server Execution Success</span>
                  <span className="text-brand-primary">99.8%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary rounded-full" style={{ width: '99.8%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick status checks */}
          <div className="glass-card p-6 rounded-2xl flex items-center gap-4 border-l-4 border-l-brand-secondary">
            <div className="p-3 bg-brand-secondary/10 text-brand-secondary rounded-xl">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-brand-slateText dark:text-white">Security Integrity Checks</h4>
              <p className="text-xs text-slate-400 mt-0.5">SSL certificate active. No data leaks detected.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cluster Node Load List */}
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="font-display font-bold text-brand-slateText dark:text-white">Regional Cluster Status</h3>
        <p className="text-xs text-slate-400 mt-1">System latency distributions and usage metrics.</p>

        <div className="mt-6 space-y-4">
          {nodeUtilization.map((node, i) => (
            <div key={i} className="flex flex-col gap-2 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/20 dark:bg-slate-900/10">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-brand-slateText dark:text-slate-200">{node.name}</span>
                <span className={`font-mono text-xs font-bold ${
                  node.status === 'high' ? 'text-brand-accent' :
                  node.status === 'low' ? 'text-slate-400' : 'text-brand-secondary'
                }`}>{node.load}% Capacity</span>
              </div>
              <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${
                  node.status === 'high' ? 'bg-gradient-to-r from-brand-accent to-red-500' :
                  node.status === 'low' ? 'bg-slate-400' : 'bg-gradient-to-r from-brand-primary to-brand-secondary'
                }`} style={{ width: `${node.load}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
