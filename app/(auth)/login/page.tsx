import { LoginForm } from '@/features/auth/components/login-form';
import { OAuthButtons } from '@/features/auth/components/oauth-buttons';

const errorMessages: Record<string, string> = {
  confirmation_failed:
    'That confirmation link is invalid or has expired. Try logging in, or sign up again to get a new link.',
  oauth_failed: 'Sign-in with that provider failed. Please try again.'
};

function getErrorMessage(code: string | undefined): string | null {
  if (!code) return null;
  return errorMessages[code] ?? 'Something went wrong. Please try again.';
}

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;
  const resolvedNext = next ?? '/learn';

  return (
    <div className="space-y-4">
      <LoginForm next={resolvedNext} initialError={getErrorMessage(error)} />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-2 text-gray-500">OR</span>
        </div>
      </div>
      <OAuthButtons next={resolvedNext} />
    </div>
  );
}
