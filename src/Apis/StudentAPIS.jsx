import { api, handleApiCall } from './config';

// Fetch student dashboard data
export const getStudentDashboard = async () => {
  return handleApiCall(() => api.get('/student/dashboard'));
};