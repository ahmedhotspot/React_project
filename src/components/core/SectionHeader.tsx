import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Spacing, Typography} from '../../styles/theme';
import {useTheme} from '../../context/ThemeContext';

type Props = {
  title: string;
  action?: React.ReactNode;
  subtitle?: string;
};

export const SectionHeader: React.FC<Props> = ({
  title,
  action,
  subtitle,
}) => {
  const {theme} = useTheme();

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.title, {color: theme.primaryText}]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, {color: theme.disableText}]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {action}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semiBold,
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
  },
});

