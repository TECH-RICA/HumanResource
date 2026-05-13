export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  ON_LEAVE: 'on_leave',
  TERMINATED: 'terminated',
};

export const STATUS_COLORS = {
  [STATUS.ACTIVE]: { bg: '#dcfce7', text: '#15803d' },
  [STATUS.INACTIVE]: { bg: '#f3f4f6', text: '#4b5563' },
  [STATUS.PENDING]: { bg: '#fef3c7', text: '#d97706' },
  [STATUS.APPROVED]: { bg: '#dcfce7', text: '#15803d' },
  [STATUS.REJECTED]: { bg: '#fee2e2', text: '#b91c1c' },
  [STATUS.ON_LEAVE]: { bg: '#dbeafe', text: '#1d4ed8' },
  [STATUS.TERMINATED]: { bg: '#fee2e2', text: '#b91c1c' },
};

export const EMPLOYMENT_STATUS = {
  FULL_TIME: 'full_time',
  PART_TIME: 'part_time',
  CONTRACT: 'contract',
  INTERN: 'intern',
  PROBATION: 'probation',
};

export const EMPLOYMENT_STATUS_LABELS = {
  [EMPLOYMENT_STATUS.FULL_TIME]: 'Full Time',
  [EMPLOYMENT_STATUS.PART_TIME]: 'Part Time',
  [EMPLOYMENT_STATUS.CONTRACT]: 'Contract',
  [EMPLOYMENT_STATUS.INTERN]: 'Intern',
  [EMPLOYMENT_STATUS.PROBATION]: 'Probation',
};

export const RECRUITMENT_STAGES = {
  APPLIED: 'applied',
  SCREENING: 'screening',
  INTERVIEW: 'interview',
  OFFER: 'offer',
  HIRED: 'hired',
  REJECTED: 'rejected',
};

export const RECRUITMENT_STAGE_LABELS = {
  [RECRUITMENT_STAGES.APPLIED]: 'Applied',
  [RECRUITMENT_STAGES.SCREENING]: 'Screening',
  [RECRUITMENT_STAGES.INTERVIEW]: 'Interview',
  [RECRUITMENT_STAGES.OFFER]: 'Offer',
  [RECRUITMENT_STAGES.HIRED]: 'Hired',
  [RECRUITMENT_STAGES.REJECTED]: 'Rejected',
};
