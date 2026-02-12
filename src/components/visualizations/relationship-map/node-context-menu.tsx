"use client";

import React from "react";
import {
  UserPen,
  Smile,
  Frown,
  Meh,
  ShieldAlert,
  Star,
  Cpu,
  DollarSign,
  Trash2,
  Link,
} from "lucide-react";
import type { BuyingRole, Sentiment } from "@/lib/types";
import { useRelationshipMapStore } from "@/lib/store";

interface NodeContextMenuProps {
  contactId: string;
  position: { x: number; y: number };
  onClose: () => void;
  onOpenDrawer: (contactId: string) => void;
}

export function NodeContextMenu({
  contactId,
  position,
  onClose,
  onOpenDrawer,
}: NodeContextMenuProps) {
  const { updateContact, removeContact, currentMap } =
    useRelationshipMapStore();

  const contact = currentMap?.contacts.find((c) => c.id === contactId);
  if (!contact) return null;

  const handleSetSentiment = (sentiment: Sentiment) => {
    updateContact(contactId, { sentiment });
    onClose();
  };

  const handleToggleRole = (role: BuyingRole) => {
    const hasRole = contact.buyingRoles.includes(role);
    const newRoles = hasRole
      ? contact.buyingRoles.filter((r) => r !== role)
      : [...contact.buyingRoles, role];
    if (newRoles.length > 0) {
      updateContact(contactId, { buyingRoles: newRoles });
    }
  };

  const handleDelete = () => {
    removeContact(contactId);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Menu */}
      <div
        className="fixed z-50 bg-white rounded-lg shadow-xl border border-slate-200 py-1 w-56 animate-fade-in"
        style={{ left: position.x, top: position.y }}
      >
        {/* Header */}
        <div className="px-3 py-2 border-b border-slate-100">
          <p className="text-sm font-semibold text-slate-900 truncate">
            {contact.firstName} {contact.lastName}
          </p>
          <p className="text-xs text-slate-500 truncate">{contact.title}</p>
        </div>

        {/* Edit Details */}
        <button
          onClick={() => {
            onOpenDrawer(contactId);
            onClose();
          }}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <UserPen className="w-4 h-4 text-slate-400" />
          Edit Details
        </button>

        {/* Sentiment Section */}
        <div className="border-t border-slate-100">
          <p className="px-3 pt-2 pb-1 text-[10px] font-medium text-slate-400 uppercase tracking-wider">
            Sentiment
          </p>
          <div className="flex gap-1 px-3 pb-2">
            <button
              onClick={() => handleSetSentiment("positive")}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                contact.sentiment === "positive"
                  ? "bg-emerald-100 text-emerald-700"
                  : "hover:bg-slate-50 text-slate-600"
              }`}
            >
              <Smile className="w-3.5 h-3.5" />
              <span>Positive</span>
            </button>
            <button
              onClick={() => handleSetSentiment("neutral")}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                contact.sentiment === "neutral"
                  ? "bg-slate-200 text-slate-700"
                  : "hover:bg-slate-50 text-slate-600"
              }`}
            >
              <Meh className="w-3.5 h-3.5" />
              <span>Neutral</span>
            </button>
            <button
              onClick={() => handleSetSentiment("negative")}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                contact.sentiment === "negative"
                  ? "bg-rose-100 text-rose-700"
                  : "hover:bg-slate-50 text-slate-600"
              }`}
            >
              <Frown className="w-3.5 h-3.5" />
              <span>Negative</span>
            </button>
          </div>
        </div>

        {/* Quick Role Toggles */}
        <div className="border-t border-slate-100">
          <p className="px-3 pt-2 pb-1 text-[10px] font-medium text-slate-400 uppercase tracking-wider">
            Toggle Roles
          </p>
          <div className="flex flex-wrap gap-1 px-3 pb-2">
            {(
              [
                { role: "economic_buyer" as const, icon: DollarSign, label: "EB" },
                { role: "champion" as const, icon: Star, label: "CH" },
                { role: "technical_evaluator" as const, icon: Cpu, label: "TE" },
                { role: "blocker" as const, icon: ShieldAlert, label: "BL" },
              ] as const
            ).map(({ role, icon: Icon, label }) => {
              const active = contact.buyingRoles.includes(role);
              return (
                <button
                  key={role}
                  onClick={() => handleToggleRole(role)}
                  className={`flex items-center gap-0.5 px-2 py-1 rounded text-xs border transition-colors ${
                    active
                      ? "bg-blue-100 text-blue-700 border-blue-300"
                      : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Delete */}
        <div className="border-t border-slate-100">
          <button
            onClick={handleDelete}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Remove from Map
          </button>
        </div>
      </div>
    </>
  );
}
