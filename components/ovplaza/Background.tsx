"use client";

export default function Background() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(1200px 600px at 50% 100%, rgba(93,79,255,.18), transparent 60%), radial-gradient(900px 500px at 0% 0%, rgba(255,95,246,.12), transparent 55%), radial-gradient(900px 500px at 100% 0%, rgba(93,255,201,.06), transparent 55%), #0b0a20",
      }}
    />
  );
}
