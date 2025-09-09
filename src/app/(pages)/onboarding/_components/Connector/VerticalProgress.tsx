"use client";

import React from "react";
import { motion, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function VerticalProgress({
  progress,
  className,
  widthPx = 2,
}: {
  progress: number; // 0.0 ~ 1.0
  className?: string;
  widthPx?: number;
}) {
  const clamped = Math.max(0, Math.min(1, progress));
  // 단순 선: 위에서 아래로 차도록 top 기준으로 스케일
  const scaleY = useSpring(clamped, {
    stiffness: 220,
    damping: 28,
    mass: 0.6,
  });
  useEffect(() => {
    scaleY.set(clamped);
  }, [clamped, scaleY]);

  const widthStyle = { width: `${widthPx}px` } as const;

  return (
    <div className={`relative mx-auto flex-1 ${className ?? ""}`} style={widthStyle}>
      {/* 회색 트랙 */}
      <div className="absolute left-1/2 -translate-x-1/2 h-full rounded-full bg-line" style={widthStyle} />
      {/* 보라색 진행 선 */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 h-full rounded-full"
        style={{
          transformOrigin: "top",
          scaleY,
          willChange: "transform",
          background: "#6D42FF",
          width: `${widthPx}px`,
        } as React.CSSProperties}
      />
    </div>
  );
}


