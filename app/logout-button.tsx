'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function LogoutButton() {
  const supabase = createClient();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded">
      Log out
    </button>
  );
}
