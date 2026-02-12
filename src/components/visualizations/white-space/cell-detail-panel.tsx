"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  X,
  Save,
  CheckCircle2,
  TrendingUp,
  XCircle,
  Minus,
  Circle,
} from "lucide-react";
import { useWhiteSpaceStore } from "@/lib/store";
import {
  cellFormSchema,
  type CellFormValues,
} from "@/lib/validations/opportunity-schema";
import type { CellStatus, MatrixCell } from "@/lib/types";
import { formatCurrency } from "./matrix-cell";

interface CellDetailPanelProps {
  cell: MatrixCell;
  productName: string;
  businessUnitName: string;
  onClose: () => void;
}

const STATUS_OPTIONS: {
  value: CellStatus;
  label: string;
  icon: React.ElementType;
  color: string;
}[] = [
  {
    value: "sold",
    label: "Sold / Installed",
    icon: CheckCircle2,
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
  {
    value: "active",
    label: "Active Opportunity",
    icon: TrendingUp,
    color: "text-amber-600 bg-amber-50 border-amber-200",
  },
  {
    value: "lost",
    label: "Lost / Competitor",
    icon: XCircle,
    color: "text-rose-600 bg-rose-50 border-rose-200",
  },
  {
    value: "not_applicable",
    label: "Not Applicable",
    icon: Minus,
    color: "text-slate-500 bg-slate-50 border-slate-200",
  },
  {
    value: "white_space",
    label: "White Space",
    icon: Circle,
    color: "text-blue-600 bg-blue-50 border-blue-200",
  },
];

export function CellDetailPanel({
  cell,
  productName,
  businessUnitName,
  onClose,
}: CellDetailPanelProps) {
  const { updateCell } = useWhiteSpaceStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<CellFormValues>({
    resolver: zodResolver(cellFormSchema),
    defaultValues: {
      status: cell.status,
      revenue: cell.revenue,
      opportunityName: cell.opportunityName ?? "",
      competitorName: cell.competitorName ?? "",
      confidence: cell.confidence,
      notes: cell.notes ?? "",
    },
  });

  const watchedStatus = watch("status");

  const onSubmit = (data: CellFormValues) => {
    updateCell(cell.id, {
      ...data,
      opportunityName: data.opportunityName || undefined,
      competitorName: data.competitorName || undefined,
      notes: data.notes || undefined,
    });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-[400px] bg-white z-50 shadow-2xl border-l border-slate-200 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Cell Details
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                {businessUnitName} &times; {productName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto"
        >
          <div className="p-6 space-y-6">
            {/* Status Selection */}
            <section>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Status
              </h3>
              <div className="space-y-2">
                {STATUS_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isActive = watchedStatus === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        setValue("status", opt.value, { shouldDirty: true })
                      }
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border
                        text-sm transition-all text-left
                        ${
                          isActive
                            ? `${opt.color} border-current font-medium`
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Revenue */}
            <section>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Revenue
              </h3>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Revenue Amount ($)
                </label>
                <input
                  {...register("revenue", { valueAsNumber: true })}
                  type="number"
                  min={0}
                  step={1000}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.revenue && (
                  <p className="text-xs text-rose-500 mt-1">
                    {errors.revenue.message}
                  </p>
                )}
              </div>
            </section>

            {/* Conditional Fields */}
            {watchedStatus === "active" && (
              <section>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Opportunity Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Opportunity Name
                    </label>
                    <input
                      {...register("opportunityName")}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Q1 Analytics Expansion"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Confidence (%)
                    </label>
                    <input
                      {...register("confidence", { valueAsNumber: true })}
                      type="number"
                      min={0}
                      max={100}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </section>
            )}

            {watchedStatus === "lost" && (
              <section>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Competitive Info
                </h3>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Competitor Name
                  </label>
                  <input
                    {...register("competitorName")}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., CrowdStrike"
                  />
                </div>
              </section>
            )}

            {/* Notes */}
            <section>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Notes
              </h3>
              <textarea
                {...register("notes")}
                rows={3}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Additional context or next steps..."
              />
            </section>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 px-6 py-4 border-t border-slate-200 bg-white">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isDirty}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
