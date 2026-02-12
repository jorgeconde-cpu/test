"use client";

import React, { useEffect } from "react";
import { useWhiteSpaceStore } from "@/lib/store";
import { mockOpportunityMatrix } from "@/lib/mock-data";
import { WhiteSpaceGrid } from "@/components/visualizations/white-space";

export default function WhiteSpacePage({
  params,
}: {
  params: { accountId: string };
}) {
  const { currentMatrix, setCurrentMatrix } = useWhiteSpaceStore();

  // Load mock data on mount
  useEffect(() => {
    if (!currentMatrix) {
      setCurrentMatrix(mockOpportunityMatrix);
    }
  }, [currentMatrix, setCurrentMatrix]);

  return (
    <div className="h-screen w-full">
      <WhiteSpaceGrid />
    </div>
  );
}
