import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Spacing, BorderRadius, Typography} from '../../styles/theme';
import {useTheme} from '../../context/ThemeContext';

type StatCardProps = {
  label: string;
  value: string;
  caption?: string;
};

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  caption,
}) => {
  const {theme} = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.white,
          borderColor: theme.applicationCardBorder,
        },
      ]}>
      <Text style={[styles.label, {color: theme.disableText}]}>{label}</Text>
      <Text style={[styles.value, {color: theme.primaryText}]}>{value}</Text>
      {caption ? (
        <Text style={[styles.caption, {color: theme.disableText}]}>
          {caption}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    marginRight: Spacing.base,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    marginVertical: Spacing.xs,
  },
  caption: {
    fontSize: Typography.fontSize.xs,
  },
});

