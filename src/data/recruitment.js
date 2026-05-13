export const jobPostings = [
  { id: 'job-1', title: 'Senior React Developer', department: 'Engineering', location: 'Remote', type: 'full_time', salary: { min: 120000, max: 150000 }, status: 'open', postedDate: '2024-02-15', applicants: 34, description: 'We are looking for an experienced React developer to join our frontend team.' },
  { id: 'job-2', title: 'Product Designer', department: 'Design', location: 'San Francisco, CA', type: 'full_time', salary: { min: 100000, max: 130000 }, status: 'open', postedDate: '2024-03-01', applicants: 28, description: 'Join our design team to create beautiful user experiences.' },
  { id: 'job-3', title: 'Marketing Manager', department: 'Marketing', location: 'New York, NY', type: 'full_time', salary: { min: 90000, max: 120000 }, status: 'open', postedDate: '2024-03-10', applicants: 19, description: 'Lead our marketing initiatives and drive brand awareness.' },
  { id: 'job-4', title: 'Data Analyst', department: 'Finance', location: 'Remote', type: 'full_time', salary: { min: 80000, max: 100000 }, status: 'closed', postedDate: '2024-01-15', applicants: 45, description: 'Analyze financial data and provide business insights.' },
  { id: 'job-5', title: 'Customer Success Rep', department: 'Customer Support', location: 'Austin, TX', type: 'full_time', salary: { min: 55000, max: 70000 }, status: 'open', postedDate: '2024-03-15', applicants: 12, description: 'Help customers succeed with our platform.' },
];

export const applicants = [
  { id: 'app-1', name: 'Alex Johnson', email: 'alex.j@email.com', phone: '+1 555-111-0001', jobId: 'job-1', jobTitle: 'Senior React Developer', stage: 'interview', appliedDate: '2024-02-20', resume: 'alex_johnson_resume.pdf', rating: 4.5, notes: 'Strong portfolio, 6 years React experience' },
  { id: 'app-2', name: 'Priya Sharma', email: 'priya.s@email.com', phone: '+1 555-111-0002', jobId: 'job-1', jobTitle: 'Senior React Developer', stage: 'offer', appliedDate: '2024-02-18', resume: 'priya_sharma_resume.pdf', rating: 4.8, notes: 'Excellent technical skills, great culture fit' },
  { id: 'app-3', name: 'Marcus Brown', email: 'marcus.b@email.com', phone: '+1 555-111-0003', jobId: 'job-2', jobTitle: 'Product Designer', stage: 'screening', appliedDate: '2024-03-05', resume: 'marcus_brown_resume.pdf', rating: 3.5, notes: 'Interesting portfolio, needs design system experience' },
  { id: 'app-4', name: 'Sophie Chen', email: 'sophie.c@email.com', phone: '+1 555-111-0004', jobId: 'job-1', jobTitle: 'Senior React Developer', stage: 'applied', appliedDate: '2024-03-12', resume: 'sophie_chen_resume.pdf', rating: 0, notes: '' },
  { id: 'app-5', name: 'James Wilson', email: 'james.w@email.com', phone: '+1 555-111-0005', jobId: 'job-3', jobTitle: 'Marketing Manager', stage: 'interview', appliedDate: '2024-03-12', resume: 'james_wilson_resume.pdf', rating: 4.0, notes: 'Strong B2B marketing background' },
  { id: 'app-6', name: 'Emma Davis', email: 'emma.d@email.com', phone: '+1 555-111-0006', jobId: 'job-2', jobTitle: 'Product Designer', stage: 'hired', appliedDate: '2024-03-02', resume: 'emma_davis_resume.pdf', rating: 4.9, notes: 'Outstanding candidate, accepted offer' },
];
