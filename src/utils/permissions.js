import { ROLES } from '../constants/roles';

export const permissions = {
  canManageEmployees: (role) => [ROLES.SUPER_ADMIN, ROLES.HR_ADMIN].includes(role),
  canApproveLeave: (role) => [ROLES.SUPER_ADMIN, ROLES.HR_ADMIN, ROLES.MANAGER].includes(role),
  canManagePayroll: (role) => [ROLES.SUPER_ADMIN, ROLES.HR_ADMIN].includes(role),
  canManageRecruitment: (role) => [ROLES.SUPER_ADMIN, ROLES.HR_ADMIN].includes(role),
  canManageDepartments: (role) => [ROLES.SUPER_ADMIN, ROLES.HR_ADMIN].includes(role),
  canViewReports: (role) => [ROLES.SUPER_ADMIN, ROLES.HR_ADMIN, ROLES.MANAGER].includes(role),
  canManageSettings: (role) => [ROLES.SUPER_ADMIN].includes(role),
  canManageSubscription: (role) => [ROLES.SUPER_ADMIN].includes(role),
  canManagePerformance: (role) => [ROLES.SUPER_ADMIN, ROLES.HR_ADMIN, ROLES.MANAGER].includes(role),
  canViewAllEmployees: (role) => [ROLES.SUPER_ADMIN, ROLES.HR_ADMIN, ROLES.MANAGER].includes(role),
  canCreateAnnouncements: (role) => [ROLES.SUPER_ADMIN, ROLES.HR_ADMIN].includes(role),
};

export const hasPermission = (role, permission) => {
  const check = permissions[permission];
  return check ? check(role) : false;
};
