'use client';
import { useRegisterFormModel } from './model';
import { RegisterFormView } from './view';

export function RegisterForm() {
  const registerFormModel = useRegisterFormModel();
  return <RegisterFormView {...registerFormModel} />;
}
