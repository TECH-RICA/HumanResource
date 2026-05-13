import { sleep } from '../utils/helpers';

export const performanceService = {
  getReviews: async () => {
    await sleep(200);
    return { data: [] };
  },
  createReview: async (data) => {
    await sleep(500);
    return { ...data, id: `rev-${Date.now()}` };
  },
  getKPIs: async (employeeId) => {
    await sleep(200);
    return { data: [] };
  },
};
