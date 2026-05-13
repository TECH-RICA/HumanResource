import { departments as mockDepartments } from '../data/departments';
import { sleep } from '../utils/helpers';

export const departmentService = {
  getAll: async () => {
    await sleep(200);
    return { data: mockDepartments, total: mockDepartments.length };
  },
  create: async (data) => {
    await sleep(400);
    return { ...data, id: `dept-${Date.now()}` };
  },
  update: async (id, data) => {
    await sleep(400);
    return { ...data, id };
  },
  delete: async (id) => {
    await sleep(300);
    return { success: true };
  },
};
