import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faUser,
  faTh,
  faBell,
  faTicketAlt,
  faCog,
  faPhone,
  faFileAlt,
  faShieldAlt,
  faSignOutAlt,
  faChevronLeft,
  faChevronRight,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import Logo from './Logo';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';
import { styles } from '../styles/Sidebar.styles';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = Math.min(width * 0.75, 320);

const Sidebar = ({ visible, onClose, activeItem = 'home', onLogout, onNavigateToHome, onNavigateToProfile, onNavigateToSettings, onNavigateToFinanceRequests, onNavigateToNotifications, onNavigateToTickets, onNavigateToContact }) => {
  const { t, isRTL } = useLanguage();
  const { colors, isDark } = useTheme();
  const rtl = isRTL();
  // السايدبار يفتح دائماً من اليسار
  const slideAnim = React.useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -SIDEBAR_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const menuItems = [
    { key: 'home', icon: faHome, label: t('sidebar.home') },
    { key: 'profile', icon: faUser, label: t('sidebar.myProfile') },
    { key: 'funding', icon: faTh, label: t('sidebar.fundingRequests') },
    { key: 'notifications', icon: faBell, label: t('sidebar.notifications') },
    { key: 'tickets', icon: faTicketAlt, label: t('sidebar.myTickets') },
    { key: 'settings', icon: faCog, label: t('sidebar.settings') },
    { key: 'contact', icon: faPhone, label: t('sidebar.contactUs') },
  ];

  const handleMenuItemPress = (key) => {
    console.log(`Menu item pressed: ${key}`);
    // Close sidebar first
    if (onClose) {
      onClose();
    }
    // Navigate immediately - the navigation functions will handle screenKey update
    // Handle navigation based on menu item - always navigate even if already on the page
    if (key === 'home' && onNavigateToHome) {
      onNavigateToHome();
    } else if (key === 'profile' && onNavigateToProfile) {
      onNavigateToProfile();
    } else if (key === 'settings' && onNavigateToSettings) {
      onNavigateToSettings();
    } else if (key === 'funding' && onNavigateToFinanceRequests) {
      onNavigateToFinanceRequests();
    } else if (key === 'notifications' && onNavigateToNotifications) {
      onNavigateToNotifications();
    } else if (key === 'tickets' && onNavigateToTickets) {
      onNavigateToTickets();
    } else if (key === 'contact' && onNavigateToContact) {
      onNavigateToContact();
    }
  };

  const handleTermsPress = () => {
    console.log('Terms and Conditions pressed');
    // Add navigation logic here
  };

  const handlePrivacyPress = () => {
    console.log('Privacy Policy pressed');
    // Add navigation logic here
  };

  const handleLogout = () => {
    console.log('Logout pressed');
    onClose();
    if (onLogout) {
      onLogout();
    }
  };

  const flexDirection = rtl ? 'row-reverse' : 'row';
  const textAlign = rtl ? 'right' : 'left';

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.sidebar,
            {
              transform: [{ translateX: slideAnim }],
              // السايدبار يفتح دائماً من اليسار
              left: 0,
            },
          ]}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header with Logo */}
            <View style={[styles.header, { flexDirection }]}>
              <View style={[styles.logoContainer, { flexDirection }]}>
                <Logo width={180} height={60} />
              </View>
            </View>

            {/* Menu Items */}
            <View style={styles.menuItems}>
              {menuItems.map((item) => {
                const isActive = activeItem === item.key;
                return (
                  <TouchableOpacity
                    key={item.key}
                    style={[
                      styles.menuItem,
                      { flexDirection },
                      isActive && styles.menuItemActive,
                    ]}
                    onPress={() => handleMenuItemPress(item.key)}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      size={22}
                      color={isActive ? colors.primary : colors.text}
                    />
                    <Text
                      style={[
                        styles.menuItemText,
                        { textAlign, color: isActive ? colors.primary : colors.text },
                        isActive && styles.menuItemTextActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Separator */}
            <View style={[styles.separator, { backgroundColor: colors.border }]} />

            {/* Legal Information Section */}
            <View style={styles.legalSection}>
              <View style={[styles.legalHeader, { flexDirection }]}>
                <Text
                  style={[
                    styles.legalHeaderText,
                    { textAlign, color: colors.text },
                  ]}
                >
                  {t('sidebar.legalInformation')}
                </Text>
                <FontAwesomeIcon
                  icon={faFileAlt}
                  size={18}
                  color={colors.text}
                />
              </View>

              <View style={styles.legalItems}>
                <TouchableOpacity
                  style={[styles.legalButton, { flexDirection: rtl ? 'row-reverse' : 'row' }]}
                  onPress={handleTermsPress}
                >
                  <FontAwesomeIcon
                    icon={rtl ? faChevronLeft : faChevronRight}
                    size={14}
                    color="#BDC3C7"
                    style={styles.legalChevron}
                  />
                  <Text
                    style={[
                      styles.legalButtonText,
                      { textAlign, color: colors.text },
                    ]}
                  >
                    {t('sidebar.termsAndConditions')}
                  </Text>
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    size={20}
                    color={colors.primary}
                    style={styles.legalIcon}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.legalButton, { flexDirection: rtl ? 'row-reverse' : 'row' }]}
                  onPress={handlePrivacyPress}
                >
                  <FontAwesomeIcon
                    icon={rtl ? faChevronLeft : faChevronRight}
                    size={14}
                    color="#BDC3C7"
                    style={styles.legalChevron}
                  />
                  <Text
                    style={[
                      styles.legalButtonText,
                      { textAlign, color: colors.text },
                    ]}
                  >
                    {t('sidebar.privacyPolicy')}
                  </Text>
                  <FontAwesomeIcon
                    icon={faLock}
                    size={20}
                    color={colors.primary}
                    style={styles.legalIcon}
                  />
                </TouchableOpacity>
              </View>

              {/* License Text */}
              <Text style={[styles.licenseText, { textAlign, color: colors.textSecondary }]}>
                {t('sidebar.licensedBy')}
              </Text>
            </View>

            {/* Logout Button */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                size={24}
                color={colors.primary}
              />
              <Text
                style={[
                  styles.logoutText,
                  { textAlign, color: colors.primary },
                ]}
              >
                {t('sidebar.logout')}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Sidebar;

