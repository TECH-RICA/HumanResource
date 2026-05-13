import { create } from 'zustand';
import { employees as mockEmployees } from '../data/employees';
import { ROLES } from '../constants/roles';

const MOCK_USER = {
  id: 'emp-1',
  firstName: 'James',
  lastName: 'Mitchell',
  email: 'james.mitchell@company.com',
  role: ROLES.SUPER_ADMIN,
  avatar: null,
  position: 'CTO',
  department: 'Engineering',
};

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('hrms_token') || null,
  isAuthenticated: !!localStorage.getItem('hrms_token'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    if (email && password) {
      const token = 'mock_jwt_token_' + Date.now();
      localStorage.setItem('hrms_token', token);
      localStorage.setItem('hrms_user', JSON.stringify(MOCK_USER));
      set({ user: MOCK_USER, token, isAuthenticated: true, isLoading: false });
      return true;
    }
    set({ error: 'Invalid email or password', isLoading: false });
    return false;
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    await new Promise((r) => setTimeout(r, 1000));
    set({ isLoading: false });
    return true;
  },

  logout: () => {
    localStorage.removeItem('hrms_token');
    localStorage.removeItem('hrms_user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  loadUser: () => {
    const token = localStorage.getItem('hrms_token');
    const savedUser = localStorage.getItem('hrms_user');
    if (token && savedUser) {
      set({ user: JSON.parse(savedUser), token, isAuthenticated: true });
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    await new Promise((r) => setTimeout(r, 800));
    set({ isLoading: false });
    return true;
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    await new Promise((r) => setTimeout(r, 800));
    set({ isLoading: false });
    return true;
  },

  clearError: () => set({ error: null }),
}));
