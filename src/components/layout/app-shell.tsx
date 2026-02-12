"use client";

import React from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { useUIStore } from "@/lib/store";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <Header />

      {/* Main content area */}
      <main
        className={`
          pt-16 min-h-screen
          transition-all duration-300
          ${sidebarCollapsed ? "pl-16" : "pl-60"}
        `}
      >
        {children}
      </main>
    </div>
  );
}
