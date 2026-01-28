import React, { useState } from 'react';
import { View, Platform, I18nManager } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import VerifyCodeScreen from './screens/VerifyCodeScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import EligibilityScreen from './screens/EligibilityScreen';
import ApplicationFormScreen from './screens/ApplicationFormScreen';
import SubProductScreen from './screens/SubProductScreen';
import AmountDurationScreen from './screens/AmountDurationScreen';
import OffersScreen from './screens/OffersScreen';
import FinanceRequestsScreen from './screens/FinanceRequestsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import TicketsScreen from './screens/TicketsScreen';
import ContactScreen from './screens/ContactScreen';
import ApplicationSuccessScreen from './screens/ApplicationSuccessScreen';
import NaifVerificationScreen from './screens/NaifVerificationScreen';
import { styles } from './styles/App.styles';
import { LanguageProvider, useLanguage } from './locales';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import LanguageSwitcher from './components/LanguageSwitcher';
  
const AppContent = () => {
  const { isRTL } = useLanguage();
  const { colors, isDark } = useTheme();
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login', 'register', 'forgotPassword', 'verifyCode', 'resetPassword', 'home', 'profile', 'settings', 'eligibility', 'applicationForm', 'financeRequests', 'notifications', 'tickets', 'contact', 'applicationSuccess', 'naifVerification'
  const [screenKey, setScreenKey] = useState(0); // Key to force re-render
  const [applicationNumber, setApplicationNumber] = useState('');
  const [verifyCodeType, setVerifyCodeType] = useState('registration'); // 'registration', 'resetPassword', 'application'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('jorie');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isRegistrationVerify, setIsRegistrationVerify] = useState(false);

  // Update RTL/LTR direction when language changes
  React.useEffect(() => {
    const rtl = isRTL();
    if (Platform.OS === 'android') {
      I18nManager.forceRTL(rtl);
      I18nManager.swapLeftAndRightInRTL(rtl);
    }
  }, [isRTL]);

  // Force re-render when screen changes
  React.useEffect(() => {
    // This ensures components re-render when currentScreen changes
  }, [currentScreen, screenKey]);

  const navigateToRegister = () => {
    setCurrentScreen('register');
  };

  const navigateToLogin = () => {
    setCurrentScreen('login');
  };

  const navigateToForgotPassword = () => {
    setCurrentScreen('forgotPassword');
  };

  const navigateToVerifyCode = (phone, isRegistration = false) => {
    setPhoneNumber(phone);
    setIsRegistrationVerify(isRegistration);
    setCurrentScreen('verifyCode');
  };

  const navigateToApplicationSuccess = () => {
    setCurrentScreen('applicationSuccess');
  };

  const navigateBackToForgotPassword = () => {
    setCurrentScreen('forgotPassword');
  };

  const navigateToResetPassword = () => {
    console.log('Navigating to resetPassword screen');
    setCurrentScreen('resetPassword');
  };

  const navigateBackToVerifyCode = () => {
    setCurrentScreen('verifyCode');
  };

  const navigateToHome = (userName = 'jorie') => {
    setUsername(userName);
    setCurrentScreen('home');
    setScreenKey(prev => prev + 1);
  };

  const navigateToEligibility = (product) => {
    setSelectedProduct(product);
    setCurrentScreen('eligibility');
  };

  const navigateBackToHome = () => {
    setCurrentScreen('home');
    setSelectedProduct(null);
    setScreenKey(prev => prev + 1);
  };

  const navigateToProfile = () => {
    setCurrentScreen('profile');
    setScreenKey(prev => prev + 1);
  };

  const navigateBackFromProfile = () => {
    setCurrentScreen('home');
    setScreenKey(prev => prev + 1);
  };

  const navigateToSettings = () => {
    setCurrentScreen('settings');
    setScreenKey(prev => prev + 1);
  };

  const navigateBackFromSettings = () => {
    setCurrentScreen('home');
    setScreenKey(prev => prev + 1);
  };

  const navigateToFinanceRequests = () => {
    setCurrentScreen('financeRequests');
    setScreenKey(prev => prev + 1);
  };

  const navigateBackFromFinanceRequests = () => {
    setCurrentScreen('home');
    setScreenKey(prev => prev + 1);
  };

  const navigateToNotifications = () => {
    setCurrentScreen('notifications');
    setScreenKey(prev => prev + 1);
  };

  const navigateBackFromNotifications = () => {
    setCurrentScreen('home');
    setScreenKey(prev => prev + 1);
  };

  const navigateToTickets = () => {
    setCurrentScreen('tickets');
    setScreenKey(prev => prev + 1);
  };

  const navigateBackFromTickets = () => {
    setCurrentScreen('home');
    setScreenKey(prev => prev + 1);
  };

  const navigateToContact = () => {
    setCurrentScreen('contact');
    setScreenKey(prev => prev + 1);
  };

  const navigateBackFromContact = () => {
    setCurrentScreen('home');
    setScreenKey(prev => prev + 1);
  };

  const [savedFormData, setSavedFormData] = useState(null);

  const navigateToApplicationForm = (product, savedData = null) => {
    setSelectedProduct(product);
    setSavedFormData(savedData); // Store saved data to pass to ApplicationFormScreen
    setCurrentScreen('applicationForm');
  };

  const navigateBackToEligibility = () => {
    setCurrentScreen('eligibility');
  };

  const [returnToReviewStep, setReturnToReviewStep] = useState(false);

  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
    // Clear saved form data after submission
    setSavedFormData(null);
    // Here you would typically send the form data to your backend
    // After successful submission, navigate to sub-products if personal finance, otherwise home
    if (selectedProduct?.id === 2) {
      // Personal Finance - navigate to sub-products
      setReturnToReviewStep(false);
      setCurrentScreen('subProduct');
    } else {
      setCurrentScreen('home');
    }
  };

  const navigateToSubProduct = (productWithSubProduct) => {
    // Navigate to amount and duration screen
    setSelectedProduct(productWithSubProduct);
    setCurrentScreen('amountDuration');
  };

  const navigateToAmountDuration = (product) => {
    setSelectedProduct(product);
    setCurrentScreen('amountDuration');
  };

  const handleAmountDurationSubmit = (data) => {
    console.log('Amount and duration submitted:', data);
    // Navigate to offers screen
    setSelectedProduct(data);
    setCurrentScreen('offers');
  };

  const handleOfferApply = (data) => {
    console.log('Offer applied:', data);
    // Generate application number (in real app, this would come from API)
    const appNumber = 'APP-' + Date.now().toString().slice(-8);
    setApplicationNumber(appNumber);
    // Navigate to Naif verification screen
    setCurrentScreen('naifVerification');
  };

  const navigateBackToAmountDuration = () => {
    setCurrentScreen('amountDuration');
  };

  const navigateBackToOffers = () => {
    setCurrentScreen('offers');
  };

  const navigateBackToSubProduct = () => {
    setCurrentScreen('subProduct');
  };

  const navigateBackToApplicationForm = () => {
    // Return to application form at review step (step 4)
    setReturnToReviewStep(true);
    setCurrentScreen('applicationForm');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
    // يمكن إضافة منطق إضافي لتسجيل الخروج هنا (مثل مسح البيانات المحلية)
  };
  
  return (
    <View style={[styles.appContainer, { direction: isRTL() ? 'rtl' : 'ltr', backgroundColor: colors?.background || '#F5F5F5' }]}>
      {currentScreen !== 'home' && currentScreen !== 'profile' && currentScreen !== 'settings' && currentScreen !== 'eligibility' && currentScreen !== 'applicationForm' && currentScreen !== 'subProduct' && currentScreen !== 'amountDuration' && currentScreen !== 'offers' && currentScreen !== 'financeRequests' && currentScreen !== 'notifications' && currentScreen !== 'tickets' && currentScreen !== 'contact' && <LanguageSwitcher />}
      {currentScreen === 'login' ? (
        <LoginScreen 
          key={`login-${screenKey}`}
          onNavigateToRegister={navigateToRegister}
          onNavigateToForgotPassword={navigateToForgotPassword}
          onNavigateToHome={navigateToHome}
        />
      ) : currentScreen === 'register' ? (
        <RegistrationScreen 
          key={`register-${screenKey}`}
          onNavigateToLogin={navigateToLogin}
          onNavigateToHome={navigateToHome}
          onNavigateToVerify={(phone) => navigateToVerifyCode(phone, true)}
        />
      ) : currentScreen === 'forgotPassword' ? (
        <ForgotPasswordScreen 
          key={`forgotPassword-${screenKey}`}
          onNavigateBack={navigateToLogin}
          onNavigateToVerify={(phone) => navigateToVerifyCode(phone, false)}
        />
      ) : currentScreen === 'verifyCode' ? (
        <VerifyCodeScreen 
          key={`verifyCode-${screenKey}`}
          onNavigateBack={verifyCodeType === 'application' ? navigateBackToOffers : (isRegistrationVerify ? navigateToRegister : navigateBackToForgotPassword)}
          phoneNumber={phoneNumber}
          onNavigateToResetPassword={navigateToResetPassword}
          onNavigateToHome={navigateToHome}
          onNavigateToSuccess={navigateToApplicationSuccess}
          isRegistration={isRegistrationVerify}
          verifyType={verifyCodeType}
        />
      ) : currentScreen === 'resetPassword' ? (
        <ResetPasswordScreen 
          key={`resetPassword-${screenKey}`}
          onNavigateBack={navigateBackToVerifyCode}
        />
      ) : currentScreen === 'profile' ? (
        <ProfileScreen 
          key={`profile-${screenKey}`}
          username={username}
          onNavigateBack={navigateBackFromProfile}
          onLogout={handleLogout}
        />
      ) : currentScreen === 'settings' ? (
        <SettingsScreen 
          key={`settings-${screenKey}`}
          onNavigateBack={navigateBackFromSettings}
          onLogout={handleLogout}
        />
      ) : currentScreen === 'eligibility' ? (
        <EligibilityScreen 
          key={`eligibility-${screenKey}`}
          onNavigateBack={navigateBackToHome}
          product={selectedProduct}
          onLogout={handleLogout}
          onContinue={navigateToApplicationForm}
        />
      ) : currentScreen === 'applicationForm' ? (
        <ApplicationFormScreen 
          key={`applicationForm-${screenKey}`}
          onNavigateBack={navigateBackToEligibility}
          product={selectedProduct}
          onLogout={handleLogout}
          onSubmit={handleFormSubmit}
          savedData={savedFormData}
          returnToReviewStep={returnToReviewStep}
          onReturnToReviewStepComplete={() => setReturnToReviewStep(false)}
        />
      ) : currentScreen === 'subProduct' ? (
        <SubProductScreen 
          key={`subProduct-${screenKey}`}
          onNavigateBack={navigateBackToApplicationForm}
          product={selectedProduct}
          onLogout={handleLogout}
          onContinue={navigateToSubProduct}
        />
      ) : currentScreen === 'amountDuration' ? (
        <AmountDurationScreen 
          key={`amountDuration-${screenKey}`}
          onNavigateBack={navigateBackToSubProduct}
          product={selectedProduct}
          onLogout={handleLogout}
          onSubmit={handleAmountDurationSubmit}
        />
      ) : currentScreen === 'offers' ? (
        <OffersScreen 
          key={`offers-${screenKey}`}
          onNavigateBack={navigateBackToAmountDuration}
          product={selectedProduct}
          onLogout={handleLogout}
          onApply={handleOfferApply}
        />
      ) : currentScreen === 'financeRequests' ? (
        <FinanceRequestsScreen 
          key={`financeRequests-${screenKey}`}
          onLogout={handleLogout}
          onNavigateToProfile={navigateToProfile}
          onNavigateToSettings={navigateToSettings}
          onNavigateToHome={navigateToHome}
          onNavigateToFinanceRequests={navigateToFinanceRequests}
          onNavigateToNotifications={navigateToNotifications}
          onNavigateToTickets={navigateToTickets}
          onNavigateToContact={navigateToContact}
        />
      ) : currentScreen === 'notifications' ? (
        <NotificationsScreen 
          key={`notifications-${screenKey}`}
          onLogout={handleLogout}
          onNavigateToProfile={navigateToProfile}
          onNavigateToSettings={navigateToSettings}
          onNavigateToHome={navigateToHome}
          onNavigateToFinanceRequests={navigateToFinanceRequests}
          onNavigateToNotifications={navigateToNotifications}
          onNavigateToTickets={navigateToTickets}
          onNavigateToContact={navigateToContact}
        />
      ) : currentScreen === 'tickets' ? (
        <TicketsScreen 
          key={`tickets-${screenKey}`}
          onLogout={handleLogout}
          onNavigateToProfile={navigateToProfile}
          onNavigateToSettings={navigateToSettings}
          onNavigateToHome={navigateToHome}
          onNavigateToFinanceRequests={navigateToFinanceRequests}
          onNavigateToNotifications={navigateToNotifications}
          onNavigateToTickets={navigateToTickets}
          onNavigateToContact={navigateToContact}
        />
      ) : currentScreen === 'contact' ? (
        <ContactScreen 
          key={`contact-${screenKey}`}
          onLogout={handleLogout}
          onNavigateToProfile={navigateToProfile}
          onNavigateToSettings={navigateToSettings}
          onNavigateToHome={navigateToHome}
          onNavigateToFinanceRequests={navigateToFinanceRequests}
          onNavigateToNotifications={navigateToNotifications}
          onNavigateToTickets={navigateToTickets}
          onNavigateToContact={navigateToContact}
        />
      ) : currentScreen === 'naifVerification' ? (
        <NaifVerificationScreen 
          key={`naifVerification-${screenKey}`}
          onNavigateBack={navigateBackToOffers}
          onNavigateToSuccess={navigateToApplicationSuccess}
        />
      ) : currentScreen === 'applicationSuccess' ? (
        <ApplicationSuccessScreen 
          key={`applicationSuccess-${screenKey}`}
          onNavigateToHome={navigateToHome}
          applicationNumber={applicationNumber || 'APP-' + Date.now().toString().slice(-8)}
        />
      ) : (
        <HomeScreen 
          key={`home-${screenKey}`}
          username={username} 
          onLogout={handleLogout}
          onNavigateToEligibility={navigateToEligibility}
          onNavigateToProfile={navigateToProfile}
          onNavigateToSettings={navigateToSettings}
          onNavigateToFinanceRequests={navigateToFinanceRequests}
          onNavigateToNotifications={navigateToNotifications}
          onNavigateToTickets={navigateToTickets}
          onNavigateToContact={navigateToContact}
        />
      )}
    </View>
  );
};

export default function App() {
  console.log('App component rendered - Platform:', Platform.OS);
  
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  );
}
