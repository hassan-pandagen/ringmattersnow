"use client";

import { Suspense } from "react";

interface AdSlotProps {
  id: string;
  format?: "banner" | "rectangle" | "inline";
}

function AdSkeleton({ format }: { format: string }) {
  const heightClass =
    format === "banner"
      ? "min-h-[90px]"
      : format === "rectangle"
        ? "min-h-[250px]"
        : "min-h-[250px]";

  return (
    <div
      className={`${heightClass} w-full bg-[var(--skeleton)] rounded-xl animate-pulse flex items-center justify-center`}
    >
      <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest">
        Ad
      </span>
    </div>
  );
}

function AdContent({ id, format = "rectangle" }: AdSlotProps) {
  const heightClass =
    format === "banner"
      ? "min-h-[90px]"
      : format === "rectangle"
        ? "min-h-[250px]"
        : "min-h-[250px]";

  return (
    <div
      className={`${heightClass} w-full bg-[var(--bg-card)] rounded-xl border border-[var(--border)] flex items-center justify-center`}
      data-ad-slot={id}
      data-ad-format={format}
    >
      {/* AdKeeper script will inject here */}
      <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest">
        Ad
      </span>
    </div>
  );
}

export function AdSlot({ id, format = "rectangle" }: AdSlotProps) {
  return (
    <div className="my-6">
      <Suspense fallback={<AdSkeleton format={format} />}>
        <AdContent id={id} format={format} />
      </Suspense>
    </div>
  );
}
