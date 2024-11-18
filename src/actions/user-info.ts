'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/prisma';

export async function getUser() {
  const token = (await cookies()).get('token')?.value;
  const currentTime = Math.floor(Date.now() / 1000);
  const decode = token && jwt.decode(token);

  if (!token) {
    return undefined;
  }

  if (decode instanceof Object && decode.exp && decode.exp < currentTime) {
    return undefined;
  }

  if (decode instanceof Object && decode.exp && decode.exp > currentTime) {
    const user = await db.user.findMany({
      select: {
        email: true,
        name: true,
        id: true,
      },
      where: {
        id: decode.id,
      },
    });

    return user[0];
  }
}
