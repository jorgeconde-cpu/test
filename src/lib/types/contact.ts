// ============================================================================
// ContactNode — Core entity for the Relationship Map
// ============================================================================

/** Roles a contact plays in the buying process */
export type BuyingRole =
  | "economic_buyer"
  | "champion"
  | "technical_evaluator"
  | "blocker"
  | "influencer"
  | "end_user"
  | "coach";

/** How the contact feels about our company/solution */
export type Sentiment = "positive" | "negative" | "neutral";

/** Strength of the relationship we have with this contact */
export type RelationshipStrength = "strong" | "moderate" | "weak" | "none";

/** How much political influence does this person have internally? */
export type InfluenceLevel = "high" | "medium" | "low";

/**
 * ContactNode — Represents a person in the client's organization.
 * Used as a node in the React Flow relationship map.
 */
export interface ContactNode {
  /** Unique identifier */
  id: string;

  /** ID of the account this contact belongs to */
  accountId: string;

  // -- Personal Info --
  firstName: string;
  lastName: string;
  title: string;
  department: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  linkedInUrl?: string;

  // -- Political & Strategic Attributes --
  buyingRoles: BuyingRole[];
  sentiment: Sentiment;
  relationshipStrength: RelationshipStrength;
  influenceLevel: InfluenceLevel;

  /** Who on our team owns this relationship? */
  relationshipOwner?: string;

  /** Free-text notes about this contact's motivations and priorities */
  notes?: string;

  /** Last meaningful interaction date */
  lastContactedAt?: string;

  // -- React Flow positioning --
  /** X position on the canvas */
  positionX: number;
  /** Y position on the canvas */
  positionY: number;

  // -- Metadata --
  createdAt: string;
  updatedAt: string;
}

/**
 * ConnectionType — Defines the type of relationship between two contacts.
 */
export type ConnectionType =
  | "reports_to"      // Solid line — direct reporting
  | "influences"      // Dashed line — informal influence
  | "collaborates"    // Dotted line — working relationship
  | "blocks";         // Red dashed line — actively blocking

/**
 * ContactConnection — An edge in the relationship map.
 */
export interface ContactConnection {
  id: string;
  sourceContactId: string;
  targetContactId: string;
  connectionType: ConnectionType;
  /** Strength of this connection (1-10) */
  weight: number;
  label?: string;
  notes?: string;
}

/**
 * RelationshipMap — Full map data for a single account.
 */
export interface RelationshipMap {
  id: string;
  accountId: string;
  name: string;
  contacts: ContactNode[];
  connections: ContactConnection[];
  createdAt: string;
  updatedAt: string;
}
