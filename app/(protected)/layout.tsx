import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { LogoutButton } from '@/features/auth/components/logout-button';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="h-screen flex flex-col">
      <nav className="border-b px-6 py-3 flex items-center justify-between shrink-0">
        <Link href="/learn" className="font-semibold">
          Code Origin
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-600">{user.email}</span>
          <LogoutButton />
          <Link href="/profile" className="text-blue-600 rounded-md px-2 py-1 hover:bg-gray-100">
            Profile
          </Link>
        </div>
      </nav>
      <main className="flex-1 min-h-0">{children}</main>
    </div>
  );
}
