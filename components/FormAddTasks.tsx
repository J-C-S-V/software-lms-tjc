'use client';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export function FormAddTasks({
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  title,
  description
}: {
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: any) => void;
  title: string;
  description: string;
}) {
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) supabase.auth.signInAnonymously();
    });
  }, []);

  return (
    <>
      <form className="flex flex-col item-start gap-3 max-w-xl mx-auto" onSubmit={onSubmit}>
        <input
          placeholder="Add a task"
          className="border-2 p-2 rounded-sm cursor-auto"
          value={title}
          onChange={onTitleChange}
          type="text"
          name="title"
          id="title"
          readOnly
        />
        <textarea
          className="border-2 p-2 rounded-sm"
          value={description}
          onChange={onDescriptionChange}
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
