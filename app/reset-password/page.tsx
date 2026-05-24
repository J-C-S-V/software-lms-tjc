import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form';

export default async function ResetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  // The recovery flow should have created a session. No user means the link
  // was invalid, expired, or someone navigated here directly.
  if (!user) {
    redirect('/forgot-password');
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm border rounded-lg p-6">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
