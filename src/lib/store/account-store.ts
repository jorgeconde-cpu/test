import { create } from "zustand";
import type { AccountPlan, AccountSummary } from "../types";

interface AccountState {
  /** Currently selected account */
  selectedAccountId: string | null;
  /** All account summaries for the selector */
  accounts: AccountSummary[];
  /** Full account plan for the selected account */
  currentPlan: AccountPlan | null;

  // Actions
  setSelectedAccount: (accountId: string) => void;
  setAccounts: (accounts: AccountSummary[]) => void;
  setCurrentPlan: (plan: AccountPlan) => void;
  clearCurrentPlan: () => void;
}

export const useAccountStore = create<AccountState>((set) => ({
  selectedAccountId: null,
  accounts: [],
  currentPlan: null,

  setSelectedAccount: (accountId) =>
    set({ selectedAccountId: accountId }),

  setAccounts: (accounts) =>
    set({ accounts }),

  setCurrentPlan: (plan) =>
    set({ currentPlan: plan }),

  clearCurrentPlan: () =>
    set({ currentPlan: null, selectedAccountId: null }),
}));
