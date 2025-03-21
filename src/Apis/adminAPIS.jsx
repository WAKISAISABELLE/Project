import { api, handleApiCall } from './config';

// Fetch admin dashboard data
export const getAdminDashboard = async () => {
  return handleApiCall(() => api.get('/admin/dashboard'));
};

// Add a new chapter
export const addChapter = async (chapterData) => {
  return handleApiCall(() => api.post('/admin/chapters', chapterData));
};

// Delete a chapter
export const deleteChapter = async (chapterId) => {
  return handleApiCall(() => api.delete(`/admin/chapters/${chapterId}`));
};

// Add a new event
export const addEvent = async (eventData) => {
  return handleApiCall(() => api.post('/admin/events', eventData));
};

// Delete an event
export const deleteEvent = async (eventId) => {
  return handleApiCall(() => api.delete(`/admin/events/${eventId}`));
};

// Add a new user
export const addUser = async (userData) => {
  return handleApiCall(() => api.post('/admin/users', userData));
};

// Delete a user
export const deleteUser = async (userId) => {
  return handleApiCall(() => api.delete(`/admin/users/${userId}`));
};