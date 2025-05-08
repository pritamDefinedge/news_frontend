import { DASHBOARD } from '../types/action.types';

// Get dashboard data
export const getDashboard = () => ({
  type: DASHBOARD.GET
});

// Set dashboard data
export const setDashboardData = (data) => ({
  type: DASHBOARD.SET_DATA,
  payload: data
});

// Toggle sidebar
export const toggleSidebar = () => ({
  type: DASHBOARD.TOGGLE_SIDEBAR
});

// Loading state
export const setLoading = (isLoading) => ({
  type: DASHBOARD.SET_LOADING,
  payload: isLoading
});

// Set Error State
export const setError = (error) => ({
  type: DASHBOARD.SET_ERROR,
  payload: error,
}); 