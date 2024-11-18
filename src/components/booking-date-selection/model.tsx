'use client';

import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '../ui/toast';
import React from 'react';
import { Booking as BookingDays } from '@prisma/client';
import { getDayBookings } from '@/actions/get-day-bookings';
import { format, setHours, setMinutes } from 'date-fns';
import { generateHoursList } from '@/helpers/hours-generator';
import { setBooking } from '@/actions/set-bookings';
import { ptBR } from 'date-fns/locale';
import { redirect } from 'next/navigation';

export function useBookingDateSelectionModel({ user }: { user: { id: string } }) {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>();
  const [hour, setHour] = React.useState<string | undefined>();
  const [dayBookings, setDayBookings] = React.useState<BookingDays[]>([]);

  React.useEffect(() => {
    if (!date) {
      return;
    }

    const refreshAvailableHours = async () => {
      const _dayBookings = await getDayBookings(date);
      setDayBookings(_dayBookings);
    };

    refreshAvailableHours();
  }, [date]);

  const currentHour = format(new Date(), 'HH:mm');
  const timeList = React.useMemo(() => {
    if (!date) {
      return [];
    }

    if (date.toDateString() === new Date().toDateString()) {
      return generateHoursList(new Date())
        .filter((time) => {
          const timeHour = +time.split(':')[0];
          const timeMinutes = +time.split(':')[1];

          const bookings = dayBookings.find((booking) => {
            const bookingHour = booking.date.getHours();
            const bookingMinutes = booking.date.getMinutes();

            return bookingHour === timeHour && bookingMinutes === timeMinutes;
          });
          if (!bookings) {
            return true;
          }
          return false;
        })
        .filter((time) => time > currentHour);
    }

    return generateHoursList(new Date()).filter((time) => {
      const timeHour = +time.split(':')[0];
      const timeMinutes = +time.split(':')[1];

      const bookings = dayBookings.find((booking) => {
        const bookingHour = booking.date.getHours();
        const bookingMinutes = booking.date.getMinutes();

        return bookingHour === timeHour && bookingMinutes === timeMinutes;
      });
      if (!bookings) {
        return true;
      }
      return false;
    });
  }, [date, dayBookings]);

  function handleHourClick(time: string) {
    setHour(time);
  }

  function handleDayClick(date: Date | undefined) {
    setDate(date);
    setHour(undefined);
  }

  const handleBooking = async () => {
    setLoading(true);
    try {
      if (!hour || !date) {
        return;
      }

      const newDate = setMinutes(
        setHours(date, +hour.split(':')[0]),
        +hour.split(':')[1],
      );

      const response = await setBooking(newDate, user.id);
      if (response?.booking) {
        setSheetOpen(false);
        setDate(undefined);
        setHour(undefined);
        toast({
          title: 'Agendamento concluido com sucesso!',
          description: format(newDate, "'Para' dd 'de' MMMM 'às' HH:mm", {
            locale: ptBR,
          }),
          action: (
            <ToastAction
              altText="ver reserva"
              onClick={() => redirect('/bookings')}
            >
              Ver reserva
            </ToastAction>
          ),
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    setSheetOpen,
    sheetOpen,
    date,
    handleDayClick,
    timeList,
    hour,
    handleHourClick,
    loading,
    handleBooking,
  };
}
