"use client";

import { useState } from "react";
import { ChevronRight, Clock, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PHASES,
  BOOK_SHELF,
  type Phase,
  type Priority,
} from "@/lib/roadmap-data";

function PriorityBadge({ priority }: { priority: Priority }) {
  const config = {
    critical: "bg-red-600 text-white",
    normal: "bg-muted text-muted-foreground",
    low: "bg-muted/50 text-muted-foreground/70",
  };
  const labels = { critical: "Must-Do", normal: "Important", low: "Optional" };

  return (
    <span
      className={cn(
        "shrink-0 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
        config[priority]
      )}
    >
      {labels[priority]}
    </span>
  );
}

function TierBadge({ tier }: { tier: "essential" | "recommended" | "fun" }) {
  const config = {
    essential: "bg-red-600 text-white",
    recommended: "bg-blue-600 text-white",
    fun: "bg-muted text-muted-foreground",
  };

  return (
    <span
      className={cn(
        "shrink-0 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
        config[tier]
      )}
    >
      {tier}
    </span>
  );
}

type Tab = "roadmap" | "books";

export default function RoadmapPage() {
  const [activePhase, setActivePhase] = useState(0);
  const [expandedTrack, setExpandedTrack] = useState<number | null>(null);
  const [tab, setTab] = useState<Tab>("roadmap");

  const phase: Phase = PHASES[activePhase];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-1">
        <h1 className="mt-1 text-2xl font-bold">Software Engineer → Quant</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          18-month roadmap · ~20 hrs/week · self-directed
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-0 border-b border-border">
        {(
          [
            { key: "roadmap", label: "Roadmap" },
            { key: "books", label: "Reading List" },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "border-b-2 px-4 py-2 text-sm font-semibold tracking-wide transition-colors",
              tab === t.key
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── ROADMAP TAB ── */}
      {tab === "roadmap" && (
        <div className="mt-6">
          {/* Phase selector pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-2">
            {PHASES.map((p, i) => (
              <button
                key={p.id}
                onClick={() => {
                  setActivePhase(i);
                  setExpandedTrack(null);
                }}
                className={cn(
                  "flex min-w-[100px] flex-1 flex-col items-center rounded-lg border px-3 py-3 transition-all",
                  activePhase === i
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-accent"
                )}
              >
                <span className="text-xs font-bold">
                  Phase {p.id}
                </span>
                <span className="mt-0.5 text-[10px]">{p.duration}</span>
                <span className="mt-1 text-[10px] leading-tight opacity-70">
                  {p.title}
                </span>
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-4 flex gap-1">
            {PHASES.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  i <= activePhase ? "bg-primary" : "bg-border"
                )}
              />
            ))}
          </div>

          {/* Phase detail card */}
          <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
            {/* Phase header */}
            <div className="border-b border-border p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    {phase.duration}
                  </p>
                  <h2 className="mt-1 text-xl font-bold">{phase.title}</h2>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {phase.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {phase.weeklyHours}
                </div>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {phase.why}
              </p>
            </div>

            {/* Tracks */}
            <div>
              {phase.tracks.map((track, ti) => {
                const isExpanded = expandedTrack === ti;
                return (
                  <div
                    key={ti}
                    className={cn(
                      ti < phase.tracks.length - 1 && "border-b border-border/50"
                    )}
                  >
                    <button
                      onClick={() => setExpandedTrack(isExpanded ? null : ti)}
                      className={cn(
                        "flex w-full items-center justify-between px-6 py-4 text-left transition-colors",
                        isExpanded
                          ? "bg-accent/50"
                          : "hover:bg-accent/30"
                      )}
                    >
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          isExpanded ? "text-foreground" : "text-foreground/80"
                        )}
                      >
                        {track.name}
                      </span>
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform",
                          isExpanded && "rotate-90"
                        )}
                      />
                    </button>

                    {isExpanded && (
                      <div className="space-y-2 px-6 pt-5 pb-5">
                        {track.items.map((item, ii) => (
                          <div
                            key={ii}
                            className="rounded-lg border border-border bg-background p-4"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="flex-1 text-sm leading-relaxed text-foreground/90">
                                {item.text}
                              </p>
                              <PriorityBadge priority={item.priority} />
                            </div>
                            <p className="mt-2 text-xs text-muted-foreground">
                              <BookOpen className="mr-1 inline h-3 w-3 -translate-y-px" />
                              {item.resource}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Milestone */}
            <div className="m-5 rounded-lg border border-primary/30 bg-primary/5 p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                Phase Milestone
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                {phase.milestone}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── BOOKS TAB ── */}
      {tab === "books" && (
        <div className="mt-6">
          <p className="mb-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            You don&apos;t need to read every book cover-to-cover. Skim aggressively,
            go deep on chapters that matter to what you&apos;re building. The
            &quot;essential&quot; ones are non-negotiable.
          </p>

          <div className="space-y-2">
            {BOOK_SHELF.map((book, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-lg border border-border bg-card px-4 py-3"
              >
                <TierBadge tier={book.tier} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{book.title}</p>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                </div>
                <span className="hidden text-xs text-muted-foreground sm:block">
                  {book.phase}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
