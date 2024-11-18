import Link from 'next/link';
import { HeaderProps } from './type';
import { Calendar, HomeIcon, LogOut, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';

export function HeaderView(props: HeaderProps) {
  return (
    <header className="w-full border-b bg-card sm:px-6 sm:py-3 px-3">
      <div className="w-full flex justify-between h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Barbearia [nome]</span>
        </Link>
        <div className="mr-4 hidden md:flex">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <ul className="flex gap-4">
              <li>
                <Link href="/" className="flex items-center gap-2">
                  <HomeIcon size={16} /> Inicio
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="flex items-center gap-2">
                  <Calendar size={16} /> Meus agendamentos
                </Link>
              </li>
            </ul>
            <Button onClick={props.handleLogout}>
              <LogOut size={16} />
              Sair
            </Button>
          </nav>
        </div>
        <div className="sm:hidden">
          <div className=" w-full justify-between flex-1 md:w-auto md:flex-none">
            <Sheet open={props.isOpen} onOpenChange={props.setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetTitle>Menu</SheetTitle>
                <SheetClose asChild className="absolute top-4 right-5">
                  <Button variant="outline" size="icon">
                    <X size={16} />
                  </Button>
                </SheetClose>
                <div className="my-8">
                  <h1 className="text-xl font-bold">Olá {props.user?.name}</h1>
                  <p className="text-sm text-gray-400">{props.user?.email}</p>
                </div>

                <nav className="flex mb-8 flex-col space-y-4">
                  <ul className="flex flex-col gap-2">
                    <li>
                      <Link href="/" className="flex items-center gap-2">
                        <HomeIcon size={16} /> Inicio
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/bookings"
                        className="flex items-center gap-2"
                      >
                        <Calendar size={16} /> Meus agendamentos
                      </Link>
                    </li>
                  </ul>
                </nav>

                <Button className="w-full" onClick={props.handleLogout}>
                  <LogOut size={16} />
                  Sair
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
