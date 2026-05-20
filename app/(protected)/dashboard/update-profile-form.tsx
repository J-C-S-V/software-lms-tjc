'use client';

import { useActionState } from 'react';
import { updateProfile } from './actions';

export function UpdateProfileForm({ currentDisplayName }: { currentDisplayName: string }) {
  const [state, formAction, isPending] = useActionState(updateProfile, null);

  return (
    <form action={formAction} className="space-y-2">
      <input
        name="display_name"
        defaultValue={currentDisplayName}
        placeholder="Your name"
        maxLength={50}
        className="border w-full px-3 py-2 rounded"
        required
      />
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded text-sm disabled:opacity-50"
      >
        {isPending ? 'Saving...' : 'Update profile'}
      </button>
      {state && 'error' in state && <p className="text-sm text-red-600">{state.error}</p>}
      {state && 'success' in state && <p className="text-sm text-green-600">Saved.</p>}
    </form>
  );
}
