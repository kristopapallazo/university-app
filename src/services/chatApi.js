import axiosInstance from './axiosInstance';

const BASE = '/api/v1/chat';

export const chatApi = {
  listConversations: (perPage = 20) =>
    axiosInstance.get(`${BASE}/conversations`, { params: { perPage } }),

  createConversation: (title) => axiosInstance.post(`${BASE}/conversations`, { title }),

  getConversation: (id) => axiosInstance.get(`${BASE}/conversations/${id}`),

  deleteConversation: (id) => axiosInstance.delete(`${BASE}/conversations/${id}`),

  getUsage: () => axiosInstance.get(`${BASE}/usage`),
};
