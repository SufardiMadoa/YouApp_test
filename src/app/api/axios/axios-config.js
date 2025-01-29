// axios/axios-config.js
import axios from 'axios';

export const api = axios.create({
  // Gunakan relative URL untuk API route local
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});