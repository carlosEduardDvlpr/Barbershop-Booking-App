'use server';
import { db } from '@/lib/prisma';
import { getUser } from './user-info';

export async function getBookings() {
  const user = await getUser();

  const bookings = await db.booking.findMany({
    where: {
      userId: user?.id,
    },
    select: {
      date: true,
      id: true,
    },
  });

  return bookings;
}
