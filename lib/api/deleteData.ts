import { createClient } from '../supabase/client';

export async function deleteData(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from('tasks').delete().eq('id', id);

  if (error) throw new Error('Something went wrong when deleting this task', error);
}
