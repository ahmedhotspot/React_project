import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight, faArrowLeft, faBars, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import { styles } from '../styles/AmountDurationScreen.styles';
import { useLanguage } from '../locales';
import Dropdown from '../components/Dropdown';
import { TextInput } from 'react-native';

const AmountDurationScreen = ({ onNavigateBack, product, onLogout, onSubmit }) => {
  const { t, getTextAlign, getFlexDirection, isRTL } = useLanguage();
  const textAlign = getTextAlign();
  const flexDirection = getFlexDirection();
  const rtl = isRTL();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');

  const durationOptions = [
    { label: '3 شهر', value: '3' },
    { label: '6 شهر', value: '6' },
    { label: '12 شهر', value: '12' },
    { label: '18 شهر', value: '18' },
    { label: '24 شهر', value: '24' },
    { label: '30 شهر', value: '30' },
  ];

  const handleSubmit = () => {
    if (amount && duration && onSubmit) {
      onSubmit({
        ...product,
        amount,
        duration,
      });
    }
  };

  const handleCancel = () => {
    if (onNavigateBack) {
      onNavigateBack();
    }
  };

  const handleIncrement = () => {
    const currentValue = parseFloat(amount || 0);
    const newValue = currentValue + 100;
    setAmount(newValue.toString());
  };

  const handleDecrement = () => {
    const currentValue = parseFloat(amount || 0);
    const newValue = Math.max(0, currentValue - 100);
    setAmount(newValue.toString());
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <View style={styles.contentWrapper}>
        {/* Header */}
        <View style={[styles.header, { flexDirection }]}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setSidebarVisible(true)}
          >
            <FontAwesomeIcon icon={faBars} size={24} color="#E62130" />
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
          {/* Title */}
          <Text style={[styles.title, { textAlign }]}>
            {t('amountDuration.title')}
          </Text>

          {/* Amount Field */}
          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { textAlign }]}>
              {t('amountDuration.amount')}
            </Text>
            <View style={[styles.amountInputContainer, { flexDirection: rtl ? 'row-reverse' : 'row' }]}>
              <TouchableOpacity
                style={[styles.button, styles.decrementButton]}
                onPress={handleDecrement}
                activeOpacity={0.7}
              >
                <FontAwesomeIcon icon={faMinus} size={14} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[styles.input, { textAlign }]}
                    placeholder={t('amountDuration.amountPlaceholder')}
                    placeholderTextColor="#999"
                    value={amount}
                    onChangeText={(text) => {
                      const numericText = text.replace(/[^0-9]/g, '');
                      setAmount(numericText);
                    }}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <TouchableOpacity
                style={[styles.button, styles.incrementButton]}
                onPress={handleIncrement}
                activeOpacity={0.7}
              >
                <FontAwesomeIcon icon={faPlus} size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Duration Field */}
          <Dropdown
            label={t('amountDuration.duration')}
            placeholder={t('amountDuration.durationPlaceholder')}
            value={duration}
            onSelect={setDuration}
            options={durationOptions}
          />
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.submitButton,
              (!amount || !duration) && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            activeOpacity={0.8}
            disabled={!amount || !duration}
          >
            <Text style={[
              styles.submitButtonText,
              (!amount || !duration) && styles.submitButtonTextDisabled,
            ]}>
              {t('amountDuration.submit')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelButtonText}>
              {t('amountDuration.cancel')}
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
    </View>
  );
};

export default AmountDurationScreen;

