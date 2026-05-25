'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { courses } from '@/features/dashboard/data';
import { Accordion, AccordionSection } from './accordion';

export function Sidebar() {
  const pathname = usePathname();
  const isDashboardActive = pathname === '/learn';

  const sections: AccordionSection[] = courses.map((course) => ({
    id: course.slug,
    label: course.label,
    icon: course.icon,
    items: course.lessons.map((lesson) => ({
      label: lesson.title,
      href: `/learn/${course.slug}/${lesson.slug}`
    }))
  }));

  return (
    <aside className="hidden md:flex md:flex-col md:max-w-md bg-zinc-900 text-white shadow-2xl">
      <div className="px-6 py-7 border-b border-zinc-700/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-lg font-black">
            &lt;/&gt;
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight">Code Origin</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        <Link
          href="/learn"
          className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
            isDashboardActive
              ? 'bg-violet-600/20 text-white border border-violet-500/30'
              : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
          }`}
        >
          <span className="text-lg">📊</span>
          Dashboard
        </Link>
        <Accordion sections={sections} />
        <p className="px-3 mt-6 mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Support
        </p>
        <a
          href="mailto:hello@techjobcoach.com"
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all"
        >
          <span className="text-lg">📩</span> Help Center
        </a>
      </nav>
    </aside>
  );
}
