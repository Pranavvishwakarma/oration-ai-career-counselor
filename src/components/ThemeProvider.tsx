'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type ThemeVariant = 'default' | 'purple';

interface ThemeContextType {
  theme: Theme;
  variant: ThemeVariant;
  toggleTheme: () => void;
  setVariant: (variant: ThemeVariant) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [variant, setVariant] = useState<ThemeVariant>('default');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedVariant = localStorage.getItem('theme-variant') as ThemeVariant;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedVariant) setVariant(savedVariant);
    
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'theme-default', 'theme-purple');
    
    // Add current theme classes
    root.classList.add(theme, `theme-${variant}`);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('theme-variant', variant);
  }, [theme, variant, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleSetVariant = (newVariant: ThemeVariant) => {
    setVariant(newVariant);
  };

  // Always provide the context, but include mounted state
  return (
    <ThemeContext.Provider value={{
      theme,
      variant,
      toggleTheme,
      setVariant: handleSetVariant,
      mounted
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}