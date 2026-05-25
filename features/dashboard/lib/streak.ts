/**
 * Login-streak logic.
 *
 * Rule: a day is ACTIVE only if the student completed at least one section
 * that day. Logging in alone does nothing. Two states only: 'active' | 'none'.
 *
 * This file has no database code — it just turns a list of completion
 * timestamps into a streak number and a day-by-day grid. That makes it easy
 * to test and reuse.
 */

export type DayState = 'active' | 'none';

export interface StreakDay {
  date: string; // 'YYYY-MM-DD'
  label: string; // weekday letter, e.g. 'M'
  state: DayState;
  isToday: boolean;
}

const WEEKDAY = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Collapse raw completion timestamps into the set of days that had activity. */
export function activeDatesFromCompletions(completedAt: string[]): Set<string> {
  const set = new Set<string>();
  for (const ts of completedAt) {
    const d = new Date(ts);
    if (!Number.isNaN(d.getTime())) set.add(toDateKey(d));
  }
  return set;
}

/**
 * Current consecutive-day streak. If today has no completion yet we don't
 * break it — we count from yesterday, so the number only resets after a full
 * day is genuinely missed.
 */
export function computeCurrentStreak(activeDates: Set<string>, today: Date = new Date()): number {
  let streak = 0;
  const cursor = new Date(today);

  if (!activeDates.has(toDateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (activeDates.has(toDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Build the last `days` (oldest → newest) for the streak panel grid. */
export function buildStreakWindow(
  activeDates: Set<string>,
  days = 14,
  today: Date = new Date()
): StreakDay[] {
  const todayKey = toDateKey(today);
  const out: StreakDay[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = toDateKey(d);
    out.push({
      date: key,
      label: WEEKDAY[d.getDay()],
      state: activeDates.has(key) ? 'active' : 'none',
      isToday: key === todayKey
    });
  }
  return out;
}
