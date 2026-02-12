import { create } from "zustand";

interface UIState {
  /** Whether the sidebar is collapsed */
  sidebarCollapsed: boolean;
  /** Whether a drawer panel is open */
  drawerOpen: boolean;
  /** Content type currently shown in the drawer */
  drawerContent: "contact-detail" | "cell-detail" | "objective-detail" | null;
  /** ID of the entity shown in the drawer */
  drawerEntityId: string | null;

  // Actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  openDrawer: (content: UIState["drawerContent"], entityId: string) => void;
  closeDrawer: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  drawerOpen: false,
  drawerContent: null,
  drawerEntityId: null,

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setSidebarCollapsed: (collapsed) =>
    set({ sidebarCollapsed: collapsed }),

  openDrawer: (content, entityId) =>
    set({ drawerOpen: true, drawerContent: content, drawerEntityId: entityId }),

  closeDrawer: () =>
    set({ drawerOpen: false, drawerContent: null, drawerEntityId: null }),
}));
