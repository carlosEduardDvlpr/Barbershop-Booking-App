export interface RegisterFormProps {
  error: string;
  loading: boolean;
  success: boolean;
  nameRef: React.RefObject<HTMLInputElement>;
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  confirmedPasswordRef: React.RefObject<HTMLInputElement>;
  handleShowPassword: () => void;
  handleShowConfirmedPassword: () => void;
  handleLoginSubmit: (ev: React.FormEvent) => Promise<null | undefined>;
}
