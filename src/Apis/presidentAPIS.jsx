import { api, handleApiCall } from './config';

// Fetch president dashboard data
export const getPresidentDashboard = async () => {
  return handleApiCall(() => api.get('/president/dashboard'));
};

// Add an event
export const addPresidentEvent = async (eventData) => {
  return handleApiCall(() => api.post('/president/events', eventData));
};

// Add a participant
export const addParticipant = async (participantData) => {
  return handleApiCall(() => api.post('/president/participants', participantData));
};