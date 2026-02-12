import type { OpportunityMatrix, Product, BusinessUnit, MatrixCell } from "../types";

export const mockProducts: Product[] = [
  { id: "prod-1", name: "Cloud Platform", category: "Infrastructure", annualRevenuePotential: 500000, description: "Core cloud infrastructure platform" },
  { id: "prod-2", name: "Data Analytics Suite", category: "Analytics", annualRevenuePotential: 350000, description: "Business intelligence and analytics" },
  { id: "prod-3", name: "AI/ML Toolkit", category: "AI", annualRevenuePotential: 450000, description: "Machine learning platform and tools" },
  { id: "prod-4", name: "Security Shield", category: "Security", annualRevenuePotential: 250000, description: "Enterprise security and compliance" },
  { id: "prod-5", name: "DevOps Pipeline", category: "Development", annualRevenuePotential: 200000, description: "CI/CD and developer tools" },
  { id: "prod-6", name: "Managed Services", category: "Services", annualRevenuePotential: 600000, description: "24/7 managed infrastructure services" },
];

export const mockBusinessUnits: BusinessUnit[] = [
  { id: "bu-1", accountId: "acct-1", name: "Engineering", headcount: 450, budget: 12000000, primaryContactId: "contact-2" },
  { id: "bu-2", accountId: "acct-1", name: "Data & Analytics", headcount: 80, budget: 4000000, primaryContactId: "contact-7" },
  { id: "bu-3", accountId: "acct-1", name: "Product", headcount: 120, budget: 3500000, primaryContactId: "contact-3" },
  { id: "bu-4", accountId: "acct-1", name: "Finance & Operations", headcount: 200, budget: 2000000 },
  { id: "bu-5", accountId: "acct-1", name: "Marketing", headcount: 150, budget: 5000000 },
];

export const mockCells: MatrixCell[] = [
  // Engineering row
  { id: "cell-bu1-p1", businessUnitId: "bu-1", productId: "prod-1", status: "sold", revenue: 480000, confidence: 100, updatedAt: "2025-06-01T00:00:00Z" },
  { id: "cell-bu1-p2", businessUnitId: "bu-1", productId: "prod-2", status: "active", revenue: 200000, opportunityName: "Eng Analytics Expansion", confidence: 60, updatedAt: "2025-11-15T00:00:00Z" },
  { id: "cell-bu1-p3", businessUnitId: "bu-1", productId: "prod-3", status: "white_space", revenue: 450000, confidence: 0, updatedAt: "2025-01-01T00:00:00Z" },
  { id: "cell-bu1-p4", businessUnitId: "bu-1", productId: "prod-4", status: "lost", revenue: 250000, competitorName: "CrowdStrike", confidence: 0, updatedAt: "2025-09-01T00:00:00Z" },
  { id: "cell-bu1-p5", businessUnitId: "bu-1", productId: "prod-5", status: "sold", revenue: 180000, confidence: 100, updatedAt: "2025-03-01T00:00:00Z" },
  { id: "cell-bu1-p6", businessUnitId: "bu-1", productId: "prod-6", status: "active", revenue: 500000, opportunityName: "Eng Managed Services Upsell", confidence: 75, updatedAt: "2025-12-01T00:00:00Z" },

  // Data & Analytics row
  { id: "cell-bu2-p1", businessUnitId: "bu-2", productId: "prod-1", status: "sold", revenue: 120000, confidence: 100, updatedAt: "2025-04-01T00:00:00Z" },
  { id: "cell-bu2-p2", businessUnitId: "bu-2", productId: "prod-2", status: "sold", revenue: 340000, confidence: 100, updatedAt: "2025-02-01T00:00:00Z" },
  { id: "cell-bu2-p3", businessUnitId: "bu-2", productId: "prod-3", status: "active", revenue: 400000, opportunityName: "D&A ML Platform Deal", confidence: 80, updatedAt: "2025-12-10T00:00:00Z" },
  { id: "cell-bu2-p4", businessUnitId: "bu-2", productId: "prod-4", status: "white_space", revenue: 100000, confidence: 0, updatedAt: "2025-01-01T00:00:00Z" },
  { id: "cell-bu2-p5", businessUnitId: "bu-2", productId: "prod-5", status: "not_applicable", revenue: 0, confidence: 0, updatedAt: "2025-01-01T00:00:00Z" },
  { id: "cell-bu2-p6", businessUnitId: "bu-2", productId: "prod-6", status: "white_space", revenue: 300000, confidence: 0, updatedAt: "2025-01-01T00:00:00Z" },

  // Product row
  { id: "cell-bu3-p1", businessUnitId: "bu-3", productId: "prod-1", status: "white_space", revenue: 200000, confidence: 0, updatedAt: "2025-01-01T00:00:00Z" },
  { id: "cell-bu3-p2", businessUnitId: "bu-3", productId: "prod-2", status: "active", revenue: 150000, opportunityName: "Product Analytics POC", confidence: 40, updatedAt: "2025-11-20T00:00:00Z" },
  { id: "cell-bu3-p3", businessUnitId: "bu-3", productId: "prod-3", status: "white_space", revenue: 250000, confidence: 0, updatedAt: "2025-01-01T00:00:00Z" },
  { id: "cell-bu3-p4", businessUnitId: "bu-3", productId: "prod-4", status: "not_applicable", revenue: 0, confidence: 0, updatedAt: "2025-01-01T00:00:00Z" },
  { id: "cell-bu3-p5", businessUnitId: "bu-3", productId: "prod-5", status: "white_space", revenue: 100000, confidence: 0, updatedAt: "2025-01-01T00:00:00Z" },
  { id: "cell-bu3-p6", businessUnitId: "bu-3", productId: "prod-6", status: "not_applicable", revenue: 0, confidence: 0, updatedAt: "2025-01-01T00:00:00Z" },

  // Finance & Operations row
  { id: "cell-bu4-p1", businessUnitId: "bu-4", productId: "prod-1", status: "white_space", revenue: 150000, confidence: 0, updatedAt: "2025-01-01T00:00:00Z" },
  { id: "cell-bu4-p2", businessUnitId: "bu-4", productId: "prod-2", status: "white_space", revenue: 200000, confidence: 0, updatedAt: "2025-01-01T00:00:00Z" },
  { id: "cell-bu4-p3", businessUnitId: "bu-4", productId: "prod-3", status: "not_applicable", revenue: 0, confidence: 0, updatedAt: "2025-01-01T00:00:00Z" },
  { id: "cell-bu4-p4", businessUnitId: "bu-4", productId: "prod-4", status: "sold", revenue: 180000, confidence: 100, updatedAt: "2025-08-01T00:00:00Z" },
  { id: "cell-bu4-p5", businessUnitId: "bu-4", productId: "prod-5", status: "not_applicable", revenue: 0, confidence: 0, updatedAt: "2025-01-01T00:00:00Z" },
  { id: "cell-bu4-p6", businessUnitId: "bu-4", productId: "prod-6", status: "active", revenue: 250000, opportunityName: "FinOps Managed Services", confidence: 50, updatedAt: "2025-12-05T00:00:00Z" },

  // Marketing row
  { id: "cell-bu5-p1", businessUnitId: "bu-5", productId: "prod-1", status: "white_space", revenue: 100000, confidence: 0, updatedAt: "2025-01-01T00:00:00Z" },
  { id: "cell-bu5-p2", businessUnitId: "bu-5", productId: "prod-2", status: "sold", revenue: 280000, confidence: 100, updatedAt: "2025-05-01T00:00:00Z" },
  { id: "cell-bu5-p3", businessUnitId: "bu-5", productId: "prod-3", status: "white_space", revenue: 200000, confidence: 0, updatedAt: "2025-01-01T00:00:00Z" },
  { id: "cell-bu5-p4", businessUnitId: "bu-5", productId: "prod-4", status: "not_applicable", revenue: 0, confidence: 0, updatedAt: "2025-01-01T00:00:00Z" },
  { id: "cell-bu5-p5", businessUnitId: "bu-5", productId: "prod-5", status: "not_applicable", revenue: 0, confidence: 0, updatedAt: "2025-01-01T00:00:00Z" },
  { id: "cell-bu5-p6", businessUnitId: "bu-5", productId: "prod-6", status: "white_space", revenue: 400000, confidence: 0, updatedAt: "2025-01-01T00:00:00Z" },
];

export const mockOpportunityMatrix: OpportunityMatrix = {
  id: "matrix-1",
  accountId: "acct-1",
  name: "Acme Corp - FY2026 White Space",
  businessUnits: mockBusinessUnits,
  products: mockProducts,
  cells: mockCells,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-12-15T00:00:00Z",
};
