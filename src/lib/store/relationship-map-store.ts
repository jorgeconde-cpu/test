import { create } from "zustand";
import type {
  ContactNode,
  ContactConnection,
  RelationshipMap,
  BuyingRole,
  Sentiment,
} from "../types";

interface RelationshipMapState {
  /** Current map data */
  currentMap: RelationshipMap | null;
  /** Currently selected node for editing */
  selectedContactId: string | null;
  /** Whether the context menu is open */
  contextMenuOpen: boolean;
  contextMenuPosition: { x: number; y: number } | null;

  // Actions
  setCurrentMap: (map: RelationshipMap) => void;
  setSelectedContact: (contactId: string | null) => void;

  // Contact CRUD
  addContact: (contact: ContactNode) => void;
  updateContact: (contactId: string, updates: Partial<ContactNode>) => void;
  removeContact: (contactId: string) => void;
  updateContactPosition: (contactId: string, x: number, y: number) => void;

  // Connection CRUD
  addConnection: (connection: ContactConnection) => void;
  updateConnection: (connectionId: string, updates: Partial<ContactConnection>) => void;
  removeConnection: (connectionId: string) => void;

  // Context menu
  openContextMenu: (position: { x: number; y: number }, contactId: string) => void;
  closeContextMenu: () => void;
}

export const useRelationshipMapStore = create<RelationshipMapState>((set) => ({
  currentMap: null,
  selectedContactId: null,
  contextMenuOpen: false,
  contextMenuPosition: null,

  setCurrentMap: (map) => set({ currentMap: map }),

  setSelectedContact: (contactId) => set({ selectedContactId: contactId }),

  addContact: (contact) =>
    set((state) => {
      if (!state.currentMap) return state;
      return {
        currentMap: {
          ...state.currentMap,
          contacts: [...state.currentMap.contacts, contact],
          updatedAt: new Date().toISOString(),
        },
      };
    }),

  updateContact: (contactId, updates) =>
    set((state) => {
      if (!state.currentMap) return state;
      return {
        currentMap: {
          ...state.currentMap,
          contacts: state.currentMap.contacts.map((c) =>
            c.id === contactId ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
          ),
          updatedAt: new Date().toISOString(),
        },
      };
    }),

  removeContact: (contactId) =>
    set((state) => {
      if (!state.currentMap) return state;
      return {
        currentMap: {
          ...state.currentMap,
          contacts: state.currentMap.contacts.filter((c) => c.id !== contactId),
          connections: state.currentMap.connections.filter(
            (conn) =>
              conn.sourceContactId !== contactId && conn.targetContactId !== contactId
          ),
          updatedAt: new Date().toISOString(),
        },
      };
    }),

  updateContactPosition: (contactId, x, y) =>
    set((state) => {
      if (!state.currentMap) return state;
      return {
        currentMap: {
          ...state.currentMap,
          contacts: state.currentMap.contacts.map((c) =>
            c.id === contactId ? { ...c, positionX: x, positionY: y } : c
          ),
        },
      };
    }),

  addConnection: (connection) =>
    set((state) => {
      if (!state.currentMap) return state;
      return {
        currentMap: {
          ...state.currentMap,
          connections: [...state.currentMap.connections, connection],
          updatedAt: new Date().toISOString(),
        },
      };
    }),

  updateConnection: (connectionId, updates) =>
    set((state) => {
      if (!state.currentMap) return state;
      return {
        currentMap: {
          ...state.currentMap,
          connections: state.currentMap.connections.map((conn) =>
            conn.id === connectionId ? { ...conn, ...updates } : conn
          ),
          updatedAt: new Date().toISOString(),
        },
      };
    }),

  removeConnection: (connectionId) =>
    set((state) => {
      if (!state.currentMap) return state;
      return {
        currentMap: {
          ...state.currentMap,
          connections: state.currentMap.connections.filter((conn) => conn.id !== connectionId),
          updatedAt: new Date().toISOString(),
        },
      };
    }),

  openContextMenu: (position, contactId) =>
    set({ contextMenuOpen: true, contextMenuPosition: position, selectedContactId: contactId }),

  closeContextMenu: () =>
    set({ contextMenuOpen: false, contextMenuPosition: null }),
}));
