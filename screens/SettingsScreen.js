import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faBars,
  faArrowLeft,
  faArrowRight,
  faMoon,
  faSun,
  faLanguage,
  faTrash,
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../components/Logo';
import Sidebar from '../components/Sidebar';
import ToggleSwitch from '../components/ToggleSwitch';
import { styles } from '../styles/SettingsScreen.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';

const SettingsScreen = ({ onNavigateBack, onLogout }) => {
  const { t, getTextAlign, getFlexDirection, isRTL, currentLanguage, setLanguage } = useLanguage();
  const { theme, toggleTheme, colors, isDark } = useTheme();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleDeleteAccount = () => {
    Alert.alert(
      t('settings.deleteAccount'),
      t('settings.deleteAccountConfirm'),
      [
        {
          text: t('settings.cancel'),
          style: 'cancel',
        },
        {
          text: t('settings.delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              // Clear all user data
              await AsyncStorage.multiRemove([
                'userProfile',
                'userProfileImage',
                'userToken',
                // Add other keys as needed
              ]);
              
              // Show success message
              Alert.alert(
                t('settings.success'),
                t('settings.accountDeleted'),
                [
                  {
                    text: t('settings.ok'),
                    onPress: () => {
                      if (onLogout) {
                        onLogout();
                      }
                    },
                  },
                ]
              );
            } catch (error) {
              console.error('Error deleting account:', error);
              Alert.alert(t('settings.error'), t('settings.errorDeletingAccount'));
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    setLanguage(newLanguage);
  };

  const settingItems = [
    {
      id: 'theme',
      icon: isDark ? faMoon : faSun,
      title: t('settings.theme'),
      subtitle: isDark ? t('settings.darkMode') : t('settings.lightMode'),
      type: 'toggle',
      value: isDark,
      onToggle: (value) => toggleTheme(value),
    },
    {
      id: 'language',
      icon: faLanguage,
      title: t('settings.language'),
      subtitle: currentLanguage === 'ar' ? t('settings.arabic') : t('settings.english'),
      type: 'action',
      onPress: handleLanguageChange,
    },
  ];

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
          
          <View style={styles.logoContainer}>
            <Logo width={120} height={40} />
          </View>
          
          <TouchableOpacity
            style={styles.backButton}
            onPress={onNavigateBack}
          >
            <FontAwesomeIcon 
              icon={rtl ? faArrowRight : faArrowLeft} 
              size={22} 
              color={colors.text} 
            />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={[styles.title, { textAlign, color: colors.text }]}>
            {t('settings.title')}
          </Text>
        </View>

        {/* Settings Items */}
        <View style={styles.settingsContainer}>
          {settingItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.settingItem, { backgroundColor: colors.surface }]}
              onPress={item.type === 'action' ? item.onPress : undefined}
              activeOpacity={item.type === 'action' ? 0.7 : 1}
            >
              <View style={[styles.settingContent, { flexDirection }]}>
                <View style={[styles.settingIconContainer, { backgroundColor: colors.primary + '15' }]}>
                  <FontAwesomeIcon icon={item.icon} size={20} color={colors.primary} />
                </View>
                <View style={styles.settingTextContainer}>
                  <Text style={[styles.settingTitle, { textAlign, color: colors.text }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.settingSubtitle, { textAlign, color: colors.textSecondary }]}>
                    {item.subtitle}
                  </Text>
                </View>
                {item.type === 'toggle' ? (
                  <ToggleSwitch
                    value={item.value}
                    onValueChange={item.onToggle}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={rtl ? faChevronLeft : faChevronRight}
                    size={16}
                    color={colors.textSecondary}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Delete Account Section */}
        <View style={styles.deleteSection}>
          <TouchableOpacity
            style={[styles.deleteButton, { backgroundColor: colors.error + '15' }]}
            onPress={handleDeleteAccount}
            activeOpacity={0.8}
          >
            <FontAwesomeIcon icon={faTrash} size={20} color={colors.error} />
            <Text style={[styles.deleteButtonText, { textAlign, color: colors.error }]}>
              {t('settings.deleteAccount')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Sidebar */}
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        activeItem="settings"
        onLogout={onLogout}
      />
    </View>
  );
};

export default SettingsScreen;

