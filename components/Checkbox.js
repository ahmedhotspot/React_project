import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { styles } from '../styles/Checkbox.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';

const Checkbox = ({ label, linkText, checked, onToggle, onLinkPress, checkboxOnRight = false }) => {
  const { getTextAlign, getFlexDirection, isRTL } = useLanguage();
  const { colors } = useTheme();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();
  
  // If checkboxOnRight is true, reverse the order (checkbox on right side)
  const containerFlexDirection = checkboxOnRight ? (rtl ? 'row' : 'row-reverse') : flexDirection;
  const checkboxMargin = checkboxOnRight 
    ? (rtl ? { marginRight: 10 } : { marginLeft: 10 })
    : (rtl ? { marginLeft: 10 } : { marginRight: 10 });
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkboxContainer, { flexDirection: containerFlexDirection }]}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View style={[styles.checkboxWrapper, checkboxMargin]}>
          <FontAwesomeIcon
            icon={checked ? faSquareCheck : faSquare}
            size={20}
            color={checked ? colors.primary : colors.textSecondary}
          />
        </View>
        <View style={[styles.textContainer, { flexDirection }]}>
          <Text style={[styles.label, { textAlign, color: colors.text }]}>
            {label}{' '}
            {linkText && (
              <Text 
                style={[styles.linkText, { textAlign, color: colors.primary }]} 
                onPress={onLinkPress}
                suppressHighlighting={false}
              >
                {linkText}
              </Text>
            )}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Checkbox;

