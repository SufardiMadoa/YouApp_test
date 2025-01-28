// services/api.js
import { api } from "../axios/axios-config";

export const loginApi = {
  postLogin: async (credentials) => {
    try {
      // URL berubah dari '/api/login' menjadi '/login'
      const response = await api.post('/api/login', credentials,{  headers: {
        'Content-Type': 'application/json',
      },});
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};