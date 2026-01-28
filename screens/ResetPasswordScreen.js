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
import { faArrowRight, faArrowLeft, faLockKeyhole, faEye, faEyeSlash, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { styles } from '../styles/ResetPasswordScreen.styles';
import { useLanguage } from '../locales';

const ResetPasswordScreen = ({ onNavigateBack }) => {
  console.log('ResetPasswordScreen rendered');
  const { t, getTextAlign, getFlexDirection, isRTL } = useLanguage();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Check password requirements
  const checkPasswordRequirements = (password) => {
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumbers: /[0-9]/.test(password),
      hasSymbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };
  };

  // Validate password strength
  const validatePassword = (password) => {
    const requirements = checkPasswordRequirements(password);
    
    if (!requirements.minLength) {
      return t('resetPassword.passwordErrorMin');
    }

    const missingRequirements = [];
    if (!requirements.hasUpperCase) missingRequirements.push(t('resetPassword.passwordRequirementUpper'));
    if (!requirements.hasLowerCase) missingRequirements.push(t('resetPassword.passwordRequirementLower'));
    if (!requirements.hasNumbers) missingRequirements.push(t('resetPassword.passwordRequirementNumber'));
    if (!requirements.hasSymbols) missingRequirements.push(t('resetPassword.passwordRequirementSymbol'));

    if (missingRequirements.length > 0) {
      return `${t('resetPassword.passwordErrorContent')} ${missingRequirements.join('، ')}`;
    }

    return '';
  };

  const passwordRequirements = checkPasswordRequirements(newPassword);

  const handleNewPasswordChange = (text) => {
    setNewPassword(text);
    setNewPasswordError('');
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    setConfirmPasswordError('');
  };

  const handleResetPassword = () => {
    // Validate new password
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setNewPasswordError(passwordError);
      return;
    }

    // Validate password match
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError(t('resetPassword.passwordErrorMatch'));
      return;
    }

    // All validations passed
    console.log('إعادة تعيين كلمة المرور:', { newPassword });
    // Here you would typically call API to reset password
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
        {/* Title */}
        <Text style={[styles.title, { textAlign }]}>{t('resetPassword.title')}</Text>

        {/* Instructional Text */}
        <Text style={[styles.instructionText, { textAlign }]}>
          {t('resetPassword.instruction')}
        </Text>

        {/* New Password Input */}
        <InputField
          label={t('resetPassword.newPasswordLabel')}
          placeholder={t('resetPassword.newPasswordPlaceholder')}
          value={newPassword}
          onChangeText={handleNewPasswordChange}
          secureTextEntry={true}
          showPassword={showNewPassword}
          onTogglePassword={() => setShowNewPassword(!showNewPassword)}
          icon={faLockKeyhole}
          leftIcon={showNewPassword ? faEye : faEyeSlash}
          error={newPasswordError}
        />

        {/* Confirm Password Input */}
        <InputField
          label={t('resetPassword.confirmPasswordLabel')}
          placeholder={t('resetPassword.confirmPasswordPlaceholder')}
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry={true}
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          icon={faLockKeyhole}
          leftIcon={showConfirmPassword ? faEye : faEyeSlash}
          error={confirmPasswordError}
        />

        {/* Password Requirements */}
        <View style={styles.requirementsContainer}>
          <View style={[styles.requirementRow, { flexDirection }]}>
            <FontAwesomeIcon 
              icon={passwordRequirements.minLength ? faCheck : faXmark} 
              size={16} 
              color={passwordRequirements.minLength ? '#28a745' : '#E62130'} 
              style={styles.requirementIcon}
            />
            <Text style={[
              styles.requirementText,
              passwordRequirements.minLength && styles.requirementTextMet,
              { textAlign }
            ]}>
              {t('resetPassword.passwordRequirementMin')}
            </Text>
          </View>
          
          <View style={[styles.requirementRow, { flexDirection }]}>
            <FontAwesomeIcon 
              icon={passwordRequirements.hasUpperCase ? faCheck : faXmark} 
              size={16} 
              color={passwordRequirements.hasUpperCase ? '#28a745' : '#E62130'} 
              style={styles.requirementIcon}
            />
            <Text style={[
              styles.requirementText,
              passwordRequirements.hasUpperCase && styles.requirementTextMet,
              { textAlign }
            ]}>
              {t('resetPassword.passwordRequirementUpper')}
            </Text>
          </View>
          
          <View style={[styles.requirementRow, { flexDirection }]}>
            <FontAwesomeIcon 
              icon={passwordRequirements.hasLowerCase ? faCheck : faXmark} 
              size={16} 
              color={passwordRequirements.hasLowerCase ? '#28a745' : '#E62130'} 
              style={styles.requirementIcon}
            />
            <Text style={[
              styles.requirementText,
              passwordRequirements.hasLowerCase && styles.requirementTextMet,
              { textAlign }
            ]}>
              {t('resetPassword.passwordRequirementLower')}
            </Text>
          </View>
          
          <View style={[styles.requirementRow, { flexDirection }]}>
            <FontAwesomeIcon 
              icon={passwordRequirements.hasNumbers ? faCheck : faXmark} 
              size={16} 
              color={passwordRequirements.hasNumbers ? '#28a745' : '#E62130'} 
              style={styles.requirementIcon}
            />
            <Text style={[
              styles.requirementText,
              passwordRequirements.hasNumbers && styles.requirementTextMet,
              { textAlign }
            ]}>
              {t('resetPassword.passwordRequirementNumber')}
            </Text>
          </View>
          
          <View style={[styles.requirementRow, { flexDirection }]}>
            <FontAwesomeIcon 
              icon={passwordRequirements.hasSymbols ? faCheck : faXmark} 
              size={16} 
              color={passwordRequirements.hasSymbols ? '#28a745' : '#E62130'} 
              style={styles.requirementIcon}
            />
            <Text style={[
              styles.requirementText,
              passwordRequirements.hasSymbols && styles.requirementTextMet,
              { textAlign }
            ]}>
              {t('resetPassword.passwordRequirementSymbol')}
            </Text>
          </View>
        </View>

        {/* Reset Password Button */}
        <Button 
          title={t('resetPassword.resetButton')} 
          onPress={handleResetPassword}
          style={styles.resetButton}
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

export default ResetPasswordScreen;

