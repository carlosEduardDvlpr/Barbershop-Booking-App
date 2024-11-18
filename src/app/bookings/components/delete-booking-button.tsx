'use client';
import { deleteBooking } from '@/actions/delete-booking';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';

export function ButtonDelete({ id }: { id: string }) {
  const { toast } = useToast();
  async function handleDeleteBooking() {
    try {
      await deleteBooking(id);
      toast({ description: 'Agendamento cancelado...' });
    } catch (err) {
      toast({ description: 'ocorreu um erro ao cancelar horário...' });
    }
  }

  return (
    <Button onClick={handleDeleteBooking} variant="ghost" size="icon">
      <Trash2 />
    </Button>
  );
}
