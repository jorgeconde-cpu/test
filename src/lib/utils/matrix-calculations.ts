import type { MatrixCell, MatrixSummary, OpportunityMatrix } from "../types";

/**
 * Compute summary totals for each row (business unit) in the matrix.
 */
export function computeRowSummaries(matrix: OpportunityMatrix): MatrixSummary[] {
  return matrix.businessUnits.map((bu) => {
    const cells = matrix.cells.filter((c) => c.businessUnitId === bu.id);
    return aggregateCells(bu.id, bu.name, cells);
  });
}

/**
 * Compute summary totals for each column (product) in the matrix.
 */
export function computeColumnSummaries(matrix: OpportunityMatrix): MatrixSummary[] {
  return matrix.products.map((product) => {
    const cells = matrix.cells.filter((c) => c.productId === product.id);
    return aggregateCells(product.id, product.name, cells);
  });
}

/**
 * Compute the grand total across the entire matrix.
 */
export function computeMatrixTotals(matrix: OpportunityMatrix): MatrixSummary {
  return aggregateCells("total", "Grand Total", matrix.cells);
}

function aggregateCells(
  entityId: string,
  entityName: string,
  cells: MatrixCell[]
): MatrixSummary {
  return {
    entityId,
    entityName,
    soldRevenue: cells
      .filter((c) => c.status === "sold")
      .reduce((sum, c) => sum + c.revenue, 0),
    activeRevenue: cells
      .filter((c) => c.status === "active")
      .reduce((sum, c) => sum + c.revenue, 0),
    potentialRevenue: cells
      .filter((c) => c.status === "white_space")
      .reduce((sum, c) => sum + c.revenue, 0),
    lostRevenue: cells
      .filter((c) => c.status === "lost")
      .reduce((sum, c) => sum + c.revenue, 0),
    cellCount: cells.length,
    whiteSpaceCount: cells.filter((c) => c.status === "white_space").length,
  };
}
