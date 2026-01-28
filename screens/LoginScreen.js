import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { faAddressCard, faLockKeyhole, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { styles } from '../styles/LoginScreen.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';

const LoginScreen = ({ onNavigateToRegister, onNavigateToForgotPassword, onNavigateToHome }) => {
  console.log('LoginScreen component rendered - Platform:', Platform.OS);
  const { t, getTextAlign } = useLanguage();
  const { colors, isDark } = useTheme();
  const textAlign = getTextAlign();
  
  const [nationalId, setNationalId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [nationalIdError, setNationalIdError] = useState('');

  // Validate and handle national ID input
  const handleNationalIdChange = (text) => {
    // Remove any non-numeric characters
    const numericText = text.replace(/[^0-9]/g, '');
    
    // Limit to 10 digits
    if (numericText.length <= 10) {
      setNationalId(numericText);
      setNationalIdError('');
    }
  };

  const validateNationalId = () => {
    if (nationalId.length !== 10) {
      setNationalIdError(t('login.nationalIdError'));
      return false;
    }
    setNationalIdError('');
    return true;
  };

  const handleLogin = () => {
    // Validate national ID
    if (!validateNationalId()) {
      return; // Stop if validation fails
    }
    
    // If validation passes, navigate to home
    console.log('تسجيل الدخول:', { nationalId, password });
    if (onNavigateToHome) {
      onNavigateToHome('jorie'); // You can get the actual username from your auth system
    } else {
      console.error('onNavigateToHome is not defined!');
    }
  };

  const handleForgotPassword = () => {
    if (onNavigateToForgotPassword) {
      onNavigateToForgotPassword();
    }
  };

  const renderContent = () => (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {/* Header with Logo */}
      <View style={styles.header}>
        <Logo width={200} height={70} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={[styles.instructionText, { textAlign, color: colors?.textSecondary || '#7F8C8D' }]}>
          {t('login.instruction')}
        </Text>

        <Text style={[styles.loginTitle, { textAlign, color: colors?.text || '#2C3E50' }]}>{t('login.title')}</Text>

          {/* National ID Input */}
          <InputField
            label={t('login.nationalIdLabel')}
            placeholder={t('login.nationalIdPlaceholder')}
            value={nationalId}
            onChangeText={handleNationalIdChange}
            keyboardType="numeric"
            icon={faAddressCard}
            maxLength={10}
            error={nationalIdError}
          />

          {/* Password Input */}
          <InputField
            label={t('login.passwordLabel')}
            placeholder={t('login.passwordPlaceholder')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            icon={faLockKeyhole}
            leftIcon={showPassword ? faEye : faEyeSlash}
          />

        {/* Forgot Password Link */}
        <TouchableOpacity
          style={[styles.forgotPasswordContainer, { alignItems: textAlign === 'right' ? 'flex-end' : 'flex-start' }]}
          onPress={handleForgotPassword}
        >
          <Text style={[styles.forgotPasswordText, { color: colors?.primary || '#E62130' }]}>{t('login.forgotPassword')}</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <Button title={t('login.loginButton')} onPress={handleLogin} />

        {/* Register Link */}
        <View style={styles.registerContainer}>
          <Text style={[styles.registerQuestionText, { textAlign, color: colors?.textSecondary || '#7F8C8D' }]}>{t('login.noAccount')}</Text>
          <TouchableOpacity onPress={onNavigateToRegister}>
            <Text style={[styles.registerLinkText, { textAlign, color: colors?.primary || '#E62130' }]}>{t('login.register')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors?.background || '#F5F5F5' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors?.background || '#F5F5F5'} />
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.keyboardView}
          keyboardVerticalOffset={0}
        >
          {renderContent()}
        </KeyboardAvoidingView>
      ) : (
        renderContent()
      )}
    </View>
  );
};

export default LoginScreen;
