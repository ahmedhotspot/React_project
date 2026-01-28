import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight, faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import { styles } from '../styles/EligibilityScreen.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';

const EligibilityScreen = ({ onNavigateBack, product, onLogout, onContinue }) => {
  const { t, getTextAlign, getFlexDirection, isRTL } = useLanguage();
  const { colors, isDark } = useTheme();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);
  const [savedFormData, setSavedFormData] = useState(null);


  // تحديد نوع المنتج
  const productType = product?.id || 1;
  
  // الحصول على النصوص حسب نوع المنتج
  const getProductTexts = () => {
    const productKey = `eligibility.product${productType}`;
    const requirements = [];
    
    // إضافة المتطلبات المتاحة
    for (let i = 1; i <= 4; i++) {
      const req = t(`${productKey}.requirement${i}`);
      if (req && req !== `${productKey}.requirement${i}`) {
        requirements.push(req);
      }
    }
    
    return {
      title: product?.title || t(`${productKey}.title`),
      requirements: requirements,
    };
  };

  const productTexts = getProductTexts();

  const handleContinue = async () => {
    // Check for saved data before continuing
    try {
      if (!product) {
        if (onContinue) {
          onContinue(product);
        }
        return;
      }

      const productId = product?.id || product?.id?.toString() || 'default';
      const storageKey = `formData_${productId}`;
      const savedData = await AsyncStorage.getItem(storageKey);
      
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        const savedProductId = String(parsedData.productId || 'default');
        const currentProductId = String(productId || 'default');
        
        if (savedProductId === currentProductId) {
          // Show modal to ask user
          setSavedFormData(parsedData);
          setShowIncompleteModal(true);
          return; // Don't continue yet, wait for user choice
        }
      }
    } catch (error) {
      console.error('Error checking saved data in handleContinue:', error);
    }
    
    // No saved data or different product, continue normally
    setShowIncompleteModal(false);
    if (onContinue) {
      onContinue(product);
    }
  };

  const handleResumeIncomplete = () => {
    setShowIncompleteModal(false);
    if (onContinue) {
      onContinue(product, savedFormData);
    }
  };

  const handleStartNew = async () => {
    // Clear saved data
    try {
      const productId = product?.id || 'default';
      const storageKey = `formData_${productId}`;
      await AsyncStorage.removeItem(storageKey);
    } catch (error) {
      console.error('Error clearing saved data:', error);
    }
    setShowIncompleteModal(false);
    if (onContinue) {
      onContinue(product);
    }
  };

  const handleCancel = () => {
    if (onNavigateBack) {
      onNavigateBack();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <View style={styles.contentWrapper}>
        {/* Header */}
        <View style={[styles.header, { flexDirection, backgroundColor: colors.background }]}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setSidebarVisible(true)}
          >
            <FontAwesomeIcon icon={faBars} size={24} color={colors.primary} />
          </TouchableOpacity>
          
          {onNavigateBack && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={onNavigateBack}
              activeOpacity={0.7}
            >
              <View style={styles.logoCircle}>
                <FontAwesomeIcon icon={rtl ? faArrowRight : faArrowLeft} size={16} color="#E62130" />
              </View>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Product Title */}
          <Text style={[styles.productTitle, { textAlign, color: colors.primary }]}>
            {productTexts.title}
          </Text>

          {/* Eligibility Title */}
          <Text style={[styles.eligibilityTitle, { textAlign, color: colors.text }]}>
            {t('eligibility.title')}
          </Text>

          {/* Requirements List */}
          <View style={styles.requirementsContainer}>
            {productTexts.requirements.map((requirement, index) => (
              <View key={index} style={styles.requirementItem}>
                <View style={styles.numberContainer}>
                  <View style={[styles.numberCircle, { backgroundColor: colors.primary }]}>
                    <Text style={styles.numberText}>{index + 1}</Text>
                  </View>
                  {index < productTexts.requirements.length - 1 && (
                    <View style={[styles.connectorLine, { backgroundColor: colors.primary }]} />
                  )}
                </View>
                <Text style={[styles.requirementText, { textAlign, color: colors.text }]}>
                  {requirement}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>
              {t('eligibility.continue')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelButtonText}>
              {t('eligibility.cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        activeItem="home"
        onLogout={onLogout}
      />

      {/* Incomplete Form Modal */}
      <Modal
        visible={showIncompleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowIncompleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { textAlign, color: colors.text }]}>
              {t('eligibility.incompleteFormTitle')}
            </Text>
            <Text style={[styles.modalMessage, { textAlign, color: colors.textSecondary }]}>
              {t('eligibility.incompleteFormMessage')}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.resumeButton, { backgroundColor: colors.primary }]}
                onPress={handleResumeIncomplete}
                activeOpacity={0.8}
              >
                <Text style={styles.resumeButtonText}>
                  {t('eligibility.resumeIncomplete')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.startNewButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
                onPress={handleStartNew}
                activeOpacity={0.8}
              >
                <Text style={[styles.startNewButtonText, { color: colors.text }]}>
                  {t('eligibility.startNew')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EligibilityScreen;

