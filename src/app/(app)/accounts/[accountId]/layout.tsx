"use client";

import React, { useEffect } from "react";
import { useAccountStore } from "@/lib/store";
import { mockAccountPlan } from "@/lib/mock-data";

export default function AccountLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { accountId: string };
}) {
  const { setSelectedAccount, currentPlan, setCurrentPlan } = useAccountStore();

  useEffect(() => {
    setSelectedAccount(params.accountId);
    if (!currentPlan) {
      setCurrentPlan(mockAccountPlan);
    }
  }, [params.accountId, setSelectedAccount, currentPlan, setCurrentPlan]);

  return <>{children}</>;
}
