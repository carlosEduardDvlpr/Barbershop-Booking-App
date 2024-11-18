'use client';
import { useHeaderModel } from './model';
import { HeaderView } from './view';

export function Header({ user }: { user: { name: string; email: string } }) {
  const headerModel = useHeaderModel();
  return <HeaderView user={user} {...headerModel} />;
}
