import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workflows: [
    { id: 'wf-101', name: 'K8s Cluster Autoscaler', status: 'success', category: 'Infrastructure', trigger: 'Cron [Hourly]', updated: '10 mins ago', author: 'Vishwa Patel' },
    { id: 'wf-102', name: 'GraphQL Gateway CI/CD', status: 'running', category: 'Deployment', trigger: 'Git Push [main]', updated: '2 mins ago', author: 'Jayesh' },
    { id: 'wf-103', name: 'Postgres Replica Sync', status: 'failed', category: 'Database', trigger: 'Manual Run', updated: '1 hr ago', author: 'Vishwa Patel' },
    { id: 'wf-104', name: 'API Security Vulnerability Audit', status: 'success', category: 'Security', trigger: 'Webhook Trigger', updated: '4 hrs ago', author: 'System' },
    { id: 'wf-105', name: 'CDN Cache Invalidation Pipeline', status: 'success', category: 'Distribution', trigger: 'Manual Run', updated: 'Yesterday', author: 'Jayesh' },
  ],
  systemStats: {
    activeWorkflows: 48,
    successRate: 98.4,
    cpuUtilization: 42.1,
    activeErrors: 1,
  },
  searchQuery: '',
  filterCategory: 'All',
  loading: false,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setWorkflows: (state, action) => {
      state.workflows = action.payload;
    },
    addWorkflow: (state, action) => {
      state.workflows.unshift(action.payload);
    },
    deleteWorkflow: (state, action) => {
      state.workflows = state.workflows.filter((w) => w.id !== action.payload);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    updateSystemStats: (state, action) => {
      state.systemStats = {
        ...state.systemStats,
        ...action.payload,
      };
    },
  },
});

export const {
  setWorkflows,
  addWorkflow,
  deleteWorkflow,
  setSearchQuery,
  setFilterCategory,
  updateSystemStats,
} = projectSlice.actions;

export default projectSlice.reducer;
