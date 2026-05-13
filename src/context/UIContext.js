import { create } from 'zustand';

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  sidebarMobileOpen: false,
  
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleMobileSidebar: () => set((s) => ({ sidebarMobileOpen: !s.sidebarMobileOpen })),
  closeMobileSidebar: () => set({ sidebarMobileOpen: false }),
}));
