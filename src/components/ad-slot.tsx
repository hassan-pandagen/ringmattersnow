"use client";

import { useEffect, useRef } from "react";

// Map logical placement IDs to AdsKeeper widget IDs.
// Update these as you create/assign widgets in the AdsKeeper dashboard.
const WIDGET_IDS: Record<string, string> = {
  "article-top": "1935313",
  "article-bottom": "1935313",
  "in-article": "1935313",
  "homepage-feed": "1935311",
  "sidebar": "1930219",
};

interface AdSlotProps {
  id: string;
  format?: "banner" | "rectangle" | "inline";
}

declare global {
  interface Window {
    _mgq?: unknown[];
  }
}

export function AdSlot({ id, format = "rectangle" }: AdSlotProps) {
  const widgetId = WIDGET_IDS[id];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetId) return;
    window._mgq = window._mgq || [];
    window._mgq.push(["_mgc.load"]);
  }, [widgetId]);

  const minHeight =
    format === "banner" ? "min-h-[90px]" : "min-h-[250px]";

  if (!widgetId) {
    return (
      <div
        className={`${minHeight} w-full my-6 bg-[var(--skeleton)] rounded-xl flex items-center justify-center`}
      >
        <span className="text-xs text-[var(--text-muted)] uppercase tracking-widest">
          Ad
        </span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`${minHeight} w-full my-6`}>
      <div data-type="_mgwidget" data-widget-id={widgetId} />
    </div>
  );
}
