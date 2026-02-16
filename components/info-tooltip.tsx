"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoTooltipProps {
  content: string;
  className?: string;
  iconClassName?: string;
}

export function InfoTooltip({ content, className, iconClassName }: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className={cn("relative inline-flex items-center", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0}
      role="button"
      aria-label="More information"
    >
      <HelpCircle
        className={cn(
          "h-3.5 w-3.5 text-muted-foreground/60 hover:text-muted-foreground cursor-help transition-colors",
          iconClassName
        )}
      />
      {isVisible && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs text-popover-foreground bg-popover border border-border rounded-lg shadow-lg w-56 z-50 leading-relaxed"
          role="tooltip"
        >
          {content}
          {/* Arrow */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-popover -mt-px" />
        </span>
      )}
    </span>
  );
}
