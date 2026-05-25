import { SignupForm } from '@/features/auth/components/signup-form';
import { OAuthButtons } from '@/features/auth/components/oauth-buttons';

export default function SignupPage() {
  return (
    <div className="space-y-4">
      <SignupForm />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-2 text-gray-500">OR</span>
        </div>
      </div>
      <OAuthButtons next="/learn" />
    </div>
  );
}
