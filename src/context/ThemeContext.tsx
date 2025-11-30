import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors, ColorTheme, DarkColors} from '../styles/theme';

type ThemeContextValue = {
  theme: ColorTheme;
  isDarkMode: boolean;
  toggleTheme: () => Promise<void>;
};

const STORAGE_KEY = '@hotspot/theme';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const restoreTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTheme) {
          setIsDarkMode(storedTheme === 'dark');
        }
      } catch (error) {
        console.warn('Unable to restore theme', error);
      }
    };

    restoreTheme();
  }, []);

  const toggleTheme = useCallback(async () => {
    setIsDarkMode(prev => {
      const next = !prev;
      AsyncStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
      return next;
    });
  }, []);

  const theme = useMemo<ColorTheme>(
    () => (isDarkMode ? DarkColors : Colors),
    [isDarkMode],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      isDarkMode,
      toggleTheme,
    }),
    [isDarkMode, theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return context;
};

