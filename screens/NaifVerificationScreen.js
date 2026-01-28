import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShieldAlt, faExternalLinkAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { styles } from '../styles/NaifVerificationScreen.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';

const NaifVerificationScreen = ({ onNavigateBack, onNavigateToSuccess }) => {
  const { t, getTextAlign, getFlexDirection, isRTL } = useLanguage();
  const { colors, isDark } = useTheme();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();

  // Naif app URL scheme - adjust based on actual Naif app scheme
  const naifAppUrl = Platform.OS === 'ios' 
    ? 'naif://verify' // iOS URL scheme
    : 'naif://verify'; // Android intent

  const openNaifApp = async () => {
    try {
      const supported = await Linking.canOpenURL(naifAppUrl);
      if (supported) {
        await Linking.openURL(naifAppUrl);
      } else {
        // If Naif app is not installed, show message or open store
        console.log('Naif app is not installed');
        // You can open app store here or show an alert
      }
    } catch (error) {
      console.error('Error opening Naif app:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Icon */}
          <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
            <FontAwesomeIcon icon={faShieldAlt} size={48} color={colors.primary} />
          </View>

          {/* Title */}
          <Text style={[styles.title, { textAlign, color: colors.text }]}>
            {t('naifVerification.title')}
          </Text>

          {/* Message */}
          <Text style={[styles.message, { textAlign, color: colors.textSecondary }]}>
            {t('naifVerification.message')}
          </Text>

          {/* Open Naif App Button */}
          <TouchableOpacity
            style={[styles.openButton, { backgroundColor: colors.primary }]}
            onPress={openNaifApp}
            activeOpacity={0.8}
          >
            <Text style={styles.openButtonText}>
              {t('naifVerification.openNaif')}
            </Text>
            <FontAwesomeIcon icon={faExternalLinkAlt} size={16} color="#FFFFFF" style={styles.buttonIcon} />
          </TouchableOpacity>

          {/* Continue Button */}
          {onNavigateToSuccess && (
            <TouchableOpacity
              style={[styles.continueButton, { backgroundColor: colors.primary }]}
              onPress={onNavigateToSuccess}
              activeOpacity={0.8}
            >
              <FontAwesomeIcon icon={faCheckCircle} size={18} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.continueButtonText}>
                {t('naifVerification.continue')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default NaifVerificationScreen;

