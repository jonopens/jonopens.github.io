import { useState } from 'react';

type ThemeName = 'dark' | 'light';

export function useTheme(newTheme: ThemeName) {
  const [theme, setTheme] = useState<ThemeName>('dark');
  
  if (theme !== newTheme) {
    setTheme(newTheme);
  }
  
  return newTheme;
}