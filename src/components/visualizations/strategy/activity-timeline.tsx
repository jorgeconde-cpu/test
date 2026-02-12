"use client";

import React from "react";
import {
  Calendar,
  User,
  CheckCircle2,
  Circle,
  AlertCircle,
  Clock,
} from "lucide-react";
import type { TimelineActivity, ActivityPriority } from "@/lib/types";

const PRIORITY_CONFIG: Record<
  ActivityPriority,
  { color: string; dot: string; label: string }
> = {
  critical: {
    color: "text-rose-600",
    dot: "bg-rose-500",
    label: "Critical",
  },
  high: {
    color: "text-amber-600",
    dot: "bg-amber-400",
    label: "High",
  },
  medium: {
    color: "text-blue-600",
    dot: "bg-blue-400",
    label: "Medium",
  },
  low: {
    color: "text-slate-500",
    dot: "bg-slate-300",
    label: "Low",
  },
};

interface ActivityTimelineProps {
  activities: TimelineActivity[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  const sorted = [...activities].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const now = new Date();

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-blue-700" />
        <h2 className="text-sm font-semibold text-slate-900">
          Activity Timeline
        </h2>
        <span className="text-xs text-slate-400">
          ({activities.length} activities)
        </span>
      </div>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-slate-200" />

        <div className="space-y-0">
          {sorted.map((activity) => {
            const priority = PRIORITY_CONFIG[activity.priority];
            const activityDate = new Date(activity.date);
            const isPast = activityDate < now;
            const isOverdue = isPast && !activity.completed;

            return (
              <div key={activity.id} className="relative flex gap-4 pb-6">
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  {activity.completed ? (
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    </div>
                  ) : isOverdue ? (
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-rose-600" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center">
                      <Circle className="w-4 h-4 text-slate-300" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div
                  className={`
                    flex-1 bg-white rounded-lg border p-4
                    ${
                      isOverdue
                        ? "border-rose-200"
                        : activity.completed
                        ? "border-emerald-200 opacity-60"
                        : "border-slate-200"
                    }
                    hover:shadow-sm transition-shadow
                  `}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className={`text-sm font-semibold ${
                            activity.completed
                              ? "text-slate-400 line-through"
                              : "text-slate-900"
                          }`}
                        >
                          {activity.title}
                        </h3>
                        {isOverdue && (
                          <span className="text-[10px] font-medium text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-full">
                            Overdue
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mb-2">
                        {activity.description}
                      </p>
                    </div>

                    {/* Priority badge */}
                    <span
                      className={`
                        flex items-center gap-1 text-[10px] font-medium
                        px-2 py-0.5 rounded-full flex-shrink-0
                        ${priority.color} bg-opacity-10
                      `}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${priority.dot}`}
                      />
                      {priority.label}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activityDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {activity.assignedTo}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
