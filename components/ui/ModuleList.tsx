"use client";
import type { ModuleItem } from "@/data/modules";

export default function ModuleList({
  modules, selectedKey, onSelect, open = false,
}: {
  modules: ModuleItem[];
  selectedKey: string | null;
  onSelect: (m: ModuleItem) => void;
  open?: boolean;                // 🔹 thêm
}) {
  return (
    <aside
      className={[
        "absolute right-4 top-28 z-[30] w-60 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur",
        "transition-all duration-300",
        open ? "translate-x-[-16rem] opacity-0 pointer-events-none" : "translate-x-0 opacity-100",
      ].join(" ")}
    >
      <div className="mb-2 text-xs tracking-widest text-white/70">MAP • MODULES</div>
      <ul className="space-y-2">
        {modules.map((m) => {
          const active = selectedKey === m.key;
          return (
            <li key={m.key}>
              <button
                onClick={() => onSelect(m)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition
                ${active ? "bg-white/20" : "bg-white/10 hover:bg-white/15"}`}
              >
                <span className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: m.color }} />
                  {m.label}
                </span>
                <span className="text-[10px] uppercase text-white/60">focus</span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
