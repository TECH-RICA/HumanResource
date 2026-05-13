/* Roles */
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  HR_ADMIN: 'hr_admin',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
};

export const ROLE_LABELS = {
  [ROLES.SUPER_ADMIN]: 'Super Admin',
  [ROLES.HR_ADMIN]: 'HR Admin',
  [ROLES.MANAGER]: 'Manager',
  [ROLES.EMPLOYEE]: 'Employee',
};

export const ROLE_HIERARCHY = [ROLES.SUPER_ADMIN, ROLES.HR_ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE];
