"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  Network,
  Grid3X3,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  Building2,
} from "lucide-react";
import { useAccountStore } from "@/lib/store";
import { mockAccountPlan, mockAccountSummaries } from "@/lib/mock-data";
import type { AccountHealth } from "@/lib/types";

const HEALTH_COLORS: Record<AccountHealth, string> = {
  healthy: "bg-emerald-500",
  at_risk: "bg-amber-400",
  critical: "bg-rose-500",
};

export default function DashboardPage() {
  const { selectedAccountId, accounts, setAccounts, currentPlan, setCurrentPlan } =
    useAccountStore();

  useEffect(() => {
    if (accounts.length === 0) {
      setAccounts(mockAccountSummaries);
    }
    if (!currentPlan) {
      setCurrentPlan(mockAccountPlan);
    }
  }, [accounts.length, setAccounts, currentPlan, setCurrentPlan]);

  const selectedAccount = accounts.find((a) => a.id === selectedAccountId);

  // Quick stats from mock data
  const stats = [
    {
      label: "Pipeline Value",
      value: "$1.5M",
      icon: DollarSign,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Closed Revenue",
      value: "$1.58M",
      icon: TrendingUp,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Key Contacts",
      value: "7",
      icon: Users,
      color: "text-violet-600 bg-violet-50",
    },
    {
      label: "At-Risk Items",
      value: "2",
      icon: AlertTriangle,
      color: "text-amber-600 bg-amber-50",
    },
  ];

  const modules = [
    {
      title: "Relationship Map",
      description:
        "Visualize the buying committee, map influence lines, and track sentiment across key contacts.",
      icon: Network,
      href: selectedAccountId
        ? `/accounts/${selectedAccountId}/relationship-map`
        : "#",
      color: "bg-blue-600",
      stat: "7 contacts mapped",
    },
    {
      title: "White Space Analysis",
      description:
        "Identify cross-sell and upsell opportunities across business units and product lines.",
      icon: Grid3X3,
      href: selectedAccountId
        ? `/accounts/${selectedAccountId}/white-space`
        : "#",
      color: "bg-emerald-600",
      stat: "12 opportunities",
    },
    {
      title: "Strategy & Playbooks",
      description:
        "Plan SWOT analysis, track objectives with key results, and manage your activity timeline.",
      icon: Target,
      href: selectedAccountId
        ? `/accounts/${selectedAccountId}/strategy`
        : "#",
      color: "bg-violet-600",
      stat: "3 active objectives",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          {selectedAccount
            ? `Account Plan: ${selectedAccount.name}`
            : "Welcome to StrategicPlanner"}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {selectedAccount
            ? `FY2026 strategic planning and execution dashboard`
            : "Select an account from the header to get started"}
        </p>
      </div>

      {/* Stats Grid */}
      {selectedAccount && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500">{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Module Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <Link
              key={mod.title}
              href={mod.href}
              className={`
                group bg-white rounded-xl border border-slate-200 p-6
                hover:shadow-lg hover:border-slate-300 transition-all
                ${!selectedAccountId ? "opacity-50 pointer-events-none" : ""}
              `}
            >
              <div
                className={`w-12 h-12 rounded-xl ${mod.color} flex items-center justify-center mb-4`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>

              <h2 className="text-lg font-semibold text-slate-900 mb-2">
                {mod.title}
              </h2>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                {mod.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{mod.stat}</span>
                <span className="flex items-center gap-1 text-xs font-medium text-blue-600 group-hover:gap-2 transition-all">
                  Open <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Account List (when no account selected) */}
      {!selectedAccountId && (
        <div>
          <h2 className="text-sm font-semibold text-slate-900 mb-3">
            Your Accounts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {accounts.map((account) => (
              <button
                key={account.id}
                onClick={() =>
                  useAccountStore.getState().setSelectedAccount(account.id)
                }
                className="flex items-center gap-4 bg-white rounded-lg border border-slate-200 p-4 hover:shadow-sm hover:border-slate-300 transition-all text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {account.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-slate-400 capitalize">
                      {account.industry.replace(/_/g, " ")}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        HEALTH_COLORS[account.health]
                      }`}
                    />
                    <span className="text-[10px] text-emerald-600 font-medium">
                      ${(account.totalPipelineValue / 1000000).toFixed(1)}M
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
