import React, { createContext, useContext, useState } from 'react';
import ar from './ar';
import en from './en';

const translations = {
  ar,
  en,
};

// Create Language Context
const LanguageContext = createContext();

// Language Provider Component
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('ar');

  const setLanguage = (lang) => {
    if (translations[lang]) {
      setCurrentLanguage(lang);
    }
  };

  const getLanguage = () => {
    return currentLanguage;
  };

  const isRTL = () => {
    return currentLanguage === 'ar';
  };

  const getTextAlign = () => {
    return currentLanguage === 'ar' ? 'right' : 'left';
  };

  const getFlexDirection = () => {
    return currentLanguage === 'ar' ? 'row-reverse' : 'row';
  };

  const getAlignItems = (defaultAlign = 'flex-start') => {
    if (defaultAlign === 'flex-end') {
      return currentLanguage === 'ar' ? 'flex-end' : 'flex-start';
    }
    if (defaultAlign === 'flex-start') {
      return currentLanguage === 'ar' ? 'flex-start' : 'flex-end';
    }
    return defaultAlign;
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // Fallback to Arabic if key not found
        value = translations.ar;
        for (const k2 of keys) {
          if (value && value[k2]) {
            value = value[k2];
          } else {
            return key; // Return key if translation not found
          }
        }
        break;
      }
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      setLanguage, 
      getLanguage, 
      t, 
      isRTL, 
      getTextAlign, 
      getFlexDirection, 
      getAlignItems 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

// Export t function for backward compatibility (will use default language)
export const t = (key) => {
  const keys = key.split('.');
  let value = translations['ar']; // Default to Arabic
  
  for (const k of keys) {
    if (value && value[k]) {
      value = value[k];
    } else {
      return key;
    }
  }
  
  return value || key;
};

export default {
  LanguageProvider,
  useLanguage,
  t,
};

