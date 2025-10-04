"use client"
import dynamic from "next/dynamic";

const PlazaCanvas = dynamic(() => import("@/components/PlazaCanvas"), { ssr: false });

export default function Page() {
  return <PlazaCanvas />;
}
