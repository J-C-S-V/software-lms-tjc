'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { requestPasswordReset } from '../actions';

export function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(requestPasswordReset, null);

  return (
    <form action={formAction} className="space-y-3">
      <h1 className="text-2xl font-bold">Reset password</h1>
      <p className="text-sm text-gray-600">Enter your email and we'll send you a reset link.</p>
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="border w-full px-3 py-2 rounded"
        required
      />
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded w-full disabled:opacity-50"
      >
        {isPending ? 'Sending...' : 'Send reset link'}
      </button>
      {state && 'error' in state && <p className="text-sm text-red-600">{state.error}</p>}
      {state && 'success' in state && (
        <p className="text-sm text-green-600">
          If that email is registered, a reset link is on its way. Check your inbox.
        </p>
      )}
      <p className="text-sm">
        Remember it?{' '}
        <Link href="/login" className="text-blue-600">
          Log in
        </Link>
      </p>
    </form>
  );
}
