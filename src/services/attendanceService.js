import { attendance as mockAttendance } from '../data/attendance';
import { sleep } from '../utils/helpers';

export const attendanceService = {
  getAll: async (date) => {
    await sleep(200);
    return { data: mockAttendance };
  },
  clockIn: async (employeeId) => {
    await sleep(300);
    return { success: true, time: new Date().toISOString() };
  },
  clockOut: async (employeeId) => {
    await sleep(300);
    return { success: true, time: new Date().toISOString() };
  },
};
