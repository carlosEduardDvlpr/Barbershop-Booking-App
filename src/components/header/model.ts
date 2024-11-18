'use client';
import userLogout from '@/actions/user-logout';
import React from 'react';

export function useHeaderModel() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = async () => {
    await userLogout();
  };

  return {
    isOpen,
    setIsOpen,
    handleLogout
  };
}
