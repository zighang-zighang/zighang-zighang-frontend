"use client";

import { useState, useEffect } from "react";
import MyFunnelApp from "./components/MyFunnelApp";

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <MyFunnelApp />;
}
