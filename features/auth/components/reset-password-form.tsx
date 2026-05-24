'use client';

import { useActionState } from 'react';
import { updatePassword } from '../actions';

export function ResetPasswordForm() {
  const [state, formAction, isPending] = useActionState(updatePassword, null);

  return (
    <form action={formAction} className="space-y-3">
      <h1 className="text-2xl font-bold">Set a new password</h1>
      <input
        name="password"
        type="password"
        placeholder="New password (min 6 chars)"
        className="border w-full px-3 py-2 rounded"
        required
      />
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded w-full disabled:opacity-50"
      >
        {isPending ? 'Updating...' : 'Update password'}
      </button>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
    </form>
  );
}
