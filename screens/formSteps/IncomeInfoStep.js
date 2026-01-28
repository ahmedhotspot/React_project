import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import InputField from '../../components/InputField';
import Dropdown from '../../components/Dropdown';
import { useLanguage } from '../../locales';
import { styles } from '../../styles/IncomeInfoStep.styles';
import { faBriefcase, faHome, faWallet, faMoneyBillWave, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const IncomeInfoStep = ({ data, onDataChange }) => {
  const { t, getTextAlign, isRTL } = useLanguage();
  const textAlign = getTextAlign();
  const rtl = isRTL();

  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    if (onDataChange) {
      onDataChange(localData);
    }
  }, [localData]);

  const otherIncomeSourceOptions = [
    { label: t('form.incomeSourceBusiness'), value: 'business' },
    { label: t('form.incomeSourceInvestment'), value: 'investment' },
    { label: t('form.incomeSourceRental'), value: 'rental' },
    { label: t('form.incomeSourceFreelance'), value: 'freelance' },
    { label: t('form.incomeSourceOther'), value: 'other' },
  ];

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
        <Text style={[styles.fieldLabel, { textAlign }]}>{label}</Text>
        <View style={[styles.inputWithButtonsContainer, { flexDirection: rtl ? 'row-reverse' : 'row' }]}>
          <TouchableOpacity
            style={[styles.button, styles.decrementButton]}
            onPress={() => handleDecrement(fieldName)}
            activeOpacity={0.7}
          >
            <FontAwesomeIcon icon={faMinus} size={14} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, { textAlign }]}
                placeholder={placeholder}
                placeholderTextColor="#999"
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
            style={[styles.button, styles.incrementButton]}
            onPress={() => handleIncrement(fieldName)}
            activeOpacity={0.7}
          >
            <FontAwesomeIcon icon={faPlus} size={14} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Calculate total income
  const totalIncome = useMemo(() => {
    const basic = parseFloat(localData.basicSalary || 0);
    const housing = parseFloat(localData.housingAllowance || 0);
    const other = parseFloat(localData.otherAllowances || 0);
    const otherIncome = parseFloat(localData.otherIncomeAmount || 0);
    return basic + housing + other + otherIncome;
  }, [localData.basicSalary, localData.housingAllowance, localData.otherAllowances, localData.otherIncomeAmount]);

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
    <View>
      <Text style={[styles.mainTitle, { textAlign }]}>
        {t('form.step3Title')}
      </Text>

      <Text style={[styles.descriptionText, { textAlign }]}>
        {t('form.enterInformationBelow')}
      </Text>

      <Text style={[styles.sectionTitle, { textAlign }]}>
        {t('form.incomeDetailsTitle')}
      </Text>

      <InputField
        label={t('form.basicSalary')}
        placeholder={t('form.basicSalaryPlaceholder')}
        value={localData.basicSalary}
        onChangeText={(text) => {
          const numericText = text.replace(/[^0-9]/g, '');
          setLocalData({ ...localData, basicSalary: numericText });
        }}
        keyboardType="numeric"
        icon={faBriefcase}
      />

      <InputField
        label={t('form.housingAllowance')}
        placeholder={t('form.housingAllowancePlaceholder')}
        value={localData.housingAllowance}
        onChangeText={(text) => {
          const numericText = text.replace(/[^0-9]/g, '');
          setLocalData({ ...localData, housingAllowance: numericText });
        }}
        keyboardType="numeric"
        icon={faHome}
      />

      <InputField
        label={t('form.otherAllowances')}
        placeholder={t('form.otherAllowancesPlaceholder')}
        value={localData.otherAllowances}
        onChangeText={(text) => {
          const numericText = text.replace(/[^0-9]/g, '');
          setLocalData({ ...localData, otherAllowances: numericText });
        }}
        keyboardType="numeric"
        icon={faWallet}
      />

      <Dropdown
        label={t('form.otherIncomeSource')}
        placeholder={t('form.otherIncomeSourcePlaceholder')}
        options={otherIncomeSourceOptions}
        value={localData.otherIncomeSource}
        onSelect={(value) => setLocalData({ ...localData, otherIncomeSource: value, otherIncomeAmount: value ? localData.otherIncomeAmount : '' })}
        icon={faMoneyBillWave}
      />

      {localData.otherIncomeSource && (
        <InputField
          label={t('form.otherIncomeAmount')}
          placeholder={t('form.otherIncomeAmountPlaceholder')}
          value={localData.otherIncomeAmount}
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, '');
            setLocalData({ ...localData, otherIncomeAmount: numericText });
          }}
          keyboardType="numeric"
          icon={faMoneyBillWave}
        />
      )}

      <View style={[styles.totalIncomeContainer, { flexDirection: rtl ? 'row-reverse' : 'row' }]}>
        {rtl ? (
          <>
            <Text style={[styles.totalIncomeValue, { textAlign: 'left' }]}>
              {totalIncome.toLocaleString()} {t('common.sar')}
            </Text>
            <Text style={[styles.totalIncomeLabel, { textAlign: 'right' }]}>
              {t('form.totalIncome')}
            </Text>
          </>
        ) : (
          <>
            <Text style={[styles.totalIncomeLabel, { textAlign: 'left' }]}>
              {t('form.totalIncome')}
            </Text>
            <Text style={[styles.totalIncomeValue, { textAlign: 'right' }]}>
              {totalIncome.toLocaleString()} {t('common.sar')}
            </Text>
          </>
        )}
      </View>

      {/* Expenses Information Section */}
      <View style={{ marginTop: 30 }}>
        <Text style={[styles.mainTitle, { textAlign }]}>
          {t('form.step4Title')}
        </Text>

        <Text style={[styles.descriptionText, { textAlign }]}>
          {t('form.enterInformationBelow')}
        </Text>

        <Text style={[styles.expensesSectionTitle, { textAlign }]}>
          {t('form.expensesDetailsTitle')}
        </Text>

        <Dropdown
          label={t('form.hasServiceSuspension')}
          placeholder={t('form.hasServiceSuspensionPlaceholder')}
          options={hasLoanOptions}
          value={localData.hasServiceSuspension}
          onSelect={(value) => setLocalData({ ...localData, hasServiceSuspension: value })}
        />

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

        <View style={[styles.totalExpensesContainer, { flexDirection: rtl ? 'row-reverse' : 'row' }]}>
          {rtl ? (
            <>
              <Text style={[styles.totalExpensesValue, { textAlign: 'left' }]}>
                {totalExpenses.toLocaleString()} {t('common.sar')}
              </Text>
              <Text style={[styles.totalExpensesLabel, { textAlign: 'right' }]}>
                {t('form.totalExpenses')}
              </Text>
            </>
          ) : (
            <>
              <Text style={[styles.totalExpensesLabel, { textAlign: 'left' }]}>
                {t('form.totalExpenses')}
              </Text>
              <Text style={[styles.totalExpensesValue, { textAlign: 'right' }]}>
                {totalExpenses.toLocaleString()} {t('common.sar')}
              </Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
};


export default IncomeInfoStep;

