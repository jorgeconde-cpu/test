"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function MapLegend() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm rounded-lg border border-slate-200 shadow-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-600 w-full hover:bg-slate-50 rounded-lg transition-colors"
      >
        <span>Legend</span>
        {expanded ? (
          <ChevronUp className="w-3.5 h-3.5" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5" />
        )}
      </button>

      {expanded && (
        <div className="px-3 pb-3 space-y-3 border-t border-slate-100 pt-2 animate-fade-in">
          {/* Sentiment Colors */}
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Sentiment (Border)
            </p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-4 h-3 rounded border-2 border-emerald-500" />
                <span className="text-xs text-slate-600">Positive</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-3 rounded border-2 border-slate-300" />
                <span className="text-xs text-slate-600">Neutral</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-3 rounded border-2 border-rose-500" />
                <span className="text-xs text-slate-600">Negative</span>
              </div>
            </div>
          </div>

          {/* Connection Types */}
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Connection Types
            </p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <svg width="24" height="8">
                  <line
                    x1="0" y1="4" x2="24" y2="4"
                    stroke="#64748b" strokeWidth="2"
                  />
                </svg>
                <span className="text-xs text-slate-600">Reports To</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="24" height="8">
                  <line
                    x1="0" y1="4" x2="24" y2="4"
                    stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 3"
                  />
                </svg>
                <span className="text-xs text-slate-600">Influences</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="24" height="8">
                  <line
                    x1="0" y1="4" x2="24" y2="4"
                    stroke="#8b5cf6" strokeWidth="2" strokeDasharray="2 2"
                  />
                </svg>
                <span className="text-xs text-slate-600">Collaborates</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="24" height="8">
                  <line
                    x1="0" y1="4" x2="24" y2="4"
                    stroke="#ef4444" strokeWidth="2" strokeDasharray="6 3"
                  />
                </svg>
                <span className="text-xs text-slate-600">Blocks</span>
              </div>
            </div>
          </div>

          {/* Roles */}
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Buying Roles
            </p>
            <div className="grid grid-cols-2 gap-1">
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 text-center">
                EB = Econ. Buyer
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 text-center">
                CH = Champion
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 text-center">
                TE = Tech Eval.
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 text-center">
                BL = Blocker
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
