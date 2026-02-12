import type { Account, AccountPlan, AccountSummary } from "../types";
import type { RelationshipMap } from "../types";
import type { Strategy, SwotAnalysis, StrategicObjective, TimelineActivity } from "../types";
import { mockContacts, mockConnections } from "./contacts";
import { mockOpportunityMatrix } from "./opportunity-matrix";

export const mockAccount: Account = {
  id: "acct-1",
  name: "Acme Corporation",
  industry: "technology",
  website: "https://acme-corp.example.com",
  annualRevenue: 2500000000,
  employeeCount: 12000,
  headquarters: "San Francisco, CA",
  health: "at_risk",
  owner: "John Smith",
  createdAt: "2024-06-01T00:00:00Z",
  updatedAt: "2025-12-20T00:00:00Z",
};

export const mockRelationshipMap: RelationshipMap = {
  id: "rmap-1",
  accountId: "acct-1",
  name: "Acme Corp - Executive Buying Committee",
  contacts: mockContacts,
  connections: mockConnections,
  createdAt: "2025-01-10T00:00:00Z",
  updatedAt: "2025-12-20T00:00:00Z",
};

const mockSwot: SwotAnalysis = {
  id: "swot-1",
  accountId: "acct-1",
  strengths: [
    { id: "s1", category: "strength", content: "Strong executive champion (CTO)", impact: "high", createdAt: "2025-06-01T00:00:00Z" },
    { id: "s2", category: "strength", content: "Existing $660K installed base in Engineering", impact: "high", createdAt: "2025-06-01T00:00:00Z" },
    { id: "s3", category: "strength", content: "Proven ROI from Data Analytics deployment", impact: "medium", createdAt: "2025-06-01T00:00:00Z" },
  ],
  weaknesses: [
    { id: "w1", category: "weakness", content: "No relationship with CFO", impact: "high", createdAt: "2025-06-01T00:00:00Z" },
    { id: "w2", category: "weakness", content: "Security Architect actively blocking", impact: "high", createdAt: "2025-06-01T00:00:00Z" },
    { id: "w3", category: "weakness", content: "Limited engagement with Product team", impact: "medium", createdAt: "2025-06-01T00:00:00Z" },
  ],
  opportunities: [
    { id: "o1", category: "opportunity", content: "$2.5M+ white space across all BUs", impact: "high", createdAt: "2025-06-01T00:00:00Z" },
    { id: "o2", category: "opportunity", content: "AI/ML budget increasing 40% in FY2026", impact: "high", createdAt: "2025-06-01T00:00:00Z" },
    { id: "o3", category: "opportunity", content: "Managed Services expansion in Finance", impact: "medium", createdAt: "2025-06-01T00:00:00Z" },
  ],
  threats: [
    { id: "t1", category: "threat", content: "CrowdStrike won security deal — expanding footprint", impact: "high", createdAt: "2025-06-01T00:00:00Z" },
    { id: "t2", category: "threat", content: "Budget freeze risk if Q1 targets missed", impact: "medium", createdAt: "2025-06-01T00:00:00Z" },
    { id: "t3", category: "threat", content: "Competitor offering bundled pricing", impact: "medium", createdAt: "2025-06-01T00:00:00Z" },
  ],
  updatedAt: "2025-12-15T00:00:00Z",
};

const mockObjectives: StrategicObjective[] = [
  {
    id: "obj-1",
    accountId: "acct-1",
    title: "Close AI/ML Platform deal with Data & Analytics",
    description: "Secure $400K AI/ML Platform contract with the Data & Analytics business unit by end of Q1 FY2026.",
    status: "in_progress",
    progress: 65,
    owner: "Emily Davis",
    dueDate: "2026-03-31",
    keyResults: [
      { id: "kr-1", title: "Complete technical POC", targetValue: 1, currentValue: 1, unit: "POC", completed: true },
      { id: "kr-2", title: "Security review approval", targetValue: 1, currentValue: 0, unit: "approval", completed: false },
      { id: "kr-3", title: "CFO budget sign-off", targetValue: 1, currentValue: 0, unit: "sign-off", completed: false },
    ],
    createdAt: "2025-09-01T00:00:00Z",
    updatedAt: "2025-12-18T00:00:00Z",
  },
  {
    id: "obj-2",
    accountId: "acct-1",
    title: "Neutralize security blocker",
    description: "Address James Novak's SOC2/GDPR concerns and convert from Blocker to Neutral.",
    status: "at_risk",
    progress: 20,
    owner: "John Smith",
    dueDate: "2026-02-28",
    keyResults: [
      { id: "kr-4", title: "Schedule security deep-dive session", targetValue: 1, currentValue: 0, unit: "meeting", completed: false },
      { id: "kr-5", title: "Deliver compliance documentation", targetValue: 3, currentValue: 1, unit: "documents", completed: false },
    ],
    createdAt: "2025-10-01T00:00:00Z",
    updatedAt: "2025-12-15T00:00:00Z",
  },
  {
    id: "obj-3",
    accountId: "acct-1",
    title: "Establish CFO relationship",
    description: "Build a direct relationship with Rachel Williams (CFO) to unlock budget for multi-year deals.",
    status: "not_started",
    progress: 0,
    owner: "John Smith",
    dueDate: "2026-04-30",
    keyResults: [
      { id: "kr-6", title: "Executive sponsorship intro meeting", targetValue: 1, currentValue: 0, unit: "meeting", completed: false },
      { id: "kr-7", title: "Deliver ROI case study", targetValue: 1, currentValue: 0, unit: "document", completed: false },
    ],
    createdAt: "2025-11-01T00:00:00Z",
    updatedAt: "2025-12-01T00:00:00Z",
  },
];

const mockTimeline: TimelineActivity[] = [
  { id: "act-1", accountId: "acct-1", title: "Q1 Business Review with CTO", description: "Present FY2026 roadmap and expansion proposal", date: "2026-01-15", priority: "critical", completed: false, assignedTo: "John Smith", relatedObjectiveId: "obj-1", createdAt: "2025-12-01T00:00:00Z" },
  { id: "act-2", accountId: "acct-1", title: "Security compliance deep-dive", description: "Present SOC2 Type II report and GDPR compliance framework to James Novak", date: "2026-01-22", priority: "critical", completed: false, assignedTo: "John Smith", relatedObjectiveId: "obj-2", createdAt: "2025-12-01T00:00:00Z" },
  { id: "act-3", accountId: "acct-1", title: "ML Platform POC review", description: "Final review of AI/ML POC results with Angela Martinez", date: "2026-02-05", priority: "high", completed: false, assignedTo: "Emily Davis", relatedObjectiveId: "obj-1", createdAt: "2025-12-01T00:00:00Z" },
  { id: "act-4", accountId: "acct-1", title: "CFO executive dinner", description: "Arrange executive dinner between our CEO and Rachel Williams", date: "2026-02-20", priority: "high", completed: false, assignedTo: "John Smith", relatedObjectiveId: "obj-3", createdAt: "2025-12-01T00:00:00Z" },
  { id: "act-5", accountId: "acct-1", title: "Contract negotiation kick-off", description: "Begin multi-year contract negotiation for AI/ML + Managed Services bundle", date: "2026-03-01", priority: "critical", completed: false, assignedTo: "John Smith", createdAt: "2025-12-01T00:00:00Z" },
  { id: "act-6", accountId: "acct-1", title: "Managed Services pilot for FinOps", description: "Launch 30-day pilot for Finance & Operations managed services", date: "2026-03-15", priority: "medium", completed: false, assignedTo: "Emily Davis", createdAt: "2025-12-01T00:00:00Z" },
];

const mockStrategy: Strategy = {
  id: "strategy-1",
  accountId: "acct-1",
  swot: mockSwot,
  objectives: mockObjectives,
  timeline: mockTimeline,
  createdAt: "2025-06-01T00:00:00Z",
  updatedAt: "2025-12-20T00:00:00Z",
};

export const mockAccountPlan: AccountPlan = {
  id: "plan-1",
  account: mockAccount,
  relationshipMaps: [mockRelationshipMap],
  opportunityMatrices: [mockOpportunityMatrix],
  strategy: mockStrategy,
  status: "active",
  fiscalYear: "FY2026",
  totalPipelineValue: 1500000,
  totalClosedRevenue: 1580000,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-12-20T00:00:00Z",
};

export const mockAccountSummaries: AccountSummary[] = [
  { id: "acct-1", name: "Acme Corporation", industry: "technology", health: "at_risk", owner: "John Smith", totalPipelineValue: 1500000 },
  { id: "acct-2", name: "Globex International", industry: "manufacturing", health: "healthy", owner: "Emily Davis", totalPipelineValue: 2200000 },
  { id: "acct-3", name: "Initech Financial", industry: "financial_services", health: "healthy", owner: "John Smith", totalPipelineValue: 800000 },
  { id: "acct-4", name: "Umbrella Health Systems", industry: "healthcare", health: "critical", owner: "Sarah Lee", totalPipelineValue: 350000 },
];
