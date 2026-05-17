import Link from 'next/link';

export default function CheckEmailPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">Check your email</h1>
      <p className="text-sm text-gray-600">
        We sent you a confirmation link. Click it to activate your account and log in.
      </p>
      <p className="text-sm">
        Wrong email?{' '}
        <Link href="/signup" className="text-blue-600">
          Try again
        </Link>
      </p>
    </div>
  );
}
