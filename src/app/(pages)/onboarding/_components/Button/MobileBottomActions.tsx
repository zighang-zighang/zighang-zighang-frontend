"use client";

import React from "react";

interface ResponsiveStepActionsProps {
  children: React.ReactNode;
  className?: string;
  showBorder?: boolean;
}

export function ResponsiveStepActions({
  children,
  className = "",
  showBorder = true,
}: ResponsiveStepActionsProps) {
  return (
    <>
      {/* 모바일: 하단 고정 */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white p-3 md:hidden ${
          showBorder ? "border-t border-gray-200" : ""
        } ${className}`}
      >
        <div className="flex  items-center justify-center gap-2 ">
          {children}
        </div>
      </div>

      {/* 데스크톱: 일반 위치 */}
      <div
        className={`hidden md:flex items-center justify-center gap-2 ${className}`}
      >
        {children}
      </div>
    </>
  );
}
