export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyEmail: '/auth/verify-email',
    me: '/auth/me',
  },
  employees: {
    list: '/employees',
    create: '/employees',
    detail: (id) => `/employees/${id}`,
    update: (id) => `/employees/${id}`,
    delete: (id) => `/employees/${id}`,
  },
  departments: {
    list: '/departments',
    create: '/departments',
    detail: (id) => `/departments/${id}`,
    update: (id) => `/departments/${id}`,
    delete: (id) => `/departments/${id}`,
  },
  attendance: {
    list: '/attendance',
    clockIn: '/attendance/clock-in',
    clockOut: '/attendance/clock-out',
    report: '/attendance/report',
  },
  leave: {
    list: '/leave',
    apply: '/leave/apply',
    approve: (id) => `/leave/${id}/approve`,
    reject: (id) => `/leave/${id}/reject`,
    balance: '/leave/balance',
  },
  payroll: {
    list: '/payroll',
    process: '/payroll/process',
    payslip: (id) => `/payroll/${id}/payslip`,
  },
  recruitment: {
    jobs: '/recruitment/jobs',
    applicants: '/recruitment/applicants',
  },
  performance: {
    reviews: '/performance/reviews',
    kpis: '/performance/kpis',
  },
  reports: {
    generate: '/reports/generate',
    export: '/reports/export',
  },
};
