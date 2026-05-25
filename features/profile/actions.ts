'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

type State = { error: string } | { success: true } | null;

export async function updateProfile(_prev: State, formData: FormData): Promise<State> {
  const display_name = (formData.get('display_name') as string)?.trim();

  if (!display_name) {
    return { error: 'Display name is required.' };
  }
  if (display_name.length > 50) {
    return { error: 'Display name must be 50 characters or fewer.' };
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated.' };

  const { error } = await supabase
    .from('profiles')
    .update({ display_name, updated_at: new Date().toISOString() })
    .eq('id', user.id);

  if (error) return { error: error.message };

  revalidatePath('/learn');
  return { success: true };
}
