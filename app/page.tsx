'use client';
import { useState, useEffect } from 'react';
import { fetchSmoothies } from '@/lib/api/fetchData';

export default function Home() {
  const [smoothies, setSmoothies] = useState<any[] | null>([]);

  useEffect(() => {
    fetchSmoothies().then(setSmoothies);
  }, []);

  return (
    <div className="h-full">
      <main className="flex gap-4 flex-wrap justify-center items-center">
        {smoothies?.map((item) => {
          return (
            <div key={item.id} className="p-4 border-2 rounded-2xl w-xs text-center">
              {item.title}
            </div>
          );
        })}
      </main>
    </div>
  );
}
