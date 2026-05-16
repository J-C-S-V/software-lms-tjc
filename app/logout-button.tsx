'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function LogoutButton() {
  const supabase = createClient();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  return (
    <button onClick={handleLogout} className="px-3 py-1 bg-red-600 text-white rounded text-sm">
      Log out
    </button>
  );
}
