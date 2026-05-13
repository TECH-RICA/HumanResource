export const payrollRecords = [
  { id: 'pay-1', employeeId: 'emp-1', employeeName: 'James Mitchell', department: 'Engineering', position: 'CTO', baseSalary: 185000, bonus: 15000, deductions: 4200, tax: 42000, netSalary: 153800, payPeriod: 'March 2024', status: 'processed', paidDate: '2024-03-28' },
  { id: 'pay-2', employeeId: 'emp-2', employeeName: 'Maria Rodriguez', department: 'Human Resources', position: 'HR Director', baseSalary: 125000, bonus: 8000, deductions: 3100, tax: 28000, netSalary: 101900, payPeriod: 'March 2024', status: 'processed', paidDate: '2024-03-28' },
  { id: 'pay-3', employeeId: 'emp-3', employeeName: 'David Chen', department: 'Engineering', position: 'VP of Engineering', baseSalary: 165000, bonus: 12000, deductions: 3800, tax: 38000, netSalary: 135200, payPeriod: 'March 2024', status: 'processed', paidDate: '2024-03-28' },
  { id: 'pay-4', employeeId: 'emp-4', employeeName: 'Emily Thompson', department: 'Engineering', position: 'Senior Developer', baseSalary: 135000, bonus: 5000, deductions: 3200, tax: 30000, netSalary: 106800, payPeriod: 'March 2024', status: 'pending', paidDate: null },
  { id: 'pay-5', employeeId: 'emp-5', employeeName: 'Michael Johnson', department: 'Marketing', position: 'Marketing Director', baseSalary: 130000, bonus: 10000, deductions: 3000, tax: 29000, netSalary: 108000, payPeriod: 'March 2024', status: 'processed', paidDate: '2024-03-28' },
  { id: 'pay-6', employeeId: 'emp-8', employeeName: 'Jennifer Davis', department: 'Sales', position: 'Sales Director', baseSalary: 140000, bonus: 18000, deductions: 3500, tax: 32000, netSalary: 122500, payPeriod: 'March 2024', status: 'processed', paidDate: '2024-03-28' },
  { id: 'pay-7', employeeId: 'emp-10', employeeName: 'Amanda Martinez', department: 'Finance', position: 'Finance Director', baseSalary: 145000, bonus: 8000, deductions: 3400, tax: 33000, netSalary: 116600, payPeriod: 'March 2024', status: 'processed', paidDate: '2024-03-28' },
  { id: 'pay-8', employeeId: 'emp-18', employeeName: 'Sophia Lewis', department: 'Design', position: 'Design Lead', baseSalary: 118000, bonus: 5000, deductions: 2800, tax: 26000, netSalary: 94200, payPeriod: 'March 2024', status: 'pending', paidDate: null },
];

export const payrollSummary = {
  totalPayroll: 2842000,
  totalBonuses: 156000,
  totalDeductions: 89400,
  totalTax: 612000,
  totalNetPay: 2296600,
  processedCount: 24,
  pendingCount: 4,
};

export const payrollByDepartment = [
  { department: 'Engineering', amount: 1150000, employees: 24 },
  { department: 'Sales', amount: 520000, employees: 18 },
  { department: 'Marketing', amount: 380000, employees: 12 },
  { department: 'Operations', amount: 310000, employees: 10 },
  { department: 'Customer Support', amount: 280000, employees: 14 },
  { department: 'Finance', amount: 260000, employees: 6 },
  { department: 'Human Resources', amount: 250000, employees: 8 },
  { department: 'Design', amount: 230000, employees: 7 },
];
