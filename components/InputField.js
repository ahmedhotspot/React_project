import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAddressCard, faLockKeyhole, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { styles } from '../styles/InputField.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';

const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  showPassword = false,
  onTogglePassword,
  keyboardType = 'default',
  icon,
  iconColor,
  rightIcon,
  leftIcon,
  maxLength,
  error,
  prefix,
  useArabicNumbers = false,
}) => {
  // Convert English numbers to Arabic
  const toArabicNumbers = (str) => {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return str.replace(/[0-9]/g, (digit) => arabicNumbers[parseInt(digit)]);
  };

  // Convert Arabic numbers to English
  const toEnglishNumbers = (str) => {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return str.replace(/[٠-٩]/g, (digit) => {
      const index = arabicNumbers.indexOf(digit);
      return index !== -1 ? index.toString() : digit;
    });
  };

  const { getTextAlign, getFlexDirection, isRTL } = useLanguage();
  const { colors } = useTheme();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();
  
  const displayValue = useArabicNumbers ? toArabicNumbers(value) : value;
  
  // Convert prefix to Arabic numbers only if RTL (Arabic language)
  const displayPrefix = prefix && rtl ? toArabicNumbers(prefix) : prefix;

  const handleTextChange = (text) => {
    if (useArabicNumbers) {
      // Convert Arabic input back to English for state
      const englishText = toEnglishNumbers(text);
      onChangeText(englishText);
    } else {
      onChangeText(text);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { textAlign, color: colors.text }]}>{label}</Text>
      <View style={[styles.inputWrapper, error && styles.inputWrapperError, { flexDirection, backgroundColor: colors.surface, borderColor: error ? colors.error : colors.border }]}>
        {rtl ? (
          <>
            {leftIcon && (
              <TouchableOpacity onPress={onTogglePassword} style={[styles.leftIcon, { marginLeft: 0 }]}>
                <FontAwesomeIcon icon={leftIcon} size={18} color={colors.primary} />
              </TouchableOpacity>
            )}
            <TextInput
              style={[styles.input, prefix && styles.inputRightAlign, { textAlign: prefix ? 'right' : textAlign, color: colors.text }]}
              placeholder={placeholder}
              placeholderTextColor={colors.textSecondary}
              value={displayValue}
              onChangeText={handleTextChange}
              secureTextEntry={secureTextEntry && !showPassword}
              keyboardType={keyboardType}
              maxLength={maxLength}
            />
            {prefix && (
              <View style={[styles.prefixContainer, { flexDirection }]}>
                <View style={styles.prefixDivider} />
                <Text style={[styles.prefixText, { color: colors.textSecondary }]}>{displayPrefix}</Text>
              </View>
            )}
            {icon && (
              <View style={[styles.iconContainer, { marginRight: 10, marginLeft: 0 }]}>
                <FontAwesomeIcon icon={icon} size={18} color={colors.primary} />
              </View>
            )}
            {rightIcon && (
              <View style={[styles.rightIcon, { marginLeft: 10, marginRight: 0 }]}>
                <Text style={styles.rightIconText}>{rightIcon}</Text>
              </View>
            )}
          </>
        ) : (
          <>
            {prefix && (
              <View style={[styles.prefixContainer, { flexDirection: 'row', marginRight: 0, marginLeft: 0 }]}>
                <Text style={[styles.prefixText, { color: colors.textSecondary }]}>{displayPrefix}</Text>
                <View style={[styles.prefixDivider, { marginRight: 8, marginLeft: 0 }]} />
              </View>
            )}
            {leftIcon && (
              <TouchableOpacity onPress={onTogglePassword} style={[styles.leftIcon, { marginRight: 10, marginLeft: 0 }]}>
                <FontAwesomeIcon icon={leftIcon} size={18} color={colors.primary} />
              </TouchableOpacity>
            )}
            <TextInput
              style={[styles.input, { textAlign: prefix ? 'left' : textAlign, marginRight: prefix ? 0 : 9, color: colors.text }]}
              placeholder={placeholder}
              placeholderTextColor={colors.textSecondary}
              value={displayValue}
              onChangeText={handleTextChange}
              secureTextEntry={secureTextEntry && !showPassword}
              keyboardType={keyboardType}
              maxLength={maxLength}
            />
            {icon && (
              <View style={[styles.iconContainer, { marginRight: 10, marginLeft: 0 }]}>
                <FontAwesomeIcon icon={icon} size={18} color={colors.primary} />
              </View>
            )}
            {rightIcon && (
              <View style={[styles.rightIcon, { marginLeft: 0 }]}>
                <Text style={styles.rightIconText}>{rightIcon}</Text>
              </View>
            )}
          </>
        )}
      </View>
      {error && <Text style={[styles.errorText, { textAlign, color: colors.error }]}>{error}</Text>}
    </View>
  );
};

export default InputField;

