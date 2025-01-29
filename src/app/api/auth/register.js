// services/api.js
import { api } from "../axios/axios-config";

export const registerApi = {
  postRegister: async (credentials) => {
    try {
      // URL berubah dari '/api/login' menjadi '/login'
      const response = await api.post('/api/register', credentials,{  headers: {
        'Content-Type': 'application/json',
      },});
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};