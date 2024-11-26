import { getUser } from '@/actions/user-info';
import { Header } from '@/components/header';
import { redirect } from 'next/navigation';
import { ptBR } from 'date-fns/locale';
import { Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { getBookings } from '@/actions/get-bookings';
import { Badge } from '@/components/ui/badge';
import { BookingDateSelection } from '@/components/booking-date-selection';
import { format } from 'date-fns';
import { DateTime } from 'luxon';

export default async function Home() {
  const user = await getUser();
  const bookings = await getBookings();
  const bookingsFilter = bookings.filter(
    (booking) => booking.date > new Date(),
  );
  let localDate;
  if (bookingsFilter.length > 0)
    localDate = DateTime.fromISO(bookingsFilter[0].date.toISOString(), {
      zone: 'UTC',
    }).setZone('America/Sao_Paulo');

  if (!user) {
    redirect('/login');
  }

  return (
    <main>
      <Header user={user} />
      <div className="sm:px-6 px-3 py-6">
        <h1 className="text-xl font-bold pb-2">Olá {user.name}</h1>
        <p className="text-gray-300">Que tal agendar um corte hoje ?</p>
        <p className="text-gray-300 capitalize">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>
      <div className="sm:px-6 px-3">
        {bookingsFilter.length > 0 ? (
          <Card className="pt-2">
            <CardContent className="flex items-center gap-6">
              <Badge className="mb-2 bg-primary/20 text-primary">
                Confirmado
              </Badge>
              <div>
                <h2 className="text-foreground">Ultimo agendamento</h2> 
                <CardDescription>
                  {format(new Date(localDate as unknown as Date), "dd 'de' MMMM 'ás' HH:mm", {
                    locale: ptBR,
                  })}
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        ) : (
          <p className="text-xs">Você não tem nenhuma reserva...</p>
        )}
      </div>
      <div className="sm:px-6 px-3 pt-3 pb-8">
        <BookingDateSelection user={user} />
      </div>
      <hr />
      <div className="sm:px-6 px-3 py-6">
        <h2 className="font-bold mb-1 text-lg">Sobre nós</h2>
        <p className="text-base text-gray-300">Informações de contato</p>
        <div className="flex gap-2 mb-3 items-center">
          <Phone size={16} />
          <p className="text-gray-300 text-base">(11) 999999999</p>
        </div>{' '}
        <div className="flex gap-2">
          <Link href="#">
            <Image src="/whatsapp.png" width={36} height={36} alt="whatsapp" />
          </Link>
          <Link href="#">
            <Image src="/facebook.png" width={36} height={36} alt="facebook" />
          </Link>
        </div>
      </div>
      <hr />
      <div className="sm:px-6 px-3 py-6">
        <h2 className="font-bold mb-3 text-lg">Endereço</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29355.55722798802!2d-46.548240500000034!3d-23.117416850000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cec0d9261ae31d%3A0xfb5e1efecf92c302!2sCentro%2C%20Atibaia%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1731097001979!5m2!1spt-BR!2sbr"
          style={{ border: 0, height: '200px', width: '100%' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <p className="mt-2 text-sm text-gray-300">
          Rua da Barbearia, número 999 - Bairro Berbearia
        </p>
      </div>
    </main>
  );
}
