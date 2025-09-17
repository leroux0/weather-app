// frontend/src/services/auth.ts
import api from './api';
import { UserCreate, Token, User } from '../types';  // FIXED: Removed formdata-node import

export const login = async (credentials: UserCreate): Promise<Token> => {
  const formData = new FormData();  // FIXED: Native browser FormData—no import needed
  formData.append('username', credentials.email);
  formData.append('password', credentials.password);

  const response = await api.post<Token>('/auth/login', formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  localStorage.setItem('token', response.data.access_token);
  return response.data;
};

export const register = async (userData: UserCreate): Promise<User> => {
  const response = await api.post<User>('/auth/register', userData);
  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem('token');
};

export const getToken = (): string | null => localStorage.getItem('token');

export {};  // Already there