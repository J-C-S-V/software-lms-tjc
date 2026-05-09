'use client';
import { createClient } from '@/lib/supabase/client';
import { useEffect } from 'react';

export function FormAddSmoothie() {
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) supabase.auth.signInAnonymously();
    });
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title: 'Eat', description: 'Eat at 8am' }])
      .select();

    if (error) console.error('Insert error:', error.message);
    if (data) console.log('Inserted data:', data);
  };

  return (
    <>
      <form className="flex justify-center" onSubmit={handleSubmit}>
        <button
          className="cursor-pointer border-2 hover:bg-black hover:text-white py-2 px-4 mt-10 active:bg-gray-800"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
}
