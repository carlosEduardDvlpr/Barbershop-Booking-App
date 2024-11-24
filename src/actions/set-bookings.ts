'use server';
import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function setBooking(date: Date, userId: string) {
  if (!date || !userId) {
    return { error: 'missing info' };
  }

  try {
    await db.booking.create({
      data: {
        date: new Date(date),
        userId,
      },
    });

    revalidatePath('/');
    return { booking: 'success' };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
}
