"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Search, ChevronRight, ChevronLeft, BookOpen } from "lucide-react";
import { getAllTopics, searchContent, Topic, getTopicBySlug } from "@/lib/learn-content";
import { cn } from "@/lib/utils";

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  const topics = getAllTopics();

  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    return searchContent(searchQuery);
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length >= 2;

  const resetScrollAndSection = useCallback((topic: Topic) => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    setActiveSection(topic.sections[0]?.id || "");
  }, []);

  const handleTopicClick = (topic: Topic) => {
    const isAlreadyOpen = isAnimating && selectedTopic;
    
    if (isAlreadyOpen) {
      setShowContent(false);
      setTimeout(() => {
        setSelectedTopic(topic);
        resetScrollAndSection(topic);
        setTimeout(() => {
          setShowContent(true);
        }, 50);
      }, 150);
    } else {
      setIsAnimating(true);
      setSelectedTopic(topic);
      resetScrollAndSection(topic);
      setTimeout(() => {
        setShowContent(true);
      }, 100);
    }
  };

  const handleBack = () => {
    setIsClosing(true);
    setShowContent(false);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 200);
    
    setTimeout(() => {
      setSelectedTopic(null);
      setIsClosing(false);
    }, 450);
  };

  const handleSearchResultClick = (topicSlug: string, sectionId: string) => {
    const topic = getTopicBySlug(topicSlug);
    if (topic) {
      handleTopicClick(topic);
      setTimeout(() => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element && contentRef.current) {
          const containerRect = contentRef.current.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();
          const scrollTop = contentRef.current.scrollTop + elementRect.top - containerRect.top - 24;
          contentRef.current.scrollTo({ top: scrollTop, behavior: "smooth" });
        }
      }, 400);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element && contentRef.current) {
      const containerRect = contentRef.current.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const scrollTop = contentRef.current.scrollTop + elementRect.top - containerRect.top - 24;
      contentRef.current.scrollTo({ top: scrollTop, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!selectedTopic || !contentRef.current) return;

      const container = contentRef.current;
      const containerRect = container.getBoundingClientRect();
      const threshold = containerRect.top + 120;

      let currentSection = selectedTopic.sections[0]?.id || "";
      
      for (const section of selectedTopic.sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= threshold) {
            currentSection = section.id;
          } else {
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    const container = contentRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [selectedTopic]);

  const currentIndex = selectedTopic 
    ? topics.findIndex((t) => t.slug === selectedTopic.slug)
    : -1;
  const prevTopic = currentIndex > 0 ? topics[currentIndex - 1] : null;
  const nextTopic = currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null;

  return (
    <div className="h-[calc(100vh-2rem)] overflow-hidden">
      <div className="flex h-full relative">
        {/* Topics List Panel */}
        <div
          className={cn(
            "flex flex-col overflow-hidden",
            "transition-all ease-out",
            isClosing ? "duration-300 delay-100" : "duration-400",
            isAnimating
              ? "w-72 min-w-72 border-r border-border"
              : "w-full"
          )}
        >
          {/* Header - Collapsible */}
          <div
            className={cn(
              "p-6 border-b border-border transition-all duration-400",
              isAnimating ? "p-4" : ""
            )}
          >
            {!isAnimating && (
              <div className="mb-4">
                <h1 className="text-2xl font-bold mb-1">Learn to Invest</h1>
                <p className="text-base text-muted-foreground">
                  A no-nonsense guide to understanding the stock market. I tried to keep the pages short for a few min read. Note: I might add content as I continue to learn.
                </p>
              </div>
            )}

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={isAnimating ? "Search..." : "Search topics..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Topics List */}
          <div className="flex-1 overflow-y-auto p-4">
            {isSearching ? (
              <div>
                <p className="text-xs text-muted-foreground mb-3">
                  {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
                </p>
                {searchResults.length > 0 ? (
                  <div className="space-y-2">
                    {searchResults.map((result, i) => (
                      <button
                        key={`${result.topic.slug}-${result.section.id}-${i}`}
                        onClick={() => handleSearchResultClick(result.topic.slug, result.section.id)}
                        className="w-full text-left p-3 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                          <span>{result.topic.icon}</span>
                          <span className="truncate">{result.topic.title}</span>
                          <ChevronRight className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{result.section.title}</span>
                        </div>
                        {!isAnimating && (
                          <p className="text-xs text-foreground/80 line-clamp-2">
                            {result.matchText}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No results found
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {topics.map((topic, index) => (
                  <button
                    key={topic.slug}
                    onClick={() => handleTopicClick(topic)}
                    className={cn(
                      "w-full text-left rounded-xl border transition-all group",
                      isAnimating
                        ? cn(
                            "p-3",
                            selectedTopic?.slug === topic.slug
                              ? "bg-primary/10 border-primary/50"
                              : "bg-card border-border hover:border-primary/30 hover:bg-accent"
                          )
                        : "p-4 bg-card border-border hover:border-primary/50 hover:shadow-md hover:shadow-primary/5"
                    )}
                  >
                    <div className={cn("flex items-start gap-3", isAnimating && "gap-2")}>
                      {/* Number */}
                      <div
                        className={cn(
                          "flex-shrink-0 rounded-full flex items-center justify-center font-semibold transition-colors",
                          isAnimating
                            ? cn(
                                "w-6 h-6 text-xs",
                                selectedTopic?.slug === topic.slug
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              )
                            : "w-7 h-7 text-sm bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground"
                        )}
                      >
                        {index + 1}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={cn(isAnimating ? "text-base" : "text-lg")}>
                            {topic.icon}
                          </span>
                          <h3
                            className={cn(
                              "font-medium truncate transition-colors",
                              isAnimating
                                ? cn(
                                    "text-sm",
                                    selectedTopic?.slug === topic.slug
                                      ? "text-primary"
                                      : ""
                                  )
                                : "text-base group-hover:text-primary"
                            )}
                          >
                            {topic.title}
                          </h3>
                        </div>

                        {!isAnimating && (
                          <>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {topic.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {topic.sections.slice(0, 3).map((section) => (
                                <span
                                  key={section.id}
                                  className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                                >
                                  {section.title}
                                </span>
                              ))}
                              {topic.sections.length > 3 && (
                                <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                                  +{topic.sections.length - 3} more
                                </span>
                              )}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Arrow */}
                      {!isAnimating && (
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content Panel - Slides in from right */}
        <div
          className={cn(
            "absolute inset-y-0 right-0 bg-background flex flex-col",
            "transition-all ease-out",
            isClosing ? "duration-300" : "duration-400",
            isAnimating && !isClosing
              ? "left-72 opacity-100 translate-x-0"
              : "left-full opacity-0 translate-x-12"
          )}
        >
          {selectedTopic && (
            <>
              {/* Content Header */}
              <div className="flex items-center gap-4 p-6 border-b border-border">
                <button
                  onClick={handleBack}
                  className="p-2 -ml-2 rounded-lg hover:bg-accent transition-colors"
                  aria-label="Back to topics"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedTopic.icon}</span>
                    <h1 className="text-xl font-bold truncate">{selectedTopic.title}</h1>
                  </div>
                  <p className="text-sm text-muted-foreground truncate mt-0.5">
                    {selectedTopic.description}
                  </p>
                </div>
              </div>

              {/* Content Body with Section Navigation */}
              <div className="flex-1 flex overflow-hidden">
                {/* Section navigation sidebar */}
                <div className="hidden lg:block w-48 border-r border-border p-4 overflow-y-auto">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Sections
                  </p>
                  <nav className="space-y-1">
                    {selectedTopic.sections.map((section, idx) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={cn(
                          "w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors",
                          activeSection === section.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <span className="text-xs text-muted-foreground mr-1.5">{idx + 1}.</span>
                        {section.title}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Main content area */}
                <div
                  ref={contentRef}
                  className={cn(
                    "flex-1 overflow-y-auto p-6 transition-all ease-out",
                    isClosing ? "duration-150" : "duration-300 delay-150",
                    showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                >
                  <div className="max-w-3xl mx-auto space-y-10">
                    {selectedTopic.sections.map((section, index) => (
                      <section key={section.id} id={section.id} className="scroll-mt-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <span className="text-primary">{index + 1}.</span>
                          {section.title}
                        </h2>
                        <div className="prose prose-gray dark:prose-invert max-w-none">
                          <ContentRenderer content={section.content} />
                        </div>
                      </section>
                    ))}

                    {/* Navigation */}
                    <nav className="pt-8 border-t border-border">
                      <div className="flex justify-between gap-4">
                        {prevTopic ? (
                          <button
                            onClick={() => handleTopicClick(prevTopic)}
                            className="flex-1 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-accent transition-all group text-left"
                          >
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                              <ChevronLeft className="h-4 w-4" />
                              Previous
                            </div>
                            <div className="font-medium group-hover:text-primary transition-colors">
                              {prevTopic.icon} {prevTopic.title}
                            </div>
                          </button>
                        ) : (
                          <div className="flex-1" />
                        )}
                        {nextTopic ? (
                          <button
                            onClick={() => handleTopicClick(nextTopic)}
                            className="flex-1 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-accent transition-all group text-right"
                          >
                            <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground mb-1">
                              Next
                              <ChevronRight className="h-4 w-4" />
                            </div>
                            <div className="font-medium group-hover:text-primary transition-colors">
                              {nextTopic.icon} {nextTopic.title}
                            </div>
                          </button>
                        ) : (
                          <button
                            onClick={handleBack}
                            className="flex-1 p-4 rounded-xl border border-primary bg-primary/10 hover:bg-primary/20 transition-all group text-right"
                          >
                            <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground mb-1">
                              Complete!
                              <BookOpen className="h-4 w-4" />
                            </div>
                            <div className="font-medium text-primary">
                              Back to All Topics
                            </div>
                          </button>
                        )}
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ContentRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    if (line.includes("|") && lines[i + 1]?.includes("---")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      elements.push(
        <div key={i} className="overflow-x-auto my-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {tableLines[0]
                  .split("|")
                  .filter((c) => c.trim())
                  .map((cell, j) => (
                    <th
                      key={j}
                      className="text-left py-2 px-3 font-medium text-muted-foreground"
                    >
                      {cell.trim()}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {tableLines.slice(2).map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-border/50">
                  {row
                    .split("|")
                    .filter((c) => c.trim())
                    .map((cell, cellIndex) => (
                      <td key={cellIndex} className="py-2 px-3">
                        <InlineFormatter text={cell.trim()} />
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (line.startsWith("**") && line.endsWith("**") && !line.includes(":")) {
      elements.push(
        <h3 key={i} className="text-lg font-semibold mt-6 mb-3">
          {line.replace(/\*\*/g, "")}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      const listItems: string[] = [];
      while (
        i < lines.length &&
        (lines[i].startsWith("- ") || lines[i].startsWith("* "))
      ) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={i} className="list-disc list-outside ml-5 my-4 space-y-2">
          {listItems.map((item, j) => (
            <li key={j} className="text-foreground/90">
              <InlineFormatter text={item} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={i} className="list-decimal list-outside ml-5 my-4 space-y-2">
          {listItems.map((item, j) => (
            <li key={j} className="text-foreground/90">
              <InlineFormatter text={item} />
            </li>
          ))}
        </ol>
      );
      continue;
    }

    elements.push(
      <p key={i} className="my-4 leading-relaxed text-foreground/90">
        <InlineFormatter text={line} />
      </p>
    );
    i++;
  }

  return <>{elements}</>;
}

function InlineFormatter({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    if (boldMatch && boldMatch.index !== undefined) {
      if (boldMatch.index > 0) {
        parts.push(
          <span key={key++}>{remaining.slice(0, boldMatch.index)}</span>
        );
      }
      parts.push(
        <strong key={key++} className="font-semibold text-foreground">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
      continue;
    }

    parts.push(<span key={key++}>{remaining}</span>);
    break;
  }

  return <>{parts}</>;
}
