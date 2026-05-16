'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function LoginForm({ next }: { next: string }) {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={handleLogin} className="space-y-3">
      <h1 className="text-2xl font-bold">Log in</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border w-full px-3 py-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border w-full px-3 py-2 rounded"
        required
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded w-full">
        Log in
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-sm">
        No account?{' '}
        <Link href="/signup" className="text-blue-600">
          Sign up
        </Link>
      </p>
    </form>
  );
}
