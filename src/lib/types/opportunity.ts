// ============================================================================
// OpportunityMatrix — White Space Analysis data model
// ============================================================================

/** Status of a cell in the white space matrix */
export type CellStatus =
  | "sold"            // Green — product is installed/sold
  | "active"          // Yellow — active opportunity in pipeline
  | "lost"            // Red — lost to competition
  | "not_applicable"  // Gray — doesn't apply to this business unit
  | "white_space";    // White — potential opportunity, untouched

/**
 * Product — A product or solution we sell.
 * Represents a column in the white space matrix.
 */
export interface Product {
  id: string;
  name: string;
  category: string;
  annualRevenuePotential: number;
  description?: string;
}

/**
 * BusinessUnit — A department or division of the client.
 * Represents a row in the white space matrix.
 */
export interface BusinessUnit {
  id: string;
  accountId: string;
  name: string;
  headcount?: number;
  budget?: number;
  primaryContactId?: string;
}

/**
 * MatrixCell — A single cell in the white space grid.
 * Intersection of a BusinessUnit (row) and Product (column).
 */
export interface MatrixCell {
  id: string;
  businessUnitId: string;
  productId: string;
  status: CellStatus;
  /** Revenue associated with this cell (actual or estimated) */
  revenue: number;
  /** If status is "active", the associated opportunity name */
  opportunityName?: string;
  /** If status is "lost", who won it */
  competitorName?: string;
  /** Confidence level for forecasting (0-100) */
  confidence: number;
  notes?: string;
  updatedAt: string;
}

/**
 * OpportunityMatrix — Full white space analysis for an account.
 */
export interface OpportunityMatrix {
  id: string;
  accountId: string;
  name: string;
  businessUnits: BusinessUnit[];
  products: Product[];
  cells: MatrixCell[];

  // -- Computed summaries (derived in the store/component) --
  totalRevenueSold?: number;
  totalRevenueActive?: number;
  totalRevenuePotential?: number;

  createdAt: string;
  updatedAt: string;
}

/**
 * Helper type: Summary for a single row or column in the matrix.
 */
export interface MatrixSummary {
  entityId: string;
  entityName: string;
  soldRevenue: number;
  activeRevenue: number;
  potentialRevenue: number;
  lostRevenue: number;
  cellCount: number;
  whiteSpaceCount: number;
}
