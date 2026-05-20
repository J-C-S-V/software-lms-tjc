'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { login } from '../actions';

export function LoginForm({ next, initialError }: { next: string; initialError: string | null }) {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <form action={formAction} className="space-y-3">
      <h1 className="text-2xl font-bold">Log in</h1>

      {initialError && (
        <div className="p-3 border border-red-200 bg-red-50 rounded text-sm text-red-700">
          {initialError}
        </div>
      )}

      <input type="hidden" name="next" value={next} />
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="border w-full px-3 py-2 rounded"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="border w-full px-3 py-2 rounded"
        required
      />
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded w-full disabled:opacity-50"
      >
        {isPending ? 'Logging in...' : 'Log in'}
      </button>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <p className="text-sm">
        No account?{' '}
        <Link href="/signup" className="text-blue-600">
          Sign up
        </Link>
      </p>
    </form>
  );
}
