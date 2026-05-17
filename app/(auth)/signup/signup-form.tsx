'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { signup } from '../actions';

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(signup, null);

  return (
    <form action={formAction} className="space-y-3">
      <h1 className="text-2xl font-bold">Sign up</h1>
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
        placeholder="Password (min 6 chars)"
        className="border w-full px-3 py-2 rounded"
        required
      />
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-green-600 text-white rounded w-full disabled:opacity-50"
      >
        {isPending ? 'Creating account...' : 'Create account'}
      </button>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <p className="text-sm">
        Have an account?{' '}
        <Link href="/login" className="text-blue-600">
          Log in
        </Link>
      </p>
    </form>
  );
}
