'use client';
import { useState, useEffect } from 'react';
import { fetchTasks } from '@/lib/api/fetchData';
import { type Tasks } from '@/types/tasks';
import { FormAddTasks } from '@/components/FormAddTasks';
import { deleteData } from '@/lib/api/deleteData';

export default function Home() {
  const [tasks, setTasks] = useState<Tasks[] | null>([]);

  const refreshTasks = () => {
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  };

  const handleDelete = async (id: string) => {
    await deleteData(id);
    refreshTasks();
  };

  useEffect(() => {
    refreshTasks();
  }, []);

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
              </div>
            );
          })}
        </div>
        <FormAddTasks onTaskAdded={refreshTasks} />
      </main>
    </div>
  );
}
