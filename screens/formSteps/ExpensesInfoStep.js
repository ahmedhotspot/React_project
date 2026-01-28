import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import InputField from '../../components/InputField';
import Dropdown from '../../components/Dropdown';
import { useLanguage } from '../../locales';
import { useTheme } from '../../contexts/ThemeContext';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const ExpensesInfoStep = ({ data, onDataChange }) => {
  const { t, getTextAlign, isRTL } = useLanguage();
  const { colors } = useTheme();
  const textAlign = getTextAlign();
  const rtl = isRTL();

  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    if (onDataChange) {
      onDataChange(localData);
    }
  }, [localData]);

  const hasLoanOptions = [
    { label: t('common.yes'), value: 'yes' },
    { label: t('common.no'), value: 'no' },
  ];

  const hasLoan = localData.hasOtherBankLoan === 'yes';

  const handleIncrement = (fieldName) => {
    const currentValue = parseFloat(localData[fieldName] || 0);
    const newValue = currentValue + 100;
    setLocalData({ ...localData, [fieldName]: newValue.toString() });
  };

  const handleDecrement = (fieldName) => {
    const currentValue = parseFloat(localData[fieldName] || 0);
    const newValue = Math.max(0, currentValue - 100);
    setLocalData({ ...localData, [fieldName]: newValue.toString() });
  };

  const renderNumericFieldWithButtons = (label, placeholder, value, fieldName) => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={[styles.fieldLabel, { textAlign, color: colors?.text || '#2C3E50' }]}>{label}</Text>
        <View style={[styles.inputWithButtonsContainer, { flexDirection: rtl ? 'row-reverse' : 'row' }]}>
          <TouchableOpacity
            style={[styles.button, styles.decrementButton]}
            onPress={() => handleDecrement(fieldName)}
            activeOpacity={0.7}
          >
            <FontAwesomeIcon icon={faMinus} size={14} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <View style={[styles.inputWrapper, { backgroundColor: colors?.background || '#f5f5f5', borderColor: colors?.border || '#e0e0e0' }]}>
              <TextInput
                style={[styles.input, { textAlign, color: colors?.text || '#000' }]}
                placeholder={placeholder}
                placeholderTextColor={colors?.textSecondary || '#999'}
                value={value}
                onChangeText={(text) => {
                  const numericText = text.replace(/[^0-9]/g, '');
                  setLocalData({ ...localData, [fieldName]: numericText });
                }}
                keyboardType="numeric"
              />
            </View>
          </View>
          <TouchableOpacity
            style={[styles.button, styles.incrementButton, { backgroundColor: colors?.primary || '#E62130' }]}
            onPress={() => handleIncrement(fieldName)}
            activeOpacity={0.7}
          >
            <FontAwesomeIcon icon={faPlus} size={14} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Calculate total expenses
  const totalExpenses = useMemo(() => {
    const rent = parseFloat(localData.monthlyRentValue || 0);
    const labor = parseFloat(localData.monthlyLaborWages || 0);
    const food = parseFloat(localData.monthlyFoodBeverages || 0);
    const education = parseFloat(localData.monthlyEducationExpenses || 0);
    const transport = parseFloat(localData.monthlyTransportationCommunications || 0);
    const additional = parseFloat(localData.additionalMonthlyExpenses || 0);
    const installment = parseFloat(localData.monthlyInstallment || 0);
    return rent + labor + food + education + transport + additional + installment;
  }, [
    localData.monthlyRentValue,
    localData.monthlyLaborWages,
    localData.monthlyFoodBeverages,
    localData.monthlyEducationExpenses,
    localData.monthlyTransportationCommunications,
    localData.additionalMonthlyExpenses,
    localData.monthlyInstallment,
  ]);

  return (
    <ScrollView>
      <View>
        <Text style={{ fontSize: 20, fontWeight: '700', color: colors?.text || '#2C3E50', marginBottom: 10, textAlign }}>
          {t('form.step4Title')}
        </Text>

        <Text style={{ fontSize: 16, fontWeight: '600', color: colors?.textSecondary || '#666666', marginBottom: 10, textAlign }}>
          {t('form.expensesDetailsTitle')}
        </Text>

        <Text style={{ fontSize: 14, color: colors?.textSecondary || '#666666', marginBottom: 20, textAlign }}>
          {t('form.expensesDescription')}
        </Text>

        <Dropdown
          label={t('form.hasOtherBankLoan')}
          placeholder={t('form.hasOtherBankLoanPlaceholder')}
          options={hasLoanOptions}
          value={localData.hasOtherBankLoan}
          onSelect={(value) => setLocalData({ 
            ...localData, 
            hasOtherBankLoan: value,
            bankName: value === 'no' ? '' : localData.bankName,
            monthlyInstallment: value === 'no' ? '' : localData.monthlyInstallment,
          })}
        />

        {hasLoan && (
          <>
            <InputField
              label={t('form.bankName')}
              placeholder={t('form.bankNamePlaceholder')}
              value={localData.bankName}
              onChangeText={(text) => setLocalData({ ...localData, bankName: text })}
            />

            {renderNumericFieldWithButtons(
              t('form.monthlyInstallment'),
              t('form.monthlyInstallmentPlaceholder'),
              localData.monthlyInstallment,
              'monthlyInstallment'
            )}
          </>
        )}

        {renderNumericFieldWithButtons(
          t('form.monthlyRentValue'),
          t('form.monthlyRentValuePlaceholder'),
          localData.monthlyRentValue,
          'monthlyRentValue'
        )}

        {renderNumericFieldWithButtons(
          t('form.monthlyLaborWages'),
          t('form.monthlyLaborWagesPlaceholder'),
          localData.monthlyLaborWages,
          'monthlyLaborWages'
        )}

        {renderNumericFieldWithButtons(
          t('form.monthlyFoodBeverages'),
          t('form.monthlyFoodBeveragesPlaceholder'),
          localData.monthlyFoodBeverages,
          'monthlyFoodBeverages'
        )}

        {renderNumericFieldWithButtons(
          t('form.monthlyEducationExpenses'),
          t('form.monthlyEducationExpensesPlaceholder'),
          localData.monthlyEducationExpenses,
          'monthlyEducationExpenses'
        )}

        {renderNumericFieldWithButtons(
          t('form.monthlyTransportationCommunications'),
          t('form.monthlyTransportationCommunicationsPlaceholder'),
          localData.monthlyTransportationCommunications,
          'monthlyTransportationCommunications'
        )}

        {renderNumericFieldWithButtons(
          t('form.additionalMonthlyExpenses'),
          t('form.additionalMonthlyExpensesPlaceholder'),
          localData.additionalMonthlyExpenses,
          'additionalMonthlyExpenses'
        )}

      <View style={[styles.totalExpensesContainer, { flexDirection: rtl ? 'row-reverse' : 'row', backgroundColor: colors?.surface || '#F8F9FA' }]}>
        {rtl ? (
          <>
            <Text style={[styles.totalExpensesValue, { textAlign: 'left', color: colors?.primary || '#E62130' }]}>
              {totalExpenses.toLocaleString()} {t('common.sar')}
            </Text>
            <Text style={[styles.totalExpensesLabel, { textAlign: 'right', color: colors?.text || '#2C3E50' }]}>
              {t('form.totalExpenses')}
            </Text>
          </>
        ) : (
          <>
            <Text style={[styles.totalExpensesLabel, { textAlign: 'left', color: colors?.text || '#2C3E50' }]}>
              {t('form.totalExpenses')}
            </Text>
            <Text style={[styles.totalExpensesValue, { textAlign: 'right', color: colors?.primary || '#E62130' }]}>
              {totalExpenses.toLocaleString()} {t('common.sar')}
            </Text>
          </>
        )}
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
  },
  inputWithButtonsContainer: {
    alignItems: 'center',
    gap: 8,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  incrementButton: {
    backgroundColor: '#E62130',
  },
  decrementButton: {
    backgroundColor: '#E62130',
  },
  inputContainer: {
    flex: 1,
  },
  inputWrapper: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 15,
    minHeight: 50,
  },
  inputInnerWrapper: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  input: {
    flex: 1,
    color: '#000000',
    fontSize: 16,
    paddingVertical: 12,
    marginHorizontal: 9,
  },
  totalExpensesContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalExpensesLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
  },
  totalExpensesValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E62130',
  },
});

export default ExpensesInfoStep;

