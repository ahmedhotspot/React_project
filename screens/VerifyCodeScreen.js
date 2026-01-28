import React, { useState, useEffect } from 'react';
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
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import OTPInput from '../components/OTPInput';
import Button from '../components/Button';
import { styles } from '../styles/VerifyCodeScreen.styles';
import { useLanguage } from '../locales';

const VerifyCodeScreen = ({ onNavigateBack, phoneNumber, onNavigateToResetPassword, onNavigateToHome, onNavigateToSuccess, isRegistration = false, verifyType = 'registration' }) => {
  const { t, getTextAlign, getFlexDirection, isRTL } = useLanguage();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [maskedPhone, setMaskedPhone] = useState('');
  const [otpValue, setOtpValue] = useState('');

  // Mask phone number (show only last 4 digits)
  useEffect(() => {
    if (phoneNumber) {
      // Extract only digits from phone number (removes +966 and any other non-digits)
      const digits = phoneNumber.replace(/[^0-9]/g, '');
      if (digits.length >= 4) {
        // Get last 4 digits
        const last4 = digits.slice(-4);
        // Format as XXX XXX XXX 7394
        const masked = 'XXX XXX XXX ' + last4;
        setMaskedPhone(masked);
      } else {
        // If less than 4 digits, show as is
        setMaskedPhone(phoneNumber);
      }
    } else {
      setMaskedPhone('');
    }
  }, [phoneNumber]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleCodeComplete = (completeCode) => {
    setCode(completeCode);
    setOtpValue(completeCode);
  };

  const handleContinue = () => {
    // Use otpValue if code is not updated yet (handles async state updates)
    const currentCode = code || otpValue;
    
    if (currentCode && currentCode.length === 4) {
      console.log('التحقق من الرمز:', currentCode);
      
      if (verifyType === 'application') {
        // If this is application verification, navigate to success screen
        if (onNavigateToSuccess) {
          onNavigateToSuccess();
        }
      } else if (isRegistration) {
        // If this is registration verification, navigate to home screen
        if (onNavigateToHome) {
          onNavigateToHome('jorie'); // You can get the actual username from your auth system
        }
      } else {
        // If this is forgot password verification, navigate to reset password screen
        if (onNavigateToResetPassword) {
          onNavigateToResetPassword();
        }
      }
    } else {
      console.log('الرمز غير مكتمل. الطول الحالي:', currentCode ? currentCode.length : 0);
    }
  };

  const handleResend = () => {
    setTimeLeft(120); // Reset timer
    setCode('');
    console.log('إعادة إرسال الرمز');
    // Here you would typically resend the code
  };

  const renderContent = () => (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {/* Header with Back Button */}
      <View style={[styles.header, { flexDirection, justifyContent: rtl ? 'flex-end' : 'flex-start' }]}>
        {onNavigateBack && (
          <TouchableOpacity
            style={[styles.backButton, { alignItems: rtl ? 'flex-end' : 'flex-start' }]}
            onPress={onNavigateBack}
            activeOpacity={0.7}
          >
            <View style={styles.logoCircle}>
              <FontAwesomeIcon icon={rtl ? faArrowRight : faArrowLeft} size={16} color="#E62130" />
            </View>
          </TouchableOpacity>
        )}
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Subtitle */}
        <Text style={[styles.subtitle, { textAlign }]}>{t('verifyCode.subtitle')}</Text>

        {/* Title */}
        <Text style={[styles.title, { textAlign }]}>
          {verifyType === 'application' ? t('verifyCode.titleApplication') : t('verifyCode.title')}
        </Text>

        {/* Instructional Text */}
        <Text style={[styles.instructionText, { textAlign }]}>
          {t('verifyCode.instruction')} {'\n'}
          {t('verifyCode.phone')} {maskedPhone}
        </Text>

        {/* OTP Input Fields */}
        <View style={styles.otpContainer}>
          <OTPInput length={4} onComplete={handleCodeComplete} />
        </View>

        {/* Countdown Timer */}
        <Text style={[styles.timerText, { textAlign }]}>
          {t('verifyCode.timer')} {formatTime(timeLeft)} {t('verifyCode.seconds')}
        </Text>

        {/* Resend Link */}
        {timeLeft === 0 && (
          <TouchableOpacity onPress={handleResend} style={styles.resendContainer}>
            <Text style={[styles.resendText, { textAlign }]}>{t('verifyCode.resend')}</Text>
          </TouchableOpacity>
        )}

        {/* Continue Button */}
        <Button 
          title={t('verifyCode.continueButton')} 
          onPress={handleContinue}
          style={styles.continueButton}
        />
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
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

export default VerifyCodeScreen;

