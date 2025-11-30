import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {I18nextProvider} from 'react-i18next';
import i18n from '../i18n';

export type SupportedLanguage = 'ar' | 'en';

type LocalizationContextValue = {
  language: SupportedLanguage;
  direction: 'rtl' | 'ltr';
  changeLanguage: (nextLanguage: SupportedLanguage) => Promise<void>;
  toggleLanguage: () => Promise<void>;
};

const STORAGE_KEY = '@hotspot/lang';

const LocalizationContext = createContext<
  LocalizationContextValue | undefined
>(undefined);

export const LocalizationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [language, setLanguage] = useState<SupportedLanguage>('ar');

  useEffect(() => {
    const restoreLanguage = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'ar') {
        setLanguage(stored);
        void i18n.changeLanguage(stored);
      }
    };

    restoreLanguage();
  }, []);

  const changeLanguage = useCallback(async (nextLanguage: SupportedLanguage) => {
    setLanguage(nextLanguage);
    await AsyncStorage.setItem(STORAGE_KEY, nextLanguage);
    await i18n.changeLanguage(nextLanguage);
  }, []);

  const toggleLanguage = useCallback(async () => {
    await changeLanguage(language === 'ar' ? 'en' : 'ar');
  }, [changeLanguage, language]);

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  const value = useMemo<LocalizationContextValue>(
    () => ({
      language,
      direction,
      changeLanguage,
      toggleLanguage,
    }),
    [changeLanguage, direction, language, toggleLanguage],
  );

  return (
    <LocalizationContext.Provider value={value}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextValue => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used inside LocalizationProvider');
  }
  return context;
};

