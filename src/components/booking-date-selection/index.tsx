'use client';
import { useBookingDateSelectionModel } from './model';
import { BookingDateSelectionView } from './view';

export function BookingDateSelection(user: {user: {id: string}}) {
  const bookingDateSelectionModel = useBookingDateSelectionModel(user);
  return <BookingDateSelectionView {...bookingDateSelectionModel} />;
}
