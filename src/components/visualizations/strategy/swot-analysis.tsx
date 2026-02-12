"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Shield,
  AlertTriangle,
  TrendingUp,
  Flame,
  Plus,
} from "lucide-react";
import type { SwotAnalysis, SwotItem, SwotCategory } from "@/lib/types";

const SWOT_CONFIG: Record<
  SwotCategory,
  {
    title: string;
    icon: React.ElementType;
    headerBg: string;
    headerText: string;
    itemBg: string;
    itemBorder: string;
    badgeColor: string;
  }
> = {
  strength: {
    title: "Strengths",
    icon: Shield,
    headerBg: "bg-emerald-50",
    headerText: "text-emerald-800",
    itemBg: "bg-emerald-50/50",
    itemBorder: "border-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  weakness: {
    title: "Weaknesses",
    icon: AlertTriangle,
    headerBg: "bg-amber-50",
    headerText: "text-amber-800",
    itemBg: "bg-amber-50/50",
    itemBorder: "border-amber-200",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  opportunity: {
    title: "Opportunities",
    icon: TrendingUp,
    headerBg: "bg-blue-50",
    headerText: "text-blue-800",
    itemBg: "bg-blue-50/50",
    itemBorder: "border-blue-200",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  threat: {
    title: "Threats",
    icon: Flame,
    headerBg: "bg-rose-50",
    headerText: "text-rose-800",
    itemBg: "bg-rose-50/50",
    itemBorder: "border-rose-200",
    badgeColor: "bg-rose-100 text-rose-700",
  },
};

interface SwotSectionProps {
  category: SwotCategory;
  items: SwotItem[];
}

function SwotSection({ category, items }: SwotSectionProps) {
  const [expanded, setExpanded] = useState(true);
  const config = SWOT_CONFIG[category];
  const Icon = config.icon;

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      {/* Accordion Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`
          w-full flex items-center justify-between px-4 py-3
          ${config.headerBg} ${config.headerText}
          transition-colors hover:opacity-90
        `}
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          <span className="text-sm font-semibold">{config.title}</span>
          <span className="text-xs opacity-60">({items.length})</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Items */}
      {expanded && (
        <div className="divide-y divide-slate-100">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-start gap-3 px-4 py-3 ${config.itemBg} hover:bg-white/50 transition-colors`}
            >
              <div className="flex-1">
                <p className="text-sm text-slate-800">{item.content}</p>
              </div>
              <span
                className={`
                  text-[10px] font-medium px-2 py-0.5 rounded-full
                  uppercase tracking-wider flex-shrink-0
                  ${config.badgeColor}
                `}
              >
                {item.impact}
              </span>
            </div>
          ))}

          {/* Add item placeholder */}
          <button className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
            <Plus className="w-3.5 h-3.5" />
            Add item
          </button>
        </div>
      )}
    </div>
  );
}

interface SwotAnalysisProps {
  swot: SwotAnalysis;
}

export function SwotAnalysisView({ swot }: SwotAnalysisProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <SwotSection category="strength" items={swot.strengths} />
      <SwotSection category="weakness" items={swot.weaknesses} />
      <SwotSection category="opportunity" items={swot.opportunities} />
      <SwotSection category="threat" items={swot.threats} />
    </div>
  );
}
