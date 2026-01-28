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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPhone, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { styles } from '../styles/ForgotPasswordScreen.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';

const ForgotPasswordScreen = ({ onNavigateBack, onNavigateToVerify }) => {
  const { t, getTextAlign, getFlexDirection, isRTL } = useLanguage();
  const { colors, isDark } = useTheme();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');

  // Validate and handle mobile number input (only digits, no +966 prefix)
  const handleMobileNumberChange = (text) => {
    // Convert Arabic numbers to English first
    const arabicToEnglish = (str) => {
      const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
      return str.replace(/[٠-٩]/g, (digit) => {
        const index = arabicNumbers.indexOf(digit);
        return index !== -1 ? index.toString() : digit;
      });
    };
    
    // Convert Arabic to English, then remove any non-numeric characters
    const englishText = arabicToEnglish(text);
    const cleanedText = englishText.replace(/[^0-9]/g, '');
    
    // Remove leading 0 if exists
    const finalText = cleanedText.replace(/^0/, '');
    
    // Limit to 9 digits (Saudi mobile number without country code)
    if (finalText.length <= 9) {
      setMobileNumber(finalText);
      setMobileNumberError('');
    }
  };

  const validateMobileNumber = () => {
    if (!mobileNumber || mobileNumber.length === 0) {
      setMobileNumberError(t('forgotPassword.mobileError'));
      return false;
    }
    // Should be exactly 9 digits
    if (mobileNumber.length !== 9 || !/^[0-9]{9}$/.test(mobileNumber)) {
      setMobileNumberError(t('forgotPassword.mobileErrorFormat'));
      return false;
    }
    setMobileNumberError('');
    return true;
  };

  const handleVerify = () => {
    if (validateMobileNumber()) {
      const fullMobileNumber = '+966' + mobileNumber;
      console.log('التحقق من الرقم:', fullMobileNumber);
      // Navigate to verify code screen
      if (onNavigateToVerify) {
        onNavigateToVerify(fullMobileNumber);
      }
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
      {/* Header with Logo and Back Button */}
      <View style={[styles.header, { flexDirection, justifyContent: rtl ? 'flex-end' : 'flex-start' }]}>
        {onNavigateBack && (
          <TouchableOpacity
            style={[styles.backButton, { alignItems: rtl ? 'flex-end' : 'flex-start' }]}
            onPress={onNavigateBack}
            activeOpacity={0.7}
          >
            <View style={styles.logoCircle}>
              <FontAwesomeIcon icon={rtl ? faArrowRight : faArrowLeft} size={16} color={colors?.primary || '#E62130'} />
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={[styles.title, { textAlign, color: colors?.text || '#2C3E50' }]}>{t('forgotPassword.title')}</Text>

        {/* Instructional Text */}
        <Text style={[styles.instructionText, { textAlign, color: colors?.textSecondary || '#7F8C8D' }]}>
          {t('forgotPassword.instruction')}
        </Text>

        {/* Mobile Number Input */}
        <InputField
          label={t('forgotPassword.mobileLabel')}
          placeholder={t('forgotPassword.mobilePlaceholder')}
          prefix={rtl ? "+966" : "+966"}
          maxLength={9}
          value={mobileNumber}
          onChangeText={handleMobileNumberChange}
          keyboardType="phone-pad"
          icon={faPhone}
          error={mobileNumberError}
          useArabicNumbers={true}
        />

        {/* Verify Button */}
        <Button title={t('forgotPassword.verifyButton')} onPress={handleVerify} />
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

export default ForgotPasswordScreen;

