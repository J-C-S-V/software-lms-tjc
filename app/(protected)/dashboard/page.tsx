import { createClient } from '@/lib/supabase/server';
import { Sidebar } from '@/features/dashboard/components/sidebar';

// app/dashboard/page.tsx (Server Component)
export default async function BootcampDashboard() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, created_at')
    .eq('id', user!.id)
    .single();
  // --- mock data ---
  const stats = [
    { title: 'Active Students', value: '1,284', change: '+12.5%', up: true },
    { title: 'Completion Rate', value: '87.3%', change: '+4.1%', up: true },
    { title: 'Assignments', value: '3,842', change: '+22%', up: true },
    { title: 'Avg. Quiz Score', value: '78.6', change: '-1.8%', up: false }
  ];

  const enrollmentData = [
    { month: 'Jan', value: 48 },
    { month: 'Feb', value: 66 },
    { month: 'Mar', value: 42 },
    { month: 'Apr', value: 90 },
    { month: 'May', value: 72 },
    { month: 'Jun', value: 108 },
    { month: 'Jul', value: 98 },
    { month: 'Aug', value: 120 }
  ];
  const maxEnrollment = Math.max(...enrollmentData.map((d) => d.value));

  const recentEnrollments = [
    { name: 'Olivia Martin', course: 'Full-Stack Web', status: 'Enrolled' },
    { name: 'Ava Johnson', course: 'Data Science', status: 'Waitlist' },
    { name: 'Michael Johnson', course: 'UX/UI Design', status: 'Enrolled' },
    { name: 'Lisa Anderson', course: 'Full-Stack Web', status: 'Dropped' },
    { name: 'Samantha Green', course: 'Data Science', status: 'Enrolled' }
  ];

  const navItems = [
    { label: 'Dashboard', active: true },
    { label: 'Courses' },
    { label: 'Students' },
    { label: 'Assignments' },
    { label: 'Mentorship' }
  ];

  return (
    <div className="flex h-screen bg-zinc-50">
      <Sidebar />

      {/* ---------- Main content ---------- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* top bar */}
        <header className="bg-white border-b border-zinc-200 shadow-sm">
          <div className="flex items-center justify-between px-5 sm:px-6 py-3">
            <div className="flex items-center gap-4">
              <button className="md:hidden text-zinc-500 hover:text-zinc-800 p-1.5 rounded-lg hover:bg-zinc-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div className="relative hidden sm:block">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
                <input
                  type="search"
                  placeholder="Search students, courses..."
                  className="pl-10 pr-4 py-2 w-60 lg:w-72 border border-zinc-200 rounded-xl text-sm bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent focus:bg-white transition-all"
                  readOnly
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 transition-colors shadow-md shadow-violet-600/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New Cohort
              </button>
            </div>
          </div>
        </header>

        {/* main scrollable area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Page heading */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900">Welcome back, {user.email} 👋</h1>
              <p className="text-sm text-zinc-500 mt-0.5">
                Here’s what’s happening with your cohorts this week.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-zinc-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Spring ’26 — In Session
              </span>
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-zinc-500">{stat.title}</span>
                  <span className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 text-lg">
                    {stat.title === 'Active Students' && '👩‍🎓'}
                    {stat.title === 'Completion Rate' && '🏆'}
                    {stat.title === 'Assignments' && '📝'}
                    {stat.title === 'Avg. Quiz Score' && '🎯'}
                  </span>
                </div>
                <p className="text-3xl font-bold text-zinc-900">{stat.value}</p>
                <div className="mt-2 flex items-center text-xs font-medium">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${
                      stat.up ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'
                    }`}
                  >
                    {stat.up ? '▲' : '▼'} {stat.change}
                  </span>
                  <span className="text-zinc-400 ml-2">
                    {stat.title === 'Avg. Quiz Score' ? 'needs attention' : 'vs last cohort'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart + recent enrollments */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* enrollment chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-zinc-100 p-5 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-zinc-800">Monthly Enrollments</h3>
                <span className="text-xs font-medium text-zinc-400 bg-zinc-100 px-3 py-1 rounded-lg">
                  2026
                </span>
              </div>
              <div className="flex items-end justify-between h-52 gap-2 sm:gap-3">
                {enrollmentData.map((item) => {
                  const heightPercent = (item.value / maxEnrollment) * 100;
                  return (
                    <div key={item.month} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-violet-100 rounded-t-lg relative"
                        style={{ height: `${heightPercent}%` }}
                      >
                        <div
                          className={`absolute bottom-0 left-0 right-0 rounded-t-lg ${
                            item.month === 'Aug'
                              ? 'bg-gradient-to-t from-violet-600 to-purple-500 shadow-md shadow-violet-400/30'
                              : 'bg-violet-500'
                          }`}
                          style={{ height: '100%' }}
                        />
                      </div>
                      <span className="text-xs text-zinc-400 mt-2 font-medium">{item.month}</span>
                      <span
                        className={`text-[10px] font-semibold ${item.month === 'Aug' ? 'text-violet-600' : 'text-zinc-500'}`}
                      >
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-zinc-100 text-[11px] text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-violet-500" /> Enrollments
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-purple-500" /> Projected
                </span>
              </div>
            </div>

            {/* recent enrollments table */}
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-5 sm:p-6 overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-zinc-800">Recent Enrollments</h3>
                <a
                  href="#"
                  className="text-xs font-medium text-violet-600 hover:text-violet-800 transition-colors"
                >
                  View all
                </a>
              </div>
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-zinc-400 border-b border-zinc-100">
                    <th className="pb-3 font-medium text-[11px] uppercase tracking-wider">
                      Student
                    </th>
                    <th className="pb-3 font-medium text-[11px] uppercase tracking-wider">
                      Course
                    </th>
                    <th className="pb-3 font-medium text-[11px] uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentEnrollments.map((enrollment, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/60 transition-colors"
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-300 to-violet-500 flex items-center justify-center text-[10px] font-bold text-white">
                            {enrollment.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </div>
                          <span className="font-medium text-zinc-800">{enrollment.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-zinc-500">{enrollment.course}</td>
                      <td className="py-3">
                        <span
                          className={`inline-block px-2.5 py-1 text-[11px] font-semibold rounded-full ${
                            enrollment.status === 'Enrolled'
                              ? 'bg-emerald-100 text-emerald-700'
                              : enrollment.status === 'Waitlist'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {enrollment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom row: upcoming cohorts + quick actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Upcoming Cohorts */}
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-zinc-800 mb-4">📅 Upcoming Cohorts</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 rounded-xl bg-violet-50 border border-violet-100">
                  <div className="w-12 h-12 rounded-xl bg-violet-200 flex items-center justify-center text-xl">
                    💻
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-zinc-800 text-sm">Full-Stack Web Dev</p>
                    <p className="text-xs text-zinc-500">Starts Sep 14 • 32 seats left</p>
                  </div>
                  <span className="text-[11px] font-semibold text-violet-600 bg-violet-100 px-2.5 py-1 rounded-full">
                    Cohort 14
                  </span>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="w-12 h-12 rounded-xl bg-blue-200 flex items-center justify-center text-xl">
                    📊
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-zinc-800 text-sm">Data Science Immersive</p>
                    <p className="text-xs text-zinc-500">Starts Oct 2 • 18 seats left</p>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full">
                    Cohort 8
                  </span>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-xl bg-amber-50 border border-amber-100">
                  <div className="w-12 h-12 rounded-xl bg-amber-200 flex items-center justify-center text-xl">
                    🎨
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-zinc-800 text-sm">UX/UI Design Bootcamp</p>
                    <p className="text-xs text-zinc-500">Starts Oct 20 • 25 seats left</p>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-600 bg-amber-100 px-2.5 py-1 rounded-full">
                    Cohort 5
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Announcement */}
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-zinc-800 mb-4">⚡ Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-zinc-50 border border-zinc-100 hover:bg-violet-50 hover:border-violet-200 transition-all text-sm font-medium text-zinc-600 hover:text-violet-700">
                  <span className="text-2xl">📋</span> Grade Pending
                </button>
                <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-zinc-50 border border-zinc-100 hover:bg-violet-50 hover:border-violet-200 transition-all text-sm font-medium text-zinc-600 hover:text-violet-700">
                  <span className="text-2xl">📢</span> Announcement
                </button>
                <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-zinc-50 border border-zinc-100 hover:bg-violet-50 hover:border-violet-200 transition-all text-sm font-medium text-zinc-600 hover:text-violet-700">
                  <span className="text-2xl">📁</span> Resources
                </button>
                <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-zinc-50 border border-zinc-100 hover:bg-violet-50 hover:border-violet-200 transition-all text-sm font-medium text-zinc-600 hover:text-violet-700">
                  <span className="text-2xl">💬</span> Mentorship
                </button>
              </div>
              <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <span className="text-lg flex-shrink-0">📌</span>
                <div>
                  <p className="text-sm font-semibold text-amber-800">
                    Grading deadline approaching
                  </p>
                  <p className="text-xs text-amber-600 mt-0.5">
                    Week 6 assignments due for review by Friday, 5 PM PST.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
