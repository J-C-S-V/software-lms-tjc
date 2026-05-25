import type { StreakDay } from '../lib/streak';

interface LoginStreakProps {
  currentStreak: number;
  /** Last N days, oldest → newest. Each day is 'active' or 'none'. */
  days: StreakDay[];
  /** Whether the student already completed a section today. */
  completedToday: boolean;
}

export function LoginStreak({ currentStreak, days, completedToday }: LoginStreakProps) {
  return (
    <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-800">Login streak</h3>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-sm font-bold text-orange-600">
          🔥 {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {days.map((day) => {
          const isActive = day.state === 'active';
          return (
            <div key={day.date} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-medium text-zinc-400">{day.label}</span>
              <div
                title={`${day.date} — ${isActive ? 'completed a section' : 'no activity'}`}
                className={[
                  'flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors',
                  isActive
                    ? 'bg-violet-500 text-white'
                    : 'border border-dashed border-zinc-200 bg-zinc-50 text-zinc-300',
                  day.isToday ? 'ring-2 ring-violet-400 ring-offset-1' : ''
                ].join(' ')}
              >
                {isActive ? '🔥' : ''}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend — the two states */}
      <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-zinc-100 pt-3 text-[11px] text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-violet-500" /> Active — section completed
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm border border-dashed border-zinc-200 bg-zinc-50" /> No
          activity
        </span>
      </div>

      {!completedToday && (
        <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
          Complete one section today to keep your streak alive.
        </p>
      )}
    </div>
  );
}
