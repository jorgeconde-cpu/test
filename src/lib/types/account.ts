// ============================================================================
// AccountPlan — Top-level entity that ties everything together
// ============================================================================

import type { RelationshipMap } from "./contact";
import type { OpportunityMatrix } from "./opportunity";
import type { Strategy } from "./strategy";

/** Industry vertical of the account */
export type Industry =
  | "technology"
  | "financial_services"
  | "healthcare"
  | "manufacturing"
  | "retail"
  | "energy"
  | "telecommunications"
  | "government"
  | "education"
  | "other";

/** Health score tier */
export type AccountHealth = "healthy" | "at_risk" | "critical";

/**
 * Account — The client company.
 */
export interface Account {
  id: string;
  name: string;
  industry: Industry;
  website?: string;
  logoUrl?: string;
  annualRevenue?: number;
  employeeCount?: number;
  headquarters?: string;
  health: AccountHealth;
  /** Account owner on our team */
  owner: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * AccountPlan — Master container that groups all modules for a single account.
 * This is the central data structure of the application.
 */
export interface AccountPlan {
  id: string;
  account: Account;

  /** Relationship maps (can have multiple views) */
  relationshipMaps: RelationshipMap[];

  /** White space / opportunity matrices */
  opportunityMatrices: OpportunityMatrix[];

  /** Strategic playbook */
  strategy: Strategy;

  /** Overall plan status */
  status: "draft" | "active" | "review" | "archived";

  /** Fiscal year this plan covers */
  fiscalYear: string;

  /** Total pipeline value across all opportunities */
  totalPipelineValue: number;

  /** Total closed revenue */
  totalClosedRevenue: number;

  createdAt: string;
  updatedAt: string;
}

/**
 * AccountSummary — Lightweight version for list views and selectors.
 */
export interface AccountSummary {
  id: string;
  name: string;
  industry: Industry;
  health: AccountHealth;
  owner: string;
  totalPipelineValue: number;
  logoUrl?: string;
}
