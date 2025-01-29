// services/api.js
import { api } from "../axios/axios-config";

export const profileAPI = {
    postProfile: async (credentials) => {
        const token = localStorage.getItem("token");
        console.log("token",token);
        try {
          const response = await api.post(
            '/api/createProfile',
            credentials,
            {  
              headers: {
                'x-access-token': token  // Tambahkan token di sini
              },
            }
          );
          console.log(response.data);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      
      getProfile: async () => {
        const token = localStorage.getItem("token");
        console.log("token",token);
        try {
          const response = await api.get('/api/getProfile', {
            headers: {
              'x-access-token': token 
            }
          });
          return response.data;
        } catch (error) {
          // Tambahkan error handling yang lebih detail
          console.error('Error fetching profile:', error.response?.data || error.message);
          throw error;
        }
      },
      
  putProfile: async (credentials) => {
    const token = localStorage.getItem("token");
    console.log("token",token);
    try {
      const response = await api.put(
        '/api/updateProfile',
        credentials,
        {  
          headers: {
            'x-access-token': token  // Tambahkan token di sini
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};