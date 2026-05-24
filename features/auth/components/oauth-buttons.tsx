'use client';

import { createClient } from '@/lib/supabase/client';

export function OAuthButtons({ next }: { next: string }) {
  const supabase = createClient();

  async function signInWith(provider: 'google' | 'github') {
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo }
    });
    if (error) {
      console.error('OAuth error:', error);
    }
    // On success, signInWithOAuth navigates the browser to the provider's page.
    // We never reach code after the await on the success path.
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => signInWith('google')}
        className="w-full px-4 py-2 border rounded text-sm hover:bg-gray-50"
      >
        Continue with Google
      </button>
      {/* <button
        type="button"
        onClick={() => signInWith('github')}
        className="w-full px-4 py-2 border rounded text-sm hover:bg-gray-50"
      >
        Continue with GitHub
      </button> */}
    </div>
  );
}
