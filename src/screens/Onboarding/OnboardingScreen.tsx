import React, {useRef, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {onboardingSlides} from '../../constants/dummyData';
import {Spacing, Typography} from '../../styles/theme';
import {PrimaryButton} from '../../components/core/PrimaryButton';
import {useAuth} from '../../context/AuthContext';
import {useTheme} from '../../context/ThemeContext';
import {useLocalization} from '../../context/LocalizationContext';

export const OnboardingScreen: React.FC = () => {
  const {width} = useWindowDimensions();
  const {t} = useTranslation();
  const {completeOnboarding} = useAuth();
  const {theme} = useTheme();
  const {toggleLanguage, language} = useLocalization();
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (activeIndex < onboardingSlides.length - 1) {
      listRef.current?.scrollToIndex({index: activeIndex + 1});
    } else {
      void completeOnboarding();
    }
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.white}]}>
      <View style={styles.languageToggle}>
        <PrimaryButton
          title={language === 'ar' ? 'English' : 'العربية'}
          variant="outline"
          onPress={() => void toggleLanguage()}
          style={styles.languageBtn}
        />
      </View>
      <FlatList
        ref={listRef}
        data={onboardingSlides}
        keyExtractor={(_, idx) => `${idx}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
        renderItem={({item}) => (
          <View style={[styles.slide, {width}]}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={[styles.title, {color: theme.primaryText}]}>
              {t(item.titleKey)}
            </Text>
            <Text style={[styles.subtitle, {color: theme.primary}]}>
              {t(item.subtitleKey)}
            </Text>
            <Text style={[styles.description, {color: theme.disableText}]}>
              {t(item.descriptionKey)}
            </Text>
          </View>
        )}
      />
      <View style={styles.dots}>
        {onboardingSlides.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.dot,
              {
                backgroundColor:
                  idx === activeIndex ? theme.primary : theme.disableText,
              },
            ]}
          />
        ))}
      </View>
      <View style={styles.actions}>
        <PrimaryButton
          title={t('skip')}
          variant="outline"
          onPress={() => void completeOnboarding()}
        />
        <PrimaryButton
          title={
            activeIndex === onboardingSlides.length - 1
              ? t('get_started')
              : t('continue')
          }
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.base,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.base,
  },
  image: {
    width: '80%',
    height: '50%',
  },
  title: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semiBold,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: Typography.fontSize.base,
    textAlign: 'center',
    lineHeight: 24,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: Spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.base,
    marginBottom: Spacing['2xl'],
  },
  languageToggle: {
    alignItems: 'flex-end',
    marginBottom: Spacing.base,
  },
  languageBtn: {
    width: 120,
  },
});

