import { createClient } from '@/lib/supabase/client';
import { type Tasks } from '@/types/tasks';

export async function fetchTasks(): Promise<Tasks[] | null> {
  const supabase = createClient();

  const { data, error } = await supabase.from('tasks').select('*');
  if (error) console.error('Error fetching tasks:', error);
  return data;
}
