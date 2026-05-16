'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export function SignupForm() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      return;
    }
    router.push('/dashboard');
    router.refresh();
  }

  return (
    <form onSubmit={handleSignup} className="space-y-3">
      <h1 className="text-2xl font-bold">Sign up</h1>
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
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border w-full px-3 py-2 rounded"
        required
      />
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded w-full">
        Create account
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-sm">
        Have an account?{' '}
        <Link href="/login" className="text-blue-600">
          Log in
        </Link>
      </p>
    </form>
  );
}
