'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon } from 'lucide-react';
import React from 'react';

export function LoginForm() {
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);

  const handleShowPassword = () => {
    if (passwordRef.current) {
      passwordRef.current.type === 'password'
        ? (passwordRef.current.type = 'text')
        : (passwordRef.current.type = 'password');
    }
  };

  const handleLoginSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
  };

  return (
    <Card className="w-full sm:max-w-md max-w-[90%] mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Entre com seu e-mail e senha para acessar sua conta.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleLoginSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              ref={emailRef}
              id="email"
              type="email"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div className="space-y-2 relative">
            <Label htmlFor="senha">Senha</Label>
            <Input ref={passwordRef} id="senha" type="password" required />

            <EyeIcon
              size={24}
              onClick={handleShowPassword}
              className={`absolute bottom-2 right-3`}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Entrar</Button>
        </CardFooter>{' '}
      </form>
    </Card>
  );
}
