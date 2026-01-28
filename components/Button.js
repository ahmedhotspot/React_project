import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/Button.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';

const Button = ({ title, onPress, style, textStyle, variant = 'primary' }) => {
  const { getTextAlign } = useLanguage();
  const { colors } = useTheme();
  const textAlign = getTextAlign();
  
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle, { textAlign, color: variant === 'primary' ? '#FFFFFF' : colors.text }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

