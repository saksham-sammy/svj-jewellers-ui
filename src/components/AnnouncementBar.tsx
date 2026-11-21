"use client";

import { X } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { useShopStore } from "@/store/useShopStore";
import { useMounted } from "@/hooks/useMounted";

export function AnnouncementBar() {
  const dismissed = useShopStore((s) => s.announcementDismissed);
  const dismiss = useShopStore((s) => s.dismissAnnouncement);
  const mounted = useMounted();

  if (mounted && dismissed) return null;

  return (
    <div className="relative z-50 bg-[#0B0A09] text-[#E9E2D4] border-b border-[#C5A46D]/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-center relative">
        <p className="text-[11px] sm:text-xs tracking-[0.14em] uppercase font-light text-center truncate pr-8">
          <span className="text-[#C5A46D] mr-2">✦</span>
          {SITE_CONFIG.announcement}
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="absolute right-3 sm:right-6 p-1.5 text-[#B5AC9D] hover:text-[#F6F2EA] transition-colors cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
