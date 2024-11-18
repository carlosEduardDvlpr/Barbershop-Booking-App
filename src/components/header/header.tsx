'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, HomeIcon, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import userLogout from '@/actions/user-logout';

export function Header({ user }: { user: { name: string; email: string } }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await userLogout();
  };

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6 sm:py-3 px-3">
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
            <Button onClick={handleLogout}>
              <LogOut size={16} />
              Sair
            </Button>
          </nav>
        </div>
        <div className="sm:hidden">
          <div className=" w-full justify-between flex-1 md:w-auto md:flex-none">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetTitle>Menu</SheetTitle>
                <div className="my-8">
                  <h1 className="text-xl font-bold">Olá {user.name}</h1>
                  <p className="text-sm text-gray-400">{user.email}</p>
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

                <Button className="w-full" onClick={handleLogout}>
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
