import { z } from "zod";

export const cellStatusSchema = z.enum([
  "sold",
  "active",
  "lost",
  "not_applicable",
  "white_space",
]);

export const cellFormSchema = z.object({
  status: cellStatusSchema,
  revenue: z.number().min(0, "Revenue must be non-negative"),
  opportunityName: z.string().max(200).optional(),
  competitorName: z.string().max(200).optional(),
  confidence: z.number().min(0).max(100),
  notes: z.string().max(1000).optional(),
});

export type CellFormValues = z.infer<typeof cellFormSchema>;

export const businessUnitFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  headcount: z.number().int().min(0).optional(),
  budget: z.number().min(0).optional(),
});

export type BusinessUnitFormValues = z.infer<typeof businessUnitFormSchema>;

export const productFormSchema = z.object({
  name: z.string().min(1, "Product name is required").max(200),
  category: z.string().min(1, "Category is required").max(100),
  annualRevenuePotential: z.number().min(0),
  description: z.string().max(500).optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
