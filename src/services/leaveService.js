import { leaveRequests as mockLeave } from '../data/leaveRequests';
import { sleep } from '../utils/helpers';

export const leaveService = {
  getAll: async () => {
    await sleep(200);
    return { data: mockLeave };
  },
  apply: async (data) => {
    await sleep(500);
    return { ...data, id: `lr-${Date.now()}`, status: 'pending' };
  },
  approve: async (id) => {
    await sleep(300);
    return { success: true };
  },
  reject: async (id) => {
    await sleep(300);
    return { success: true };
  },
  getBalance: async (employeeId) => {
    await sleep(200);
    return { annual: { total: 20, used: 8, remaining: 12 }, sick: { total: 10, used: 3, remaining: 7 } };
  },
};
