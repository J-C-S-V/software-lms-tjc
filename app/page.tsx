'use client';
import { useState, useRef, useEffect } from 'react';
import { updateData } from '@/lib/api/updateData';
import { deleteData } from '@/lib/api/deleteData';
import { fetchTasks } from '@/lib/api/fetchData';
import { insertData } from '@/lib/api/insertData';
import { FormAddTasks } from '@/components/FormAddTasks';
import { type Tasks } from '@/types/tasks';

export default function Home() {
  const [tasks, setTasks] = useState<Tasks[] | null>([]);
  const [title, setTile] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [originalTitle, setOriginalTitle] = useState('');
  const spanRef = useRef<HTMLSpanElement | null>(null);

  const refreshTasks = () => {
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  // focus the span as soon as it becomes editable
  useEffect(() => {
    if (editingId !== null && spanRef.current) {
      spanRef.current.focus();
    }
  }, [editingId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await insertData(title, description);
    setTile('');
    setDescription('');
    refreshTasks();
  };

  const handleUpdate = (id: number, currentTitle: string) => {
    setEditingId(id);
    setOriginalTitle(currentTitle); // remember original so cancel can restore it
  };

  const handleDelete = async (id: number) => {
    await deleteData(id);
    refreshTasks();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTile(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSave = async (id: number, currentDescription: string) => {
    const newTitle = spanRef.current?.innerText || '';
    await updateData(newTitle, currentDescription, id);
    setEditingId(null);
    refreshTasks();
  };

  const handleCancel = () => {
    if (spanRef.current) {
      spanRef.current.innerText = originalTitle; // restore original
    }
    setEditingId(null);
  };

  const handleKey = (e: any, id: number, currentDescription: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave(id, currentDescription);
    }
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <div className="h-full">
      <main>
        <div className="flex flex-wrap justify-center items-top gap-4 mt-10">
          {tasks?.map((item) => {
            const isEditingThis = editingId === item.id;
            return (
              <div key={item.id} className="mb-10">
                <span
                  ref={isEditingThis ? spanRef : null}
                  onKeyDown={(e) => handleKey(e, item.id, item.description)}
                  suppressContentEditableWarning
                  contentEditable={isEditingThis}
                  className="p-4 border-2 rounded-2xl w-xs text-center"
                >
                  {item.title}
                </span>
                <span className="p-4 border-2 rounded-2xl w-xs text-center">
                  {item.description}
                </span>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="py-2 px-4 text-white rounded-sm bg-red-700 hover:cursor-pointer hover:bg-red-600"
                >
                  Delete
                </button>
                {isEditingThis ? (
                  <>
                    <button onClick={() => handleSave(item.id, item.description)}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <button
                    onClick={() => handleUpdate(item.id, item.title)}
                    className="py-2 px-4 text-white rounded-sm bg-green-700 hover:cursor-pointer hover:bg-green-600"
                  >
                    Update
                  </button>
                )}
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
