import { createClient } from '@/lib/supabase/server';
import {
  activeDatesFromCompletions,
  buildStreakWindow,
  computeCurrentStreak,
  type StreakDay
} from './streak';

export interface StreakData {
  currentStreak: number;
  days: StreakDay[];
  completedToday: boolean;
}

/**
 * Reads the signed-in student's section completions and turns them into
 * everything the streak panel needs. Runs on the server.
 */
export async function getStreakData(): Promise<StreakData> {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  // Not signed in → render an empty streak rather than crashing.
  if (!user) {
    return { currentStreak: 0, days: buildStreakWindow(new Set(), 14), completedToday: false };
  }

  const { data, error } = await supabase
    .from('section_completions')
    .select('completed_at')
    .eq('user_id', user.id);

  if (error) {
    console.error('Streak fetch failed:', error.message);
  }

  const timestamps = (data ?? []).map((row) => row.completed_at as string);
  const activeDates = activeDatesFromCompletions(timestamps);
  const days = buildStreakWindow(activeDates, 14);
  const completedToday = days.length > 0 && days[days.length - 1].state === 'active';

  return {
    currentStreak: computeCurrentStreak(activeDates),
    days,
    completedToday
  };
}
