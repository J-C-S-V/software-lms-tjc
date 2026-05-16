import { createClient } from '@/lib/supabase/server';
import { AuthForm } from '@/app/auth-form';
import { LogoutButton } from '@/app/logout-button';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <main className="p-8 max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Logged in</h1>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>User ID:</strong> {user.id}
        </p>
        <LogoutButton />
      </main>
    );
  }

  return (
    <main className="p-8 max-w-md space-y-4">
      <h1 className="text-2xl font-bold">Auth demo</h1>
      <AuthForm />
    </main>
  );
}
