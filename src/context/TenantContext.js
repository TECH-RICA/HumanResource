import { create } from 'zustand';
import { PLANS } from '../constants/plans';

export const useTenantStore = create((set) => ({
  tenant: {
    id: 'tenant-1',
    name: 'TechCorp Inc.',
    domain: 'techcorp',
    logo: null,
    primaryColor: '#2563eb',
    plan: PLANS.PROFESSIONAL,
    employeeCount: 28,
    maxEmployees: 200,
    subscriptionStatus: 'active',
    subscriptionEnd: '2025-03-15',
    createdAt: '2019-01-01',
    address: '100 Innovation Drive, San Francisco, CA 94102',
    phone: '+1 (555) 000-1000',
    email: 'admin@techcorp.com',
    website: 'https://techcorp.com',
    industry: 'Technology',
  },
  isLoading: false,

  updateTenant: (data) => set((state) => ({ tenant: { ...state.tenant, ...data } })),

  updateBranding: (branding) => set((state) => ({
    tenant: { ...state.tenant, ...branding },
  })),

  upgradePlan: async (plan) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 1000));
    set((state) => ({
      tenant: { ...state.tenant, plan },
      isLoading: false,
    }));
  },
}));
