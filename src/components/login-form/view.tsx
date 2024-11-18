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
import { EyeIcon, Loader2 } from 'lucide-react';
import React from 'react';
import { LoginFormProps } from './type';

export function LoginFormView(props: LoginFormProps) {
  return (
    <Card className="w-full sm:max-w-md max-w-[90%] mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Entre com seu e-mail e senha para acessar sua conta.
        </CardDescription>
      </CardHeader>
      <form onSubmit={props.handleLoginSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              ref={props.emailRef}
              readOnly={props.loading}
              id="email"
              type="email"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div className="space-y-2 relative">
            <Label htmlFor="senha">Senha</Label>
            <Input
              readOnly={props.loading}
              ref={props.passwordRef}
              id="senha"
              type="password"
              required
            />

            <EyeIcon
              size={24}
              onClick={props.handleShowPassword}
              className={`absolute bottom-2 right-3`}
            />
          </div>
          {props.error && (
            <p className="text-red-500 text-base">{props.error}</p>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={props.loading}>
            {props.loading && (
              <Loader2 className="mr-2 animate-spin" size={16} />
            )}
            Entrar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
