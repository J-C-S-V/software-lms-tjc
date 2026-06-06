import { createClient } from '@/lib/supabase/server';
import { getStreakData } from '@/features/dashboard/lib/getStreakData';
import { LoginStreak } from '@/features/dashboard/components/login-streak';

export default async function LearnDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { currentStreak, days, completedToday } = await getStreakData();

  const stats = [
    { title: 'Completion Rate', value: '87.3%', change: '+4.1%', up: true },
    { title: 'Streak', value: '14', text: 'Days in a row', up: true },
    { title: 'Challenges', value: '47', text: 'Completed', up: true },
    { title: 'Avg. Quiz Score', value: '78.6', change: '-1.8%', up: false }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Welcome {user!.email} 👋</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-zinc-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Spring '26 — In Session
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-zinc-500">{stat.title}</span>
              <span className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 text-lg">
                {stat.title === 'Streak' && '🔥'}
                {stat.title === 'Completion Rate' && '🏆'}
                {stat.title === 'Challenges' && '📝'}
                {stat.title === 'Avg. Quiz Score' && '🎯'}
              </span>
            </div>
            <p className="text-3xl font-bold text-zinc-900">{stat.value}</p>
            {stat.text && <p className="text-sm text-zinc-500">{stat.text}</p>}
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-md">
        <LoginStreak currentStreak={currentStreak} days={days} completedToday={completedToday} />
      </div>
    </div>
  );
}
