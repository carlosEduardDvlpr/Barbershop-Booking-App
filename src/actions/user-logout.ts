'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function userLogout() {
  (await cookies()).delete('token');
  redirect("/")
}
