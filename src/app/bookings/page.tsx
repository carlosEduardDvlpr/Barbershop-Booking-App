import { getUser } from '@/actions/user-info';
import { getBookings } from '@/actions/get-bookings';
import { Header } from '@/components/header';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ButtonDelete } from './components/delete-booking-button';
import { BookingDateSelection } from '@/components/booking-date-selection';

export default async function BookingPage() {
  const user = await getUser();
  const bookings = await getBookings();
  console.log(bookings)

  if (!user) {
    redirect('/');
  }

  return (
    <section>
      <Header user={user} />
      <h1 className="sm:px-6 px-4 py-4 text-xl font-bold">
        Meus Agendamentos
      </h1>
      {!bookings[0] && (
        <h2 className="sm:px-6 px-4 pt-2 pb-3">
          Você ainda não possui nenhum agendamento...
        </h2>
      )}
      <div className="sm:px-6 px-4 pb-3">
        <BookingDateSelection user={user} />
      </div>
      {bookings.filter((booking) => booking.date >= new Date())[0] && (
        <h2 className="sm:px-6 px-4 pt-2">Confirmados</h2>
      )}
      <div className="sm:px-6 px-4 py-1 grid md:grid-cols-2 gap-3">
        {bookings.map(
          (booking) =>
            booking.date >= new Date() && (
              <Card className="pt-4" key={booking.id}>
                <CardContent className="flex items-center gap-6 justify-between">
                  <div>
                    <Badge className="mb-2 bg-primary/20 text-primary hover:bg-primary/20">
                      Confirmado
                    </Badge>
                    <h2 className="text-foreground">Agendado para</h2>
                    <CardDescription>
                      {format(booking.date, "dd 'de' MMMM 'ás' HH:mm", {
                        locale: ptBR,
                      })}
                    </CardDescription>
                  </div>

                  <ButtonDelete id={booking.id} />
                </CardContent>
              </Card>
            ),
        )}
      </div>
      {bookings.filter((booking) => booking.date < new Date())[0] && (
        <h2 className="sm:px-6 px-4 pt-4">Finalizados</h2>
      )}
      <div className="sm:px-6 px-4 py-1 grid sm:grid-cols-2 gap-3">
        {bookings.map(
          (booking) =>
            booking.date < new Date() && (
              <Card className="pt-3" key={booking.id}>
                <CardContent className="flex items-center justify-between">
                  <div>
                    <Badge className="hover:bg-secondary mb-2 bg-secondary text-gray-500">
                      Finalizado
                    </Badge>
                    <h2 className="text-foreground">Finalizado em</h2>
                    <CardDescription>
                      {format(booking.date, "dd 'de' MMMM 'ás' HH:mm", {
                        locale: ptBR,
                      })}
                    </CardDescription>
                  </div>

                  <ButtonDelete id={booking.id} />
                </CardContent>
              </Card>
            ),
        )}
      </div>
    </section>
  );
}
