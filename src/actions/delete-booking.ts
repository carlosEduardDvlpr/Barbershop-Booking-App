'use server';

import { db } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const deleteBooking = async (id: string) => {
  if (!id) {
    return null;
  }

  await db.booking.delete({
    where: {
      id,
    },
  });

  revalidatePath('/bookings');
};
