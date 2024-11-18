export interface HeaderProps {
  handleLogout: () => Promise<void>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  user?: {
    name: string;
    email: string;
  };
}
