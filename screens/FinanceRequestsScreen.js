import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faBars,
  faChevronDown,
  faChevronUp,
  faCheck,
  faTimes,
  faAsterisk,
  faArrowRight,
  faArrowLeft,
  faFileAlt,
  faFileInvoice,
  faClipboardList,
  faFileContract,
  faClock,
  faHourglassHalf,
  faSpinner,
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import { styles } from '../styles/FinanceRequestsScreen.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';

const FinanceRequestsScreen = ({ onLogout, onNavigateToProfile, onNavigateToSettings, onNavigateToHome, onNavigateToFinanceRequests, onNavigateToNotifications, onNavigateToTickets, onNavigateToContact }) => {
  const { t, getTextAlign, getFlexDirection, isRTL } = useLanguage();
  const { colors, isDark } = useTheme();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('completed'); // 'completed' or 'inProgress'
  const [expandedCards, setExpandedCards] = useState({ 1: true }); // First card expanded by default

  // Mock data - سيتم جلبها من API لاحقاً
  const mockApplications = {
    completed: [
      {
        id: 1,
        status: 'completed',
        statusText: t('financeRequests.completed'),
        financeType: t('home.personalFinance'),
        financeTypeLabel: t('financeRequests.financeType'),
        provider: 'SPOT',
        providerAr: 'سبوت',
        amount: '30,000',
        duration: '60',
        durationUnit: t('financeRequests.months'),
        apr: '4.5',
        date: 'October 11, 2025',
        company: 'Company Testing',
        values: t('financeRequests.values'),
      },
      {
        id: 2,
        status: 'rejected',
        statusText: t('financeRequests.rejected'),
        financeType: t('home.personalFinance'),
        financeTypeLabel: t('financeRequests.financeType'),
        provider: 'SPOT',
        providerAr: 'سبوت',
        amount: '25,000',
        duration: '48',
        durationUnit: t('financeRequests.months'),
        apr: '5.0',
        date: 'September 15, 2025',
        company: 'Company Testing',
        values: t('financeRequests.values'),
      },
    ],
    inProgress: [
      {
        id: 3,
        status: 'inProgress',
        statusText: t('financeRequests.underProcess'),
        financeType: t('home.personalFinance'),
        financeTypeLabel: t('financeRequests.financeType'),
        provider: 'Riyad Bank',
        providerAr: 'بنك الرياض',
        amount: '35,000',
        duration: '60',
        durationUnit: t('financeRequests.months'),
        apr: '4.2',
        date: 'November 20, 2025',
        company: 'Riyad Bank',
        values: t('financeRequests.values'),
      },
      {
        id: 4,
        status: 'inProgress',
        statusText: t('financeRequests.underProcess'),
        financeType: t('home.personalFinance'),
        financeTypeLabel: t('financeRequests.financeType'),
        provider: 'Riyad Bank',
        providerAr: 'بنك الرياض',
        amount: '40,000',
        duration: '72',
        durationUnit: t('financeRequests.months'),
        apr: '4.0',
        date: 'November 18, 2025',
        company: 'Riyad Bank',
        values: t('financeRequests.values'),
      },
      {
        id: 5,
        status: 'inProgress',
        statusText: t('financeRequests.underProcess'),
        financeType: t('home.personalFinance'),
        financeTypeLabel: t('financeRequests.financeType'),
        provider: 'Riyad Bank',
        providerAr: 'بنك الرياض',
        amount: '30,000',
        duration: '60',
        durationUnit: t('financeRequests.months'),
        apr: '4.5',
        date: 'November 15, 2025',
        company: 'Riyad Bank',
        values: t('financeRequests.values'),
      },
      {
        id: 6,
        status: 'inProgress',
        statusText: t('financeRequests.underProcess'),
        financeType: t('home.personalFinance'),
        financeTypeLabel: t('financeRequests.financeType'),
        provider: 'Riyad Bank',
        providerAr: 'بنك الرياض',
        amount: '28,000',
        duration: '48',
        durationUnit: t('financeRequests.months'),
        apr: '4.8',
        date: 'November 12, 2025',
        company: 'Riyad Bank',
        values: t('financeRequests.values'),
      },
      {
        id: 7,
        status: 'inProgress',
        statusText: t('financeRequests.underProcess'),
        financeType: t('home.personalFinance'),
        financeTypeLabel: t('financeRequests.financeType'),
        provider: 'Riyad Bank',
        providerAr: 'بنك الرياض',
        amount: '32,000',
        duration: '60',
        durationUnit: t('financeRequests.months'),
        apr: '4.3',
        date: 'November 10, 2025',
        company: 'Riyad Bank',
        values: t('financeRequests.values'),
      },
      {
        id: 8,
        status: 'inProgress',
        statusText: t('financeRequests.underProcess'),
        financeType: t('home.personalFinance'),
        financeTypeLabel: t('financeRequests.financeType'),
        provider: 'Riyad Bank',
        providerAr: 'بنك الرياض',
        amount: '36,000',
        duration: '72',
        durationUnit: t('financeRequests.months'),
        apr: '4.1',
        date: 'November 8, 2025',
        company: 'Riyad Bank',
        values: t('financeRequests.values'),
      },
    ],
  };

  const toggleCard = (cardId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FontAwesomeIcon icon={faCheck} size={16} color="#FFFFFF" />;
      case 'rejected':
        return <FontAwesomeIcon icon={faTimes} size={16} color="#FFFFFF" />;
      case 'inProgress':
        return <FontAwesomeIcon icon={faClock} size={16} color="#FFFFFF" />;
      default:
        return null;
    }
  };

  const getStatusIconColor = (status) => {
    switch (status) {
      case 'completed':
        return '#28A745';
      case 'rejected':
        return '#DC3545';
      case 'inProgress':
        return '#007BFF';
      default:
        return '#6C757D';
    }
  };

  // Reset expanded cards when tab changes and expand first card
  useEffect(() => {
    const applications = mockApplications[activeTab] || [];
    if (applications.length > 0) {
      setExpandedCards({ [applications[0].id]: true });
    } else {
      setExpandedCards({});
    }
  }, [activeTab]);

  const currentApplications = mockApplications[activeTab] || [];

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
            {t('financeRequests.title')}
          </Text>
          
          <View style={[styles.headerRight, { flexDirection }]}>
            {onNavigateToNotifications && (
              <TouchableOpacity
                style={styles.notificationButton}
                onPress={onNavigateToNotifications}
                activeOpacity={0.7}
              >
                <FontAwesomeIcon icon={faBell} size={22} color={colors.primary} />
              </TouchableOpacity>
            )}
            
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
        </View>

        {/* Segmented Control */}
        <View style={[styles.segmentedControl, { flexDirection }]}>
          <TouchableOpacity
            style={[
              styles.segment,
              activeTab === 'completed' && styles.segmentActive,
              { borderColor: colors.border || '#E0E0E0' },
            ]}
            onPress={() => setActiveTab('completed')}
          >
            <Text
              style={[
                styles.segmentText,
                activeTab === 'completed' && styles.segmentTextActive,
                { color: activeTab === 'completed' ? colors.text : colors.textSecondary },
              ]}
            >
              {t('financeRequests.completed')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.segment,
              activeTab === 'inProgress' && styles.segmentActive,
              { borderColor: colors.border || '#E0E0E0' },
            ]}
            onPress={() => setActiveTab('inProgress')}
          >
            <Text
              style={[
                styles.segmentText,
                activeTab === 'inProgress' && styles.segmentTextActive,
                { color: activeTab === 'inProgress' ? colors.text : colors.textSecondary },
              ]}
            >
              {t('financeRequests.inProgress')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Section Header */}
        <View style={[styles.sectionHeader, { flexDirection: 'initial' }]}>
          <Text style={[styles.sectionTitle, { textAlign: 'right', color: colors.text }]}>
            {t('financeRequests.title')}
          </Text>
          <View style={[styles.sectionIcon, { backgroundColor: colors.primary }]}>
            <FontAwesomeIcon icon={faFileInvoice} size={16} color="#FFFFFF" />
          </View>
        </View>

        {/* Applications List */}
        <View style={styles.applicationsList}>
          {currentApplications.map((app) => {
            const isExpanded = expandedCards[app.id];
            return (
              <View
                key={app.id}
                style={[
                  styles.applicationCard,
                  isExpanded && styles.applicationCardExpanded,
                  { backgroundColor: colors.cardBackground || '#FFFFFF' },
                ]}
              >
                {/* Card Header */}
                <TouchableOpacity
                  style={[styles.cardHeader, { flexDirection: 'initial' }]}
                  onPress={() => toggleCard(app.id)}
                >
                  <View style={[styles.cardHeaderLeft, { flexDirection: 'initial' }]}>
                    <FontAwesomeIcon
                      icon={isExpanded ? faChevronUp : faChevronDown}
                      size={18}
                      color={colors.text}
                    />
                    <Text style={[styles.statusText, { color: colors.text }]}>
                      {app.statusText}
                    </Text>
                    <View
                      style={[
                        styles.statusIcon,
                        { backgroundColor: getStatusIconColor(app.status) },
                      ]}
                    >
                      {getStatusIcon(app.status)}
                    </View>
                  </View>
                  
                  <View style={[styles.cardHeaderRight, { flexDirection }]}>
                    <View style={styles.financeTypeContainer}>
                      <Text style={[styles.financeTypeLabel, { color: colors.text }]}>
                        {app.financeTypeLabel}
                      </Text>
                      <Text style={[styles.financeTypeValue, { color: colors.textSecondary }]}>
                        {app.financeType}
                      </Text>
                    </View>
                    <View style={styles.providerLogo}>
                      <Text style={styles.providerText}>{app.provider}</Text>
                      <Text style={styles.providerTextAr}>{app.providerAr}</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Card Details (Expanded) */}
                {isExpanded && (
                  <View style={styles.cardDetails}>
                    <View style={[styles.detailsRow, { flexDirection }]}>
                      <View style={styles.detailsColumn}>
                        <Text style={[styles.detailLabel, { textAlign, color: colors.text }]}>
                          {t('financeRequests.financeAmount')}
                        </Text>
                        <Text style={[styles.detailValue, { textAlign, color: colors.text }]}>
                          SAR {app.amount}
                        </Text>
                      </View>
                      <View style={styles.detailsColumn}>
                        <Text style={[styles.detailLabel, { textAlign, color: colors.text }]}>
                          {t('financeRequests.financeDuration')}
                        </Text>
                        <Text style={[styles.detailValue, { textAlign, color: colors.text }]}>
                          {app.duration} {app.durationUnit}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={[styles.detailsRow, { flexDirection }]}>
                      <View style={styles.detailsColumn}>
                        <Text style={[styles.detailLabel, { textAlign, color: colors.text }]}>
                          {t('financeRequests.apr')}
                        </Text>
                        <Text style={[styles.detailValue, { textAlign, color: colors.text }]}>
                          {app.apr}%
                        </Text>
                      </View>
                      <View style={styles.detailsColumn}>
                        <Text style={[styles.detailLabel, { textAlign, color: colors.text }]}>
                          {t('financeRequests.date')}
                        </Text>
                        <Text style={[styles.detailValue, { textAlign, color: colors.text }]}>
                          {app.date}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={[styles.companyInfo, { flexDirection }]}>
                      <Text style={[styles.companyText, { textAlign, color: colors.textSecondary }]}>
                        {app.company}
                      </Text>
                      <Text style={[styles.valuesText, { textAlign, color: colors.textSecondary }]}>
                        {app.values}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
      
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        activeItem="funding"
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

export default FinanceRequestsScreen;

