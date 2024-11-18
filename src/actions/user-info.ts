'use server';
import { db } from '@/lib/prisma';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export default async function userInfo() {
  const token = (await cookies()).get('token')?.value as string;
  const decode = jwt.decode(token) as { id: string };

  const user = await db.user.findMany({
    where: {
      id: decode.id,
    },
    select: {
      name: true,
      email: true,
    },
  });

  return user[0];
}
