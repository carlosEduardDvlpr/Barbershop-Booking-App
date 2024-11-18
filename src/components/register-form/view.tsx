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
import { RegisterFormProps } from './type';

export function RegisterFormView(props: RegisterFormProps) {
  return (
    <Card className="w-full sm:max-w-md max-w-[90%] mx-auto">
      <CardHeader>
        <CardTitle>Registre-se</CardTitle>
        <CardDescription>Informe seus dados e crie uma conta.</CardDescription>
      </CardHeader>
      <form onSubmit={props.handleLoginSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              readOnly={props.loading}
              ref={props.nameRef}
              id="name"
              type="text"
              placeholder="Informe seu nome"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              readOnly={props.loading}
              ref={props.emailRef}
              id="email"
              type="email"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div className="space-y-2 relative">
            <Label htmlFor="password">Senha</Label>
            <Input
              readOnly={props.loading}
              ref={props.passwordRef}
              id="password"
              type="password"
              required
            />

            <EyeIcon
              size={24}
              onClick={props.handleShowPassword}
              className={`absolute bottom-2 right-3`}
            />
          </div>
          <div className="space-y-2 relative">
            <Label htmlFor="confirmedPassword">Confirme a senha</Label>
            <Input
              readOnly={props.loading}
              ref={props.confirmedPasswordRef}
              id="confirmedPassword"
              type="password"
              required
            />

            <EyeIcon
              size={24}
              onClick={props.handleShowConfirmedPassword}
              className={`absolute bottom-2 right-3`}
            />
          </div>
        </CardContent>
        {props.error && (
          <p className="text-base text-red-500 pb-2 pl-6">{props.error}</p>
        )}
        {props.success && (
          <div className="pb-2 pl-6">
            <p className="text-base text-green-500">
              Usuário registrado com sucesso!
            </p>
            <p className="text-sm text-green-500">
              Você será redirecionado para página inicial...
            </p>
          </div>
        )}
        <CardFooter>
          <Button className="w-full" disabled={props.loading}>
            {props.loading && (
              <Loader2 size={16} className="mr-2 animate-spin" />
            )}
            Entrar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
