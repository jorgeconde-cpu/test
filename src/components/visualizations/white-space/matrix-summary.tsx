"use client";

import React from "react";
import type { MatrixSummary } from "@/lib/types";

interface SummaryBarProps {
  summary: MatrixSummary;
  orientation: "row" | "column";
}

function formatCompact(amount: number): string {
  if (amount === 0) return "$0";
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
  return `$${amount.toLocaleString()}`;
}

export function SummaryBar({ summary, orientation }: SummaryBarProps) {
  const total =
    summary.soldRevenue +
    summary.activeRevenue +
    summary.potentialRevenue +
    summary.lostRevenue;

  const segments = [
    { value: summary.soldRevenue, color: "bg-emerald-500", label: "Sold" },
    { value: summary.activeRevenue, color: "bg-amber-400", label: "Active" },
    { value: summary.potentialRevenue, color: "bg-blue-300", label: "Potential" },
    { value: summary.lostRevenue, color: "bg-rose-400", label: "Lost" },
  ];

  const isVertical = orientation === "column";

  return (
    <div
      className={`
        flex ${isVertical ? "flex-col items-center" : "flex-row items-center"}
        gap-2 p-2
      `}
    >
      {/* Stacked bar */}
      <div
        className={`
          ${isVertical ? "w-8 h-16" : "h-6 flex-1"}
          rounded overflow-hidden flex ${isVertical ? "flex-col-reverse" : "flex-row"}
          bg-slate-100
        `}
      >
        {total > 0 &&
          segments.map(
            (seg) =>
              seg.value > 0 && (
                <div
                  key={seg.label}
                  className={`${seg.color} transition-all`}
                  style={{
                    [isVertical ? "height" : "width"]: `${(seg.value / total) * 100}%`,
                  }}
                  title={`${seg.label}: ${formatCompact(seg.value)}`}
                />
              )
          )}
      </div>

      {/* Total */}
      <div className={`text-xs font-semibold text-slate-700 ${isVertical ? "text-center" : ""}`}>
        {formatCompact(total)}
      </div>

      {/* White space count */}
      {summary.whiteSpaceCount > 0 && (
        <div className="text-[10px] text-blue-600 font-medium">
          {summary.whiteSpaceCount} opp{summary.whiteSpaceCount > 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}

interface MatrixGrandTotalProps {
  sold: number;
  active: number;
  potential: number;
  lost: number;
  whiteSpaceCount: number;
}

export function MatrixGrandTotal({
  sold,
  active,
  potential,
  lost,
  whiteSpaceCount,
}: MatrixGrandTotalProps) {
  return (
    <div className="bg-slate-900 text-white rounded-lg p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
        Matrix Summary
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] text-emerald-400 uppercase tracking-wider">
            Sold
          </p>
          <p className="text-lg font-bold">{formatCompact(sold)}</p>
        </div>
        <div>
          <p className="text-[10px] text-amber-400 uppercase tracking-wider">
            Pipeline
          </p>
          <p className="text-lg font-bold">{formatCompact(active)}</p>
        </div>
        <div>
          <p className="text-[10px] text-blue-400 uppercase tracking-wider">
            White Space
          </p>
          <p className="text-lg font-bold">{formatCompact(potential)}</p>
        </div>
        <div>
          <p className="text-[10px] text-rose-400 uppercase tracking-wider">
            Lost
          </p>
          <p className="text-lg font-bold">{formatCompact(lost)}</p>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">Total Addressable</span>
          <span className="text-sm font-bold">
            {formatCompact(sold + active + potential)}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-slate-400">Open Opportunities</span>
          <span className="text-sm font-bold text-blue-400">
            {whiteSpaceCount}
          </span>
        </div>
      </div>
    </div>
  );
}
