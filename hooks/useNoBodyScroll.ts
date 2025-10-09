"use client";

import { useEffect } from "react";

export default function useNoBodyScroll(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const o = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = o;
    };
  }, [active]);
}
