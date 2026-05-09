import { createClient } from '../supabase/client';
export async function insertData(title: string, description: string) {
  const supabase = createClient();

  const { data, error } = await supabase.from('tasks').insert([{ title, description }]).select();

  if (error) console.error('Insert error:', error.message);
  if (data) console.log('Inserted data:', data);

  return;
}
