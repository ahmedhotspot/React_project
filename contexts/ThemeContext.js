import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('appTheme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async (newThemeValue = null) => {
    // If a value is provided, use it; otherwise toggle
    const newTheme = newThemeValue !== null 
      ? (newThemeValue ? 'dark' : 'light')
      : (theme === 'light' ? 'dark' : 'light');
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('appTheme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const colors = {
    light: {
      background: '#F5F5F5',
      surface: '#FFFFFF',
      text: '#2C3E50',
      textSecondary: '#7F8C8D',
      border: '#E0E0E0',
      primary: '#E62130',
      error: '#E62130',
    },
    dark: {
      background: '#121212',
      surface: '#1E1E1E',
      text: '#FFFFFF',
      textSecondary: '#B0B0B0',
      border: '#333333',
      primary: '#E62130',
      error: '#E62130',
    },
  };

  // Ensure we always have valid colors, default to light if theme is invalid
  const currentColors = colors[theme] || colors.light;

  return (
    <ThemeContext.Provider
      value={{
        theme: theme || 'light',
        toggleTheme,
        colors: currentColors,
        isDark: theme === 'dark',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

