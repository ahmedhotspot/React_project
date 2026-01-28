import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLanguage } from '../../locales';
import { useTheme } from '../../contexts/ThemeContext';
import { styles } from '../../styles/ReviewStep.styles';
import Checkbox from '../../components/Checkbox';

const ReviewStep = ({ data, onSubmit, onAgreementChange }) => {
  const { t, getTextAlign } = useLanguage();
  const { colors } = useTheme();
  const textAlign = getTextAlign();
  
  const [agreeToInquiry, setAgreeToInquiry] = useState(data?.agreeToInquiry || false);
  const [agreeToPayFees, setAgreeToPayFees] = useState(data?.agreeToPayFees || false);

  // Notify parent component when agreements change
  useEffect(() => {
    if (onAgreementChange) {
      onAgreementChange({
        agreeToInquiry,
        agreeToPayFees,
      });
    }
  }, [agreeToInquiry, agreeToPayFees, onAgreementChange]);

  const renderSection = (title, items) => (
    <View style={{ marginBottom: 25 }}>
      <Text style={[styles.sectionTitle, { textAlign }]}>
        {title}
      </Text>
      <View style={{ backgroundColor: colors?.surface || '#FFFFFF', borderRadius: 10, padding: 15 }}>
        {items.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
              borderBottomWidth: index < items.length - 1 ? 1 : 0,
              borderBottomColor: '#E0E0E0',
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#666666', flex: 1, textAlign: 'right' }}>
              {item.label}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#2C3E50', flex: 1, textAlign: 'left' }}>
              {item.value || t('form.notProvided')}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  const getFinancingPurposeLabel = (value) => {
    if (!value) return '';
    const purposeMap = {
      'personal': t('form.financingPurposePersonal'),
      'realEstate': t('form.financingPurposeRealEstate'),
      'car': t('form.financingPurposeCar'),
      'education': t('form.financingPurposeEducation'),
      'business': t('form.financingPurposeBusiness'),
      'other': t('form.financingPurposeOther'),
    };
    return purposeMap[value] || '';
  };

  const getHousingTypeLabel = (value) => {
    if (!value) return '';
    const housingMap = {
      'owned': t('form.housingTypeOwned'),
      'rented': t('form.housingTypeRented'),
      'family': t('form.housingTypeFamily'),
      'other': t('form.housingTypeOther'),
    };
    return housingMap[value] || '';
  };

  const getEducationLevelLabel = (value) => {
    if (!value) return '';
    const educationMap = {
      'highSchool': t('form.educationLevelHighSchool'),
      'diploma': t('form.educationLevelDiploma'),
      'bachelor': t('form.educationLevelBachelor'),
      'master': t('form.educationLevelMaster'),
      'phd': t('form.educationLevelPhD'),
    };
    return educationMap[value] || '';
  };

  const getEducationFeesLabel = (value) => {
    if (!value) return '';
    if (value === '0') return t('form.educationFeesNone');
    return value.replace(/-/g, ' - ').replace(/\+/g, '+ ');
  };

  const getEmploymentStatusLabel = (value) => {
    if (!value) return '';
    const statusMap = {
      'employed': t('form.employmentStatusEmployed'),
      'selfEmployed': t('form.employmentStatusSelfEmployed'),
      'unemployed': t('form.employmentStatusUnemployed'),
      'retired': t('form.employmentStatusRetired'),
    };
    return statusMap[value] || '';
  };

  const personalInfoItems = [
    { label: t('form.financingPurpose'), value: getFinancingPurposeLabel(data.financingPurpose) },
    { label: t('form.maritalStatus'), value: data.maritalStatus ? t(`form.maritalStatus${data.maritalStatus.charAt(0).toUpperCase() + data.maritalStatus.slice(1)}`) : '' },
    { label: t('form.familyMembers'), value: data.familyMembers },
    { label: t('form.educationFees'), value: getEducationFeesLabel(data.educationFees) },
    { label: t('form.housingType'), value: getHousingTypeLabel(data.housingType) },
    { label: t('form.employmentStatus'), value: getEmploymentStatusLabel(data.employmentStatus) },
    { label: t('form.educationLevel'), value: getEducationLevelLabel(data.educationLevel) },
    { label: t('form.isPoliticallyExposed'), value: data.isPoliticallyExposed ? t('common.yes') : t('common.no') },
  ];

  const getJobTypeLabel = (value) => {
    if (!value) return '';
    const jobTypeMap = {
      'employed': t('form.jobTypeEmployed'),
      'retired': t('form.jobTypeRetired'),
      'freelance': t('form.jobTypeFreelance'),
    };
    return jobTypeMap[value] || '';
  };

  const getWorkSectorLabel = (value) => {
    if (!value) return '';
    const sectorMap = {
      'private': t('form.workSectorPrivate'),
      'government': t('form.workSectorGovernment'),
      'military': t('form.workSectorMilitary'),
    };
    return sectorMap[value] || '';
  };

  const getEmployerLabel = (value) => {
    if (!value) return '';
    const employerMap = {
      'private': t('form.employerPrivate'),
      'government': t('form.employerGovernment'),
      'military': t('form.employerMilitary'),
      'bank': t('form.employerBank'),
      'hospital': t('form.employerHospital'),
      'school': t('form.employerSchool'),
      'university': t('form.employerUniversity'),
      'other': t('form.employerOther'),
    };
    return employerMap[value] || '';
  };

  const workInfoItems = [
    { label: t('form.jobType'), value: getJobTypeLabel(data.jobType) },
    { label: t('form.workSector'), value: getWorkSectorLabel(data.workSector) },
    { label: t('form.companyName'), value: getEmployerLabel(data.companyName) },
    { label: t('form.jobTitle'), value: data.jobTitle },
    { label: t('form.workStartDate'), value: data.workStartDate },
  ];

  const getOtherIncomeSourceLabel = (value) => {
    if (!value) return '';
    const sourceMap = {
      'business': t('form.incomeSourceBusiness'),
      'investment': t('form.incomeSourceInvestment'),
      'rental': t('form.incomeSourceRental'),
      'freelance': t('form.incomeSourceFreelance'),
      'other': t('form.incomeSourceOther'),
    };
    return sourceMap[value] || '';
  };

  const calculateTotalIncome = () => {
    const basic = parseFloat(data.basicSalary || 0);
    const housing = parseFloat(data.housingAllowance || 0);
    const other = parseFloat(data.otherAllowances || 0);
    const otherIncome = parseFloat(data.otherIncomeAmount || 0);
    return basic + housing + other + otherIncome;
  };

  const incomeInfoItems = [
    { label: t('form.basicSalary'), value: data.basicSalary ? `${parseFloat(data.basicSalary).toLocaleString()} ${t('common.sar')}` : '' },
    { label: t('form.housingAllowance'), value: data.housingAllowance ? `${parseFloat(data.housingAllowance).toLocaleString()} ${t('common.sar')}` : '' },
    { label: t('form.otherAllowances'), value: data.otherAllowances ? `${parseFloat(data.otherAllowances).toLocaleString()} ${t('common.sar')}` : '' },
    { label: t('form.otherIncomeSource'), value: getOtherIncomeSourceLabel(data.otherIncomeSource) },
    { label: t('form.otherIncomeAmount'), value: data.otherIncomeAmount ? `${parseFloat(data.otherIncomeAmount).toLocaleString()} ${t('common.sar')}` : '' },
    { label: t('form.totalIncome'), value: `${calculateTotalIncome().toLocaleString()} ${t('common.sar')}` },
  ];

  const calculateTotalExpenses = () => {
    const rent = parseFloat(data.monthlyRentValue || 0);
    const labor = parseFloat(data.monthlyLaborWages || 0);
    const food = parseFloat(data.monthlyFoodBeverages || 0);
    const education = parseFloat(data.monthlyEducationExpenses || 0);
    const transport = parseFloat(data.monthlyTransportationCommunications || 0);
    const additional = parseFloat(data.additionalMonthlyExpenses || 0);
    const installment = parseFloat(data.monthlyInstallment || 0);
    return rent + labor + food + education + transport + additional + installment;
  };

  const expensesInfoItems = [
    { label: t('form.hasOtherBankLoan'), value: data.hasOtherBankLoan === 'yes' ? t('common.yes') : data.hasOtherBankLoan === 'no' ? t('common.no') : '' },
    { label: t('form.bankName'), value: data.bankName || '' },
    { label: t('form.monthlyInstallment'), value: data.monthlyInstallment ? `${parseFloat(data.monthlyInstallment).toLocaleString()} ${t('common.sar')}` : '' },
    { label: t('form.monthlyRentValue'), value: data.monthlyRentValue ? `${parseFloat(data.monthlyRentValue).toLocaleString()} ${t('common.sar')}` : '' },
    { label: t('form.monthlyLaborWages'), value: data.monthlyLaborWages ? `${parseFloat(data.monthlyLaborWages).toLocaleString()} ${t('common.sar')}` : '' },
    { label: t('form.monthlyFoodBeverages'), value: data.monthlyFoodBeverages ? `${parseFloat(data.monthlyFoodBeverages).toLocaleString()} ${t('common.sar')}` : '' },
    { label: t('form.monthlyEducationExpenses'), value: data.monthlyEducationExpenses ? `${parseFloat(data.monthlyEducationExpenses).toLocaleString()} ${t('common.sar')}` : '' },
    { label: t('form.monthlyTransportationCommunications'), value: data.monthlyTransportationCommunications ? `${parseFloat(data.monthlyTransportationCommunications).toLocaleString()} ${t('common.sar')}` : '' },
    { label: t('form.additionalMonthlyExpenses'), value: data.additionalMonthlyExpenses ? `${parseFloat(data.additionalMonthlyExpenses).toLocaleString()} ${t('common.sar')}` : '' },
    { label: t('form.totalExpenses'), value: `${calculateTotalExpenses().toLocaleString()} ${t('common.sar')}` },
  ];

  return (
    <View>
      <Text style={[styles.mainTitle, { textAlign }]}>
        {t('form.step6Title')}
      </Text>

      <Text style={{ fontSize: 14, color: '#666666', marginBottom: 20, textAlign }}>
        {t('form.reviewDescription')}
      </Text>

      {renderSection(t('form.step1Title'), personalInfoItems)}
      {renderSection(t('form.step2Title'), workInfoItems)}
      {renderSection(t('form.step3Title'), incomeInfoItems)}
      {renderSection(t('form.step4Title'), expensesInfoItems)}

      {/* Agreement Checkboxes */}
      <View style={{ marginTop: 30, marginBottom: 20 }}>
        <Checkbox
          label={t('form.agreeToInquiry')}
          checked={agreeToInquiry}
          onToggle={() => setAgreeToInquiry(!agreeToInquiry)}
          checkboxOnRight={true}
        />
        
        <Checkbox
          label={t('form.agreeToPayFees')}
          checked={agreeToPayFees}
          onToggle={() => setAgreeToPayFees(!agreeToPayFees)}
          checkboxOnRight={true}
        />
      </View>
    </View>
  );
};

export default ReviewStep;

