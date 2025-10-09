"use client";

export type OV = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  href: string;
};

export type Pos = { left: string; top: string; height?: string };
export type BreakPos = { m: Pos; t: Pos; d: Pos };

export type Floor = {
  id: string;
  title: string;
  label: string;
  bubble: BreakPos & {
    align: { m: "left" | "right"; t: "left" | "right"; d: "left" | "right" };
  };
  bar: BreakPos;
  ovs: OV[];
};

export type BP = "m" | "t" | "d";
