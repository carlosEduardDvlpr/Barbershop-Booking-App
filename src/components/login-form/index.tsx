'use client';
import { useLoginFormModel } from './model';
import { LoginFormView } from './view';

export function LoginForm() {
  const loginFormModel = useLoginFormModel();
  return <LoginFormView {...loginFormModel} />;
}
