"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, BookOpen, ChevronRight, GraduationCap } from "lucide-react";
import { getAllTopics, searchContent } from "@/lib/learn-content";
import { cn } from "@/lib/utils";

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const topics = getAllTopics();

  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    return searchContent(searchQuery);
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length >= 2;

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Learn to Invest</h1>
        </div>
        <p className="text-muted-foreground">
          A beginner-friendly guide to understanding the stock market and starting your investment journey.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search topics, terms, or concepts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-input bg-background text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Search Results */}
      {isSearching ? (
        <div>
          <h2 className="text-sm font-medium text-muted-foreground mb-4">
            {searchResults.length > 0
              ? `Found ${searchResults.length} result${searchResults.length === 1 ? "" : "s"}`
              : "No results found"}
          </h2>
          {searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map((result, i) => (
                <Link
                  key={`${result.topic.slug}-${result.section.id}-${i}`}
                  href={`/learn/${result.topic.slug}#${result.section.id}`}
                  className="block p-4 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <span>{result.topic.icon}</span>
                    <span>{result.topic.title}</span>
                    <ChevronRight className="h-3 w-3" />
                    <span>{result.section.title}</span>
                  </div>
                  <p className="text-sm text-foreground/80 line-clamp-2">
                    {result.matchText}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              Try searching for &quot;compound interest&quot;, &quot;ETF&quot;, or &quot;401k&quot;
            </p>
          )}
        </div>
      ) : (
        <>
          {/* Learning Path Intro */}
          <div className="mb-8 p-4 rounded-xl border border-primary/20 bg-primary/5">
            <h2 className="font-semibold mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              Recommended Learning Path
            </h2>
            <p className="text-sm text-muted-foreground">
              Topics are ordered from foundational concepts to practical application.
              Start at the top and work your way down, or jump to any topic that interests you.
            </p>
          </div>

          {/* Topic Cards */}
          <div className="space-y-3">
            {topics.map((topic, index) => (
              <Link
                key={topic.slug}
                href={`/learn/${topic.slug}`}
                className={cn(
                  "block p-5 rounded-xl border bg-card transition-all",
                  "hover:border-primary/50 hover:shadow-md hover:shadow-primary/5",
                  "group"
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Number */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{topic.icon}</span>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {topic.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {topic.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {topic.sections.slice(0, 3).map((section) => (
                        <span
                          key={section.id}
                          className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
                        >
                          {section.title}
                        </span>
                      ))}
                      {topic.sections.length > 3 && (
                        <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                          +{topic.sections.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-8 p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
            <p>
              <strong>Note:</strong> This content is for educational purposes only and is not financial advice.
              Always do your own research and consider consulting a financial advisor for personalized guidance.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
