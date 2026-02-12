"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Network,
  Grid3X3,
  Target,
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
  Zap,
} from "lucide-react";
import { useUIStore, useAccountStore } from "@/lib/store";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  requiresAccount: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    requiresAccount: false,
  },
  {
    label: "Relationship Map",
    icon: Network,
    href: "/relationship-map",
    requiresAccount: true,
  },
  {
    label: "White Space",
    icon: Grid3X3,
    href: "/white-space",
    requiresAccount: true,
  },
  {
    label: "Strategy",
    icon: Target,
    href: "/strategy",
    requiresAccount: true,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { selectedAccountId } = useAccountStore();

  const buildHref = (item: NavItem) => {
    if (item.requiresAccount && selectedAccountId) {
      return `/accounts/${selectedAccountId}${item.href}`;
    }
    return item.href;
  };

  const isActive = (item: NavItem) => {
    const href = buildHref(item);
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <aside
      className={`
        fixed left-0 top-0 h-full bg-slate-900 text-white z-30
        flex flex-col transition-all duration-300 ease-in-out
        ${sidebarCollapsed ? "w-16" : "w-60"}
      `}
    >
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Zap className="w-5 h-5 text-white" />
        </div>
        {!sidebarCollapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold tracking-tight truncate">
              StrategicPlanner
            </h1>
            <p className="text-[10px] text-slate-400 truncate">
              Key Account Management
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          const href = buildHref(item);
          const disabled = item.requiresAccount && !selectedAccountId;

          if (disabled) {
            return (
              <div
                key={item.label}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg
                  text-slate-600 cursor-not-allowed
                  ${sidebarCollapsed ? "justify-center" : ""}
                `}
                title={
                  sidebarCollapsed
                    ? `${item.label} (select account first)`
                    : undefined
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="text-sm truncate">{item.label}</span>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg
                transition-colors duration-150
                ${
                  active
                    ? "bg-blue-600/20 text-blue-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }
                ${sidebarCollapsed ? "justify-center" : ""}
              `}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && (
                <span className="text-sm font-medium truncate">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-slate-800 py-3 px-2 space-y-1">
        <button
          className={`
            flex items-center gap-3 px-3 py-2 rounded-lg w-full
            text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition-colors
            ${sidebarCollapsed ? "justify-center" : ""}
          `}
          title={sidebarCollapsed ? "Settings" : undefined}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!sidebarCollapsed && (
            <span className="text-sm truncate">Settings</span>
          )}
        </button>

        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          className={`
            flex items-center gap-3 px-3 py-2 rounded-lg w-full
            text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition-colors
            ${sidebarCollapsed ? "justify-center" : ""}
          `}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5 flex-shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm truncate">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
