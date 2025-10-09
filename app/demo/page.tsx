"use client"
import ParticleBackground from "@/components/ParticleBackground";
import dynamic from "next/dynamic";

const PlazaCanvas = dynamic(() => import("@/components/PlazaCanvas"), { ssr: false });

export default function Page() {
  return <ParticleBackground />;
}
