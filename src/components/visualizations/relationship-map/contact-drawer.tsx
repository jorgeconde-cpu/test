"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  X,
  Save,
  Mail,
  Phone,
  Building2,
  Calendar,
} from "lucide-react";
import { useRelationshipMapStore } from "@/lib/store";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact-schema";
import type { BuyingRole, Sentiment, RelationshipStrength, InfluenceLevel } from "@/lib/types";

interface ContactDrawerProps {
  contactId: string;
  onClose: () => void;
}

const BUYING_ROLE_OPTIONS: { value: BuyingRole; label: string }[] = [
  { value: "economic_buyer", label: "Economic Buyer" },
  { value: "champion", label: "Champion" },
  { value: "technical_evaluator", label: "Technical Evaluator" },
  { value: "blocker", label: "Blocker" },
  { value: "influencer", label: "Influencer" },
  { value: "end_user", label: "End User" },
  { value: "coach", label: "Coach" },
];

const SENTIMENT_OPTIONS: { value: Sentiment; label: string; color: string }[] = [
  { value: "positive", label: "Positive", color: "bg-emerald-500" },
  { value: "neutral", label: "Neutral", color: "bg-slate-400" },
  { value: "negative", label: "Negative", color: "bg-rose-500" },
];

const STRENGTH_OPTIONS: { value: RelationshipStrength; label: string }[] = [
  { value: "strong", label: "Strong" },
  { value: "moderate", label: "Moderate" },
  { value: "weak", label: "Weak" },
  { value: "none", label: "None" },
];

const INFLUENCE_OPTIONS: { value: InfluenceLevel; label: string }[] = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export function ContactDrawer({ contactId, onClose }: ContactDrawerProps) {
  const { currentMap, updateContact } = useRelationshipMapStore();
  const contact = currentMap?.contacts.find((c) => c.id === contactId);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: contact
      ? {
          firstName: contact.firstName,
          lastName: contact.lastName,
          title: contact.title,
          department: contact.department,
          email: contact.email,
          phone: contact.phone ?? "",
          avatarUrl: contact.avatarUrl ?? "",
          linkedInUrl: contact.linkedInUrl ?? "",
          buyingRoles: contact.buyingRoles,
          sentiment: contact.sentiment,
          relationshipStrength: contact.relationshipStrength,
          influenceLevel: contact.influenceLevel,
          relationshipOwner: contact.relationshipOwner ?? "",
          notes: contact.notes ?? "",
        }
      : undefined,
  });

  const watchedSentiment = watch("sentiment");
  const watchedRoles = watch("buyingRoles");

  if (!contact) return null;

  const onSubmit = (data: ContactFormValues) => {
    updateContact(contactId, {
      ...data,
      phone: data.phone || undefined,
      avatarUrl: data.avatarUrl || undefined,
      linkedInUrl: data.linkedInUrl || undefined,
      relationshipOwner: data.relationshipOwner || undefined,
      notes: data.notes || undefined,
    });
    onClose();
  };

  const toggleRole = (role: BuyingRole) => {
    const current = watchedRoles || [];
    const newRoles = current.includes(role)
      ? current.filter((r) => r !== role)
      : [...current, role];
    if (newRoles.length > 0) {
      setValue("buyingRoles", newRoles, { shouldDirty: true });
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="fixed right-0 top-0 h-full w-[420px] bg-white z-50 shadow-2xl border-l border-slate-200 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Edit Contact
            </h2>
            <p className="text-sm text-slate-500">
              {contact.firstName} {contact.lastName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto"
        >
          <div className="p-6 space-y-6">
            {/* Personal Info Section */}
            <section>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Personal Information
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      First Name
                    </label>
                    <input
                      {...register("firstName")}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.firstName && (
                      <p className="text-xs text-rose-500 mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Last Name
                    </label>
                    <input
                      {...register("lastName")}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.lastName && (
                      <p className="text-xs text-rose-500 mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    <Building2 className="w-3 h-3 inline mr-1" />
                    Job Title
                  </label>
                  <input
                    {...register("title")}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Department
                  </label>
                  <input
                    {...register("department")}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    <Mail className="w-3 h-3 inline mr-1" />
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    <Phone className="w-3 h-3 inline mr-1" />
                    Phone
                  </label>
                  <input
                    {...register("phone")}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </section>

            {/* Strategic Attributes */}
            <section>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Strategic Attributes
              </h3>

              {/* Sentiment */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Sentiment
                </label>
                <div className="flex gap-2">
                  {SENTIMENT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        setValue("sentiment", opt.value, { shouldDirty: true })
                      }
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${
                        watchedSentiment === opt.value
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${opt.color}`} />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buying Roles */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Buying Roles
                </label>
                <div className="flex flex-wrap gap-2">
                  {BUYING_ROLE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => toggleRole(opt.value)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                        watchedRoles?.includes(opt.value)
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {errors.buyingRoles && (
                  <p className="text-xs text-rose-500 mt-1">{errors.buyingRoles.message}</p>
                )}
              </div>

              {/* Relationship Strength */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Relationship Strength
                </label>
                <select
                  {...register("relationshipStrength")}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {STRENGTH_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Influence Level */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-slate-600 mb-2">
                  Influence Level
                </label>
                <select
                  {...register("influenceLevel")}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {INFLUENCE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Relationship Owner */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Relationship Owner
                </label>
                <input
                  {...register("relationshipOwner")}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Team member name"
                />
              </div>
            </section>

            {/* Notes */}
            <section>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Notes
              </h3>
              <textarea
                {...register("notes")}
                rows={4}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Key motivations, priorities, concerns..."
              />
            </section>

            {/* Last Contacted */}
            {contact.lastContactedAt && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="w-3 h-3" />
                Last contacted:{" "}
                {new Date(contact.lastContactedAt).toLocaleDateString()}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 px-6 py-4 border-t border-slate-200 bg-white">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isDirty}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
