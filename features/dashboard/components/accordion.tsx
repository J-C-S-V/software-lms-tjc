'use client';

import { useState, useRef, useEffect, useId, ReactNode } from 'react';

/**
 * Shape of each section in the accordion.
 * - `label` and `items` are required.
 * - `icon` is optional – pass any React node (e.g. your <IconHTML />).
 * - `id` must be unique; if omitted, React's `useId()` generates one.
 */
export interface AccordionSection {
  id?: string;
  label: string;
  icon?: ReactNode;
  items: string[];
}

interface AccordionProps {
  sections: AccordionSection[];
  /** Allow multiple sections open at once? (default: single) */
  type?: 'single' | 'multiple';
}

// ------------------------------------------------------------------
// Inline Chevron Icon (no external dependencies)
// ------------------------------------------------------------------
function Chevron({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// ------------------------------------------------------------------
// Individual Section
// ------------------------------------------------------------------
function AccordionItem({
  section,
  isOpen,
  onToggle,
  triggerId,
  panelId
}: {
  section: AccordionSection;
  isOpen: boolean;
  onToggle: () => void;
  triggerId: string;
  panelId: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Sync height when open state changes
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  // Re-measure if content ever changes (e.g. dynamic items)
  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContentHeight(entry.contentRect.height);
      }
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800">
      {/* Trigger Button */}
      <button
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all rounded-t-xl hover:cursor-pointer ${
          isOpen
            ? 'bg-violet-600/20 text-white border-b border-violet-500/30'
            : 'text-zinc-400 hover:bg-zinc-800 hover:text-white border-b border-transparent'
        }`}
      >
        {/* Section icon */}
        {section.icon && <span className="text-lg">{section.icon}</span>}
        <span>{section.label}</span>
        <Chevron
          className={`ml-auto h-4 w-4 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Collapsible Panel */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        style={{
          height: isOpen ? `${contentHeight}px` : '0px',
          overflow: 'hidden',
          transition: 'height 0.3s ease'
        }}
      >
        {/* Inner wrapper (padding lives here) */}
        <div ref={contentRef}>
          <ul className="px-3 py-2 space-y-1">
            {section.items.map((item, idx) => (
              <li
                key={idx}
                className="text-sm text-zinc-400 hover:text-white cursor-pointer rounded-md px-2 py-1 transition-colors hover:bg-zinc-800/50"
              >
                <a href="#" className="block">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// Main Accordion Component
// ------------------------------------------------------------------
export function Accordion({ sections, type = 'single' }: AccordionProps) {
  const idPrefix = useId();
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (sectionId: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        if (type === 'single') next.clear();
        next.add(sectionId);
      }
      return next;
    });
  };

  return (
    <div className="space-y-2">
      {sections.map((section) => {
        const sectionId = section.id ?? `${idPrefix}-${section.label}`;
        const isOpen = openIds.has(sectionId);
        const triggerId = `trigger-${sectionId}`;
        const panelId = `panel-${sectionId}`;

        return (
          <AccordionItem
            key={sectionId}
            section={section}
            isOpen={isOpen}
            onToggle={() => toggle(sectionId)}
            triggerId={triggerId}
            panelId={panelId}
          />
        );
      })}
    </div>
  );
}
