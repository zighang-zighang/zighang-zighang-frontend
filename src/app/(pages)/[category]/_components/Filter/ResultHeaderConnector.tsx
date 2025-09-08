"use client";

import * as React from "react";
import ResultHeader from "./ResultHeader";

type ResultHeaderConnectorProps = {
  total?: number;
  showTodayBadge?: boolean;
  className?: string;
};

export default function ResultHeaderConnector({
  total,
  showTodayBadge = true,
  className = "",
}: ResultHeaderConnectorProps) {
  return (
    <ResultHeader
      total={total}
      showTodayBadge={showTodayBadge}
      className={className}
    />
  );
}
