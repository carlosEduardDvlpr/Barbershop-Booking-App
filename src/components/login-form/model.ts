'use client';
import userLogin from '@/actions/user-login';
import { redirect } from 'next/navigation';
import React from 'react';

export function useLoginFormModel() {
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const passwordRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);

  const handleShowPassword = () => {
    if (passwordRef.current) {
      passwordRef.current.type === 'password'
        ? (passwordRef.current.type = 'text')
        : (passwordRef.current.type = 'password');
    }
  };

  const handleLoginSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError('');
    setLoading(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      return setError('Informe todos os dados!');
    }

    const resultLogin = await userLogin(email, password);
    if (resultLogin.error) {
      setError(resultLogin.error);
      setLoading(false);
    } else {
      redirect('/');
    }
  };

  return {
    error,
    loading,
    passwordRef,
    emailRef,
    handleShowPassword,
    handleLoginSubmit,
  };
}
