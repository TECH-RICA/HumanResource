import { sleep } from '../utils/helpers';

export const reportService = {
  generate: async (type, filters) => {
    await sleep(500);
    return { data: [], type };
  },
  exportPDF: async (type) => {
    await sleep(800);
    return { url: '#', filename: `${type}_report.pdf` };
  },
  exportCSV: async (type) => {
    await sleep(600);
    return { url: '#', filename: `${type}_report.csv` };
  },
};
