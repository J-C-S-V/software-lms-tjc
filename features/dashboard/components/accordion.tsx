'use client';

import { useState, useRef, useEffect, useId, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface AccordionItem {
  label: string;
  href: string;
}

export interface AccordionSection {
  id?: string;
  label: string;
  icon?: ReactNode;
  items: AccordionItem[];
}

interface AccordionProps {
  sections: AccordionSection[];
  /** Allow multiple sections open at once? (default: single) */
  type?: 'single' | 'multiple';
}

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

function AccordionSectionItem({
  section,
  isOpen,
  onToggle,
  triggerId,
  panelId,
  activeHref
}: {
  section: AccordionSection;
  isOpen: boolean;
  onToggle: () => void;
  triggerId: string;
  panelId: string;
  activeHref: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

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
        {section.icon && <span className="text-lg">{section.icon}</span>}
        <span>{section.label}</span>
        <Chevron
          className={`ml-auto h-4 w-4 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

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
        <div ref={contentRef}>
          <ul>
            {section.items.map((item) => {
              const isActive = item.href === activeHref;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`block text-sm p-4 transition-colors border-t border-zinc-800 ${
                      isActive
                        ? 'bg-violet-600/30 text-white border border-violet-500/30'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Accordion({ sections, type = 'single' }: AccordionProps) {
  const idPrefix = useId();
  const pathname = usePathname();

  const sectionContainingPath = sections.find((s) => s.items.some((i) => i.href === pathname));
  const activeSectionId = sectionContainingPath
    ? (sectionContainingPath.id ?? `${idPrefix}-${sectionContainingPath.label}`)
    : null;

  const [openIds, setOpenIds] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    if (activeSectionId) initial.add(activeSectionId);
    return initial;
  });

  // Open the section containing the active route whenever the route changes.
  // Uses the "store info from previous render" pattern to avoid setState-in-effect.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    if (activeSectionId && !openIds.has(activeSectionId)) {
      const next = new Set(type === 'single' ? [] : openIds);
      next.add(activeSectionId);
      setOpenIds(next);
    }
  }

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
          <AccordionSectionItem
            key={sectionId}
            section={section}
            isOpen={isOpen}
            onToggle={() => toggle(sectionId)}
            triggerId={triggerId}
            panelId={panelId}
            activeHref={pathname}
          />
        );
      })}
    </div>
  );
}
