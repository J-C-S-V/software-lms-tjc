import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">Auth demo</h1>
      {user ? (
        <Link href="/learn" className="px-4 py-2 bg-blue-600 text-white rounded">
          Go to dashboard
        </Link>
      ) : (
        <div className="flex gap-3">
          <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded">
            Log in
          </Link>
          <Link href="/signup" className="px-4 py-2 border rounded">
            Sign up
          </Link>
        </div>
      )}
    </main>
  );
}
