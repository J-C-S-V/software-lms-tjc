import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  // user is non-null here because the layout already checked.
  // We're calling getUser() again to access the data — Supabase caches it
  // within a single request so this is essentially free.

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome back.</p>
      <div className="border rounded p-4 text-sm space-y-1">
        <p>
          <strong>User ID:</strong> {user!.id}
        </p>
        <p>
          <strong>Email:</strong> {user!.email}
        </p>
        <p>
          <strong>Created:</strong> {new Date(user!.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
