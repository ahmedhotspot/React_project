import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../../context/ThemeContext';
import {Spacing, Typography} from '../../styles/theme';
import {SectionHeader} from '../../components/core/SectionHeader';
import {PrimaryButton} from '../../components/core/PrimaryButton';
import {StatCard} from '../../components/cards/StatCard';
import {ApplicationCard} from '../../components/cards/ApplicationCard';
import {
  applications,
  dashboardStats,
  offerList,
} from '../../constants/dummyData';
import {OfferCard} from '../../components/cards/OfferCard';

export const HomeScreen: React.FC = () => {
  const {theme} = useTheme();
  const {t} = useTranslation();

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: theme.primaryBg}]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroText}>
            <Text style={[styles.heroTitle, {color: theme.primaryText}]}>
              {t('lets_get_you_ready')}
            </Text>
            <Text style={[styles.heroSubtitle, {color: theme.disableText}]}>
              {t('lets_explore_best_financing_offers_for_you')}
            </Text>
            <PrimaryButton
              title={t('apply_now')}
              style={styles.heroCta}
              onPress={() => {}}
            />
          </View>
          <Image
            source={require('../../assets/Welcome1.png')}
            style={styles.heroImage}
          />
        </View>

        <SectionHeader title={t('your_applications')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dashboardStats.map(stat => (
            <StatCard
              key={stat.labelKey}
              label={t(stat.labelKey)}
              value={stat.value}
              caption={stat.captionKey ? t(stat.captionKey) : undefined}
            />
          ))}
        </ScrollView>

        <SectionHeader
          title={t('current_applications')}
          action={<Text style={{color: theme.primary}}>{t('see_all')}</Text>}
        />
        {applications.slice(0, 2).map(item => (
          <ApplicationCard key={item.product} {...item} />
        ))}

        <SectionHeader title={t('offers')} />
        {offerList.map(offer => (
          <OfferCard key={offer.title} {...offer} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: Spacing.base,
    gap: Spacing.base,
  },
  hero: {
    flexDirection: 'row',
    backgroundColor: 'rgba(235,25,53,0.07)',
    borderRadius: 20,
    padding: Spacing.base,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  heroText: {
    flex: 1,
    paddingRight: Spacing.base,
  },
  heroTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.sm,
  },
  heroSubtitle: {
    fontSize: Typography.fontSize.base,
    marginBottom: Spacing.base,
  },
  heroCta: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing['2xl'],
  },
  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
});

