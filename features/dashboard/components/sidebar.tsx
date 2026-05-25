import { sections } from '@/features/dashboard/data';
import { Accordion } from './accordion';

export function Sidebar() {
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
        <a
          href="#"
          className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
            true
              ? 'bg-violet-600/20 text-white border border-violet-500/30'
              : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
          }`}
        >
          <span className="text-lg">📊</span>
          Dashboard
        </a>
        <Accordion sections={sections} />
        <p className="px-3 mt-6 mb-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
          {/* Settings */}
          Support
        </p>
        {/* <a
          href="#"
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all"
        >
          <span className="text-lg">⚙️</span> Settings
        </a> */}
        <a
          href="mailto:hello@techjobcoach.com"
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all"
        >
          <span className="text-lg">📩</span> Help Center
        </a>
      </nav>
      {/* <div className="p-4 border-t border-zinc-700/60">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-zinc-800 cursor-pointer transition-colors">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
            AK
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Alex Kim</p>
            <p className="text-[11px] text-zinc-500 truncate">Lead Instructor</p>
          </div>
        </div>
      </div> */}
    </aside>
  );
}
