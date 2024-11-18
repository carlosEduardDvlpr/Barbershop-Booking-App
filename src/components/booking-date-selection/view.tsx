import { Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Calendar } from '@/components/ui/calendar';
import React from 'react';
import { BookingDateSelectionProps } from './type';
import { addMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent } from '../ui/card';

export function BookingDateSelectionView(props: BookingDateSelectionProps) {
  return (
    <Sheet onOpenChange={props.setSheetOpen} open={props.sheetOpen}>
      <SheetTrigger asChild>
        <Button>Agendar horário</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-left">Agendamento</SheetTitle>
          <SheetClose asChild className="absolute top-2 right-5">
            <Button variant="outline" size="icon">
              <X size={16} />
            </Button>
          </SheetClose>
        </SheetHeader>
        <Calendar
          mode="single"
          selected={props.date}
          fromDate={new Date()}
          toDate={addMonths(new Date(), 1)}
          locale={ptBR}
          onSelect={props.handleDayClick}
          className="rounded-md border mt-6"
          styles={{
            head_cell: {
              textTransform: 'capitalize',
              width: '100%',
            },
            cell: {
              width: '100%',
            },
            button: {
              width: '100%',
            },
            nav_button_previous: {
              width: '32px',
              height: '32px',
            },
            nav_button_next: {
              width: '32px',
              height: '32px',
            },
            caption: {
              textTransform: 'capitalize',
            },
          }}
        />
        {props.date && (
          <div className="flex gap-3 overflow-auto py-6 px-5 border-y border-solid border-secondary">
            {props.timeList.length === 0 && (
              <p className="text-sm text-gray-300">
                Não há mais horários disponiveis hoje...
              </p>
            )}
            {props.timeList.map((time) => (
              <Button
                variant={time === props.hour ? 'default' : 'outline'}
                className="rounded-full"
                key={time}
                onClick={() => props.handleHourClick(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        )}

        {props.date && props.hour && (
          <Card className="mt-6 pt-3">
            <CardContent>
              <h2>Agendamento</h2>
              <div className="flex mt-2 justify-between">
                <h3 className="text-sm text-gray-200">Data</h3>
                <p className="text-sm text-gray-200">
                  {format(props.date, "dd 'de' MMMM", { locale: ptBR })}
                </p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-sm text-gray-200">Hora</h3>
                <p className="text-sm text-gray-200">{props.hour}</p>
              </div>
            </CardContent>
          </Card>
        )}
        <SheetFooter>
          <Button
            className="w-full mt-5"
            disabled={!props.hour || !props.date || props.loading}
            onClick={props.handleBooking}
          >
            {props.loading && (
              <Loader2 size={16} className="animate-spin mr-2" />
            )}
            Confirmar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
