import userInfo from '@/actions/user-info';
import { Header } from '@/components/header/header';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await userInfo();

  if (!user) {
    redirect('/login');
  }

  return (
    <main className="h-dvh">
      <Header user={user} />
    </main>
  );
}
