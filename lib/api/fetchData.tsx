import { createClient } from '@/lib/supabase/client';
import { type Smoothies } from '@/types/smoothies';

export async function fetchSmoothies(): Promise<Smoothies[] | null> {
  const supabase = createClient();

  const { data, error } = await supabase.from('smoothies').select('*');
  if (error) console.error('Error fetching smoothies:', error);
  return data;
}
