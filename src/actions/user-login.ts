'use server';
import { db } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default async function userLogin(email: string, password: string) {
  try {
    const user = await db.user.findUniqueOrThrow({
      where: {
        email: email,
      },
      select: {
        password: true,
        id: true,
      },
    });

    const hash = bcrypt.compareSync(password, user.password);

    if (hash) {
      (await cookies()).set(
        'token',
        jwt.sign({ id: user.id }, process.env.SECRET as string, {
          expiresIn: '4d',
        }),
        {
          httpOnly: true,
          secure: true,
        },
      );
    } else {
      throw new Error('');
    }

    return { success: true, error: '' };
  } catch (error) {
    return { success: false, error: 'Email ou senha inválidos...' };
  }
}
