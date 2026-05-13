import { payrollRecords as mockPayroll } from '../data/payroll';
import { sleep } from '../utils/helpers';

export const payrollService = {
  getAll: async () => {
    await sleep(200);
    return { data: mockPayroll };
  },
  process: async (period) => {
    await sleep(1000);
    return { success: true, processedCount: mockPayroll.length };
  },
  getPayslip: async (id) => {
    await sleep(300);
    return mockPayroll.find((p) => p.id === id) || null;
  },
};
