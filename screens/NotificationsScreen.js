import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faBars,
  faArrowRight,
  faArrowLeft,
  faBell,
  faCheckCircle,
  faClock,
  faTimes,
  faTicketAlt,
  faMobileAlt,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import { styles } from '../styles/NotificationsScreen.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';

const NotificationsScreen = ({ onLogout, onNavigateToProfile, onNavigateToSettings, onNavigateToHome, onNavigateToFinanceRequests, onNavigateToNotifications, onNavigateToTickets, onNavigateToContact }) => {
  const { t, getTextAlign, getFlexDirection, isRTL } = useLanguage();
  const { colors, isDark } = useTheme();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Mock data - سيتم جلبها من API لاحقاً
  const mockNotifications = [
    {
      id: 1,
      type: 'status',
      title: t('notifications.statusUpdate'),
      message: t('notifications.statusUpdateMessage'),
      date: '2025-11-20',
      time: '10:30 AM',
      isRead: false,
      icon: faCheckCircle,
      iconColor: '#28A745',
    },
    {
      id: 2,
      type: 'ticket',
      title: t('notifications.ticketUpdate'),
      message: t('notifications.ticketUpdateMessage'),
      date: '2025-11-19',
      time: '02:15 PM',
      isRead: false,
      icon: faTicketAlt,
      iconColor: '#007BFF',
    },
    {
      id: 3,
      type: 'app',
      title: t('notifications.appUpdate'),
      message: t('notifications.appUpdateMessage'),
      date: '2025-11-18',
      time: '09:00 AM',
      isRead: true,
      icon: faMobileAlt,
      iconColor: '#6C757D',
    },
    {
      id: 4,
      type: 'status',
      title: t('notifications.statusUpdate'),
      message: t('notifications.statusRejectedMessage'),
      date: '2025-11-17',
      time: '04:45 PM',
      isRead: true,
      icon: faTimes,
      iconColor: '#DC3545',
    },
    {
      id: 5,
      type: 'ticket',
      title: t('notifications.ticketNew'),
      message: t('notifications.ticketNewMessage'),
      date: '2025-11-16',
      time: '11:20 AM',
      isRead: false,
      icon: faTicketAlt,
      iconColor: '#007BFF',
    },
    {
      id: 6,
      type: 'app',
      title: t('notifications.appMaintenance'),
      message: t('notifications.appMaintenanceMessage'),
      date: '2025-11-15',
      time: '08:00 AM',
      isRead: true,
      icon: faInfoCircle,
      iconColor: '#FFC107',
    },
    {
      id: 7,
      type: 'status',
      title: t('notifications.statusUpdate'),
      message: t('notifications.statusInProgressMessage'),
      date: '2025-11-14',
      time: '03:30 PM',
      isRead: true,
      icon: faClock,
      iconColor: '#007BFF',
    },
  ];

  const getNotificationTypeLabel = (type) => {
    switch (type) {
      case 'status':
        return t('notifications.typeStatus');
      case 'ticket':
        return t('notifications.typeTicket');
      case 'app':
        return t('notifications.typeApp');
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);

      if (checkDate.getTime() === today.getTime()) {
        return t('notifications.today');
      } else if (checkDate.getTime() === yesterday.getTime()) {
        return t('notifications.yesterday');
      } else {
        // Format date based on language
        const lang = rtl ? 'ar-SA' : 'en-US';
        return date.toLocaleDateString(lang, { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
      }
    } catch (error) {
      return dateString;
    }
  };

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

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
            {t('notifications.title')}
          </Text>
          
          {onNavigateToHome && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={onNavigateToHome}
              activeOpacity={0.7}
            >
              <View style={styles.logoCircle}>
                <FontAwesomeIcon icon={rtl ? faArrowRight : faArrowLeft} size={16} color={colors.primary} />
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Unread Count Badge */}
        {unreadCount > 0 && (
          <View style={[styles.unreadBadge, { flexDirection }]}>
            <Text style={[styles.unreadText, { textAlign, color: colors.text }]}>
              {unreadCount === 1 
                ? t('notifications.unreadCount', { count: unreadCount })
                : t('notifications.unreadCountPlural', { count: unreadCount })}
            </Text>
          </View>
        )}

        {/* Notifications List */}
        <View style={styles.notificationsList}>
          {mockNotifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationCard,
                !notification.isRead && styles.notificationCardUnread,
                { backgroundColor: colors.cardBackground || '#FFFFFF' },
              ]}
              activeOpacity={0.7}
            >
              <View style={[styles.notificationContent, { flexDirection }]}>
                {/* Icon */}
                <View
                  style={[
                    styles.notificationIcon,
                    { backgroundColor: notification.iconColor + '20' },
                  ]}
                >
                  <FontAwesomeIcon
                    icon={notification.icon}
                    size={20}
                    color={notification.iconColor}
                  />
                </View>

                {/* Content */}
                <View style={[styles.notificationTextContainer, { flex: 1 }]}>
                  <View style={[styles.notificationHeader, { flexDirection }]}>
                    <Text style={[styles.notificationTitle, { textAlign, color: colors.text }]}>
                      {notification.title}
                    </Text>
                    {!notification.isRead && (
                      <View style={styles.unreadDot} />
                    )}
                  </View>
                  
                  <Text style={[styles.notificationMessage, { textAlign, color: colors.textSecondary }]}>
                    {notification.message}
                  </Text>
                  
                  <View style={[styles.notificationFooter, { flexDirection }]}>
                    <Text style={[styles.notificationType, { textAlign, color: colors.textSecondary }]}>
                      {getNotificationTypeLabel(notification.type)}
                    </Text>
                    <Text style={[styles.notificationDate, { textAlign, color: colors.textSecondary }]}>
                      {formatDate(notification.date)} • {notification.time}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State (if no notifications) */}
        {mockNotifications.length === 0 && (
          <View style={styles.emptyState}>
            <FontAwesomeIcon icon={faBell} size={48} color={colors.textSecondary} />
            <Text style={[styles.emptyStateText, { textAlign, color: colors.textSecondary }]}>
              {t('notifications.noNotifications')}
            </Text>
          </View>
        )}
      </ScrollView>
      
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        activeItem="notifications"
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

export default NotificationsScreen;

