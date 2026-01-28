import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  AppState,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faBars,
  faBell,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../components/Logo';
import Sidebar from '../components/Sidebar';
import PermissionModal from '../components/PermissionModal';
import { styles } from '../styles/HomeScreen.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';

const HomeScreen = ({ username = 'jorie', onLogout, onNavigateToEligibility, onNavigateToProfile, onNavigateToSettings, onNavigateToHome, onNavigateToFinanceRequests, onNavigateToNotifications, onNavigateToTickets, onNavigateToContact }) => {
  const { t, getTextAlign, getFlexDirection } = useLanguage();
  const { colors, isDark } = useTheme();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  // Load profile image
  const loadProfileImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem('userProfileImage');
      if (savedImage) {
        setProfileImage(savedImage);
      }
    } catch (error) {
      console.error('Error loading profile image:', error);
    }
  };

  // Show permission modals on mount
  useEffect(() => {
    // Load profile image
    loadProfileImage();

    // Show location modal first after a delay
    const timer1 = setTimeout(() => {
      setShowLocationModal(true);
    }, 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  // Reload profile image when app comes to foreground
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        loadProfileImage();
      }
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  // Reload image when navigating back to this screen
  useEffect(() => {
    const unsubscribe = () => {
      loadProfileImage();
    };
    
    // This will be called when component is focused
    const timer = setTimeout(() => {
      loadProfileImage();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleLocationModalClose = () => {
    setShowLocationModal(false);
    // Show notifications modal after location modal is closed
    setTimeout(() => {
      setShowNotificationsModal(true);
    }, 500);
  };

  const handleNotificationsModalClose = () => {
    setShowNotificationsModal(false);
  };

  const products = [
    {
      id: 1,
      title: t('home.realEstateFinance'),
      iconSource: require('../assets/mortage_icon.png'),
      backgroundColor: '#E62130',
      buttonText: t('home.applyNow'),
      onPress: () => {
        if (onNavigateToEligibility) {
          onNavigateToEligibility({
            id: 1,
            title: t('home.realEstateFinance'),
            iconSource: require('../assets/mortage_icon.png'),
            backgroundColor: '#E62130',
          });
        }
      },
    },
    {
      id: 2,
      title: t('home.personalFinance'),
      iconSource: require('../assets/personal_finance.png'),
      backgroundColor: '#C41E3A',
      buttonText: t('home.applyNow'),
      onPress: () => {
        if (onNavigateToEligibility) {
          onNavigateToEligibility({
            id: 2,
            title: t('home.personalFinance'),
            iconSource: require('../assets/personal_finance.png'),
            backgroundColor: '#C41E3A',
          });
        }
      },
    },
    {
      id: 3,
      title: t('home.creditCards'),
      iconSource: require('../assets/credit_card_icon.png'),
      backgroundColor: '#2C3E50',
      buttonText: t('home.comingSoon'),
      onPress: () => {
        if (onNavigateToEligibility) {
          onNavigateToEligibility({
            id: 3,
            title: t('home.creditCards'),
            iconSource: require('../assets/credit_card_icon.png'),
            backgroundColor: '#2C3E50',
          });
        }
      },
      disabled: true,
    },
    {
      id: 4,
      title: t('home.carFinance'),
      iconSource: require('../assets/fin_car_icon.png'),
      backgroundColor: '#2C3E50',
      buttonText: t('home.applyNow'),
      onPress: () => {
        if (onNavigateToEligibility) {
          onNavigateToEligibility({
            id: 4,
            title: t('home.carFinance'),
            iconSource: require('../assets/fin_car_icon.png'),
            backgroundColor: '#2C3E50',
          });
        }
      },
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
          
          <View style={[styles.headerIcons, { flexDirection }]}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => {
                if (onNavigateToNotifications) {
                  onNavigateToNotifications();
                }
              }}
            >
              <FontAwesomeIcon icon={faBell} size={22} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => {
                if (onNavigateToProfile) {
                  onNavigateToProfile();
                }
              }}
            >
              {profileImage ? (
                <Image 
                  source={{ uri: profileImage }} 
                  style={styles.profileImageIcon}
                />
              ) : (
                <FontAwesomeIcon icon={faUserCircle} size={24} color={colors.text} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={[styles.welcomeText, { textAlign, color: colors.text }]}>
            {t('home.welcome').replace('{username}', username)}
          </Text>
          <Text style={[styles.descriptionText, { textAlign, color: colors.textSecondary }]}>
            {t('home.description')}
          </Text>
        </View>

        {/* Products Heading */}
        <Text style={[styles.productsHeading, { textAlign, color: colors.text }]}>
          {t('home.productsHeading')}
        </Text>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={[
                styles.productCard,
                { backgroundColor: product.backgroundColor },
                product.disabled && styles.productCardDisabled,
              ]}
              onPress={() => {
                if (!product.disabled) {
                  product.onPress();
                }
              }}
              disabled={product.disabled}
            >
              <View style={styles.productIconContainer}>
                <Image
                  source={product.iconSource}
                  style={styles.productIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.productTitle}>{product.title}</Text>
              <TouchableOpacity
                style={styles.productButton}
                onPress={(e) => {
                  e.stopPropagation();
                  if (!product.disabled) {
                    product.onPress();
                  }
                }}
                disabled={product.disabled}
              >
                <Text
                  style={[
                    styles.productButtonText,
                    product.disabled && styles.productButtonTextDisabled,
                  ]}
                >
                  {product.buttonText}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Medium and Small Enterprises Section */}
        <View style={styles.enterprisesSection}>
          <View style={[styles.enterprisesContent, { flexDirection }]}>
            <View style={styles.enterprisesIconContainer}>
              <Image
                source={require('../assets/Frame 51092.png')}
                style={styles.enterprisesIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={[styles.enterprisesText, { textAlign, color: colors.text }]}>
              {t('home.enterprisesText')}
              <Text style={[styles.comingSoonText, { color: colors.textSecondary }]}> {t('home.comingSoon')}</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        activeItem="home"
        onLogout={onLogout}
        onNavigateToHome={onNavigateToHome}
        onNavigateToProfile={onNavigateToProfile}
        onNavigateToSettings={onNavigateToSettings}
        onNavigateToFinanceRequests={onNavigateToFinanceRequests}
        onNavigateToNotifications={onNavigateToNotifications}
        onNavigateToTickets={onNavigateToTickets}
        onNavigateToContact={onNavigateToContact}
      />

      {/* Permission Modals */}
      <PermissionModal
        visible={showLocationModal}
        type="location"
        onAllow={async () => {
          // Request location permission
          try {
            // You can add expo-location here if needed
            // const { status } = await Location.requestForegroundPermissionsAsync();
            console.log('Location permission granted');
          } catch (error) {
            console.error('Error requesting location permission:', error);
          }
          handleLocationModalClose();
        }}
        onDeny={() => {
          handleLocationModalClose();
        }}
        onClose={handleLocationModalClose}
      />

      <PermissionModal
        visible={showNotificationsModal}
        type="notifications"
        onAllow={async () => {
          // Request notification permission
          try {
            // You can add expo-notifications here if needed
            // const { status } = await Notifications.requestPermissionsAsync();
            console.log('Notifications permission granted');
          } catch (error) {
            console.error('Error requesting notifications permission:', error);
          }
          handleNotificationsModalClose();
        }}
        onDeny={() => {
          handleNotificationsModalClose();
        }}
        onClose={handleNotificationsModalClose}
      />
    </View>
  );
};

export default HomeScreen;

