'use client';
import { useState, useEffect } from 'react';
import { updateData } from '@/lib/api/updateData';
import { deleteData } from '@/lib/api/deleteData';
import { fetchTasks } from '@/lib/api/fetchData';
import { FormAddTasks } from '@/components/FormAddTasks';
import { insertData } from '../lib/api/insertData';
import { type Tasks } from '@/types/tasks';

export default function Home() {
  const [tasks, setTasks] = useState<Tasks[] | null>([]);
  const [title, setTile] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await insertData(title, description);
    setTile('');
    setDescription('');
    refreshTasks();
  };

  const refreshTasks = () => {
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  };

  const handleDelete = async (id: number) => {
    await deleteData(id);
    refreshTasks();
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const handleUpdate = (id: any) => {
    updateData(title, description, id);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTile(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div className="h-full">
      <main>
        <div className="flex flex-wrap justify-center items-top gap-4 mt-10">
          {tasks?.map((item) => {
            return (
              <div key={item.id} className="mb-10">
                <div className="p-4 border-2 rounded-2xl w-xs text-center">{item.title}</div>
                <div className="p-4 border-2 rounded-2xl w-xs text-center">{item.description}</div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="py-2 px-4 text-white rounded-sm bg-red-700 hover:cursor-pointer hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleUpdate(item.id)}
                  className="py-2 px-4 text-white rounded-sm bg-green-700 hover:cursor-pointer hover:bg-green-600"
                >
                  Update
                </button>
              </div>
            );
          })}
        </div>
        <FormAddTasks
          onTitleChange={handleTitleChange}
          onDescriptionChange={handleDescriptionChange}
          onSubmit={handleSubmit}
          title={title}
          description={description}
        />
      </main>
    </div>
  );
}
