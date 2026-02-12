import { create } from "zustand";
import type {
  OpportunityMatrix,
  MatrixCell,
  CellStatus,
  BusinessUnit,
  Product,
} from "../types";

interface WhiteSpaceState {
  /** Current matrix data */
  currentMatrix: OpportunityMatrix | null;
  /** Currently selected cell for detail editing */
  selectedCellId: string | null;

  // Actions
  setCurrentMatrix: (matrix: OpportunityMatrix) => void;
  setSelectedCell: (cellId: string | null) => void;

  // Cell operations
  updateCellStatus: (cellId: string, status: CellStatus) => void;
  updateCell: (cellId: string, updates: Partial<MatrixCell>) => void;

  // Row/Column operations
  addBusinessUnit: (bu: BusinessUnit) => void;
  removeBusinessUnit: (buId: string) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
}

export const useWhiteSpaceStore = create<WhiteSpaceState>((set) => ({
  currentMatrix: null,
  selectedCellId: null,

  setCurrentMatrix: (matrix) => set({ currentMatrix: matrix }),

  setSelectedCell: (cellId) => set({ selectedCellId: cellId }),

  updateCellStatus: (cellId, status) =>
    set((state) => {
      if (!state.currentMatrix) return state;
      return {
        currentMatrix: {
          ...state.currentMatrix,
          cells: state.currentMatrix.cells.map((cell) =>
            cell.id === cellId
              ? { ...cell, status, updatedAt: new Date().toISOString() }
              : cell
          ),
          updatedAt: new Date().toISOString(),
        },
      };
    }),

  updateCell: (cellId, updates) =>
    set((state) => {
      if (!state.currentMatrix) return state;
      return {
        currentMatrix: {
          ...state.currentMatrix,
          cells: state.currentMatrix.cells.map((cell) =>
            cell.id === cellId
              ? { ...cell, ...updates, updatedAt: new Date().toISOString() }
              : cell
          ),
          updatedAt: new Date().toISOString(),
        },
      };
    }),

  addBusinessUnit: (bu) =>
    set((state) => {
      if (!state.currentMatrix) return state;
      // Create white_space cells for each product
      const newCells: MatrixCell[] = state.currentMatrix.products.map((p) => ({
        id: `cell-${bu.id}-${p.id}`,
        businessUnitId: bu.id,
        productId: p.id,
        status: "white_space" as const,
        revenue: 0,
        confidence: 0,
        updatedAt: new Date().toISOString(),
      }));
      return {
        currentMatrix: {
          ...state.currentMatrix,
          businessUnits: [...state.currentMatrix.businessUnits, bu],
          cells: [...state.currentMatrix.cells, ...newCells],
          updatedAt: new Date().toISOString(),
        },
      };
    }),

  removeBusinessUnit: (buId) =>
    set((state) => {
      if (!state.currentMatrix) return state;
      return {
        currentMatrix: {
          ...state.currentMatrix,
          businessUnits: state.currentMatrix.businessUnits.filter((bu) => bu.id !== buId),
          cells: state.currentMatrix.cells.filter((c) => c.businessUnitId !== buId),
          updatedAt: new Date().toISOString(),
        },
      };
    }),

  addProduct: (product) =>
    set((state) => {
      if (!state.currentMatrix) return state;
      const newCells: MatrixCell[] = state.currentMatrix.businessUnits.map((bu) => ({
        id: `cell-${bu.id}-${product.id}`,
        businessUnitId: bu.id,
        productId: product.id,
        status: "white_space" as const,
        revenue: 0,
        confidence: 0,
        updatedAt: new Date().toISOString(),
      }));
      return {
        currentMatrix: {
          ...state.currentMatrix,
          products: [...state.currentMatrix.products, product],
          cells: [...state.currentMatrix.cells, ...newCells],
          updatedAt: new Date().toISOString(),
        },
      };
    }),

  removeProduct: (productId) =>
    set((state) => {
      if (!state.currentMatrix) return state;
      return {
        currentMatrix: {
          ...state.currentMatrix,
          products: state.currentMatrix.products.filter((p) => p.id !== productId),
          cells: state.currentMatrix.cells.filter((c) => c.productId !== productId),
          updatedAt: new Date().toISOString(),
        },
      };
    }),
}));
