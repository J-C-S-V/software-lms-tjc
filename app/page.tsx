'use client';
import { useState, useEffect } from 'react';
import { fetchTasks } from '@/lib/api/fetchData';
import { type Tasks } from '@/types/tasks';
import { FormAddTasks } from '@/components/FormAddTasks';

export default function Home() {
  const [tasks, setTasks] = useState<Tasks[] | null>([]);

  const refreshTasks = () => {
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  return (
    <div className="h-full">
      <main>
        <div className="flex flex-col flex-wrap justify-center items-center">
          {tasks?.map((item) => {
            return (
              <div key={item.id}>
                <div className="p-4 border-2 rounded-2xl w-xs text-center">{item.title}</div>
                <div className="p-4 border-2 rounded-2xl w-xs text-center mb-10">
                  {item.description}
                </div>
              </div>
            );
          })}
        </div>
        <FormAddTasks onTaskAdded={refreshTasks} />
      </main>
    </div>
  );
}
