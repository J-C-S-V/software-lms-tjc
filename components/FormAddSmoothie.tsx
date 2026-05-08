'use client';
import { createClient } from '@/lib/supabase/client';
// import { useState } from 'react';

export function FormAddSmoothie() {
  // const [title, setTitle] = useState('');
  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const supabase = createClient();
    const { data, error } = await supabase
      .from('smoothies')
      .insert([{ title: 'Mile', method: 'nose', rating: 10 }]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input className="border-2" type="text" name="name" id="name" />
        <button className="cursor-pointer" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
