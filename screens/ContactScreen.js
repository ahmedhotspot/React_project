import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faBars,
  faArrowRight,
  faArrowLeft,
  faWhatsapp,
  faFacebook,
  faXTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import {
  faComments,
  faPhoneVolume,
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import { styles } from '../styles/ContactScreen.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';

const ContactScreen = ({ onLogout, onNavigateToProfile, onNavigateToSettings, onNavigateToHome, onNavigateToFinanceRequests, onNavigateToNotifications, onNavigateToTickets, onNavigateToContact }) => {
  const { t, getTextAlign, getFlexDirection, isRTL } = useLanguage();
  const { colors, isDark } = useTheme();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Chat bot handler
  const handleChatBotPress = () => {
    // TODO: Navigate to chat bot screen or open chat interface
    console.log('Open chat bot');
    // You can add navigation to chat bot screen here
  };

  // Phone call handler
  const handlePhonePress = () => {
    Linking.openURL(`tel:${t('contact.phoneNumber')}`);
  };

  // Social media links - سيتم جلبها من API لاحقاً
  const contactOptions = [
    {
      id: 0,
      name: 'ChatBot',
      nameAr: t('contact.chatBot'),
      icon: faComments,
      color: '#E62130',
      url: null,
      description: t('contact.chatBotDescription'),
      onPress: handleChatBotPress,
    },
    {
      id: 1,
      name: 'Phone',
      nameAr: t('contact.phone'),
      icon: faPhoneVolume,
      color: '#FF6B35',
      url: null,
      description: t('contact.phoneNumber'),
      onPress: handlePhonePress,
    },
    {
      id: 2,
      name: 'WhatsApp',
      nameAr: t('contact.whatsapp'),
      icon: faWhatsapp,
      color: '#25D366',
      url: 'https://wa.me/966501497394',
      description: t('contact.whatsappDescription'),
      onPress: null,
    },
    {
      id: 3,
      name: 'Facebook',
      nameAr: t('contact.facebook'),
      icon: faFacebook,
      color: '#1877F2',
      url: 'https://www.facebook.com/yourpage',
      description: t('contact.facebookDescription'),
      onPress: null,
    },
    {
      id: 4,
      name: 'X',
      nameAr: t('contact.x'),
      icon: faXTwitter,
      color: '#000000',
      url: 'https://x.com/yourhandle',
      description: t('contact.xDescription'),
      onPress: null,
    },
    {
      id: 5,
      name: 'LinkedIn',
      nameAr: t('contact.linkedin'),
      icon: faLinkedin,
      color: '#0077B5',
      url: 'https://www.linkedin.com/company/yourcompany',
      description: t('contact.linkedinDescription'),
      onPress: null,
    },
  ];

  const handleContactPress = async (option) => {
    if (option.onPress) {
      option.onPress();
    } else if (option.url) {
      try {
        const supported = await Linking.canOpenURL(option.url);
        if (supported) {
          await Linking.openURL(option.url);
        } else {
          console.log("Don't know how to open URI: " + option.url);
        }
      } catch (error) {
        console.error('Error opening URL:', error);
      }
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
        {/* Header */}
        <View style={[styles.header, { flexDirection, backgroundColor: colors.background }]}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setSidebarVisible(true)}
          >
            <FontAwesomeIcon icon={faBars} size={24} color={colors.primary} />
          </TouchableOpacity>
          
          <Text style={[styles.headerTitle, { textAlign, color: colors.text }]}>
            {t('contact.title')}
          </Text>
          
          <TouchableOpacity
            style={styles.backButton}
            onPress={onNavigateToHome}
            activeOpacity={0.7}
          >
            <View style={styles.logoCircle}>
              <FontAwesomeIcon icon={rtl ? faArrowRight : faArrowLeft} size={14} color="#E62130" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={[styles.headerSectionTitle, { textAlign, color: colors.text }]}>
            {t('contact.reachUs')}
          </Text>
          <Text style={[styles.headerSectionSubtitle, { textAlign, color: colors.primary }]}>
            {t('contact.weCare')}
          </Text>
        </View>

        {/* Featured Chat Bot Card */}
        <View style={styles.featuredCardContainer}>
          <TouchableOpacity
            style={[
              styles.featuredChatBotCard,
              { 
                backgroundColor: colors.cardBackground || '#FFFFFF',
                borderColor: colors.primary,
              },
            ]}
            onPress={() => handleContactPress(contactOptions[0])}
            activeOpacity={0.8}
          >
            <View style={[styles.featuredIconContainer, { backgroundColor: colors.primary + '15' }]}>
              <FontAwesomeIcon
                icon={faComments}
                size={48}
                color={colors.primary}
              />
            </View>
            <Text style={[styles.featuredTitle, { textAlign, color: colors.text }]}>
              {contactOptions[0].nameAr}
            </Text>
            <Text style={[styles.featuredDescription, { textAlign, color: colors.textSecondary }]}>
              {contactOptions[0].description}
            </Text>
            <View style={[styles.featuredBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.featuredBadgeText}>
                {t('contact.startChat')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Other Contact Options */}
        <View style={styles.otherOptionsSection}>
          <Text style={[styles.otherOptionsTitle, { textAlign, color: colors.text }]}>
            {t('contact.otherWays')}
          </Text>
          <View style={styles.socialMediaGrid}>
            {contactOptions.slice(1).map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.socialMediaCard,
                  { backgroundColor: colors.cardBackground || '#FFFFFF' },
                ]}
                onPress={() => handleContactPress(option)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.socialIconContainer,
                    { backgroundColor: option.color + '15' },
                  ]}
                >
                  <FontAwesomeIcon
                    icon={option.icon}
                    size={32}
                    color={option.color}
                  />
                </View>
                <Text style={[styles.socialName, { textAlign, color: colors.text }]}>
                  {option.nameAr}
                </Text>
                <Text style={[styles.socialDescription, { textAlign, color: colors.textSecondary }]}>
                  {option.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        activeItem="contact"
        onLogout={onLogout}
        onNavigateToHome={onNavigateToHome}
        onNavigateToProfile={onNavigateToProfile}
        onNavigateToSettings={onNavigateToSettings}
        onNavigateToFinanceRequests={onNavigateToFinanceRequests}
        onNavigateToNotifications={onNavigateToNotifications}
        onNavigateToTickets={onNavigateToTickets}
        onNavigateToContact={onNavigateToContact}
      />
    </View>
  );
};

export default ContactScreen;

