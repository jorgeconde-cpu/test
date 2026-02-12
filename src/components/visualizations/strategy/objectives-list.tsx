"use client";

import React from "react";
import {
  Target,
  Clock,
  User,
  CheckCircle2,
  AlertTriangle,
  Circle,
  XCircle,
} from "lucide-react";
import type { StrategicObjective, ObjectiveStatus } from "@/lib/types";

const STATUS_CONFIG: Record<
  ObjectiveStatus,
  { icon: React.ElementType; color: string; bg: string; label: string }
> = {
  not_started: {
    icon: Circle,
    color: "text-slate-400",
    bg: "bg-slate-100",
    label: "Not Started",
  },
  in_progress: {
    icon: Clock,
    color: "text-blue-600",
    bg: "bg-blue-100",
    label: "In Progress",
  },
  at_risk: {
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-100",
    label: "At Risk",
  },
  completed: {
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
    label: "Completed",
  },
  cancelled: {
    icon: XCircle,
    color: "text-slate-400",
    bg: "bg-slate-100",
    label: "Cancelled",
  },
};

interface ObjectiveCardProps {
  objective: StrategicObjective;
}

function ObjectiveCard({ objective }: ObjectiveCardProps) {
  const status = STATUS_CONFIG[objective.status];
  const StatusIcon = status.icon;

  const progressColor =
    objective.status === "at_risk"
      ? "bg-amber-500"
      : objective.status === "completed"
      ? "bg-emerald-500"
      : "bg-blue-600";

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`
                inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                text-[10px] font-medium ${status.bg} ${status.color}
              `}
            >
              <StatusIcon className="w-3 h-3" />
              {status.label}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-slate-900">
            {objective.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {objective.description}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
            Progress
          </span>
          <span className="text-xs font-semibold text-slate-700">
            {objective.progress}%
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${progressColor} rounded-full transition-all duration-500`}
            style={{ width: `${objective.progress}%` }}
          />
        </div>
      </div>

      {/* Key Results */}
      {objective.keyResults.length > 0 && (
        <div className="mt-3 space-y-1.5">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
            Key Results
          </p>
          {objective.keyResults.map((kr) => (
            <div
              key={kr.id}
              className="flex items-center gap-2 text-xs"
            >
              {kr.completed ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
              )}
              <span
                className={`flex-1 ${
                  kr.completed
                    ? "text-slate-400 line-through"
                    : "text-slate-700"
                }`}
              >
                {kr.title}
              </span>
              <span className="text-slate-400 flex-shrink-0">
                {kr.currentValue}/{kr.targetValue} {kr.unit}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-3 text-[10px] text-slate-400">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {objective.owner}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Due {new Date(objective.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

interface ObjectivesListProps {
  objectives: StrategicObjective[];
}

export function ObjectivesList({ objectives }: ObjectivesListProps) {
  const totalProgress = objectives.length
    ? Math.round(
        objectives.reduce((sum, obj) => sum + obj.progress, 0) /
          objectives.length
      )
    : 0;

  return (
    <div>
      {/* Summary header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-700" />
          <h2 className="text-sm font-semibold text-slate-900">
            Strategic Objectives
          </h2>
          <span className="text-xs text-slate-400">({objectives.length})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Overall progress:</span>
          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-slate-700">
            {totalProgress}%
          </span>
        </div>
      </div>

      {/* Objective Cards */}
      <div className="space-y-3">
        {objectives.map((obj) => (
          <ObjectiveCard key={obj.id} objective={obj} />
        ))}
      </div>
    </div>
  );
}
