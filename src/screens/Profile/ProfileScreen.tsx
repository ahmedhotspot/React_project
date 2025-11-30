import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useAuth} from '../../context/AuthContext';
import {useTheme} from '../../context/ThemeContext';
import {useLocalization} from '../../context/LocalizationContext';
import {PrimaryButton} from '../../components/core/PrimaryButton';
import {Spacing, Typography} from '../../styles/theme';

export const ProfileScreen: React.FC = () => {
  const {user, logout} = useAuth();
  const {theme, isDarkMode, toggleTheme} = useTheme();
  const {language, toggleLanguage} = useLocalization();
  const {t} = useTranslation();

  const settings = [
    {label: t('language'), value: language === 'ar' ? 'العربية' : 'English'},
    {label: t('theme'), value: isDarkMode ? 'Dark' : 'Light'},
    {label: t('app_version'), value: '1.0.0'},
  ];

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: theme.primaryBg}]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={[styles.title, {color: theme.primaryText}]}>
            {t('my_account')}
          </Text>
          <Text style={[styles.name, {color: theme.primaryText}]}>
            {user?.name ?? 'Hotspot'}
          </Text>
          <Text style={{color: theme.disableText}}>{user?.email}</Text>
          <PrimaryButton
            title={t('edit_profile')}
            style={styles.cardButton}
            variant="outline"
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.primaryText}]}>
            {t('application_settings')}
          </Text>
          {settings.map(setting => (
            <View
              key={setting.label}
              style={[
                styles.settingRow,
                {borderBottomColor: theme.applicationCardBorder},
              ]}>
              <Text style={{color: theme.primaryText}}>{setting.label}</Text>
              <Text style={{color: theme.disableText}}>{setting.value}</Text>
            </View>
          ))}
          <View style={styles.actions}>
            <PrimaryButton
              title={t('language')}
              variant="outline"
              onPress={() => void toggleLanguage()}
            />
            <PrimaryButton
              title={t('theme')}
              variant="outline"
              onPress={() => void toggleTheme()}
            />
          </View>
        </View>

        <PrimaryButton
          title={t('logout')}
          onPress={() => void logout()}
          style={styles.logout}
        />
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
  card: {
    padding: Spacing.base,
    borderRadius: 20,
    backgroundColor: 'rgba(235,25,53,0.08)',
  },
  title: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: Spacing.sm,
  },
  name: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
  },
  cardButton: {
    marginTop: Spacing.base,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: Spacing.base,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semiBold,
    marginBottom: Spacing.base,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.base,
  },
  logout: {
    marginTop: Spacing['2xl'],
  },
});

