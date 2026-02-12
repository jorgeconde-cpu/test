import { z } from "zod";

export const buyingRoleSchema = z.enum([
  "economic_buyer",
  "champion",
  "technical_evaluator",
  "blocker",
  "influencer",
  "end_user",
  "coach",
]);

export const sentimentSchema = z.enum(["positive", "negative", "neutral"]);

export const relationshipStrengthSchema = z.enum(["strong", "moderate", "weak", "none"]);

export const influenceLevelSchema = z.enum(["high", "medium", "low"]);

export const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  title: z.string().min(1, "Job title is required").max(200),
  department: z.string().min(1, "Department is required").max(200),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  linkedInUrl: z.string().url().optional().or(z.literal("")),
  buyingRoles: z.array(buyingRoleSchema).min(1, "Select at least one buying role"),
  sentiment: sentimentSchema,
  relationshipStrength: relationshipStrengthSchema,
  influenceLevel: influenceLevelSchema,
  relationshipOwner: z.string().optional(),
  notes: z.string().max(2000).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const connectionTypeSchema = z.enum([
  "reports_to",
  "influences",
  "collaborates",
  "blocks",
]);

export const connectionFormSchema = z.object({
  sourceContactId: z.string().min(1, "Source contact is required"),
  targetContactId: z.string().min(1, "Target contact is required"),
  connectionType: connectionTypeSchema,
  weight: z.number().min(1).max(10),
  label: z.string().max(100).optional(),
  notes: z.string().max(500).optional(),
});

export type ConnectionFormValues = z.infer<typeof connectionFormSchema>;
