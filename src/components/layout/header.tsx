"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Search,
  Bell,
  Building2,
  CircleDot,
  Check,
} from "lucide-react";
import { useAccountStore, useUIStore } from "@/lib/store";
import type { AccountHealth, AccountSummary } from "@/lib/types";
import { mockAccountSummaries } from "@/lib/mock-data";

const HEALTH_CONFIG: Record<AccountHealth, { color: string; label: string }> = {
  healthy: { color: "bg-emerald-500", label: "Healthy" },
  at_risk: { color: "bg-amber-400", label: "At Risk" },
  critical: { color: "bg-rose-500", label: "Critical" },
};

export function Header() {
  const {
    selectedAccountId,
    accounts,
    setAccounts,
    setSelectedAccount,
  } = useAccountStore();
  const { sidebarCollapsed } = useUIStore();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize accounts from mock data
  useEffect(() => {
    if (accounts.length === 0) {
      setAccounts(mockAccountSummaries);
      // Auto-select first account
      if (mockAccountSummaries.length > 0) {
        setSelectedAccount(mockAccountSummaries[0].id);
      }
    }
  }, [accounts.length, setAccounts, setSelectedAccount]);

  // Close dropdown on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedAccount = accounts.find((a) => a.id === selectedAccountId);

  const filteredAccounts = accounts.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (account: AccountSummary) => {
    setSelectedAccount(account.id);
    setDropdownOpen(false);
    setSearchQuery("");
  };

  return (
    <header
      className={`
        fixed top-0 right-0 h-16 bg-white border-b border-slate-200 z-20
        flex items-center justify-between px-6
        transition-all duration-300
        ${sidebarCollapsed ? "left-16" : "left-60"}
      `}
    >
      {/* Account Selector */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors min-w-[280px]"
        >
          <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
          {selectedAccount ? (
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-sm font-medium text-slate-900 truncate">
                {selectedAccount.name}
              </span>
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  HEALTH_CONFIG[selectedAccount.health].color
                }`}
                title={HEALTH_CONFIG[selectedAccount.health].label}
              />
            </div>
          ) : (
            <span className="text-sm text-slate-400">Select an account...</span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-[340px] bg-white rounded-lg border border-slate-200 shadow-xl z-50 animate-fade-in">
            {/* Search */}
            <div className="p-2 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search accounts..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>
            </div>

            {/* Account List */}
            <div className="max-h-[300px] overflow-y-auto py-1">
              {filteredAccounts.length === 0 ? (
                <p className="text-sm text-slate-400 px-4 py-3 text-center">
                  No accounts found
                </p>
              ) : (
                filteredAccounts.map((account) => {
                  const health = HEALTH_CONFIG[account.health];
                  const isSelected = account.id === selectedAccountId;
                  return (
                    <button
                      key={account.id}
                      onClick={() => handleSelect(account)}
                      className={`
                        w-full flex items-center gap-3 px-4 py-2.5 text-left
                        transition-colors
                        ${
                          isSelected
                            ? "bg-blue-50"
                            : "hover:bg-slate-50"
                        }
                      `}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-medium truncate ${
                              isSelected
                                ? "text-blue-700"
                                : "text-slate-900"
                            }`}
                          >
                            {account.name}
                          </span>
                          <span
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${health.color}`}
                          />
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-slate-400 capitalize">
                            {account.industry.replace(/_/g, " ")}
                          </span>
                          <span className="text-[10px] text-slate-300">
                            &middot;
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {account.owner}
                          </span>
                          <span className="text-[10px] text-slate-300">
                            &middot;
                          </span>
                          <span className="text-[10px] font-medium text-emerald-600">
                            $
                            {(account.totalPipelineValue / 1000000).toFixed(
                              1
                            )}
                            M pipeline
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right side: breadcrumb + actions */}
      <div className="flex items-center gap-4">
        {selectedAccount && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium border ${
                selectedAccount.health === "healthy"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : selectedAccount.health === "at_risk"
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-rose-50 text-rose-700 border-rose-200"
              }`}
            >
              <CircleDot className="w-3 h-3" />
              {HEALTH_CONFIG[selectedAccount.health].label}
            </span>
          </div>
        )}

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <Bell className="w-5 h-5 text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
        </button>

        {/* User Avatar */}
        <button className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-xs font-bold text-white">
          JS
        </button>
      </div>
    </header>
  );
}
