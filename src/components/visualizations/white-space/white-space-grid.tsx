"use client";

import React, { useMemo, useState } from "react";
import { Grid3X3 } from "lucide-react";
import type { MatrixCell, CellStatus } from "@/lib/types";
import { useWhiteSpaceStore } from "@/lib/store";
import {
  computeRowSummaries,
  computeColumnSummaries,
  computeMatrixTotals,
} from "@/lib/utils";
import { MatrixCellComponent } from "./matrix-cell";
import { CellDetailPanel } from "./cell-detail-panel";
import { SummaryBar, MatrixGrandTotal } from "./matrix-summary";

/** Filter options for which cell statuses to show */
const STATUS_FILTERS: { value: CellStatus | "all"; label: string; color: string }[] = [
  { value: "all", label: "All", color: "bg-slate-600" },
  { value: "white_space", label: "White Space", color: "bg-blue-500" },
  { value: "active", label: "Active", color: "bg-amber-400" },
  { value: "sold", label: "Sold", color: "bg-emerald-500" },
  { value: "lost", label: "Lost", color: "bg-rose-500" },
];

export function WhiteSpaceGrid() {
  const { currentMatrix, selectedCellId, setSelectedCell } =
    useWhiteSpaceStore();

  const [statusFilter, setStatusFilter] = useState<CellStatus | "all">("all");
  const [highlightWhiteSpace, setHighlightWhiteSpace] = useState(false);

  // Compute summaries
  const rowSummaries = useMemo(
    () => (currentMatrix ? computeRowSummaries(currentMatrix) : []),
    [currentMatrix]
  );

  const columnSummaries = useMemo(
    () => (currentMatrix ? computeColumnSummaries(currentMatrix) : []),
    [currentMatrix]
  );

  const grandTotal = useMemo(
    () => (currentMatrix ? computeMatrixTotals(currentMatrix) : null),
    [currentMatrix]
  );

  if (!currentMatrix) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-50">
        <p className="text-slate-400">No opportunity matrix loaded</p>
      </div>
    );
  }

  // Find cell at intersection
  const getCell = (buId: string, productId: string): MatrixCell | undefined =>
    currentMatrix.cells.find(
      (c) => c.businessUnitId === buId && c.productId === productId
    );

  // Get selected cell data for the drawer
  const selectedCell = selectedCellId
    ? currentMatrix.cells.find((c) => c.id === selectedCellId)
    : null;

  const selectedProduct = selectedCell
    ? currentMatrix.products.find((p) => p.id === selectedCell.productId)
    : null;

  const selectedBU = selectedCell
    ? currentMatrix.businessUnits.find(
        (bu) => bu.id === selectedCell.businessUnitId
      )
    : null;

  // Check if cell should be visually highlighted based on filter
  const shouldHighlight = (cell: MatrixCell | undefined): boolean => {
    if (!cell) return false;
    if (highlightWhiteSpace && cell.status === "white_space") return true;
    if (statusFilter === "all") return false;
    return cell.status === statusFilter;
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header / Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Grid3X3 className="w-5 h-5 text-blue-700" />
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              {currentMatrix.name}
            </h1>
            <p className="text-xs text-slate-500">
              {currentMatrix.businessUnits.length} business units &times;{" "}
              {currentMatrix.products.length} products
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
            {STATUS_FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() =>
                  setStatusFilter(
                    filter.value === statusFilter ? "all" : filter.value
                  )
                }
                className={`
                  flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium
                  transition-colors
                  ${
                    statusFilter === filter.value
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }
                `}
              >
                <span
                  className={`w-2 h-2 rounded-full ${filter.color}`}
                />
                {filter.label}
              </button>
            ))}
          </div>

          {/* Highlight White Space toggle */}
          <button
            onClick={() => setHighlightWhiteSpace(!highlightWhiteSpace)}
            className={`
              px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors
              ${
                highlightWhiteSpace
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }
            `}
          >
            Highlight Opportunities
          </button>
        </div>
      </div>

      {/* Grid + Summary */}
      <div className="flex-1 overflow-auto p-6">
        <div className="flex gap-6">
          {/* Main Grid */}
          <div className="flex-1 overflow-auto">
            <div className="inline-block min-w-full">
              <table className="border-collapse">
                {/* Column Headers (Products) */}
                <thead>
                  <tr>
                    {/* Empty corner cell */}
                    <th className="sticky left-0 z-10 bg-slate-50 min-w-[160px]" />

                    {currentMatrix.products.map((product) => (
                      <th
                        key={product.id}
                        className="px-2 pb-3 text-left min-w-[140px]"
                      >
                        <div className="bg-white rounded-lg border border-slate-200 p-2.5 shadow-sm">
                          <p className="text-xs font-semibold text-slate-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            {product.category}
                          </p>
                        </div>
                      </th>
                    ))}

                    {/* Row Summary Header */}
                    <th className="px-2 pb-3 min-w-[120px]">
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">
                        Total
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentMatrix.businessUnits.map((bu, rowIndex) => {
                    const rowSummary = rowSummaries[rowIndex];
                    return (
                      <tr key={bu.id}>
                        {/* Row Header (Business Unit) */}
                        <td className="sticky left-0 z-10 bg-slate-50 pr-2 py-1 align-top">
                          <div className="bg-white rounded-lg border border-slate-200 p-2.5 shadow-sm h-full">
                            <p className="text-xs font-semibold text-slate-900">
                              {bu.name}
                            </p>
                            {bu.headcount && (
                              <p className="text-[10px] text-slate-500 mt-0.5">
                                {bu.headcount.toLocaleString()} employees
                              </p>
                            )}
                            {bu.budget && (
                              <p className="text-[10px] text-slate-500">
                                Budget: $
                                {(bu.budget / 1000000).toFixed(1)}M
                              </p>
                            )}
                          </div>
                        </td>

                        {/* Matrix Cells */}
                        {currentMatrix.products.map((product) => {
                          const cell = getCell(bu.id, product.id);
                          if (!cell) return <td key={product.id} className="px-1 py-1" />;

                          const highlighted = shouldHighlight(cell);
                          return (
                            <td
                              key={product.id}
                              className={`px-1 py-1 transition-all ${
                                highlighted ? "scale-[1.02]" : ""
                              } ${
                                statusFilter !== "all" &&
                                cell.status !== statusFilter
                                  ? "opacity-30"
                                  : ""
                              }`}
                            >
                              <MatrixCellComponent
                                cell={cell}
                                isSelected={selectedCellId === cell.id}
                                onClick={setSelectedCell}
                              />
                            </td>
                          );
                        })}

                        {/* Row Summary */}
                        <td className="px-1 py-1 align-top">
                          {rowSummary && (
                            <SummaryBar
                              summary={rowSummary}
                              orientation="row"
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}

                  {/* Column Summaries Row */}
                  <tr>
                    <td className="sticky left-0 z-10 bg-slate-50 pr-2 py-2">
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Total
                      </div>
                    </td>
                    {columnSummaries.map((colSummary) => (
                      <td key={colSummary.entityId} className="px-1 py-2">
                        <SummaryBar
                          summary={colSummary}
                          orientation="column"
                        />
                      </td>
                    ))}
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Grand Total Panel */}
          {grandTotal && (
            <div className="w-[220px] flex-shrink-0">
              <MatrixGrandTotal
                sold={grandTotal.soldRevenue}
                active={grandTotal.activeRevenue}
                potential={grandTotal.potentialRevenue}
                lost={grandTotal.lostRevenue}
                whiteSpaceCount={grandTotal.whiteSpaceCount}
              />
            </div>
          )}
        </div>
      </div>

      {/* Cell Detail Drawer */}
      {selectedCell && selectedProduct && selectedBU && (
        <CellDetailPanel
          cell={selectedCell}
          productName={selectedProduct.name}
          businessUnitName={selectedBU.name}
          onClose={() => setSelectedCell(null)}
        />
      )}
    </div>
  );
}
