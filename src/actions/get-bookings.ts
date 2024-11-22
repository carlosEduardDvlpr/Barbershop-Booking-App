'use server';
import { db } from '@/lib/prisma';
import { getUser } from './user-info';

export async function getBookings() {
  const user = await getUser();
  const userId = user?.id;

  const bookings = await db.booking.findMany({
    where: {
      userId,
    },
    select: {
      date: true,
      id: true,
    },
  });

  return bookings;
}
