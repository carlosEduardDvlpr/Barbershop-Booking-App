'use server';
import { db } from '@/lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default async function userRegister(
  name: string,
  email: string,
  password: string,
) {
  const hash = bcrypt.hashSync(password, 12);

  try {
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });
    (await cookies()).set(
      'token',
      jwt.sign({ id: user.id }, process.env.SECRET as string, {
        expiresIn: '4d',
      }),
      {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 4,
        path: '/',
      },
    );

    return { success: true, error: '' };
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return { success: false, error: 'O email já existe!' };
    }
    return { success: false, error: 'Ocorreu um erro, tente novamente...' };
  }
}
