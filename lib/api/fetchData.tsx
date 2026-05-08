import { createClient } from '@/lib/supabase/client';

export async function fetchSmoothies() {
  const supabase = createClient();

  const { data, error } = await supabase.from('smoothies').select('*');
  if (error) console.error('Error fetching smoothies:', error);
  return data;
}
