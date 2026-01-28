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
import {
  faAddressCard,
  faPhone,
  faEnvelope,
  faCalendar,
  faUser,
  faVenusMars,
  faGlobe,
  faMapMarkerAlt,
  faHashtag,
  faCity,
  faSquare,
  faSquareCheck,
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import Dropdown from '../components/Dropdown';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import DatePicker from '../components/DatePicker';
import { styles } from '../styles/RegistrationScreen.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';

const RegistrationScreen = ({ onNavigateToLogin, onNavigateToHome, onNavigateToVerify }) => {
  const { t, getTextAlign, getFlexDirection, isRTL } = useLanguage();
  const { colors, isDark } = useTheme();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();
  // Form state
  const [nationalId, setNationalId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  
  // Handle date of birth change with logging
  const handleDateOfBirthChange = (date) => {
    console.log('RegistrationScreen: Setting dateOfBirth to:', date);
    setDateOfBirth(date);
  };
  const [idExpiryDate, setIdExpiryDate] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [addressType, setAddressType] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [postalCodeError, setPostalCodeError] = useState('');
  const [city, setCity] = useState('');

  // Checkboxes state
  const [termsChecked, setTermsChecked] = useState(false);
  const [serviceTermsChecked, setServiceTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [samaInquiryChecked, setSamaInquiryChecked] = useState(false);
  const [showTermsDetails, setShowTermsDetails] = useState(false);
  
  // Main terms checkbox is checked if all three are checked
  const mainTermsChecked = termsChecked && serviceTermsChecked && privacyChecked;
  
  const handleMainTermsToggle = () => {
    const newValue = !mainTermsChecked;
    setTermsChecked(newValue);
    setServiceTermsChecked(newValue);
    setPrivacyChecked(newValue);
    setSamaInquiryChecked(newValue); // Also toggle SAMA checkbox
    setTermsError(''); // Clear error when toggling
  };

  // Error state
  const [nationalIdError, setNationalIdError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [termsError, setTermsError] = useState('');

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
      setNationalIdError(t('registration.nationalIdError'));
      return false;
    }
    setNationalIdError('');
    return true;
  };

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
      setMobileNumberError(t('registration.mobileErrorEmpty'));
      return false;
    }
    // Should be exactly 9 digits
    if (mobileNumber.length !== 9 || !/^[0-9]{9}$/.test(mobileNumber)) {
      setMobileNumberError(t('registration.mobileError'));
      return false;
    }
    setMobileNumberError('');
    return true;
  };

  // Validate email
  const validateEmail = () => {
    if (!email.includes('@')) {
      setEmailError(t('registration.emailError'));
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(t('registration.emailErrorInvalid'));
      return false;
    }
    setEmailError('');
    return true;
  };

  // Handle postal code change (only numbers, max 5 digits)
  const handlePostalCodeChange = (text) => {
    // Remove all non-numeric characters
    const numericText = text.replace(/[^0-9]/g, '');
    // Limit to 5 digits
    if (numericText.length <= 5) {
      setPostalCode(numericText);
      setPostalCodeError('');
    }
  };

  // Validate postal code (must be exactly 5 digits)
  const validatePostalCode = () => {
    if (!postalCode) {
      setPostalCodeError(t('registration.postalCodeError'));
      return false;
    }
    if (postalCode.length !== 5) {
      setPostalCodeError(t('registration.postalCodeErrorLength'));
      return false;
    }
    if (!/^[0-9]{5}$/.test(postalCode)) {
      setPostalCodeError(t('registration.postalCodeErrorFormat'));
      return false;
    }
    setPostalCodeError('');
    return true;
  };

  // Validate date of birth (must be exactly 18+ years)
  const validateDateOfBirth = () => {
    if (!dateOfBirth) {
      setDateOfBirthError(t('registration.dateOfBirthError'));
      return false;
    }

    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    
    // Calculate age precisely
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    
    // Adjust age if birthday hasn't occurred this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    // Must be 18 or older
    if (age < 18) {
      setDateOfBirthError(t('registration.dateOfBirthErrorAge'));
      return false;
    }

    setDateOfBirthError('');
    return true;
  };

  // Validate and handle username input (English only, numbers, symbols, min 3 characters)
  const handleUsernameChange = (text) => {
    // Allow only English letters, numbers, and common symbols
    const allowedText = text.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '');
    setUsername(allowedText);
    setUsernameError('');
  };

  const validateUsername = () => {
    if (username.length < 3) {
      setUsernameError(t('registration.usernameError'));
      return false;
    }
    // Check if contains only English letters, numbers, and symbols
    const usernameRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
    if (!usernameRegex.test(username)) {
      setUsernameError(t('registration.usernameErrorFormat'));
      return false;
    }
    setUsernameError('');
    return true;
  };

  // Calculate maximum date (18 years ago) for date of birth
  const getMaximumDate = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return maxDate.toISOString().split('T')[0];
  };

  // Calculate start year for date of birth (100 years ago from today)
  const getDateOfBirthStartYear = () => {
    const today = new Date();
    return today.getFullYear() - 100;
  };

  // Calculate minimum date (today) for ID expiry date
  const getMinimumDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Calculate maximum date (50 years from today) for ID expiry date
  const getMaximumExpiryDate = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() + 50, today.getMonth(), today.getDate());
    return maxDate.toISOString().split('T')[0];
  };

  // Calculate start year for ID expiry date (current year)
  const getIdExpiryStartYear = () => {
    const today = new Date();
    return today.getFullYear();
  };

  // Dropdown options
  const genderOptions = [
    { label: t('registration.genderMale'), value: 'male' },
    { label: t('registration.genderFemale'), value: 'female' },
  ];

  const nationalityOptions = [
    { label: t('registration.nationalitySaudi'), value: 'saudi' },
    { label: t('registration.nationalityResident'), value: 'resident' },
  ];

  const addressTypeOptions = [
    { label: t('registration.addressTypeHome'), value: 'home' },
    { label: t('registration.addressTypeWork'), value: 'work' },
  ];

  const cityOptions = [
    { label: t('registration.cityRiyadh'), value: 'riyadh' },
    { label: t('registration.cityJeddah'), value: 'jeddah' },
    { label: t('registration.cityDammam'), value: 'dammam' },
  ];

  const handleContinue = () => {
    const isNationalIdValid = validateNationalId();
    const isMobileValid = validateMobileNumber();
    const isEmailValid = validateEmail();
    const isDateOfBirthValid = validateDateOfBirth();
    const isUsernameValid = validateUsername();
    const isPostalCodeValid = validatePostalCode();
    
    // Validate terms and conditions
    if (!mainTermsChecked) {
      setTermsError(t('registration.termsError'));
      return;
    }
    setTermsError('');
    
    if (isNationalIdValid && isMobileValid && isEmailValid && isDateOfBirthValid && isUsernameValid && isPostalCodeValid) {
      const fullMobileNumber = '+966' + mobileNumber;
      console.log('متابعة التسجيل:', {
        nationalId,
        mobileNumber: fullMobileNumber,
        email,
        dateOfBirth,
        idExpiryDate,
        username,
        gender,
        nationality,
        addressType,
        postalCode,
        city,
        termsAccepted: mainTermsChecked,
      });
      // Navigate to OTP verification screen after successful registration
      if (onNavigateToVerify) {
        onNavigateToVerify(fullMobileNumber);
      }
    }
  };

  const handleLogin = () => {
    if (onNavigateToLogin) {
      onNavigateToLogin();
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
        {/* Title Section */}
        <Text style={[styles.subtitle, { textAlign }]}>{t('registration.subtitle')}</Text>
        <Text style={[styles.title, { textAlign }]}>{t('registration.title')}</Text>

        {/* Form Fields - First Section */}
        <InputField
          label={t('registration.nationalIdLabel')}
          placeholder={t('registration.nationalIdPlaceholder')}
          value={nationalId}
          onChangeText={handleNationalIdChange}
          keyboardType="numeric"
          icon={faAddressCard}
          maxLength={10}
          error={nationalIdError}
        />

        <InputField
          label={t('registration.mobileLabel')}
          placeholder={t('registration.mobilePlaceholder')}
          value={mobileNumber}
          onChangeText={handleMobileNumberChange}
          keyboardType="phone-pad"
          icon={faPhone}
          error={mobileNumberError}
          prefix={rtl ? "+966" : "+966"}
          maxLength={9}
          useArabicNumbers={true}
        />

        <InputField
          label={t('registration.emailLabel')}
          placeholder={t('registration.emailPlaceholder')}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          icon={faEnvelope}
          error={emailError}
        />

        <DatePicker
          label={t('registration.dateOfBirthLabel')}
          placeholder={t('registration.dateOfBirthPlaceholder')}
          value={dateOfBirth}
          onSelect={handleDateOfBirthChange}
          icon={faCalendar}
          error={dateOfBirthError}
          maximumDate={getMaximumDate()}
          startYear={getDateOfBirthStartYear()}
        />

        <DatePicker
          label={t('registration.idExpiryLabel')}
          placeholder={t('registration.idExpiryPlaceholder')}
          value={idExpiryDate}
          onSelect={setIdExpiryDate}
          icon={faCalendar}
          minimumDate={getMinimumDate()}
          maximumDate={getMaximumExpiryDate()}
          startYear={getIdExpiryStartYear()}
        />

        <InputField
          label={t('registration.usernameLabel')}
          placeholder={t('registration.usernamePlaceholder')}
          value={username}
          onChangeText={handleUsernameChange}
          icon={faUser}
          error={usernameError}
        />

        <Dropdown
          label={t('registration.genderLabel')}
          placeholder={t('registration.genderPlaceholder')}
          options={genderOptions}
          value={gender}
          onSelect={setGender}
          icon={faVenusMars}
        />

        <Dropdown
          label={t('registration.nationalityLabel')}
          placeholder={t('registration.nationalityPlaceholder')}
          options={nationalityOptions}
          value={nationality}
          onSelect={setNationality}
          icon={faGlobe}
        />

        <Dropdown
          label={t('registration.addressTypeLabel')}
          placeholder={t('registration.addressTypePlaceholder')}
          options={addressTypeOptions}
          value={addressType}
          onSelect={setAddressType}
          icon={faMapMarkerAlt}
        />

        <InputField
          label={t('registration.postalCodeLabel')}
          placeholder={t('registration.postalCodePlaceholder')}
          value={postalCode}
          onChangeText={handlePostalCodeChange}
          keyboardType="numeric"
          maxLength={5}
          error={postalCodeError}
          rightIcon="#"
        />

        <Dropdown
          label={t('registration.cityLabel')}
          placeholder={t('registration.cityPlaceholder')}
          options={cityOptions}
          value={city}
          onSelect={setCity}
          icon={faCity}
        />

        {/* Terms and Conditions Checkbox */}
        <View style={styles.termsContainer}>
          <View style={styles.mainTermsCheckbox}>
            <View style={[styles.checkboxContainer, { flexDirection }]}>
              <TouchableOpacity
                style={styles.checkboxWrapperTouchable}
                onPress={handleMainTermsToggle}
                activeOpacity={0.7}
              >
                <View style={[styles.checkboxWrapper, rtl ? { marginLeft: 10 } : { marginRight: 10 }]}>
                  <FontAwesomeIcon
                    icon={mainTermsChecked ? faSquareCheck : faSquare}
                    size={20}
                    color={mainTermsChecked ? '#E62130' : '#999'}
                  />
                </View>
              </TouchableOpacity>
              <View style={[styles.textContainer, { flexDirection }]}>
                <Text style={[styles.termsLabel, { textAlign, color: colors.text }]}>
                  {t('registration.termsMain')}{' '}
                  <Text 
                    style={[styles.showDetailsLink, { textAlign }]}
                    onPress={() => setShowTermsDetails(!showTermsDetails)}
                  >
                    {t('registration.termsShowDetails')}
                  </Text>
                </Text>
              </View>
            </View>
            {termsError ? (
              <Text style={[styles.termsError, { textAlign, color: colors.error }]}>{termsError}</Text>
            ) : null}
          </View>
          
          {showTermsDetails && (
            <View style={styles.termsDetailsContainer}>
              <Checkbox
                label={t('registration.termsAgree')}
                linkText={t('registration.termsAgreeLink')}
                checked={termsChecked}
                onToggle={() => {
                  setTermsChecked(!termsChecked);
                  setTermsError('');
                }}
                onLinkPress={() => console.log('فتح شروط الخدمة')}
              />

              <Checkbox
                label={t('registration.termsAgree')}
                linkText={t('registration.termsService')}
                checked={serviceTermsChecked}
                onToggle={() => {
                  setServiceTermsChecked(!serviceTermsChecked);
                  setTermsError('');
                }}
                onLinkPress={() => console.log('فتح شروط وأحكام الخدمة')}
              />

              <Checkbox
                label={t('registration.termsAgree')}
                linkText={t('registration.termsPrivacy')}
                checked={privacyChecked}
                onToggle={() => {
                  setPrivacyChecked(!privacyChecked);
                  setTermsError('');
                }}
                onLinkPress={() => console.log('فتح سياسة الخصوصية')}
              />

              <Checkbox
                label={t('registration.termsSama')}
                checked={samaInquiryChecked}
                onToggle={() => {
                  setSamaInquiryChecked(!samaInquiryChecked);
                  setTermsError('');
                }}
              />
            </View>
          )}
        </View>

        {/* Continue Button */}
        <Button title={t('registration.continueButton')} onPress={handleContinue} />

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={[styles.loginQuestionText, { textAlign }]}>{t('registration.haveAccount')}</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={[styles.loginLinkText, { textAlign }]}>{t('registration.loginLink')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
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

export default RegistrationScreen;

