import { signOut } from './(auth)/actions';

export function LogoutButton() {
  return (
    <form action={signOut}>
      <button type="submit" className="px-3 py-1 bg-red-600 text-white rounded text-sm">
        Log out
      </button>
    </form>
  );
}
