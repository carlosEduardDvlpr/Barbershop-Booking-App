'use client';
import userRegister from '@/actions/user-register';
import verifyDataLogin from '@/helpers/verify-data-login';
import { redirect } from 'next/navigation';
import React from 'react';

export function useRegisterFormModel() {
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const confirmedPasswordRef = React.useRef<HTMLInputElement>(null);

  const handleShowPassword = () => {
    if (passwordRef.current) {
      passwordRef.current.type === 'password'
        ? (passwordRef.current.type = 'text')
        : (passwordRef.current.type = 'password');
    }
  };

  const handleShowConfirmedPassword = () => {
    if (confirmedPasswordRef.current) {
      confirmedPasswordRef.current.type === 'password'
        ? (confirmedPasswordRef.current.type = 'text')
        : (confirmedPasswordRef.current.type = 'password');
    }
  };

  const handleLoginSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmedPassword = confirmedPasswordRef.current?.value;

    if (!name || !email || !password || !confirmedPassword) {
      setError('Preencha todos os dados!');
      setLoading(false);
      return null;
    }

    const result = verifyDataLogin(name, email, password, confirmedPassword);
    if (result !== 'success') {
      setError(result);
      setLoading(false);
    } else {
      const register = await userRegister(name, email, password);
      if (register.success) {
        setSuccess(true);
        setTimeout(() => redirect('/'), 1000);
      }
      if (!register.success) {
        setError(register.error);
        setLoading(false);
      }
    }
  };

  return {
    error,
    loading,
    success,
    nameRef,
    emailRef,
    passwordRef,
    confirmedPasswordRef,
    handleShowPassword,
    handleShowConfirmedPassword,
    handleLoginSubmit,
  };
}
