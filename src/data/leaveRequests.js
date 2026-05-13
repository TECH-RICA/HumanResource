export const leaveRequests = [
  { id: 'lr-1', employeeId: 'emp-4', employeeName: 'Emily Thompson', department: 'Engineering', type: 'annual', startDate: '2024-03-15', endDate: '2024-03-22', days: 5, reason: 'Family vacation', status: 'approved', approvedBy: 'David Chen', appliedDate: '2024-02-28' },
  { id: 'lr-2', employeeId: 'emp-9', employeeName: 'William Garcia', department: 'Sales', type: 'sick', startDate: '2024-03-10', endDate: '2024-03-11', days: 2, reason: 'Flu symptoms', status: 'approved', approvedBy: 'Jennifer Davis', appliedDate: '2024-03-10' },
  { id: 'lr-3', employeeId: 'emp-13', employeeName: 'Daniel Thomas', department: 'Marketing', type: 'annual', startDate: '2024-04-01', endDate: '2024-04-05', days: 5, reason: 'Personal time off', status: 'pending', approvedBy: null, appliedDate: '2024-03-15' },
  { id: 'lr-4', employeeId: 'emp-26', employeeName: 'Megan Adams', department: 'Human Resources', type: 'maternity', startDate: '2024-03-01', endDate: '2024-06-01', days: 65, reason: 'Maternity leave', status: 'approved', approvedBy: 'Maria Rodriguez', appliedDate: '2024-01-15' },
  { id: 'lr-5', employeeId: 'emp-6', employeeName: 'Sarah Williams', department: 'Engineering', type: 'annual', startDate: '2024-04-10', endDate: '2024-04-12', days: 3, reason: 'Moving to new apartment', status: 'pending', approvedBy: null, appliedDate: '2024-03-20' },
  { id: 'lr-6', employeeId: 'emp-16', employeeName: 'Lauren Harris', department: 'Sales', type: 'sick', startDate: '2024-03-18', endDate: '2024-03-18', days: 1, reason: 'Migraine', status: 'approved', approvedBy: 'Jennifer Davis', appliedDate: '2024-03-18' },
  { id: 'lr-7', employeeId: 'emp-7', employeeName: 'Robert Brown', department: 'Engineering', type: 'compassionate', startDate: '2024-03-25', endDate: '2024-03-29', days: 5, reason: 'Family bereavement', status: 'approved', approvedBy: 'David Chen', appliedDate: '2024-03-24' },
  { id: 'lr-8', employeeId: 'emp-20', employeeName: 'Olivia Walker', department: 'Marketing', type: 'annual', startDate: '2024-04-15', endDate: '2024-04-19', days: 5, reason: 'Spring break trip', status: 'pending', approvedBy: null, appliedDate: '2024-03-22' },
  { id: 'lr-9', employeeId: 'emp-23', employeeName: 'Tyler King', department: 'Customer Support', type: 'sick', startDate: '2024-03-05', endDate: '2024-03-06', days: 2, reason: 'Back pain', status: 'rejected', approvedBy: 'Matthew White', appliedDate: '2024-03-05' },
  { id: 'lr-10', employeeId: 'emp-11', employeeName: 'Christopher Taylor', department: 'Engineering', type: 'paternity', startDate: '2024-05-01', endDate: '2024-05-14', days: 10, reason: 'Paternity leave', status: 'pending', approvedBy: null, appliedDate: '2024-03-01' },
];

export const leaveBalances = [
  { employeeId: 'emp-4', annual: { total: 20, used: 8, remaining: 12 }, sick: { total: 10, used: 2, remaining: 8 } },
  { employeeId: 'emp-6', annual: { total: 20, used: 5, remaining: 15 }, sick: { total: 10, used: 1, remaining: 9 } },
  { employeeId: 'emp-7', annual: { total: 20, used: 10, remaining: 10 }, sick: { total: 10, used: 3, remaining: 7 } },
];
