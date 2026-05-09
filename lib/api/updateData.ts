import { createClient } from '../supabase/client';

export async function updateData(title: string, description: string, id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('tasks')
    .update([{ title, description }])
    .eq('id', id);

  if (error) console.error('Insert error:', error.message);
  if (data) console.log('Inserted data:', data);
}
