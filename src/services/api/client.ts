import axios, {AxiosHeaders} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {environment} from '../../config/environment';

const apiClient = axios.create({
  baseURL: environment.apiUrl,
  timeout: 20000,
});

apiClient.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('@hotspot/access-token');
  if (token) {
    const headers =
      config.headers instanceof AxiosHeaders
        ? config.headers
        : new AxiosHeaders(config.headers);
    headers.set('Authorization', `Bearer ${token}`);
    config.headers = headers;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.warn('API Error:', error.response.status, error.response.data);
    } else {
      console.warn('API Error:', error.message);
    }
    return Promise.reject(error);
  },
);

export default apiClient;

