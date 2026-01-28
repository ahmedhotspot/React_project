import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { styles } from '../styles/ApplicationSuccessScreen.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';

const ApplicationSuccessScreen = ({ onNavigateToHome, applicationNumber = '' }) => {
  const { t, getTextAlign, getFlexDirection } = useLanguage();
  const { colors, isDark } = useTheme();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();

  // Animation for icon
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Success Icon with Animation */}
          <Animated.View
            style={[
              styles.iconContainer,
              {
                backgroundColor: colors.primary,
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              },
            ]}
          >
            <FontAwesomeIcon icon={faCheckCircle} size={64} color="#FFFFFF" />
          </Animated.View>

          {/* Success Title */}
          <Text style={[styles.title, { textAlign, color: colors.text }]}>
            {t('applicationSuccess.title')}
          </Text>

          {/* Success Card */}
          <View style={[styles.successCard, { backgroundColor: colors.surface || '#FFFFFF' }]}>
            {/* Application Number Section */}
            {applicationNumber && (
              <View style={[styles.applicationNumberSection, { flexDirection }]}>
                <View style={[styles.applicationNumberIconContainer, { backgroundColor: colors.primary + '15' }]}>
                  <FontAwesomeIcon icon={faFileAlt} size={24} color={colors.primary} />
                </View>
                <View style={styles.applicationNumberTextContainer}>
                  <Text style={[styles.applicationNumberLabel, { textAlign, color: colors.textSecondary }]}>
                    {t('applicationSuccess.applicationNumber')}
                  </Text>
                  <Text style={[styles.applicationNumber, { textAlign, color: colors.primary }]}>
                    {applicationNumber}
                  </Text>
                </View>
              </View>
            )}

            {/* Success Message and Contact Message */}
            <View style={styles.messageContainer}>
              <Text style={[styles.message, { textAlign, color: colors.text }]}>
                {t('applicationSuccess.message')}
              </Text>
              <Text style={[styles.contactMessage, { textAlign, color: colors.textSecondary }]}>
                {t('applicationSuccess.contactMessage')}
              </Text>
            </View>
          </View>

          {/* Back to Home Button */}
          {onNavigateToHome && (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={onNavigateToHome}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                {t('applicationSuccess.backToHome')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ApplicationSuccessScreen;

