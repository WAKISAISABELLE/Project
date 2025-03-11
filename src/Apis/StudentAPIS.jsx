import apiClient from './config';

export const getStudentDashboard = async (username, password) => {
  try {
    const response = await apiClient.get('/api/student/dashboard', {
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching student dashboard:', error);
    throw error;
  }
};