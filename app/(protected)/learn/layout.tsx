import { Sidebar } from '@/features/dashboard/components/sidebar';

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full bg-zinc-50">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
