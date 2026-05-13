import { jobPostings, applicants as mockApplicants } from '../data/recruitment';
import { sleep } from '../utils/helpers';

export const recruitmentService = {
  getJobs: async () => {
    await sleep(200);
    return { data: jobPostings };
  },
  getApplicants: async (jobId) => {
    await sleep(200);
    const data = jobId ? mockApplicants.filter((a) => a.jobId === jobId) : mockApplicants;
    return { data };
  },
  createJob: async (data) => {
    await sleep(500);
    return { ...data, id: `job-${Date.now()}`, status: 'open' };
  },
  updateStage: async (applicantId, stage) => {
    await sleep(300);
    return { success: true };
  },
};
