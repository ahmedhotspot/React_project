import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faBars,
  faArrowRight,
  faArrowLeft,
  faTicketAlt,
  faPlus,
  faTimes,
  faCheckCircle,
  faClock,
  faSpinner,
  faChevronDown,
  faChevronUp,
  faPaperclip,
  faUser,
  faEnvelope,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Dropdown from '../components/Dropdown';
import DatePicker from '../components/DatePicker';
import { styles } from '../styles/TicketsScreen.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';

const TicketsScreen = ({ onLogout, onNavigateToProfile, onNavigateToSettings, onNavigateToHome, onNavigateToFinanceRequests, onNavigateToNotifications, onNavigateToTickets, onNavigateToContact }) => {
  const { t, getTextAlign, getFlexDirection, isRTL } = useLanguage();
  const { colors, isDark } = useTheme();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [expandedTickets, setExpandedTickets] = useState({});
  
  // Form state
  const [ticketName, setTicketName] = useState('jorie'); // Pre-filled from user profile
  const [ticketEmail, setTicketEmail] = useState('');
  const [ticketProduct, setTicketProduct] = useState('');
  const [ticketDate, setTicketDate] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketError, setTicketError] = useState({});

  // Mock data - سيتم جلبها من API لاحقاً
  const mockTickets = [
    {
      id: 1,
      ticketNumber: '#1234',
      subject: t('tickets.exampleSubject1'),
      description: t('tickets.exampleDescription1'),
      status: 'open',
      statusText: t('tickets.statusOpen'),
      date: '2025-11-20',
      time: '10:30 AM',
      lastUpdate: '2025-11-20 10:30 AM',
      priority: 'high',
      priorityText: t('tickets.priorityHigh'),
    },
    {
      id: 2,
      ticketNumber: '#1235',
      subject: t('tickets.exampleSubject2'),
      description: t('tickets.exampleDescription2'),
      status: 'inProgress',
      statusText: t('tickets.statusInProgress'),
      date: '2025-11-19',
      time: '02:15 PM',
      lastUpdate: '2025-11-19 02:15 PM',
      priority: 'medium',
      priorityText: t('tickets.priorityMedium'),
    },
    {
      id: 3,
      ticketNumber: '#1236',
      subject: t('tickets.exampleSubject3'),
      description: t('tickets.exampleDescription3'),
      status: 'closed',
      statusText: t('tickets.statusClosed'),
      date: '2025-11-18',
      time: '09:00 AM',
      lastUpdate: '2025-11-18 05:00 PM',
      priority: 'low',
      priorityText: t('tickets.priorityLow'),
    },
    {
      id: 4,
      ticketNumber: '#1237',
      subject: t('tickets.exampleSubject4'),
      description: t('tickets.exampleDescription4'),
      status: 'open',
      statusText: t('tickets.statusOpen'),
      date: '2025-11-17',
      time: '04:45 PM',
      lastUpdate: '2025-11-17 04:45 PM',
      priority: 'high',
      priorityText: t('tickets.priorityHigh'),
    },
  ];

  const toggleTicket = (ticketId) => {
    setExpandedTickets((prev) => ({
      ...prev,
      [ticketId]: !prev[ticketId],
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return faTicketAlt;
      case 'inProgress':
        return faSpinner;
      case 'closed':
        return faCheckCircle;
      default:
        return faTicketAlt;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return '#DC3545';
      case 'inProgress':
        return '#007BFF';
      case 'closed':
        return '#28A745';
      default:
        return '#6C757D';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#DC3545';
      case 'medium':
        return '#FFC107';
      case 'low':
        return '#28A745';
      default:
        return '#6C757D';
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const lang = rtl ? 'ar-SA' : 'en-US';
      return date.toLocaleDateString(lang, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return dateString;
    }
  };

  const handleSubmitTicket = () => {
    const errors = {};
    
    if (!ticketName.trim()) {
      errors.name = t('tickets.nameRequired');
    }
    if (!ticketEmail.trim()) {
      errors.email = t('tickets.emailRequired');
    } else if (!ticketEmail.includes('@')) {
      errors.email = t('tickets.emailInvalid');
    }
    if (!ticketProduct) {
      errors.product = t('tickets.productRequired');
    }
    if (!ticketDate) {
      errors.date = t('tickets.dateRequired');
    }
    if (!ticketSubject) {
      errors.subject = t('tickets.subjectRequired');
    }
    if (!ticketMessage.trim()) {
      errors.message = t('tickets.messageRequired');
    }

    if (Object.keys(errors).length > 0) {
      setTicketError(errors);
      return;
    }

    // Here you would submit to API
    console.log('New ticket:', {
      name: ticketName,
      email: ticketEmail,
      product: ticketProduct,
      date: ticketDate,
      subject: ticketSubject,
      message: ticketMessage,
    });
    
    // Reset form
    setTicketName('jorie');
    setTicketEmail('');
    setTicketProduct('');
    setTicketDate('');
    setTicketSubject('');
    setTicketMessage('');
    setTicketError({});
    setShowNewTicketModal(false);
    
    // Show success message (you can add a toast notification here)
    alert(t('tickets.ticketSubmitted'));
  };

  const handleCancelTicket = () => {
    setTicketName('jorie');
    setTicketEmail('');
    setTicketProduct('');
    setTicketDate('');
    setTicketSubject('');
    setTicketMessage('');
    setTicketError({});
    setShowNewTicketModal(false);
  };

  // Product options for dropdown
  const productOptions = [
    { label: t('home.realEstateFinance'), value: 'realEstate' },
    { label: t('home.personalFinance'), value: 'personal' },
    { label: t('home.creditCards'), value: 'creditCards' },
    { label: t('home.carFinance'), value: 'car' },
  ];

  // Subject options for dropdown
  const subjectOptions = [
    { label: t('tickets.subjectTechnical'), value: 'technical' },
    { label: t('tickets.subjectComplaint'), value: 'complaint' },
    { label: t('tickets.subjectInquiry'), value: 'inquiry' },
    { label: t('tickets.subjectUpdate'), value: 'update' },
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
          
          <Text style={[styles.headerTitle, { textAlign, color: colors.text }]}>
            {t('tickets.title')}
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

        {/* New Ticket Button */}
        <View style={[styles.newTicketContainer, { flexDirection }]}>
          <TouchableOpacity
            style={[styles.newTicketButton, { backgroundColor: colors.primary }]}
            onPress={() => setShowNewTicketModal(true)}
            activeOpacity={0.8}
          >
            <FontAwesomeIcon icon={faPlus} size={18} color="#FFFFFF" />
            <Text style={styles.newTicketButtonText}>
              {t('tickets.newTicket')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tickets List */}
        <View style={styles.ticketsList}>
          {mockTickets.map((ticket) => {
            const isExpanded = expandedTickets[ticket.id];
            return (
              <View
                key={ticket.id}
                style={[
                  styles.ticketCard,
                  { backgroundColor: colors.cardBackground || '#FFFFFF' },
                ]}
              >
                {/* Ticket Header */}
                <TouchableOpacity
                  style={[styles.ticketHeader, { flexDirection }]}
                  onPress={() => toggleTicket(ticket.id)}
                >
                  <View style={[styles.ticketHeaderLeft, { flexDirection }]}>
                    <FontAwesomeIcon
                      icon={isExpanded ? faChevronUp : faChevronDown}
                      size={16}
                      color={colors.textSecondary}
                    />
                    <View
                      style={[
                        styles.statusIcon,
                        { backgroundColor: getStatusColor(ticket.status) + '20' },
                      ]}
                    >
                      <FontAwesomeIcon
                        icon={getStatusIcon(ticket.status)}
                        size={16}
                        color={getStatusColor(ticket.status)}
                      />
                    </View>
                    <View style={styles.ticketInfo}>
                      <Text style={[styles.ticketNumber, { color: colors.text }]}>
                        {ticket.ticketNumber}
                      </Text>
                      <Text style={[styles.ticketSubject, { color: colors.text }]}>
                        {ticket.subject}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={[styles.ticketHeaderRight, { flexDirection }]}>
                    <View
                      style={[
                        styles.priorityBadge,
                        { backgroundColor: getPriorityColor(ticket.priority) + '20' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.priorityText,
                          { color: getPriorityColor(ticket.priority) },
                        ]}
                      >
                        {ticket.priorityText}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Ticket Details (Expanded) */}
                {isExpanded && (
                  <View style={styles.ticketDetails}>
                    <View style={[styles.detailRow, { flexDirection: rtl ? 'row' : 'row', justifyContent: rtl ? 'flex-end' : 'flex-start' }]}>
                      <Text style={[styles.detailLabel, { textAlign: 'right', color: colors.textSecondary }]}>
                        {t('tickets.status')}:
                      </Text>
                      <View
                        style={[
                          styles.statusBadge,
                          { backgroundColor: getStatusColor(ticket.status) + '20' },
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusText,
                            { color: getStatusColor(ticket.status) },
                          ]}
                        >
                          {ticket.statusText}
                        </Text>
                      </View>
                    </View>

                    <View style={[styles.detailRow, { flexDirection: rtl ? 'row' : 'row', justifyContent: rtl ? 'flex-end' : 'flex-start' }]}>
                      <Text style={[styles.detailLabel, { textAlign: 'right', color: colors.textSecondary }]}>
                        {t('tickets.description')}:
                      </Text>
                      <Text style={[styles.detailValue, { textAlign: 'right', color: colors.text }]}>
                        {ticket.description}
                      </Text>
                    </View>

                    <View style={[styles.detailRow, { flexDirection: rtl ? 'row' : 'row', justifyContent: rtl ? 'flex-end' : 'flex-start' }]}>
                      <Text style={[styles.detailLabel, { textAlign: 'right', color: colors.textSecondary }]}>
                        {t('tickets.createdDate')}:
                      </Text>
                      <Text style={[styles.detailValue, { textAlign: 'right', color: colors.text }]}>
                        {formatDate(ticket.date)} • {ticket.time}
                      </Text>
                    </View>

                    <View style={[styles.detailRow, { flexDirection: rtl ? 'row' : 'row', justifyContent: rtl ? 'flex-end' : 'flex-start' }]}>
                      <Text style={[styles.detailLabel, { textAlign: 'right', color: colors.textSecondary }]}>
                        {t('tickets.lastUpdate')}:
                      </Text>
                      <Text style={[styles.detailValue, { textAlign: 'right', color: colors.text }]}>
                        {ticket.lastUpdate}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Empty State */}
        {mockTickets.length === 0 && (
          <View style={styles.emptyState}>
            <FontAwesomeIcon icon={faTicketAlt} size={48} color={colors.textSecondary} />
            <Text style={[styles.emptyStateText, { textAlign, color: colors.textSecondary }]}>
              {t('tickets.noTickets')}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* New Ticket Modal */}
      <Modal
        visible={showNewTicketModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancelTicket}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={[styles.modalHeader, { flexDirection }]}>
              <Text style={[styles.modalTitle, { textAlign, color: colors.text }]}>
                {t('tickets.newTicket')}
              </Text>
              <TouchableOpacity
                onPress={handleCancelTicket}
                style={styles.modalCloseButton}
              >
                <FontAwesomeIcon icon={faTimes} size={20} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
              {/* Header Section */}
              <View style={styles.modalHeaderSection}>
                <Text style={[styles.modalHeaderTitle, { textAlign, color: colors.text }]}>
                  {t('tickets.reachUs')}
                </Text>
                <Text style={[styles.modalHeaderSubtitle, { textAlign, color: colors.primary }]}>
                  {t('tickets.weCare')}
                </Text>
                <Text style={[styles.modalHeaderDescription, { textAlign, color: colors.text }]}>
                  {t('tickets.howCanWeHelp')}
                </Text>
                <View style={[styles.modalHeaderDivider, { backgroundColor: colors.border }]} />
              </View>

              {/* Name Field */}
              <View style={styles.nameFieldContainer}>
                <Text style={[styles.fieldLabel, { textAlign, color: colors.primary }]}>
                  {t('tickets.name')} :
                </Text>
                <InputField
                  label=""
                  placeholder=""
                  value={ticketName}
                  onChangeText={(text) => {
                    setTicketName(text);
                    if (ticketError.name) {
                      setTicketError({ ...ticketError, name: '' });
                    }
                  }}
                  icon={faUser}
                  error={ticketError.name || ''}
                />
              </View>

              {/* Email Field */}
              <InputField
                label={t('tickets.email')}
                placeholder={t('tickets.emailPlaceholder')}
                value={ticketEmail}
                onChangeText={(text) => {
                  setTicketEmail(text);
                  if (ticketError.email) {
                    setTicketError({ ...ticketError, email: '' });
                  }
                }}
                keyboardType="email-address"
                icon={faEnvelope}
                error={ticketError.email || ''}
              />

              {/* Product Dropdown */}
              <Dropdown
                label={t('tickets.product')}
                placeholder={t('tickets.productPlaceholder')}
                options={productOptions}
                value={ticketProduct}
                onSelect={(value) => {
                  setTicketProduct(value);
                  if (ticketError.product) {
                    setTicketError({ ...ticketError, product: '' });
                  }
                }}
              />
              {ticketError.product && (
                <Text style={[styles.errorText, { textAlign, color: colors.error }]}>
                  {ticketError.product}
                </Text>
              )}

              {/* Date Field */}
              <DatePicker
                label={t('tickets.date')}
                placeholder={t('tickets.datePlaceholder')}
                value={ticketDate}
                onSelect={(value) => {
                  setTicketDate(value);
                  if (ticketError.date) {
                    setTicketError({ ...ticketError, date: '' });
                  }
                }}
                icon={faCalendar}
                error={ticketError.date || ''}
              />

              {/* Subject Field */}
              <Dropdown
                label={t('tickets.subject')}
                placeholder={t('tickets.subjectPlaceholder')}
                options={subjectOptions}
                value={ticketSubject}
                onSelect={(value) => {
                  setTicketSubject(value);
                  if (ticketError.subject) {
                    setTicketError({ ...ticketError, subject: '' });
                  }
                }}
              />
              {ticketError.subject && (
                <Text style={[styles.errorText, { textAlign, color: colors.error }]}>
                  {ticketError.subject}
                </Text>
              )}

              {/* Message Field */}
              <View style={styles.textAreaContainer}>
                <Text style={[styles.textAreaLabel, { textAlign, color: colors.text }]}>
                  {t('tickets.tellUsMore')}
                </Text>
                <TextInput
                  style={[
                    styles.textArea,
                    { 
                      textAlign, 
                      color: colors.text, 
                      backgroundColor: colors.surface,
                      borderColor: ticketError.message ? colors.error : colors.border,
                    },
                  ]}
                  placeholder={t('tickets.messagePlaceholder')}
                  placeholderTextColor={colors.textSecondary}
                  value={ticketMessage}
                  onChangeText={(text) => {
                    setTicketMessage(text);
                    if (ticketError.message) {
                      setTicketError({ ...ticketError, message: '' });
                    }
                  }}
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
                {ticketError.message && (
                  <Text style={[styles.errorText, { textAlign, color: colors.error }]}>
                    {ticketError.message}
                  </Text>
                )}
              </View>
            </ScrollView>

            <View style={[styles.modalFooter, { flexDirection }]}>
              <Button
                title={t('tickets.cancel')}
                onPress={handleCancelTicket}
                variant="outline"
                style={styles.modalButton}
              />
              <Button
                title={t('tickets.submit')}
                onPress={handleSubmitTicket}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
      
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        activeItem="tickets"
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

export default TicketsScreen;

