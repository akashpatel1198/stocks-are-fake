"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  List,
  X,
} from "lucide-react";
import { getTopicBySlug, getAllTopics } from "@/lib/learn-content";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function TopicPage() {
  const params = useParams();
  const slug = params.slug as string;
  const topic = getTopicBySlug(slug);
  const allTopics = getAllTopics();

  const [activeSection, setActiveSection] = useState<string>("");
  const [showMobileToc, setShowMobileToc] = useState(false);

  useEffect(() => {
    if (topic && topic.sections.length > 0) {
      setActiveSection(topic.sections[0].id);
    }
  }, [topic]);

  useEffect(() => {
    const handleScroll = () => {
      if (!topic) return;

      const sections = topic.sections.map((s) => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [topic]);

  if (!topic) {
    notFound();
  }

  const currentIndex = allTopics.findIndex((t) => t.slug === slug);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic =
    currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setShowMobileToc(false);
  };

  return (
    <div className="flex">
      {/* Desktop Table of Contents - Fixed Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="fixed w-64 top-0 pt-24 pb-8 h-screen overflow-y-auto px-4">
          <div className="mb-4">
            <Link
              href="/learn"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              All Topics
            </Link>
          </div>

          <div className="mb-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              On This Page
            </h3>
          </div>

          <nav className="space-y-1">
            {topic.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                  activeSection === section.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {section.title}
              </button>
            ))}
          </nav>

          {/* Topic Progress */}
          <div className="mt-8 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">
              Topic {currentIndex + 1} of {allTopics.length}
            </p>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{
                  width: `${((currentIndex + 1) / allTopics.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile TOC Toggle */}
      <button
        onClick={() => setShowMobileToc(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Show table of contents"
      >
        <List className="h-5 w-5" />
      </button>

      {/* Mobile TOC Drawer */}
      {showMobileToc && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 right-0 w-72 bg-background border-l border-border shadow-xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">On This Page</h3>
              <button
                onClick={() => setShowMobileToc(false)}
                className="p-2 hover:bg-muted rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="space-y-1">
              {topic.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                    activeSection === section.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-8 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/learn" className="hover:text-foreground transition-colors">
            Learn
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{topic.title}</span>
        </div>

        {/* Topic Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{topic.icon}</span>
            <h1 className="text-3xl font-bold">{topic.title}</h1>
          </div>
          <p className="text-lg text-muted-foreground">{topic.description}</p>
        </header>

        {/* Sections */}
        <div className="space-y-12">
          {topic.sections.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-primary">{index + 1}.</span>
                {section.title}
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <ContentRenderer content={section.content} />
              </div>
            </section>
          ))}
        </div>

        {/* Navigation */}
        <nav className="mt-12 pt-8 border-t border-border">
          <div className="flex justify-between gap-4">
            {prevTopic ? (
              <Link
                href={`/learn/${prevTopic.slug}`}
                className="flex-1 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-accent transition-all group"
              >
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </div>
                <div className="font-medium group-hover:text-primary transition-colors">
                  {prevTopic.icon} {prevTopic.title}
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {nextTopic ? (
              <Link
                href={`/learn/${nextTopic.slug}`}
                className="flex-1 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-accent transition-all group text-right"
              >
                <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground mb-1">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </div>
                <div className="font-medium group-hover:text-primary transition-colors">
                  {nextTopic.icon} {nextTopic.title}
                </div>
              </Link>
            ) : (
              <Link
                href="/learn"
                className="flex-1 p-4 rounded-xl border border-primary bg-primary/10 hover:bg-primary/20 transition-all group text-right"
              >
                <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground mb-1">
                  Complete!
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="font-medium text-primary">
                  Back to All Topics
                </div>
              </Link>
            )}
          </div>
        </nav>
      </main>
    </div>
  );
}

function ContentRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (!line.trim()) {
      i++;
      continue;
    }

    // Tables
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

    // Headers
    if (line.startsWith("**") && line.endsWith("**") && !line.includes(":")) {
      elements.push(
        <h3 key={i} className="text-lg font-semibold mt-6 mb-3">
          {line.replace(/\*\*/g, "")}
        </h3>
      );
      i++;
      continue;
    }

    // List items
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

    // Numbered list
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

    // Regular paragraph
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
    // Bold
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

    // No more matches
    parts.push(<span key={key++}>{remaining}</span>);
    break;
  }

  return <>{parts}</>;
}
