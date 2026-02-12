// ============================================================================
// Strategy & Playbooks — Strategic planning data models
// ============================================================================

/** SWOT categories */
export type SwotCategory = "strength" | "weakness" | "opportunity" | "threat";

/**
 * SwotItem — A single item in a SWOT analysis.
 */
export interface SwotItem {
  id: string;
  category: SwotCategory;
  content: string;
  impact: "high" | "medium" | "low";
  createdAt: string;
}

/**
 * SwotAnalysis — Complete SWOT for an account.
 */
export interface SwotAnalysis {
  id: string;
  accountId: string;
  strengths: SwotItem[];
  weaknesses: SwotItem[];
  opportunities: SwotItem[];
  threats: SwotItem[];
  updatedAt: string;
}

/** Status of a strategic objective */
export type ObjectiveStatus =
  | "not_started"
  | "in_progress"
  | "at_risk"
  | "completed"
  | "cancelled";

/**
 * StrategicObjective — A goal in the account plan.
 */
export interface StrategicObjective {
  id: string;
  accountId: string;
  title: string;
  description: string;
  status: ObjectiveStatus;
  /** Completion percentage (0-100) */
  progress: number;
  owner: string;
  dueDate: string;
  /** Key results / milestones */
  keyResults: KeyResult[];
  createdAt: string;
  updatedAt: string;
}

/**
 * KeyResult — A measurable outcome tied to an objective.
 */
export interface KeyResult {
  id: string;
  title: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  completed: boolean;
}

/** Priority of a timeline activity */
export type ActivityPriority = "critical" | "high" | "medium" | "low";

/**
 * TimelineActivity — A scheduled action or milestone.
 */
export interface TimelineActivity {
  id: string;
  accountId: string;
  title: string;
  description: string;
  date: string;
  priority: ActivityPriority;
  completed: boolean;
  assignedTo: string;
  relatedObjectiveId?: string;
  createdAt: string;
}

/**
 * Strategy — Full strategic playbook for an account.
 */
export interface Strategy {
  id: string;
  accountId: string;
  swot: SwotAnalysis;
  objectives: StrategicObjective[];
  timeline: TimelineActivity[];
  createdAt: string;
  updatedAt: string;
}
