import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faTimes,
  faLockKeyhole,
  faEye,
  faEyeSlash,
  faCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import InputField from './InputField';
import Button from './Button';
import { styles } from '../styles/ChangePasswordModal.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';

const ChangePasswordModal = ({ visible, onClose }) => {
  const { t, getTextAlign, getFlexDirection, isRTL } = useLanguage();
  const { colors, isDark } = useTheme();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState('');
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
      return t('profile.passwordErrorMin');
    }

    const missingRequirements = [];
    if (!requirements.hasUpperCase) missingRequirements.push(t('profile.passwordRequirementUpper'));
    if (!requirements.hasLowerCase) missingRequirements.push(t('profile.passwordRequirementLower'));
    if (!requirements.hasNumbers) missingRequirements.push(t('profile.passwordRequirementNumber'));
    if (!requirements.hasSymbols) missingRequirements.push(t('profile.passwordRequirementSymbol'));

    if (missingRequirements.length > 0) {
      return `${t('profile.passwordErrorContent')} ${missingRequirements.join('، ')}`;
    }

    return '';
  };

  const passwordRequirements = checkPasswordRequirements(newPassword);

  const handleCurrentPasswordChange = (text) => {
    setCurrentPassword(text);
    setCurrentPasswordError('');
  };

  const handleNewPasswordChange = (text) => {
    setNewPassword(text);
    setNewPasswordError('');
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    setConfirmPasswordError('');
  };

  const handleChangePassword = () => {
    // Validate current password
    if (!currentPassword) {
      setCurrentPasswordError(t('profile.currentPasswordRequired'));
      return;
    }

    // Validate new password
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setNewPasswordError(passwordError);
      return;
    }

    // Validate password match
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError(t('profile.passwordErrorMatch'));
      return;
    }

    // Check if new password is same as current
    if (currentPassword === newPassword) {
      setNewPasswordError(t('profile.passwordSameAsCurrent'));
      return;
    }

    // All validations passed
    console.log('Changing password...');
    // Here you would typically call API to change password
    Alert.alert(
      t('profile.success'),
      t('profile.passwordChangedSuccess'),
      [
        {
          text: t('profile.ok'),
          onPress: () => {
            // Reset form
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setCurrentPasswordError('');
            setNewPasswordError('');
            setConfirmPasswordError('');
            onClose();
          },
        },
      ]
    );
  };

  const handleClose = () => {
    // Reset form when closing
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setCurrentPasswordError('');
    setNewPasswordError('');
    setConfirmPasswordError('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleClose}
        />
        <View style={[styles.modalContainer, { backgroundColor: colors.surface }]}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={[styles.header, { flexDirection, borderBottomColor: colors.border }]}>
              <Text style={[styles.title, { textAlign, color: colors.text }]}>
                {t('profile.changePassword')}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
                activeOpacity={0.7}
              >
                <FontAwesomeIcon icon={faTimes} size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Current Password Input */}
            <InputField
              label={t('profile.currentPassword')}
              placeholder={t('profile.currentPasswordPlaceholder')}
              value={currentPassword}
              onChangeText={handleCurrentPasswordChange}
              secureTextEntry={true}
              showPassword={showCurrentPassword}
              onTogglePassword={() => setShowCurrentPassword(!showCurrentPassword)}
              icon={faLockKeyhole}
              leftIcon={showCurrentPassword ? faEye : faEyeSlash}
              error={currentPasswordError}
            />

            {/* New Password Input */}
            <InputField
              label={t('profile.newPassword')}
              placeholder={t('profile.newPasswordPlaceholder')}
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
              label={t('profile.confirmPassword')}
              placeholder={t('profile.confirmPasswordPlaceholder')}
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
            {newPassword.length > 0 && (
              <View style={[styles.requirementsContainer, { backgroundColor: colors.background }]}>
                <Text style={[styles.requirementsTitle, { textAlign, color: colors.text }]}>
                  {t('profile.passwordRequirements')}
                </Text>
                <View style={[styles.requirementRow, { flexDirection }]}>
                  <FontAwesomeIcon 
                    icon={passwordRequirements.minLength ? faCheck : faXmark} 
                    size={14} 
                    color={passwordRequirements.minLength ? '#28a745' : '#E62130'} 
                  />
                  <Text style={[
                    styles.requirementText,
                    passwordRequirements.minLength && styles.requirementTextMet,
                    { textAlign, color: passwordRequirements.minLength ? '#28a745' : colors.textSecondary }
                  ]}>
                    {t('profile.passwordRequirementMin')}
                  </Text>
                </View>
                
                <View style={[styles.requirementRow, { flexDirection }]}>
                  <FontAwesomeIcon 
                    icon={passwordRequirements.hasUpperCase ? faCheck : faXmark} 
                    size={14} 
                    color={passwordRequirements.hasUpperCase ? '#28a745' : '#E62130'} 
                  />
                  <Text style={[
                    styles.requirementText,
                    passwordRequirements.hasUpperCase && styles.requirementTextMet,
                    { textAlign, color: passwordRequirements.hasUpperCase ? '#28a745' : colors.textSecondary }
                  ]}>
                    {t('profile.passwordRequirementUpper')}
                  </Text>
                </View>
                
                <View style={[styles.requirementRow, { flexDirection }]}>
                  <FontAwesomeIcon 
                    icon={passwordRequirements.hasLowerCase ? faCheck : faXmark} 
                    size={14} 
                    color={passwordRequirements.hasLowerCase ? '#28a745' : '#E62130'} 
                  />
                  <Text style={[
                    styles.requirementText,
                    passwordRequirements.hasLowerCase && styles.requirementTextMet,
                    { textAlign, color: passwordRequirements.hasLowerCase ? '#28a745' : colors.textSecondary }
                  ]}>
                    {t('profile.passwordRequirementLower')}
                  </Text>
                </View>
                
                <View style={[styles.requirementRow, { flexDirection }]}>
                  <FontAwesomeIcon 
                    icon={passwordRequirements.hasNumbers ? faCheck : faXmark} 
                    size={14} 
                    color={passwordRequirements.hasNumbers ? '#28a745' : '#E62130'} 
                  />
                  <Text style={[
                    styles.requirementText,
                    passwordRequirements.hasNumbers && styles.requirementTextMet,
                    { textAlign, color: passwordRequirements.hasNumbers ? '#28a745' : colors.textSecondary }
                  ]}>
                    {t('profile.passwordRequirementNumber')}
                  </Text>
                </View>
                
                <View style={[styles.requirementRow, { flexDirection }]}>
                  <FontAwesomeIcon 
                    icon={passwordRequirements.hasSymbols ? faCheck : faXmark} 
                    size={14} 
                    color={passwordRequirements.hasSymbols ? '#28a745' : '#E62130'} 
                  />
                  <Text style={[
                    styles.requirementText,
                    passwordRequirements.hasSymbols && styles.requirementTextMet,
                    { textAlign, color: passwordRequirements.hasSymbols ? '#28a745' : colors.textSecondary }
                  ]}>
                    {t('profile.passwordRequirementSymbol')}
                  </Text>
                </View>
              </View>
            )}

            {/* Change Password Button */}
            <Button 
              title={t('profile.changePasswordButton')} 
              onPress={handleChangePassword}
              style={styles.changeButton}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ChangePasswordModal;

