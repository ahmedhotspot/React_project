import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../../context/ThemeContext';
import {Spacing, Typography} from '../../styles/theme';
import {tickets} from '../../constants/dummyData';
import {PrimaryButton} from '../../components/core/PrimaryButton';

export const TicketsScreen: React.FC = () => {
  const {theme} = useTheme();
  const {t} = useTranslation();

  const statusColors: Record<string, string> = {
    open: theme.warning,
    awaiting_reply: theme.warning,
    closed: theme.success,
  };

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: theme.primaryBg}]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, {color: theme.primaryText}]}>
              {t('my_tickets')}
            </Text>
            <Text style={[styles.subtitle, {color: theme.disableText}]}>
              {t('how_we_help')}
            </Text>
          </View>
          <PrimaryButton
            title={t('create_new_ticket')}
            style={styles.createBtn}
          />
        </View>
        {tickets.map(ticket => (
          <View
            key={ticket.id}
            style={[
              styles.card,
              {
                backgroundColor: theme.notificationCardBg,
                borderColor: theme.notificationCardBorder,
              },
            ]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, {color: theme.primaryText}]}>
                {t(ticket.subjectKey)}
              </Text>
              <Text
                style={[
                  styles.status,
                  {color: statusColors[ticket.status] ?? theme.primary},
                ]}>
                {t(ticket.status)}
              </Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={{color: theme.disableText}}>{ticket.id}</Text>
              <Text style={{color: theme.disableText}}>{ticket.updatedAt}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: Spacing.base,
    gap: Spacing.base,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    marginTop: Spacing.xs,
  },
  createBtn: {
    paddingHorizontal: Spacing.lg,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: Spacing.base,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  cardTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semiBold,
  },
  status: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

