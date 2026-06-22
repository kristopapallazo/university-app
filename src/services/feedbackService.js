import axiosInstance from './axiosInstance';

export const feedbackService = {
  getAll: () => axiosInstance.get('/api/v1/feedback'),
  sendFeedback: (payload) => axiosInstance.post('/api/v1/feedback', payload),
};
