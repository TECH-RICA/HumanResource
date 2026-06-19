export const attendance = [
  { id: 'att-1', employeeId: 'emp-4', employeeName: 'Emily Thompson', date: '2024-03-11', clockIn: '09:55', clockOut: '17:30', status: 'present', hoursWorked: 8.58, overtime: 0.58, late: false },
  { id: 'att-2', employeeId: 'emp-6', employeeName: 'Sarah Williams', date: '2024-03-11', clockIn: '09:15', clockOut: '18:00', status: 'present', hoursWorked: 8.75, overtime: 0.75, late: true },
  { id: 'att-3', employeeId: 'emp-7', employeeName: 'Robert Brown', date: '2024-03-11', clockIn: '08:45', clockOut: '17:00', status: 'present', hoursWorked: 8.25, overtime: 0.25, late: false },
  { id: 'att-4', employeeId: 'emp-9', employeeName: 'William Garcia', date: '2024-03-11', clockIn: null, clockOut: null, status: 'absent', hoursWorked: 0, overtime: 0, late: false },
  { id: 'att-5', employeeId: 'emp-11', employeeName: 'Christopher Taylor', date: '2024-03-11', clockIn: '08:30', clockOut: '17:15', status: 'present', hoursWorked: 8.75, overtime: 0.75, late: false },
  { id: 'att-6', employeeId: 'emp-13', employeeName: 'Daniel Thomas', date: '2024-03-11', clockIn: '09:30', clockOut: '17:45', status: 'present', hoursWorked: 8.25, overtime: 0.25, late: true },
  { id: 'att-7', employeeId: 'emp-16', employeeName: 'Lauren Harris', date: '2024-03-11', clockIn: '08:50', clockOut: '17:00', status: 'present', hoursWorked: 8.17, overtime: 0.17, late: false },
  { id: 'att-8', employeeId: 'emp-19', employeeName: 'Ryan Robinson', date: '2024-03-11', clockIn: '09:00', clockOut: '18:30', status: 'present', hoursWorked: 9.5, overtime: 1.5, late: false },
  { id: 'att-9', employeeId: 'emp-22', employeeName: 'Isabella Young', date: '2024-03-11', clockIn: '08:40', clockOut: '17:10', status: 'present', hoursWorked: 8.5, overtime: 0.5, late: false },
  { id: 'att-10', employeeId: 'emp-23', employeeName: 'Tyler King', date: '2024-03-11', clockIn: '09:05', clockOut: '17:00', status: 'present', hoursWorked: 7.92, overtime: 0, late: true },
];

export const attendanceStats = {
  totalPresent: 92,
  totalAbsent: 5,
  totalLate: 8,
  totalOnLeave: 3,
  averageHours: 8.3,
  overtimeHours: 45,
};

export const monthlyAttendance = [
  { month: 'Jan', present: 94, absent: 4, late: 6 },
  { month: 'Feb', present: 91, absent: 6, late: 8 },
  { month: 'Mar', present: 93, absent: 5, late: 7 },
  { month: 'Apr', present: 95, absent: 3, late: 5 },
  { month: 'May', present: 92, absent: 5, late: 8 },
  { month: 'Jun', present: 90, absent: 7, late: 9 },
  { month: 'Jul', present: 88, absent: 8, late: 10 },
  { month: 'Aug', present: 93, absent: 4, late: 6 },
  { month: 'Sep', present: 94, absent: 3, late: 5 },
  { month: 'Oct', present: 91, absent: 6, late: 7 },
  { month: 'Nov', present: 95, absent: 3, late: 4 },
  { month: 'Dec', present: 89, absent: 8, late: 9 },
];
