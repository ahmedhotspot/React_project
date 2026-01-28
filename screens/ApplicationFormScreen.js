import React, { useState, useEffect, Fragment } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight, faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import { styles } from '../styles/ApplicationFormScreen.styles';
import { useLanguage } from '../locales';
import { useTheme } from '../contexts/ThemeContext';
import PersonalInfoStep from './formSteps/PersonalInfoStep';
import IncomeInfoStep from './formSteps/IncomeInfoStep';
import DocumentsStep from './formSteps/DocumentsStep';
import ReviewStep from './formSteps/ReviewStep';

const ApplicationFormScreen = ({ onNavigateBack, product, onLogout, onSubmit, savedData, returnToReviewStep, onReturnToReviewStepComplete }) => {
  const { t, getTextAlign, getFlexDirection, isRTL } = useLanguage();
  const { colors, isDark } = useTheme();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [agreements, setAgreements] = useState({
    agreeToInquiry: false,
    agreeToPayFees: false,
  });
  
  // Storage key based on product ID
  const getStorageKey = () => {
    const productId = product?.id || 'default';
    return `formData_${productId}`;
  };

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Info
    financingPurpose: '',
    maritalStatus: '',
    familyMembers: '',
    educationFees: '',
    housingType: '',
    employmentStatus: '',
    educationLevel: '',
    isPoliticallyExposed: false,
    
    // Work Info
    jobType: '',
    workSector: '',
    companyName: '',
    jobTitle: '',
    workStartDate: '',
    
    // Income Info
    basicSalary: '',
    housingAllowance: '',
    otherAllowances: '',
    otherIncomeSource: '',
    otherIncomeAmount: '',
    
    // Expenses Info
    hasOtherBankLoan: '',
    bankName: '',
    monthlyInstallment: '',
    monthlyRentValue: '',
    monthlyLaborWages: '',
    monthlyFoodBeverages: '',
    monthlyEducationExpenses: '',
    monthlyTransportationCommunications: '',
    additionalMonthlyExpenses: '',
    monthlyRent: '',
    monthlyUtilities: '',
    otherExpenses: '',
    existingLoans: '',
    
    // Documents
    documents: [],
  });

  // Load saved data on mount or when savedData prop changes
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        // If returnToReviewStep is true, go directly to review step (step 4)
        if (returnToReviewStep) {
          console.log('Returning to review step');
          
          // Load saved data from AsyncStorage first
          if (product) {
            const productId = product?.id || 'default';
            const storageKey = `formData_${productId}`;
            const storedData = await AsyncStorage.getItem(storageKey);
            if (storedData) {
              const parsedData = JSON.parse(storedData);
              console.log('Loading saved data for review step:', parsedData);
              if (parsedData.formData) {
                setFormData(parsedData.formData);
              }
            }
          }
          
          // Set to review step (step 4)
          setCurrentStep(4);
          
          // Reset the flag
          if (onReturnToReviewStepComplete) {
            onReturnToReviewStepComplete();
          }
          return;
        }

        // If savedData is passed as prop (from modal), use it directly
        if (savedData && savedData.formData) {
          console.log('Loading saved data from prop:', savedData);
          setFormData(savedData.formData);
          if (savedData.currentStep) {
            console.log('Restoring to step:', savedData.currentStep);
            setCurrentStep(savedData.currentStep);
          }
          return;
        }

        // Otherwise, load from AsyncStorage
        if (product) {
          const productId = product?.id || 'default';
          const storageKey = `formData_${productId}`;
          const storedData = await AsyncStorage.getItem(storageKey);
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            console.log('Loading saved data from storage:', parsedData);
            if (parsedData.formData) {
              setFormData(parsedData.formData);
            }
            if (parsedData.currentStep) {
              console.log('Restoring to step:', parsedData.currentStep);
              setCurrentStep(parsedData.currentStep);
            }
          }
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    };
    loadSavedData();
  }, [product, savedData, returnToReviewStep, onReturnToReviewStepComplete]);

  // Save data whenever formData or currentStep changes
  useEffect(() => {
    const saveData = async () => {
      try {
        if (!product) return;
        
        const productId = product?.id || product?.id?.toString() || 'default';
        const storageKey = `formData_${productId}`;
        const dataToSave = {
          formData,
          currentStep,
          productId: String(productId), // Ensure it's saved as string for consistent comparison
          timestamp: new Date().toISOString(),
        };
        console.log('Saving form data:', storageKey, dataToSave);
        await AsyncStorage.setItem(storageKey, JSON.stringify(dataToSave));
        console.log('Form data saved successfully');
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };
    saveData();
  }, [formData, currentStep, product]);

  const totalSteps = 4;
  const steps = [
    { number: 1, title: t('form.step1Title') },
    { number: 2, title: t('form.step3Title') },
    { number: 3, title: t('form.step5Title') },
    { number: 4, title: t('form.step6Title') },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepDataChange = (stepData) => {
    setFormData({ ...formData, ...stepData });
  };

  const handleSubmit = async () => {
    if (onSubmit) {
      // Clear saved data after successful submission
      try {
        const productId = product?.id || 'default';
        const storageKey = `formData_${productId}`;
        await AsyncStorage.removeItem(storageKey);
      } catch (error) {
        console.error('Error clearing saved data:', error);
      }
      onSubmit(formData);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep data={formData} onDataChange={handleStepDataChange} />;
      case 2:
        return <IncomeInfoStep data={formData} onDataChange={handleStepDataChange} />;
      case 3:
        return <DocumentsStep data={formData} onDataChange={handleStepDataChange} />;
      case 4:
        return <ReviewStep data={formData} onSubmit={handleSubmit} onAgreementChange={setAgreements} />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors?.background || '#F5F5F5' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors?.background || '#F5F5F5'} />
      <View style={styles.contentWrapper}>
        {/* Header */}
        <View style={[styles.header, { flexDirection, backgroundColor: colors?.background || '#F5F5F5' }]}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setSidebarVisible(true)}
          >
            <FontAwesomeIcon icon={faBars} size={24} color={colors?.primary || '#E62130'} />
          </TouchableOpacity>
          
          {onNavigateBack && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={onNavigateBack}
              activeOpacity={0.7}
            >
              <View style={styles.logoCircle}>
                <FontAwesomeIcon icon={rtl ? faArrowRight : faArrowLeft} size={16} color={colors?.primary || '#E62130'} />
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Progress Steps */}
        <View style={styles.progressContainer}>
          <View style={styles.stepsRow}>
            {steps.map((step, index) => (
              <Fragment key={step.number}>
                <View style={styles.stepContainer}>
                  <View
                    style={[
                      styles.stepCircle,
                      currentStep >= step.number && styles.stepCircleActive,
                      currentStep === step.number && styles.stepCircleCurrent,
                    ]}
                  >
                    <Text
                      style={[
                        styles.stepNumber,
                        currentStep >= step.number && styles.stepNumberActive,
                      ]}
                    >
                      {step.number}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.stepTitle,
                      currentStep === step.number && styles.stepTitleActive,
                      { color: currentStep === step.number ? (colors?.primary || '#E62130') : (colors?.textSecondary || '#7F8C8D') },
                    ]}
                  >
                    {step.title}
                  </Text>
                </View>
                {index < steps.length - 1 && (
                  <View
                    style={[
                      styles.stepLine,
                      currentStep > step.number && styles.stepLineActive,
                    ]}
                  />
                )}
              </Fragment>
            ))}
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderStepContent()}
        </ScrollView>

        {/* Navigation Buttons */}
        <View style={styles.buttonsContainer}>
          {currentStep > 1 && (
            <TouchableOpacity
              style={styles.previousButton}
              onPress={handlePrevious}
              activeOpacity={0.8}
            >
              <Text style={styles.previousButtonText}>
                {t('form.previous')}
              </Text>
            </TouchableOpacity>
          )}
          {currentStep < totalSteps ? (
            <TouchableOpacity
              style={[styles.nextButton, currentStep === 1 && styles.nextButtonFull]}
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text style={styles.nextButtonText}>
                {t('form.next')}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.nextButton,
                currentStep === 1 && styles.nextButtonFull,
                (!agreements.agreeToInquiry || !agreements.agreeToPayFees) && styles.nextButtonDisabled
              ]}
              onPress={handleSubmit}
              activeOpacity={0.8}
              disabled={!agreements.agreeToInquiry || !agreements.agreeToPayFees}
            >
              <Text style={[
                styles.nextButtonText,
                (!agreements.agreeToInquiry || !agreements.agreeToPayFees) && styles.nextButtonTextDisabled
              ]}>
                {t('form.submit')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        activeItem="home"
        onLogout={onLogout}
      />
    </View>
  );
};

export default ApplicationFormScreen;

