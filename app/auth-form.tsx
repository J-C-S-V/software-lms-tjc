'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function AuthForm() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleSignUp() {
    setMessage('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      router.refresh();
    }
  }

  async function handleLogin() {
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      router.refresh();
    }
  }

  return (
    <>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border w-full px-3 py-2 rounded"
      />
      <input
        type="password"
        placeholder="Password (min 6 chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border w-full px-3 py-2 rounded"
      />
      <div className="flex gap-2">
        <button onClick={handleSignUp} className="px-4 py-2 bg-blue-600 text-white rounded">
          Sign up
        </button>
        <button onClick={handleLogin} className="px-4 py-2 bg-green-600 text-white rounded">
          Log in
        </button>
      </div>
      {message && <p className="text-sm">{message}</p>}
    </>
  );
}
