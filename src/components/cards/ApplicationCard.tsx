import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Spacing, BorderRadius, Typography} from '../../styles/theme';
import {useTheme} from '../../context/ThemeContext';

export type ApplicationStatus =
  | 'in_process'
  | 'on_hold'
  | 'completed'
  | 'rejected';

export type ApplicationCardProps = {
  product: string;
  company: string;
  amount: string;
  status: ApplicationStatus;
  date: string;
};

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  product,
  company,
  amount,
  status,
  date,
}) => {
  const {theme} = useTheme();

  const statusColors: Record<ApplicationStatus, string> = {
    in_process: theme.warning,
    on_hold: theme.warning,
    completed: theme.success,
    rejected: theme.danger,
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.applicationCardBg,
          borderColor: theme.applicationCardBorder,
        },
      ]}>
      <View style={styles.header}>
        <Text style={[styles.product, {color: theme.primaryText}]}>
          {product}
        </Text>
        <Text style={[styles.date, {color: theme.disableText}]}>{date}</Text>
      </View>
      <Text style={[styles.company, {color: theme.disableText}]}>
        {company}
      </Text>
      <View style={styles.footer}>
        <Text style={[styles.amount, {color: theme.primary}]}>SAR {amount}</Text>
        <Text
          style={[
            styles.status,
            {
              color: statusColors[status],
            },
          ]}>
          {status.replace('_', ' ').toUpperCase()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  product: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semiBold,
  },
  date: {
    fontSize: Typography.fontSize.sm,
  },
  company: {
    fontSize: Typography.fontSize.sm,
    marginBottom: Spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  status: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
  },
});

