import { useState } from 'react';

type UiTheme = 'dark' | 'light';
type DarkModeProps = {
  themePreference: UiTheme,
}

export default function DarkMode({ themePreference }: DarkModeProps ) {
  const [_, setTheme] = useState<UiTheme>(themePreference)
  
  return <span onClick={() => setTheme('dark')}></span>
}