'use server';
import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

interface BookingResponse {
  error?: string;
  booking?: string;
}

export async function setBooking(date: Date, userId: string) {
  if (!date || !userId) {
    return { error: 'missing info' };
  }

  try {
    await db.booking.create({
      data: {
        date,
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
