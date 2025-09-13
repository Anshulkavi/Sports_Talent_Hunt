// src/store/api/authApi.js
import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Mock authentication API
export const authApi = {
  login: async (credentials) => {
    // Mock login - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password) {
          resolve({
            data: {
              user: {
                id: 1,
                name: 'John Doe',
                email: credentials.email,
                role: 'player'
              },
              token: 'mock-jwt-token',
            }
          });
        } else {
          reject({ response: { data: { message: 'Invalid credentials' } } });
        }
      }, 1500);
    });
  },

  getUserVideos: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockVideos = [
          {
            id: 1,
            sport: 'Cricket',
            score: 85,
            uploadDate: '2024-03-01',
            thumbnail: null
          },
          {
            id: 2,
            sport: 'Football',
            score: 72,
            uploadDate: '2024-02-28',
            thumbnail: null
          }
        ];
        resolve({ data: mockVideos });
      }, 1000);
    });
  }
};
