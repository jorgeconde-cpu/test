"use client";

import React, { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import {
  User,
  DollarSign,
  Star,
  Cpu,
  ShieldAlert,
  Users,
  UserCheck,
  Lightbulb,
} from "lucide-react";
import type { ContactNode as ContactNodeType, BuyingRole } from "@/lib/types";

/** Visual config for each buying role badge */
const ROLE_CONFIG: Record<
  BuyingRole,
  { label: string; icon: React.ElementType; color: string }
> = {
  economic_buyer: {
    label: "EB",
    icon: DollarSign,
    color: "bg-emerald-100 text-emerald-700 border-emerald-300",
  },
  champion: {
    label: "CH",
    icon: Star,
    color: "bg-blue-100 text-blue-700 border-blue-300",
  },
  technical_evaluator: {
    label: "TE",
    icon: Cpu,
    color: "bg-violet-100 text-violet-700 border-violet-300",
  },
  blocker: {
    label: "BL",
    icon: ShieldAlert,
    color: "bg-rose-100 text-rose-700 border-rose-300",
  },
  influencer: {
    label: "IN",
    icon: Lightbulb,
    color: "bg-amber-100 text-amber-700 border-amber-300",
  },
  end_user: {
    label: "EU",
    icon: Users,
    color: "bg-slate-100 text-slate-600 border-slate-300",
  },
  coach: {
    label: "CO",
    icon: UserCheck,
    color: "bg-cyan-100 text-cyan-700 border-cyan-300",
  },
};

/** Sentiment → border color mapping */
const SENTIMENT_BORDER: Record<string, string> = {
  positive: "border-emerald-500",
  negative: "border-rose-500",
  neutral: "border-slate-300",
};

/** Relationship strength → dot indicator */
const STRENGTH_DOT: Record<string, string> = {
  strong: "bg-emerald-500",
  moderate: "bg-amber-400",
  weak: "bg-rose-400",
  none: "bg-slate-300",
};

type ContactNodeData = ContactNodeType;

function ContactNodeComponent({ data, selected }: NodeProps<ContactNodeData>) {
  const sentimentBorder = SENTIMENT_BORDER[data.sentiment] ?? "border-slate-300";
  const strengthDot = STRENGTH_DOT[data.relationshipStrength] ?? "bg-slate-300";

  return (
    <div
      className={`
        relative bg-white rounded-lg shadow-md border-2 w-[220px]
        transition-all duration-200 hover:shadow-lg
        ${sentimentBorder}
        ${selected ? "ring-2 ring-blue-400 ring-offset-2" : ""}
      `}
    >
      {/* Top handle for incoming connections */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white"
      />

      {/* Header: Avatar + Name */}
      <div className="flex items-start gap-3 p-3 pb-2">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          {data.avatarUrl ? (
            <img
              src={data.avatarUrl}
              alt={`${data.firstName} ${data.lastName}`}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
              <User className="w-5 h-5 text-slate-400" />
            </div>
          )}
          {/* Relationship strength indicator dot */}
          <span
            className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${strengthDot}`}
            title={`Relationship: ${data.relationshipStrength}`}
          />
        </div>

        {/* Name & Title */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900 truncate leading-tight">
            {data.firstName} {data.lastName}
          </p>
          <p className="text-xs text-slate-500 truncate leading-tight mt-0.5">
            {data.title}
          </p>
          <p className="text-[10px] text-slate-400 truncate leading-tight mt-0.5">
            {data.department}
          </p>
        </div>
      </div>

      {/* Role Badges */}
      <div className="flex flex-wrap gap-1 px-3 pb-2">
        {data.buyingRoles.map((role) => {
          const config = ROLE_CONFIG[role];
          const Icon = config.icon;
          return (
            <span
              key={role}
              className={`
                inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px]
                font-medium border ${config.color}
              `}
              title={role.replace(/_/g, " ")}
            >
              <Icon className="w-3 h-3" />
              {config.label}
            </span>
          );
        })}
      </div>

      {/* Influence level bar */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">
            Influence
          </span>
          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                data.influenceLevel === "high"
                  ? "w-full bg-blue-600"
                  : data.influenceLevel === "medium"
                  ? "w-2/3 bg-blue-400"
                  : "w-1/3 bg-blue-200"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Owner tag */}
      {data.relationshipOwner && (
        <div className="px-3 pb-2">
          <span className="text-[10px] text-slate-400">
            Owner: <span className="text-slate-600">{data.relationshipOwner}</span>
          </span>
        </div>
      )}

      {/* Bottom handle for outgoing connections */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white"
      />
    </div>
  );
}

export const ContactNodeRenderer = memo(ContactNodeComponent);
