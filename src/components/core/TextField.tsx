import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {Spacing, BorderRadius, Typography} from '../../styles/theme';

type Props = TextInputProps & {
  label?: string;
  error?: string;
};

export const TextField: React.FC<Props> = ({
  label,
  error,
  style,
  ...rest
}) => {
  const {theme} = useTheme();

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, {color: theme.primaryText}]}>{label}</Text>
      )}
      <TextInput
        placeholderTextColor={theme.disableText}
        style={[
          styles.input,
          {backgroundColor: theme.inputBg, color: theme.primaryText},
          error ? {borderColor: theme.danger} : null,
          style,
        ]}
        {...rest}
      />
      {!!error && (
        <Text style={[styles.error, {color: theme.danger}]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: Spacing.xs,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  input: {
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  error: {
    marginTop: Spacing.xs,
    fontSize: Typography.fontSize.xs,
  },
});

