'use client';

import { createContext, useContext } from 'react';

export const MenuContext = createContext<() => void>(() => {});
export const useMenuToggle = () => useContext(MenuContext);
