import axiosInstance from './axiosInstance';

// Events / calendar API wrapper
export const eventsService = {
  // Fetch events. Backend should accept optional params e.g. month, year
  // Example endpoint: GET /api/v1/events
  // If your backend uses a different path, update this accordingly.
  getEvents: (params) =>
    axiosInstance.get('/api/v1/events', { params, skipErrorNotification: true }),
};
