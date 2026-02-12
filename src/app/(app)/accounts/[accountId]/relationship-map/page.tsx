"use client";

import React, { useEffect } from "react";
import { useRelationshipMapStore } from "@/lib/store";
import { mockRelationshipMap } from "@/lib/mock-data";
import { RelationshipMapCanvas } from "@/components/visualizations/relationship-map";

export default function RelationshipMapPage({
  params,
}: {
  params: { accountId: string };
}) {
  const { currentMap, setCurrentMap } = useRelationshipMapStore();

  // Load mock data on mount
  useEffect(() => {
    if (!currentMap) {
      setCurrentMap(mockRelationshipMap);
    }
  }, [currentMap, setCurrentMap]);

  return (
    <div className="h-screen w-full bg-slate-50">
      <RelationshipMapCanvas />
    </div>
  );
}
