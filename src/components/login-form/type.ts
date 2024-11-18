export interface LoginFormProps {
  error: string;
  loading: boolean;
  passwordRef: React.RefObject<HTMLInputElement>;
  emailRef: React.RefObject<HTMLInputElement>;
  handleShowPassword: () => void;
  handleLoginSubmit: (ev: React.FormEvent) => Promise<null | undefined>;
}