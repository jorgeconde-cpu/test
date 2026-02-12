"use client";

import React from "react";
import {
  CheckCircle2,
  TrendingUp,
  XCircle,
  Minus,
  Circle,
} from "lucide-react";
import type { CellStatus, MatrixCell } from "@/lib/types";

/** Status → visual config */
const STATUS_CONFIG: Record<
  CellStatus,
  {
    bg: string;
    hoverBg: string;
    border: string;
    text: string;
    icon: React.ElementType;
    label: string;
  }
> = {
  sold: {
    bg: "bg-emerald-100",
    hoverBg: "hover:bg-emerald-200",
    border: "border-emerald-300",
    text: "text-emerald-800",
    icon: CheckCircle2,
    label: "Sold",
  },
  active: {
    bg: "bg-amber-50",
    hoverBg: "hover:bg-amber-100",
    border: "border-amber-300",
    text: "text-amber-800",
    icon: TrendingUp,
    label: "Active",
  },
  lost: {
    bg: "bg-rose-100",
    hoverBg: "hover:bg-rose-200",
    border: "border-rose-300",
    text: "text-rose-800",
    icon: XCircle,
    label: "Lost",
  },
  not_applicable: {
    bg: "bg-slate-100",
    hoverBg: "hover:bg-slate-200",
    border: "border-slate-200",
    text: "text-slate-400",
    icon: Minus,
    label: "N/A",
  },
  white_space: {
    bg: "bg-white",
    hoverBg: "hover:bg-blue-50",
    border: "border-slate-200 border-dashed",
    text: "text-slate-400",
    icon: Circle,
    label: "White Space",
  },
};

interface MatrixCellComponentProps {
  cell: MatrixCell;
  isSelected: boolean;
  onClick: (cellId: string) => void;
}

/** Format currency for display */
function formatCurrency(amount: number): string {
  if (amount === 0) return "—";
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
  return `$${amount.toLocaleString()}`;
}

export function MatrixCellComponent({
  cell,
  isSelected,
  onClick,
}: MatrixCellComponentProps) {
  const config = STATUS_CONFIG[cell.status];
  const Icon = config.icon;

  return (
    <button
      onClick={() => onClick(cell.id)}
      className={`
        relative w-full h-full min-h-[72px] p-2
        border rounded-md transition-all duration-150
        ${config.bg} ${config.hoverBg} ${config.border} ${config.text}
        ${isSelected ? "ring-2 ring-blue-500 ring-offset-1 shadow-md" : ""}
        group cursor-pointer text-left
      `}
    >
      {/* Status icon + Revenue */}
      <div className="flex items-start justify-between">
        <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
        {cell.revenue > 0 && (
          <span className="text-xs font-semibold">
            {formatCurrency(cell.revenue)}
          </span>
        )}
      </div>

      {/* Opportunity name or competitor */}
      {cell.opportunityName && (
        <p className="text-[10px] mt-1 truncate font-medium">
          {cell.opportunityName}
        </p>
      )}
      {cell.competitorName && (
        <p className="text-[10px] mt-1 truncate">
          vs. {cell.competitorName}
        </p>
      )}

      {/* Confidence bar (only for active opportunities) */}
      {cell.status === "active" && cell.confidence > 0 && (
        <div className="mt-1.5">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[9px] opacity-70">Confidence</span>
            <span className="text-[9px] font-medium">{cell.confidence}%</span>
          </div>
          <div className="h-1 bg-amber-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all"
              style={{ width: `${cell.confidence}%` }}
            />
          </div>
        </div>
      )}

      {/* Hover hint */}
      <span className="absolute bottom-1 right-1 text-[9px] opacity-0 group-hover:opacity-50 transition-opacity">
        Click to edit
      </span>
    </button>
  );
}

export { STATUS_CONFIG, formatCurrency };
