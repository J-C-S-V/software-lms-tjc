'use client';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { insertData } from '../lib/api/insertData';

export function FormAddTasks({ onTaskAdded }: { onTaskAdded: () => void }) {
  const [title, setTile] = useState('');
  const [description, setDescription] = useState('');

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) supabase.auth.signInAnonymously();
    });
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await insertData(title, description);
    setTile('');
    setDescription('');
    onTaskAdded();
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTile(e.target.value);
  };

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <>
      <form className="flex flex-col item-start gap-3 max-w-xl mx-auto" onSubmit={handleSubmit}>
        <input
          placeholder="Add a task"
          className="border-2 p-2 rounded-sm"
          value={title}
          onChange={handleTitle}
          type="text"
          name="title"
          id="title"
        />
        <textarea
          className="border-2 p-2 rounded-sm"
          value={description}
          onChange={handleDescription}
          id="description"
          name="description"
          rows={5}
          cols={33}
          placeholder="Add a description..."
        ></textarea>
        <button
          className="cursor-pointer border-2 rounded-sm hover:bg-black hover:text-white py-2 px-4 active:bg-gray-800"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
}
