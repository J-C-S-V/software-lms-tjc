'use client';
import { useState, useEffect } from 'react';
import { type User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

export default function Home() {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function checkUser() {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    setUser(user);
    setLoading(false);

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }

  // 2. Auth handlers.
  async function handleSignUp() {
    setMessage('');
    const { error } = await supabase.auth.signUp({
      email,
      password
    });
    setMessage(error ? `Error: ${error.message}` : 'Check your email for the login link!');
  }

  async function handleSignIn() {
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    setMessage(error ? `Error: ${error.message}` : 'Signed in successfully!');
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  useEffect(() => {
    checkUser();
  }, []);

  // 3. Render.
  if (loading) return <main className="p-8">Loading...</main>;

  if (user) {
    return (
      <main className="p-8 max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Logged in</h1>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>User ID:</strong> {user.id}
        </p>
        <button onClick={handleSignOut} className="px-4 py-2 bg-red-600 text-white rounded">
          Log out
        </button>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-md space-y-4">
      <h1 className="text-2xl font-bold">Auth demo</h1>
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
        <button onClick={handleSignIn} className="px-4 py-2 bg-green-600 text-white rounded">
          Log in
        </button>
      </div>
      {message && <p className="text-sm">{message}</p>}
    </main>
  );
}
