'use client';
import { useState, useEffect } from 'react';
import { fetchSmoothies } from '@/lib/api/fetchData';
import { type Smoothies } from '@/types/smoothies';
import { FormAddSmoothie } from '@/components/FormAddSmoothie';

export default function Home() {
  const [smoothies, setSmoothies] = useState<Smoothies[] | null>([]);

  useEffect(() => {
    fetchSmoothies()
      .then((data) => setSmoothies(data))
      .catch((error) => {
        console.error('Error fetching smoothies:', error);
      });
  }, []);

  return (
    <div className="h-full">
      <main>
        <div className="flex gap-4 flex-wrap justify-center items-center">
          {smoothies?.map((item) => {
            return (
              <div key={item.id} className="p-4 border-2 rounded-2xl w-xs text-center">
                {item.title}
              </div>
            );
          })}
        </div>
        <FormAddSmoothie />
      </main>
    </div>
  );
}
