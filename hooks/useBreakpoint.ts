"use client";

import { useEffect, useState } from "react";
import type { BP } from "@/types/plaza";

export default function useBreakpoint(): BP {
  const [bp, setBp] = useState<BP>("d");
  useEffect(() => {
    const mqM = window.matchMedia("(max-width: 767px)");
    const mqT = window.matchMedia("(min-width: 768px) and (max-width: 1024px)");
    const update = () => setBp(mqM.matches ? "m" : mqT.matches ? "t" : "d");
    update();
    mqM.addEventListener?.("change", update);
    mqT.addEventListener?.("change", update);
    return () => {
      mqM.removeEventListener?.("change", update);
      mqT.removeEventListener?.("change", update);
    };
  }, []);
  return bp;
}
