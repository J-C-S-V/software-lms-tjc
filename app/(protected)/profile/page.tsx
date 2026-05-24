import { createClient } from '@/lib/supabase/server';
import { UpdateProfileForm } from '@/features/profile/components/update-profile-form';

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, created_at')
    .eq('id', user!.id)
    .single();

  return (
    <div className="w-full space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <section className="border rounded p-4 text-sm space-y-1">
        <h2 className="font-semibold mb-2">Account</h2>
        <p>
          <strong>Email:</strong> {user!.email}
        </p>
        <p>
          <strong>User ID:</strong> {user!.id}
        </p>
      </section>

      <section className="border rounded p-4 space-y-3">
        <h2 className="font-semibold">Profile</h2>
        <p className="text-sm text-gray-600">
          Display name: {profile?.display_name ?? <em className="text-gray-400">(not set)</em>}
        </p>
        <UpdateProfileForm currentDisplayName={profile?.display_name ?? ''} />
      </section>
    </div>
  );
}
