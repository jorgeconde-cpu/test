"use client";

import React, { useEffect, useState } from "react";
import { Target } from "lucide-react";
import { useAccountStore } from "@/lib/store";
import { mockAccountPlan } from "@/lib/mock-data";
import { SwotAnalysisView } from "@/components/visualizations/strategy/swot-analysis";
import { ObjectivesList } from "@/components/visualizations/strategy/objectives-list";
import { ActivityTimeline } from "@/components/visualizations/strategy/activity-timeline";

type Tab = "swot" | "objectives" | "timeline";

export default function StrategyPage({
  params,
}: {
  params: { accountId: string };
}) {
  const [activeTab, setActiveTab] = useState<Tab>("swot");
  const { currentPlan, setCurrentPlan } = useAccountStore();

  useEffect(() => {
    if (!currentPlan) {
      setCurrentPlan(mockAccountPlan);
    }
  }, [currentPlan, setCurrentPlan]);

  const strategy = currentPlan?.strategy;

  if (!strategy) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)] bg-slate-50">
        <p className="text-slate-400">Loading strategy...</p>
      </div>
    );
  }

  const tabs: { value: Tab; label: string; count: number }[] = [
    { value: "swot", label: "SWOT Analysis", count: 0 },
    {
      value: "objectives",
      label: "Objectives",
      count: strategy.objectives.length,
    },
    {
      value: "timeline",
      label: "Timeline",
      count: strategy.timeline.length,
    },
  ];

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-blue-700" />
            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                Strategy & Playbooks
              </h1>
              <p className="text-xs text-slate-500">
                Strategic planning and execution tracking
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mt-4 bg-slate-100 rounded-lg p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`
                flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium
                transition-colors
                ${
                  activeTab === tab.value
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }
              `}
            >
              {tab.label}
              {tab.count > 0 && (
                <span
                  className={`
                    text-[10px] px-1.5 py-0.5 rounded-full
                    ${
                      activeTab === tab.value
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-200 text-slate-500"
                    }
                  `}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "swot" && (
          <SwotAnalysisView swot={strategy.swot} />
        )}
        {activeTab === "objectives" && (
          <ObjectivesList objectives={strategy.objectives} />
        )}
        {activeTab === "timeline" && (
          <ActivityTimeline activities={strategy.timeline} />
        )}
      </div>
    </div>
  );
}
