import { employees as mockEmployees } from '../data/employees';
import { sleep } from '../utils/helpers';

/**
 * Employee Service — Mock API layer
 * Replace with real API calls when backend is ready
 */
export const employeeService = {
  getAll: async (filters = {}) => {
    await sleep(300);
    let result = [...mockEmployees];
    if (filters.department) result = result.filter((e) => e.departmentId === filters.department);
    if (filters.status) result = result.filter((e) => e.status === filters.status);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((e) =>
        `${e.firstName} ${e.lastName}`.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q)
      );
    }
    return { data: result, total: result.length };
  },

  getById: async (id) => {
    await sleep(200);
    return mockEmployees.find((e) => e.id === id) || null;
  },

  create: async (data) => {
    await sleep(500);
    return { ...data, id: `emp-${Date.now()}`, status: 'active' };
  },

  update: async (id, data) => {
    await sleep(500);
    return { ...data, id };
  },

  delete: async (id) => {
    await sleep(300);
    return { success: true };
  },
};
