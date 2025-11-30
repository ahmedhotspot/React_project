import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {Spacing, BorderRadius, Typography} from '../../styles/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

type Props = TouchableOpacityProps & {
  title: string;
  loading?: boolean;
  variant?: ButtonVariant;
};

export const PrimaryButton: React.FC<Props> = ({
  title,
  loading,
  disabled,
  variant = 'primary',
  style,
  ...rest
}) => {
  const {theme} = useTheme();
  const backgroundColor =
    variant === 'primary'
      ? theme.primary
      : variant === 'secondary'
      ? theme.secondaryLight
      : 'transparent';
  const borderColor = variant === 'outline' ? theme.primary : 'transparent';

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? theme.disableText : backgroundColor,
          borderColor,
        },
        style,
      ]}
      activeOpacity={0.8}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={theme.white} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: variant === 'outline' ? theme.primary : theme.white,
            },
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  text: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semiBold,
  },
});

