import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../../context/ThemeContext';
import {Spacing, Typography} from '../../styles/theme';
import {offerList} from '../../constants/dummyData';
import {OfferCard} from '../../components/cards/OfferCard';
import {PrimaryButton} from '../../components/core/PrimaryButton';

export const OffersScreen: React.FC = () => {
  const {theme} = useTheme();
  const {t} = useTranslation();

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: theme.primaryBg}]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={[styles.title, {color: theme.primaryText}]}>
            {t('your_best_offers')}
          </Text>
          <Text style={[styles.subtitle, {color: theme.disableText}]}>
            {t('based_on_provided_information_here_are_the_filtered_companies_for_you')}
          </Text>
          <PrimaryButton title={t('filter')} style={styles.filterBtn} />
        </View>
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
  content: {
    padding: Spacing.base,
    gap: Spacing.base,
  },
  hero: {
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    lineHeight: 22,
    marginBottom: Spacing.base,
  },
  filterBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing['2xl'],
  },
});

